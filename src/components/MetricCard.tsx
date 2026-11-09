import { Icon, type IconName } from './Icon'

type MetricCardProps = {
  label: string
  value: string
  cents?: string
  change: string
  icon: IconName
  tone: 'revenue' | 'orders' | 'customers' | 'conversion'
  sparkline: string
}

export function MetricCard({ label, value, cents, change, icon, tone, sparkline }: MetricCardProps) {
  const sparkTone = {
    revenue: 'green',
    orders: 'blue',
    customers: 'purple',
    conversion: 'orange',
  }[tone]

  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${tone}-icon`}>{tone === 'revenue' ? <span>$</span> : <Icon name={icon} size={18} />}</span>
        <span className="metric-label">{label}</span>
      </div>
      <div className="metric-value">{value}{cents && <span className="metric-cents">{cents}</span>}</div>
      <div className="metric-foot">
        <span className="growth-pill"><Icon name="arrow" size={13} /> {change}</span>
        <span>vs. last month</span>
        <span className={`mini-sparkline ${sparkTone}`}>{sparkline}</span>
      </div>
    </article>
  )
}
