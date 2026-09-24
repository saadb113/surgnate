import { Link } from 'react-router-dom';

export default function NotFound() {
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
