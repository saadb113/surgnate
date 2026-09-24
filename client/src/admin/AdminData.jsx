import { useRef, useState } from 'react';
import Icon from '../components/Icon';
import { useProducts } from '../context/ProductsContext';
import { useMessages } from '../context/MessagesContext';
import { useToast } from '../context/ToastContext';
import { api } from '../lib/api';

export default function AdminData() {
  const { products, refresh: refreshProducts } = useProducts();
  const { messages, refresh: refreshMessages } = useMessages();
  const showToast = useToast();
  const fileInputRef = useRef(null);

  const [exporting, setExporting] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [importing, setImporting] = useState(false);

  async function onExport() {
    setExporting(true);
    try {
      const payload = await api.exportData();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `surgnate-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Data exported', 'check');
    } catch (err) {
      showToast(err.message || 'Export failed', 'alert');
    } finally {
      setExporting(false);
    }
  }

  function onPickFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function confirmImport() {
    if (!pendingFile) return;
    setImporting(true);
    try {
      const text = await pendingFile.text();
      let parsed;
      try { parsed = JSON.parse(text); }
      catch { throw new Error('That file is not valid JSON'); }

      if (!Array.isArray(parsed.products)) {
        throw new Error('That file doesn\'t look like a Surgnate data export (missing "products")');
      }

      const result = await api.importData(parsed);
      await Promise.all([refreshProducts(), refreshMessages()]);
      showToast(`Imported ${result.products} products, ${result.messages} messages`, 'check');
      setPendingFile(null);
    } catch (err) {
      showToast(err.message || 'Import failed', 'alert');
    } finally {
      setImporting(false);
    }
  }

  return (
    <>
      <div className="admin-panel-head" style={{ background: 'transparent', border: 'none', padding: '0 0 20px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', margin: '0 0 4px' }}>Backup &amp; Restore</h1>
          <span style={{ fontSize: '.86rem', color: 'var(--ink-400)' }}>Export your catalog and inquiries to a file, or load one to move data between sites.</span>
        </div>
      </div>

      <div className="admin-panel" style={{ marginBottom: 24 }}>
        <div className="admin-panel-head">
          <h3>Export Data</h3>
        </div>
        <div className="admin-panel-body">
          <p style={{ color: 'var(--ink-500)', marginBottom: 16 }}>
            Downloads a single JSON file containing all {products.length} products and {messages.length} contact inquiries currently on this site.
            Product images stay on this server — the file only stores the image links, so keep exporting/importing between sites that share the same uploads.
          </p>
          <button className="btn btn-gold" onClick={onExport} disabled={exporting}>
            <Icon name="upload" /> {exporting ? 'Exporting…' : 'Export Data File'}
          </button>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h3>Import Data</h3>
        </div>
        <div className="admin-panel-body">
          <p style={{ color: 'var(--ink-500)', marginBottom: 16 }}>
            Loads a previously exported file into this site. <b>This replaces every product and message currently here</b> — the existing catalog and inquiries are removed and swapped for what's in the file. This can't be undone.
          </p>
          <label className={`image-drop${importing ? ' uploading' : ''}`} style={{ maxWidth: 260 }}>
            <Icon name="upload" />
            <span>Choose Data File…</span>
            <input ref={fileInputRef} type="file" accept="application/json,.json" onChange={onPickFile} disabled={importing} />
          </label>
        </div>
      </div>

      {pendingFile && (
        <div className="admin-modal-scrim" onClick={() => !importing && setPendingFile(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="ico"><Icon name="alert" /></div>
            <h4>Replace all site data?</h4>
            <p>
              "{pendingFile.name}" will overwrite every product and message currently on this site. Your current data was not
              automatically backed up — export it first if you want to keep a copy. This can't be undone.
            </p>
            <div className="actions">
              <button className="btn btn-line" onClick={() => setPendingFile(null)} disabled={importing}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmImport} disabled={importing}>{importing ? 'Importing…' : 'Replace Data'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
