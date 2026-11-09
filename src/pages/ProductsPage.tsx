import { useMemo, useState, type FormEvent } from 'react'
import { Icon } from '../components/Icon'
import { PageHeading } from '../components/PageHeading'
import type { NewProduct, Product } from '../data/dashboard'

type ProductsPageProps = {
  search: string
  products: Product[]
  onAddProduct: (product: NewProduct) => void
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function ProductsPage({ search, products, onAddProduct }: ProductsPageProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [addedProduct, setAddedProduct] = useState('')
  const [formError, setFormError] = useState('')
  const [priceInput, setPriceInput] = useState('')
  const [stockInput, setStockInput] = useState('')
  const filteredProducts = useMemo(() => products.filter((product) => `${product.name} ${product.category} ${product.status}`.toLowerCase().includes(search.trim().toLowerCase())), [products, search])

  // Validate manually typed values before adding a product to the shared catalog.
  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const category = String(formData.get('category') ?? '').trim()
    const price = Number(priceInput)
    const stock = Number(stockInput)

    if (!/^\d+(?:\.\d{1,2})?$/.test(priceInput) || !Number.isFinite(price) || price <= 0) {
      setFormError('Enter a price greater than 0 with up to 2 decimal places.')
      return
    }

    if (!/^\d+$/.test(stockInput) || !Number.isSafeInteger(stock) || stock < 0) {
      setFormError('Enter a whole number for stock quantity (0 or more).')
      return
    }

    if (!name || !category) {
      setFormError('Enter a product name and select a category.')
      return
    }

    if (products.some((product) => product.name.toLowerCase() === name.toLowerCase())) {
      setFormError('A product with this name already exists.')
      return
    }

    onAddProduct({ name, category, price, stock })
    setAddedProduct(name)
    setFormError('')
    setPriceInput('')
    setStockInput('')
    setFormOpen(false)
  }

  function openProductForm() {
    setAddedProduct('')
    setFormError('')
    setPriceInput('')
    setStockInput('')
    setFormOpen(true)
  }

  return (
    <>
      <PageHeading eyebrow="CATALOG" title="Products" description="Manage your catalog, inventory, and product listings." actions={<button className="button button-primary" onClick={openProductForm}><Icon name="plus" size={17} /> Add product</button>} />
      <section className="catalog-summary">
        <div><span>Total products</span><strong>{products.length}</strong></div>
        <div><span>Active products</span><strong>{products.filter((product) => product.status === 'Active').length}</strong></div>
        <div><span>Low stock</span><strong>{products.filter((product) => product.status === 'Low stock').length}</strong></div>
        <div><span>Inventory value</span><strong>{currency.format(products.reduce((total, product) => total + product.price * product.stock, 0))}</strong></div>
      </section>
      {addedProduct && <p className="inline-notice" role="status">{addedProduct} was added to your catalog.</p>}
      <article className="panel data-page-panel">
        <div className="panel-heading"><div><h2>All products</h2><p>{filteredProducts.length} products in your catalog</p></div></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>INVENTORY</th><th>STATUS</th><th>REVENUE</th></tr></thead>
            <tbody>{filteredProducts.map((product) => <tr key={product.name}>
              <td><span className="customer-cell"><span className={`product-image table-product-image ${product.color}`}>{product.emoji}</span><strong>{product.name}</strong></span></td>
              <td className="muted-cell">{product.category}</td>
              <td><strong>{currency.format(product.price)}</strong></td>
              <td className="muted-cell">{product.stock} in stock</td>
              <td><span className={`status-badge ${product.status === 'Active' ? 'paid' : 'pending'}`}><i />{product.status}</span></td>
              <td><strong>{product.revenue}</strong></td>
            </tr>)}
            {filteredProducts.length === 0 && <tr><td className="empty-state" colSpan={6}>No products match your search.</td></tr>}</tbody>
          </table>
        </div>
      </article>
      {formOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setFormOpen(false)
        }}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
            <div className="product-modal-heading">
              <div><h2 id="product-modal-title">Add a product</h2><p>Enter the product details to add it to your catalog.</p></div>
              <button type="button" className="modal-close" aria-label="Close form" onClick={() => setFormOpen(false)}>×</button>
            </div>
            <form noValidate onSubmit={addProduct}>
              <label className="settings-field"><span>Product name</span><input name="name" placeholder="e.g. Linen Market Bag" autoFocus required maxLength={80} /></label>
              <label className="settings-field"><span>Category</span><select name="category" defaultValue="" required><option value="" disabled>Select a category</option><option>Apparel</option><option>Accessories</option><option>Home &amp; Living</option><option>Beauty</option><option>Uncategorized</option></select></label>
              <div className="product-form-row">
                {/* Text fields accept direct typing; inputMode only chooses the mobile keyboard. */}
                <label className="settings-field"><span>Price (USD)</span><input name="price" type="text" inputMode="decimal" autoComplete="off" placeholder="0.00" value={priceInput} onChange={(event) => { setPriceInput(event.target.value); setFormError('') }} aria-describedby="price-help" required /></label>
                <label className="settings-field"><span>Stock quantity</span><input name="stock" type="text" inputMode="numeric" autoComplete="off" placeholder="0" value={stockInput} onChange={(event) => { setStockInput(event.target.value); setFormError('') }} aria-describedby="stock-help" required /></label>
              </div>
              <span className="visually-hidden" id="price-help">Type a price using digits and an optional decimal point.</span>
              <span className="visually-hidden" id="stock-help">Type a whole number of items in stock.</span>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <div className="product-modal-actions"><button type="button" className="button button-secondary" onClick={() => setFormOpen(false)}>Cancel</button><button type="submit" className="button button-primary">Add to catalog</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
