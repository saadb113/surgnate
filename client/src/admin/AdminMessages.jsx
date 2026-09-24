import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import { useMessages } from '../context/MessagesContext';
import { useToast } from '../context/ToastContext';

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function initials(name) {
  return (name || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
}

export default function AdminMessages() {
  const { messages, loading, markRead, removeMessage } = useMessages();
  const showToast = useToast();
  const [activeId, setActiveId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!activeId && messages.length) setActiveId(messages[0].id);
  }, [messages, activeId]);

  const active = messages.find(m => m.id === activeId);

  async function openMessage(m) {
    setActiveId(m.id);
    if (!m.read) {
      try { await markRead(m.id, true); } catch { /* non-fatal */ }
    }
  }

  async function toggleRead() {
    if (!active) return;
    try {
      await markRead(active.id, !active.read);
    } catch (err) {
      showToast(err.message || 'Could not update message', 'alert');
    }
  }

  async function onDelete() {
    if (!active) return;
    try {
      await removeMessage(active.id);
      showToast('Message deleted', 'trash');
      setActiveId(null);
      setConfirmDelete(false);
    } catch (err) {
      showToast(err.message || 'Could not delete message', 'alert');
    }
  }

  return (
    <>
      <div className="admin-panel-head" style={{ background: 'transparent', border: 'none', padding: '0 0 20px' }}>
        <h1 style={{ fontSize: '1.4rem', margin: 0 }}>Messages</h1>
        <span style={{ fontSize: '.86rem', color: 'var(--ink-400)' }}>{loading ? 'Loading…' : `${messages.length} total inquiries`}</span>
      </div>

      {!loading && messages.length === 0 ? (
        <div className="admin-panel">
          <div className="admin-empty">
            <Icon name="inbox" />
            <p>No inquiries yet. When a visitor submits the Contact form, it will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="msg-layout">
          <div className="msg-list">
            {messages.map(m => (
              <div key={m.id} className={`msg-row${!m.read ? ' unread' : ''}${activeId === m.id ? ' active' : ''}`} onClick={() => openMessage(m)}>
                <div className="avatar">{initials(m.name)}</div>
                <div className="meta">
                  <div className="top-line"><b>{m.name}</b><time>{timeAgo(m.createdAt)}</time></div>
                  <p>{m.product ? `${m.product} — ` : ''}{m.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="msg-detail">
            {!active ? (
              <div className="admin-empty"><Icon name="inbox" /><p>Select a message to view details</p></div>
            ) : (
              <>
                <div className="msg-detail-head">
                  <div>
                    <h3>{active.name}</h3>
                    <span className="sub">{active.org ? `${active.org} · ` : ''}Submitted {timeAgo(active.createdAt)}</span>
                  </div>
                  <span className={`badge-pill ${active.read ? 'badge-read' : 'badge-unread'}`}>{active.read ? 'Read' : 'New'}</span>
                </div>

                <div className="msg-detail-grid">
                  <div className="msg-field"><span>Email</span><b><a href={`mailto:${active.email}`} style={{ color: 'inherit' }}>{active.email}</a></b></div>
                  <div className="msg-field"><span>Phone</span><b><a href={`tel:${active.phone}`} style={{ color: 'inherit' }}>{active.phone}</a></b></div>
                  <div className="msg-field"><span>Country</span><b>{active.country || '—'}</b></div>
                  <div className="msg-field"><span>Product of Interest</span><b>{active.product || '—'}</b></div>
                </div>

                <div className="msg-body">{active.message}</div>

                <div className="msg-detail-actions">
                  <a className="btn btn-gold btn-sm" href={`mailto:${active.email}`}><Icon name="mail" /> Reply by Email</a>
                  <a className="btn btn-line btn-sm" href={`https://wa.me/${active.phone.replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> WhatsApp</a>
                  <button className="btn btn-line btn-sm" onClick={toggleRead}><Icon name={active.read ? 'inbox' : 'check'} /> Mark as {active.read ? 'Unread' : 'Read'}</button>
                  <button className="btn btn-line btn-sm" onClick={() => setConfirmDelete(true)} style={{ marginLeft: 'auto', color: '#c0392b', borderColor: 'rgba(192,57,43,.3)' }}>
                    <Icon name="trash" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="admin-modal-scrim" onClick={() => setConfirmDelete(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="ico"><Icon name="trash" /></div>
            <h4>Delete this message?</h4>
            <p>This inquiry from {active?.name} will be permanently removed.</p>
            <div className="actions">
              <button className="btn btn-line" onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={onDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
