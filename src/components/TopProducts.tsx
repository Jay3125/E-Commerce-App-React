import type { Product } from '../data/dashboard'
import { Icon } from './Icon'

export function TopProducts({ products, onViewAll }: { products: Product[]; onViewAll?: () => void }) {
  return (
    <article className="panel products-panel">
      <div className="panel-heading"><div><h2>Top products</h2><p>Your best performers this month</p></div></div>
      <div className="product-list">
        {products.slice(0, 3).map((product, index) => <div className="product-row" key={product.name}>
          <div className={`product-image ${product.color}`}><span>{product.emoji}</span><small>0{index + 1}</small></div>
          <div className="product-info"><strong>{product.name}</strong><span>{product.category} · {product.sales}</span></div>
          <strong className="product-revenue">{product.revenue}</strong>
        </div>)}
      </div>
      <button className="products-link" onClick={onViewAll}>View all products <Icon name="external" size={14} /></button>
    </article>
  )
}
