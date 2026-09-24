import { Link } from 'react-router-dom';
import Icon from './Icon';
import Reveal from './Reveal';
import { assetUrl } from '../lib/api';

export default function ProductCard({ product, delay = 0 }) {
  const isGold = product.finish === 'Gold';
  const img = assetUrl(product.images?.[0]) || '';

  return (
    <Reveal as={Link} to={`/products/${product.slug}`} type="fade" delay={delay} className="prod-card">
      <div className="prod-thumb">
        <span className={`prod-tag${isGold ? ' gold' : ''}`}>{isGold ? 'Gold-Plated TC' : 'Stainless Steel'}</span>
        {img && <img src={img} alt={product.name} loading="lazy" />}
        <span className="prod-quick"><Icon name="arrowRight" /></span>
      </div>
      <div className="prod-body">
        <span className="prod-cat">{product.category} Scissors</span>
        <h4>{product.name}</h4>
        <p style={{ fontSize: '.86rem', margin: 0 }}>{product.tagline}</p>
        <div className="prod-specs"><span><b>{product.size}</b></span><span>{product.type}</span></div>
        <div className="prod-foot">
          <span className="prod-link">View Details <Icon name="arrowRight" /></span>
        </div>
      </div>
    </Reveal>
  );
}
