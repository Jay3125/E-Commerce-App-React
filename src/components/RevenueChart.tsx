import { useState } from 'react'
import { chartLabels, chartPoints } from '../data/dashboard'
import { Icon } from './Icon'

export function RevenueChart() {
  const [range, setRange] = useState('30 days')
  const points = chartPoints[range]
  const chartLine = points.map((point, index) => `${index * 70},${180 - point * 1.65}`).join(' ')
  const chartArea = `0,180 ${chartLine} 770,180`

  return (
    <article className="panel revenue-panel">
      <div className="panel-heading">
        <div><h2>Revenue over time</h2><p>Track how your store is performing</p></div>
        <label className="select-wrap"><Icon name="calendar" size={15} /><select aria-label="Revenue date range" value={range} onChange={(event) => setRange(event.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option></select><Icon name="chevron" size={14} /></label>
      </div>
      <div className="chart-summary"><strong>$48,294.00</strong><span className="growth-pill"><Icon name="arrow" size={13} /> 12.8%</span><span className="summary-caption">compared to previous period</span></div>
      <div className="chart-wrap">
        <div className="chart-y-labels"><span>$15k</span><span>$10k</span><span>$5k</span><span>$0</span></div>
        <svg className="revenue-chart" viewBox="0 0 770 190" preserveAspectRatio="none" role="img" aria-label={`Revenue chart for the last ${range}`}>
          <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#278b69" stopOpacity=".17" /><stop offset="100%" stopColor="#278b69" stopOpacity="0" /></linearGradient></defs>
          {[15, 65, 115, 165].map((y) => <line key={y} x1="0" x2="770" y1={y} y2={y} className="chart-gridline" />)}
          <polygon points={chartArea} fill="url(#chartFill)" />
          <polyline points={chartLine} fill="none" stroke="#278b69" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <circle cx="770" cy={180 - points[points.length - 1] * 1.65} r="5" fill="#278b69" stroke="white" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="chart-x-labels">{chartLabels[range].map((label) => <span key={label}>{label}</span>)}</div>
    </article>
  )
}
