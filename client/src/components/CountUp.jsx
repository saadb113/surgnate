import { useEffect, useRef, useState } from 'react';

export default function CountUp({ end, suffix = '', duration = 1600, decimals = 0, className }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setValue(end); return; }

    function start_() {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(end * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setValue(end);
      }
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          start_();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);

    // Safety net so the counter never stays stuck at 0 in an edge case.
    const fallback = setTimeout(start_, 2200);

    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [end, duration]);

  return (
    <b ref={ref} className={`count-up${className ? ' ' + className : ''}`}>
      {decimals ? value.toFixed(decimals) : Math.round(value)}{suffix}
    </b>
  );
}
