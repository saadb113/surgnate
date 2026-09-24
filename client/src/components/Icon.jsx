import { ICONS } from '../lib/icons-data';

export default function Icon({ name, className, style }) {
  const svg = ICONS[name];
  if (!svg) return null;
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
