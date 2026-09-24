import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { useProducts } from '../context/ProductsContext';
import { useMessages } from '../context/MessagesContext';

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const { products } = useProducts();
  const { messages, unreadCount } = useMessages();

  const goldCount = products.filter(p => p.finish === 'Gold').length;
  const featuredCount = products.filter(p => p.featured).length;
  const recentMessages = messages.slice(0, 5);

  return (
    <>
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="ico"><Icon name="box" /></div>
          <div><b>{products.length}</b><span>Total Products</span></div>
        </div>
        <div className="admin-stat-card">
          <div className="ico"><Icon name="star" /></div>
          <div><b>{featuredCount}</b><span>Featured on Homepage</span></div>
        </div>
        <div className="admin-stat-card">
          <div className="ico"><Icon name="sparkle" /></div>
          <div><b>{goldCount}</b><span>Gold-Plated TC Variants</span></div>
        </div>
        <div className="admin-stat-card">
          <div className="ico"><Icon name="inbox" /></div>
          <div><b>{unreadCount}</b><span>Unread Messages</span></div>
        </div>
      </div>

      <div className="admin-panel" style={{ marginBottom: 24 }}>
        <div className="admin-panel-head">
          <h3>Recent Inquiries</h3>
          <Link to="/admin/messages" className="btn btn-line btn-sm">View All <Icon name="arrowRight" /></Link>
        </div>
        <div className="admin-panel-body">
          {recentMessages.length === 0 ? (
            <div className="admin-empty">
              <Icon name="inbox" />
              <p>No messages yet — inquiries submitted from the Contact page will show up here.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>From</th><th>Product</th><th>Message</th><th>Received</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {recentMessages.map(m => (
                    <tr key={m.id}>
                      <td><b style={{ color: 'var(--navy-900)', fontFamily: 'var(--font-head)' }}>{m.name}</b><br /><span style={{ fontSize: '.78rem', color: 'var(--ink-400)' }}>{m.email}</span></td>
                      <td>{m.product || '—'}</td>
                      <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{timeAgo(m.createdAt)}</td>
                      <td><span className={`badge-pill ${m.read ? 'badge-read' : 'badge-unread'}`}>{m.read ? 'Read' : 'New'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h3>Quick Actions</h3>
        </div>
        <div className="admin-panel-body" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link to="/admin/products/new" className="btn btn-gold"><Icon name="plus" /> Add New Product</Link>
          <Link to="/admin/products" className="btn btn-line"><Icon name="box" /> Manage Catalog</Link>
          <Link to="/admin/messages" className="btn btn-line"><Icon name="inbox" /> Check Inquiries</Link>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-line"><Icon name="externalLink" /> View Live Site</a>
        </div>
      </div>
    </>
  );
}
