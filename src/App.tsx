import { useEffect, useState } from 'react'
import './App.css'
import { createProduct, products as initialProducts, type NewProduct } from './data/dashboard'
import { initialCampaigns } from './data/marketing'
import { Sidebar, type PageName } from './components/Sidebar'
import { Footer } from './components/Footer'
import { Header, type ThemeMode } from './components/Header'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { CustomersPage } from './pages/CustomersPage'
import { HelpCenterPage } from './pages/HelpCenterPage'
import { MarketingPage } from './pages/MarketingPage'
import { OrdersPage } from './pages/OrdersPage'
import { OverviewPage } from './pages/OverviewPage'
import { ProductsPage } from './pages/ProductsPage'
import { SettingsPage, type StoreSettings } from './pages/SettingsPage'

const initialSettings: StoreSettings = {
  storeName: 'Ecommerce Goods',
  email: 'jay@ecommerce.com',
  currency: 'USD — US Dollar',
}

function App() {
  const [activePage, setActivePage] = useState<PageName>('Overview')
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState(initialProducts)
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [settings, setSettings] = useState(initialSettings)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedTheme = window.localStorage.getItem('ecommerce-theme')
    return savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system' ? savedTheme : 'system'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const theme = themeMode === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : themeMode
      document.documentElement.dataset.theme = theme
      document.documentElement.style.colorScheme = theme
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    window.localStorage.setItem('ecommerce-theme', themeMode)

    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [themeMode])

  function navigateTo(page: PageName) {
    setActivePage(page)
    setSearch('')
  }

  function addProduct(product: NewProduct) {
    setProducts((current) => [createProduct(product), ...current])
  }

  // Keep created campaigns in the app shell so they remain when navigating between pages.
  function addCampaign(name: string, channel: string, audience: string) {
    setCampaigns((current) => [{
      id: current.reduce((highestId, campaign) => Math.max(highestId, campaign.id), 0) + 1,
      name,
      channel,
      audience,
      reached: '—',
      conversion: '—',
      status: 'Draft',
    }, ...current])
  }

  // Toggle only active and paused campaigns; drafts stay inactive until configured.
  function toggleCampaign(id: number) {
    setCampaigns((current) => current.map((campaign) => campaign.id === id
      ? { ...campaign, status: campaign.status === 'Active' ? 'Paused' : 'Active' }
      : campaign))
  }

  function updateSettings(nextSettings: StoreSettings) {
    setSettings(nextSettings)
  }

  function renderPage() {
    switch (activePage) {
      case 'Orders':
        return <OrdersPage search={search} />
      case 'Products':
        return <ProductsPage search={search} products={products} onAddProduct={addProduct} />
      case 'Customers':
        return <CustomersPage search={search} />
      case 'Analytics':
        return <AnalyticsPage />
      case 'Marketing':
        return <MarketingPage search={search} campaigns={campaigns} onCreateCampaign={addCampaign} onToggleCampaign={toggleCampaign} />
      case 'Help center':
        return <HelpCenterPage search={search} />
      case 'Settings':
        return <SettingsPage settings={settings} onSave={updateSettings} />
      case 'Overview':
        return <OverviewPage search={search} products={products} onNavigate={navigateTo} />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={navigateTo} />
      <main className="main-content">
        <Header activePage={activePage} search={search} searchable={activePage !== 'Analytics' && activePage !== 'Settings'} themeMode={themeMode} onThemeModeChange={setThemeMode} onSearchChange={setSearch} onNavigate={navigateTo} />
        <div className="page-content">
          {renderPage()}
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
