import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/meta';

export default function NotFound() {
  usePageMeta({
    title: 'Page Not Found — Surgnate',
    description: 'The page you were looking for does not exist. Browse the Surgnate catalog of surgical scissors, forceps and needle holders.',
    path: '/404',
    noindex: true
  });

  return (
    <section className="section-pad">
      <div className="wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{ marginBottom: 16 }}>404</h1>
        <p className="lede" style={{ margin: '0 auto 28px' }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-navy">Back to Home</Link>
      </div>
    </section>
  );
}
