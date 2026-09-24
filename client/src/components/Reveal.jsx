import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper — mirrors the [data-reveal] behaviour from the
 * original static site. type: 'fade' | 'left' | 'right' | 'scale' | undefined (default translateY)
 */
export default function Reveal({ as: Tag = 'div', type, delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);

    // Safety net: content must never stay permanently invisible — if for any
    // reason (fast flick-scroll, throttled background tab, etc.) the observer
    // never fires, force it in after a short delay.
    const fallback = setTimeout(() => setInView(true), 2200);

    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={type || 'up'}
      className={`${className}${inView ? ' in' : ''}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
