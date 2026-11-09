import { MetricCard } from '../components/MetricCard'
import { PageHeading } from '../components/PageHeading'
import { RevenueChart } from '../components/RevenueChart'
import { SalesChannels } from '../components/SalesChannels'

export function AnalyticsPage() {
  return (
    <>
      <PageHeading eyebrow="STORE INSIGHTS" title="Analytics" description="Understand your sales and make data-informed decisions." />
      <section className="metric-grid" aria-label="Analytics summary">
        <MetricCard label="Total revenue" value="$48,294" cents=".00" change="12.8%" icon="chart" tone="revenue" sparkline="▁▃▂▅▃▆▄▇▅█" />
        <MetricCard label="Total orders" value="1,248" change="8.2%" icon="shopping" tone="orders" sparkline="▁▂▄▃▅▄▆▅▇█" />
        <MetricCard label="New customers" value="384" change="4.6%" icon="users" tone="customers" sparkline="▁▃▂▄▅▃▆▄▇█" />
        <MetricCard label="Conversion rate" value="3.24" cents="%" change="1.2%" icon="chart" tone="conversion" sparkline="▁▂▃▂▄▃▅▄▆█" />
      </section>
      <section className="analytics-grid"><RevenueChart /><SalesChannels /></section>
      <article className="panel insight-panel"><h2>Store insight</h2><p>Your online store is your strongest channel, driving 58% of sales. Revenue is up 12.8% compared to the previous month.</p></article>
    </>
  )
}
