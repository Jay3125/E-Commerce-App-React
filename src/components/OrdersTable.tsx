import { useMemo, useState } from 'react'
import { orders as allOrders, type Order, type OrderStatus } from '../data/dashboard'
import { Icon } from './Icon'

type OrdersTableProps = {
  search: string
  fullPage?: boolean
  onViewAll?: () => void
}

type OrderFilter = 'All orders' | OrderStatus

export function OrdersTable({ search, fullPage = false, onViewAll }: OrdersTableProps) {
  const [statusFilter, setStatusFilter] = useState<OrderFilter>('All orders')
  const filteredOrders = useMemo(() => allOrders.filter((order) => {
    const matchesStatus = statusFilter === 'All orders' || order.status === statusFilter
    const query = search.trim().toLowerCase()
    return matchesStatus && (!query || `${order.id} ${order.customer} ${order.status}`.toLowerCase().includes(query))
  }), [search, statusFilter])
  const visibleOrders = fullPage ? filteredOrders : filteredOrders.slice(0, 5)

  return (
    <article className={`panel orders-panel ${fullPage ? 'orders-full-page' : ''}`}>
      <div className="panel-heading orders-heading">
        <div><h2>{fullPage ? 'All orders' : 'Recent orders'} <span className="heading-count">{allOrders.length}</span></h2><p>{fullPage ? 'Manage and track your store orders' : `You have ${filteredOrders.length} orders to review`}</p></div>
        {!fullPage && <button className="text-link" onClick={onViewAll}>View all orders <Icon name="arrow" size={14} /></button>}
      </div>
      <div className="table-controls">
        <div className="filter-tabs" role="tablist" aria-label="Filter orders">
          {(['All orders', 'Paid', 'Pending', 'Refunded'] as const).map((filter) => <button key={filter} role="tab" aria-selected={statusFilter === filter} className={statusFilter === filter ? 'selected' : ''} onClick={() => setStatusFilter(filter)}>{filter}</button>)}
        </div>
        <span className="table-results">{filteredOrders.length} results</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>ORDER</th><th>CUSTOMER</th><th>DATE</th><th>ITEMS</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
          <tbody>
            {visibleOrders.map((order: Order) => <tr key={order.id}>
              <td><strong className="order-id">{order.id}</strong></td>
              <td><span className="customer-cell"><span className={`customer-avatar ${order.color}`}>{order.initials}</span><strong>{order.customer}</strong></span></td>
              <td className="muted-cell">{order.date}</td>
              <td className="muted-cell">{order.items} items</td>
              <td><strong>{order.amount}</strong></td>
              <td><span className={`status-badge ${order.status.toLowerCase()}`}><i />{order.status}</span></td>
            </tr>)}
            {visibleOrders.length === 0 && <tr><td className="empty-state" colSpan={6}>No orders match your search.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="table-footer"><span>Showing <strong>{visibleOrders.length ? 1 : 0}–{visibleOrders.length}</strong> of <strong>{filteredOrders.length}</strong> results</span></div>
    </article>
  )
}
