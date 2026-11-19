import { useCallback, useEffect, useRef } from 'react';
import Icon from './Icon';

/**
 * Full-screen image viewer with previous / next navigation.
 * Keyboard: ← → to move, Esc to close. Touch: swipe to move.
 */
export default function Lightbox({ section, images, index, onClose, onNavigate }) {
  const total = images.length;
  const touchStart = useRef(null);

  const go = useCallback(
    (dir) => onNavigate((index + dir + total) % total),
    [index, total, onNavigate]
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    }
    window.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  // Warm the neighbouring images so arrow presses feel instant.
  useEffect(() => {
    [index + 1, index - 1].forEach(offset => {
      const i = (offset + total) % total;
      const preload = new Image();
      preload.src = images[i];
    });
  }, [images, index, total]);

  function onTouchStart(e) {
    touchStart.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    if (touchStart.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 55) return;
    go(delta < 0 ? 1 : -1);
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${section.name} gallery`}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox-bar" onClick={e => e.stopPropagation()}>
        <div className="lightbox-heading">
          <span className="lightbox-eyebrow">{section.name}</span>
          <span className="lightbox-count">{index + 1} / {total}</span>
        </div>
        <button type="button" className="lightbox-btn" onClick={onClose} aria-label="Close gallery">
          <Icon name="close" />
        </button>
      </div>

      <button
        type="button"
        className="lightbox-nav lightbox-prev"
        onClick={e => { e.stopPropagation(); go(-1); }}
        aria-label="Previous image"
      >
        <Icon name="arrowLeft" />
      </button>

      <figure className="lightbox-stage" onClick={e => e.stopPropagation()}>
        <img src={images[index]} alt={`${section.name} — image ${index + 1} of ${total}`} />
        <figcaption>
          <b>{section.name}</b>
          <span>{section.tagline}</span>
        </figcaption>
      </figure>

      <button
        type="button"
        className="lightbox-nav lightbox-next"
        onClick={e => { e.stopPropagation(); go(1); }}
        aria-label="Next image"
      >
        <Icon name="arrowRight" />
      </button>
    </div>
  );
}
