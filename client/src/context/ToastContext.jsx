import { createContext, useCallback, useContext, useRef, useState } from 'react';
import Icon from '../components/Icon';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // { message, icon, show }
  const timerRef = useRef(null);

  const showToast = useCallback((message, icon = 'check') => {
    clearTimeout(timerRef.current);
    setToast({ message, icon, show: true });
    timerRef.current = setTimeout(() => {
      setToast(t => t ? { ...t, show: false } : t);
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={`toast${toast?.show ? ' show' : ''}`}>
        <Icon name={toast?.icon || 'check'} />
        <span className="toast-msg">{toast?.message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
