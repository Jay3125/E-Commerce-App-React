import { OrdersTable } from '../components/OrdersTable'
import { PageHeading } from '../components/PageHeading'
import { exportOrdersCsv, orders } from '../data/dashboard'

export function OrdersPage({ search }: { search: string }) {
  return (
    <>
      <PageHeading
        eyebrow="ORDER MANAGEMENT"
        title="Orders"
        description="Review, track, and manage your store orders."
        actions={<button className="button button-secondary" onClick={() => exportOrdersCsv(orders)}>Export orders</button>}
      />
      <OrdersTable search={search} fullPage />
    </>
  )
}
