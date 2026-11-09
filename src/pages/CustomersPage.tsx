import { useMemo } from 'react'
import { PageHeading } from '../components/PageHeading'
import { customers, exportCustomersCsv } from '../data/dashboard'

export function CustomersPage({ search }: { search: string }) {
  const visibleCustomers = useMemo(() => customers.filter((customer) => `${customer.name} ${customer.email}`.toLowerCase().includes(search.trim().toLowerCase())), [search])
  return (
    <>
      <PageHeading eyebrow="RELATIONSHIPS" title="Customers" description="Get to know the people behind your orders." actions={<button className="button button-secondary" onClick={() => exportCustomersCsv(visibleCustomers)}>Export customers</button>} />
      <section className="catalog-summary">
        <div><span>Total customers</span><strong>2,846</strong></div>
        <div><span>Repeat customers</span><strong>38.4%</strong></div>
        <div><span>Average order value</span><strong>$86.40</strong></div>
        <div><span>New this month</span><strong>384</strong></div>
      </section>
      <article className="panel data-page-panel">
        <div className="panel-heading"><div><h2>Customer directory</h2><p>{visibleCustomers.length} customers shown</p></div></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>CUSTOMER</th><th>ORDERS</th><th>TOTAL SPENT</th><th>FIRST ORDER</th></tr></thead>
            <tbody>{visibleCustomers.map((customer) => <tr key={customer.email}>
              <td><span className="customer-cell"><span className={`customer-avatar ${customer.color}`}>{customer.initials}</span><span className="customer-details"><strong>{customer.name}</strong><small>{customer.email}</small></span></span></td>
              <td className="muted-cell">{customer.orders} orders</td>
              <td><strong>{customer.spent}</strong></td>
              <td className="muted-cell">{customer.joined}</td>
            </tr>)}
            {visibleCustomers.length === 0 && <tr><td className="empty-state" colSpan={4}>No customers match your search.</td></tr>}</tbody>
          </table>
        </div>
      </article>
    </>
  )
}
