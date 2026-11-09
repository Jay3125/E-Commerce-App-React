import { MetricCard } from '../components/MetricCard'
import { OrdersTable } from '../components/OrdersTable'
import { PageHeading } from '../components/PageHeading'
import { RevenueChart } from '../components/RevenueChart'
import { SalesChannels } from '../components/SalesChannels'
import { TopProducts } from '../components/TopProducts'
import { exportOrdersCsv, orders, type Product } from '../data/dashboard'
import type { PageName } from '../components/Sidebar'

type OverviewPageProps = {
  search: string
  products: Product[]
  onNavigate: (page: PageName) => void
}

export function OverviewPage({ search, products, onNavigate }: OverviewPageProps) {
  const matchingOrders = orders.filter((order) => `${order.id} ${order.customer} ${order.status}`.toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <>
      <PageHeading
        title={<>Good morning, Jay <span className="wave">✦</span></>}
        description="Here’s what’s happening with your store today."
        actions={<>
          <button className="button button-secondary" onClick={() => exportOrdersCsv(matchingOrders)}>Export report</button>
          <button className="button button-primary" onClick={() => onNavigate('Products')}><span aria-hidden="true">+</span> Add product</button>
        </>}
      />
      <section className="metric-grid" aria-label="Store performance">
        <MetricCard label="Total revenue" value="$48,294" cents=".00" change="12.8%" icon="chart" tone="revenue" sparkline="▁▃▂▅▃▆▄▇▅█" />
        <MetricCard label="Total orders" value="1,248" change="8.2%" icon="shopping" tone="orders" sparkline="▁▂▄▃▅▄▆▅▇█" />
        <MetricCard label="New customers" value="384" change="4.6%" icon="users" tone="customers" sparkline="▁▃▂▄▅▃▆▄▇█" />
        <MetricCard label="Conversion rate" value="3.24" cents="%" change="1.2%" icon="chart" tone="conversion" sparkline="▁▂▃▂▄▃▅▄▆█" />
      </section>
      <section className="analytics-grid">
        <RevenueChart />
        <SalesChannels />
      </section>
      <section className="lower-grid">
        <OrdersTable search={search} onViewAll={() => onNavigate('Orders')} />
        <TopProducts products={products} onViewAll={() => onNavigate('Products')} />
      </section>
    </>
  )
}
