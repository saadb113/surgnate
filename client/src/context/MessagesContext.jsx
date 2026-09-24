import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await api.getMessages();
      setMessages(data);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { if (isAuthenticated) refresh(); }, [isAuthenticated, refresh]);

  const unreadCount = messages.filter(m => !m.read).length;

  async function markRead(id, read) {
    const updated = await api.markMessageRead(id, read);
    setMessages(list => list.map(m => m.id === id ? updated : m));
  }

  async function removeMessage(id) {
    await api.deleteMessage(id);
    setMessages(list => list.filter(m => m.id !== id));
  }

  return (
    <MessagesContext.Provider value={{ messages, loading, refresh, unreadCount, markRead, removeMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error('useMessages must be used within MessagesProvider');
  return ctx;
}
