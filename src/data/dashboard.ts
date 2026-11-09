export type OrderStatus = 'Paid' | 'Pending' | 'Refunded'

export type Order = {
  id: string
  customer: string
  initials: string
  color: string
  date: string
  amount: string
  status: OrderStatus
  items: number
}

export const orders: Order[] = [
  { id: '#ORD-7241', customer: 'Olivia Rhye', initials: 'OR', color: 'lavender', date: 'May 24, 2024', amount: '$248.00', status: 'Paid', items: 3 },
  { id: '#ORD-7240', customer: 'Phoenix Baker', initials: 'PB', color: 'peach', date: 'May 24, 2024', amount: '$129.00', status: 'Pending', items: 2 },
  { id: '#ORD-7239', customer: 'Lana Steiner', initials: 'LS', color: 'mint', date: 'May 23, 2024', amount: '$384.50', status: 'Paid', items: 4 },
  { id: '#ORD-7238', customer: 'Demi Wilkinson', initials: 'DW', color: 'blue', date: 'May 23, 2024', amount: '$86.00', status: 'Refunded', items: 1 },
  { id: '#ORD-7237', customer: 'Candice Wu', initials: 'CW', color: 'rose', date: 'May 22, 2024', amount: '$212.00', status: 'Paid', items: 2 },
]

export type Product = {
  name: string
  category: string
  sales: string
  revenue: string
  emoji: string
  color: string
  stock: number
  status: string
  price: number
}

export type NewProduct = Pick<Product, 'name' | 'category' | 'price' | 'stock'>

export const products: Product[] = [
  { name: 'Cloud Knit Sweater', category: 'Apparel', sales: '324 sold', revenue: '$12,960', emoji: '🧶', color: 'product-lilac', stock: 42, status: 'Active', price: 40 },
  { name: 'Everyday Tote', category: 'Accessories', sales: '281 sold', revenue: '$8,430', emoji: '👜', color: 'product-sand', stock: 18, status: 'Active', price: 30 },
  { name: 'Ceramic Pour-over', category: 'Home & Living', sales: '196 sold', revenue: '$7,840', emoji: '☕', color: 'product-sage', stock: 7, status: 'Low stock', price: 40 },
  { name: 'Sunday Market Candle', category: 'Home & Living', sales: '142 sold', revenue: '$4,260', emoji: '🕯️', color: 'product-sand', stock: 56, status: 'Active', price: 30 },
]

/** Adds default catalog display fields and derives stock status for a new product. */
export function createProduct(product: NewProduct): Product {
  return {
    ...product,
    sales: '0 sold',
    revenue: '$0',
    emoji: '📦',
    color: 'product-lilac',
    status: product.stock <= 10 ? 'Low stock' : 'Active',
  }
}

export const customers = [
  { name: 'Olivia Rhye', email: 'olivia.rhye@example.com', initials: 'OR', color: 'lavender', orders: 12, spent: '$1,284.00', joined: 'May 24, 2024' },
  { name: 'Phoenix Baker', email: 'phoenix.baker@example.com', initials: 'PB', color: 'peach', orders: 8, spent: '$892.00', joined: 'May 20, 2024' },
  { name: 'Lana Steiner', email: 'lana.steiner@example.com', initials: 'LS', color: 'mint', orders: 6, spent: '$748.50', joined: 'May 18, 2024' },
  { name: 'Demi Wilkinson', email: 'demi.wilkinson@example.com', initials: 'DW', color: 'blue', orders: 4, spent: '$436.00', joined: 'May 12, 2024' },
  { name: 'Candice Wu', email: 'candice.wu@example.com', initials: 'CW', color: 'rose', orders: 3, spent: '$312.00', joined: 'May 08, 2024' },
]

export const chartPoints: Record<string, number[]> = {
  '7 days': [28, 35, 29, 48, 41, 58, 52, 70, 62, 78, 71, 88],
  '30 days': [25, 30, 26, 41, 34, 48, 44, 58, 50, 67, 59, 76],
  '90 days': [20, 32, 27, 38, 31, 51, 45, 59, 54, 72, 66, 86],
}

export const chartLabels: Record<string, string[]> = {
  '7 days': ['May 25', 'May 26', 'May 27', 'May 28', 'May 29', 'May 30', 'May 31'],
  '30 days': ['May 01', 'May 06', 'May 11', 'May 16', 'May 21', 'May 26', 'May 31'],
  '90 days': ['Mar 03', 'Mar 18', 'Apr 02', 'Apr 17', 'May 02', 'May 17', 'May 31'],
}

/** Creates and downloads a CSV report for the supplied orders. */
export function exportOrdersCsv(rows: Order[]) {
  const data = [
    ['Order', 'Customer', 'Date', 'Items', 'Amount', 'Status'],
    ...rows.map(({ id, customer, date, items, amount, status }) => [id, customer, date, String(items), amount, status]),
  ]
  const csv = data.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'ecommerce-orders.csv'
  document.body.append(link)
  link.click()
  window.setTimeout(() => {
    URL.revokeObjectURL(url)
    link.remove()
  }, 1000)
}

/** Creates and downloads a CSV report for the supplied customers (all customers by default). */
export function exportCustomersCsv(rows = customers) {
  const data = [
    ['Customer', 'Email', 'Orders', 'Total spent', 'Joined'],
    ...rows.map(({ name, email, orders: orderCount, spent, joined }) => [name, email, String(orderCount), spent, joined]),
  ]
  const csv = data.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'ecommerce-customers.csv'
  document.body.append(link)
  link.click()
  window.setTimeout(() => {
    URL.revokeObjectURL(url)
    link.remove()
  }, 1000)
}
