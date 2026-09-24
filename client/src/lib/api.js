const TOKEN_KEY = 'surgnate_admin_token';

export const API_BASE = import.meta.env.VITE_API_URL || '';

export function assetUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/api${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined
  });

  let data = null;
  try { data = await res.json(); } catch { /* no body */ }

  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  // Auth
  login: (username, password) => request('/auth/login', { method: 'POST', body: { username, password } }),
  me: () => request('/auth/me', { auth: true }),

  // Products (public)
  getProducts: () => request('/products'),
  getProduct: (slug) => request(`/products/${slug}`),
  getCategories: () => request('/products/categories'),

  // Products (admin)
  createProduct: (data) => request('/products', { method: 'POST', body: data, auth: true }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE', auth: true }),

  // Messages
  sendMessage: (data) => request('/messages', { method: 'POST', body: data }),
  getMessages: () => request('/messages', { auth: true }),
  markMessageRead: (id, read) => request(`/messages/${id}`, { method: 'PATCH', body: { read }, auth: true }),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE', auth: true }),

  // Upload
  uploadImage: async (file) => {
    const form = new FormData();
    form.append('image', file);
    return request('/upload', { method: 'POST', body: form, auth: true, isForm: true });
  },

  // Data export / import
  exportData: () => request('/data/export', { auth: true }),
  importData: (payload) => request('/data/import', { method: 'POST', body: payload, auth: true })
};
