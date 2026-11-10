import { Icon, type IconName } from './Icon'

export type PageName = 'Overview' | 'Orders' | 'Products' | 'Customers' | 'Analytics' | 'Marketing' | 'Help center' | 'Settings'

const workspaceItems: { label: PageName; icon: IconName; count?: string }[] = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Orders', icon: 'shopping', count: '12' },
  { label: 'Products', icon: 'box' },
  { label: 'Customers', icon: 'users' },
  { label: 'Analytics', icon: 'chart' },
  { label: 'Marketing', icon: 'megaphone' },
]

type SidebarProps = {
  activePage: PageName
  storeName: string
  storeEmail: string
  onNavigate: (page: PageName) => void
}

export function Sidebar({ activePage, storeName, storeEmail, onNavigate }: SidebarProps) {
  function navButton(label: PageName, icon: IconName, count?: string) {
    return (
      <button key={label} className={`nav-item ${activePage === label ? 'active' : ''}`} aria-current={activePage === label ? 'page' : undefined} onClick={() => onNavigate(label)}>
        <Icon name={icon} size={19} /><span>{label}</span>
        {count && <span className="nav-count">{count}</span>}
      </button>
    )
  }

  return (
    <aside className="sidebar">
      <button className="brand" aria-label="Go to overview" onClick={() => onNavigate('Overview')}>
        <span className="brand-mark"><Icon name="shopping" size={17} /></span>
        <span className="brand-name">Ecommerce<span>.</span></span>
      </button>
      <div className="store-switcher">
        <div className="store-avatar">{storeName.charAt(0).toUpperCase()}</div>
        <div className="store-copy"><strong>{storeName}</strong><span>{storeEmail}</span></div>
      </div>
      <div className="side-label">WORKSPACE</div>
      <nav className="main-nav" aria-label="Main navigation">
        {workspaceItems.map(({ label, icon, count }) => navButton(label, icon, count))}
      </nav>
      <div className="side-bottom">
        <div className="side-label">SUPPORT</div>
        {navButton('Help center', 'help')}
        {navButton('Settings', 'settings')}
        <div className="sidebar-profile">
          <div className="profile-pic">JS</div>
          <div className="profile-copy"><strong>Jay Solanki</strong><span>Store owner</span></div>
        </div>
      </div>
    </aside>
  )
}
