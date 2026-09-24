import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const findBySlug = useCallback(
    (slug) => products.find(p => p.slug === slug),
    [products]
  );

  const related = useCallback((product, count = 4) => {
    if (!product) return [];
    const sameCat = products.filter(p => p.category === product.category && p.id !== product.id);
    const rest = products.filter(p => p.category !== product.category && p.id !== product.id);
    return [...sameCat, ...rest].slice(0, count);
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, categories, loading, error, refresh, findBySlug, related }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
