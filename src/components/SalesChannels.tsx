import { useState } from 'react'
import { Icon } from './Icon'

export function SalesChannels() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article className="panel channel-panel">
      <div className="panel-heading"><div><h2>Sales by channel</h2><p>Where your customers shop</p></div></div>
      <div className="channel-total"><strong>$48,294</strong><span>Total sales</span></div>
      <div className="channel-bar"><span className="channel-web" /><span className="channel-social" /><span className="channel-market" /><span className="channel-other" /></div>
      <div className="channel-legend">
        <div><i className="legend-dot web-dot" /><span>Online store</span><strong>58%</strong></div>
        <div><i className="legend-dot social-dot" /><span>Social media</span><strong>24%</strong></div>
        <div><i className="legend-dot market-dot" /><span>Marketplace</span><strong>12%</strong></div>
        <div><i className="legend-dot other-dot" /><span>Other</span><strong>6%</strong></div>
      </div>
      <button className="text-link" aria-expanded={showDetails} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide channel details' : 'View channel report'} <Icon name="arrow" size={14} /></button>
      {showDetails && <div className="channel-details"><strong>Online store leads this month</strong><span>Online store and social media account for 82% of your sales.</span></div>}
    </article>
  )
}
