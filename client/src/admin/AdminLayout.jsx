import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessagesContext';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/products', label: 'Products', icon: 'box' },
  { to: '/admin/messages', label: 'Messages', icon: 'inbox', badge: true },
  { to: '/admin/data', label: 'Backup & Restore', icon: 'upload' }
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { unreadCount: unread } = useMessages();

  function onLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  const initial = (user?.username || 'A').charAt(0).toUpperCase();

  return (
    <div className="admin-shell">
      {sidebarOpen && <div className="admin-sidebar-scrim" onClick={() => setSidebarOpen(false)} />}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="brand">
          <svg className="logo-mark" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="13" fill="#0e3760" />
            <path d="M24 12c6.5 0 10.5 4 10.5 4s-2 6.5-10.5 6.5S13.5 16 13.5 16 17.5 12 24 12Z" stroke="#c6a15b" strokeWidth="2" />
            <path d="M13.5 32s2-6.5 10.5-6.5S34.5 32 34.5 32s-4 4-10.5 4S13.5 32 13.5 32Z" stroke="#c6a15b" strokeWidth="2" />
          </svg>
          <div>
            <b>SURGNATE</b>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon name={item.icon} />
              {item.label}
              {item.badge && unread > 0 && <span className="badge">{unread}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="foot">
          <a href="/" target="_blank" rel="noreferrer" className="view-site" style={{ display: 'flex' }}>
            <Icon name="externalLink" /> View Live Site
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>
            <Icon name="logout" /> Sign Out
          </a>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <button className="admin-menu-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
            <Icon name="menu" />
          </button>
          <h1>Admin Panel</h1>
          <div className="who">
            <span>{user?.username}</span>
            <div className="avatar">{initial}</div>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
