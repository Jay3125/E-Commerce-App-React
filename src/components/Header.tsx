import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import type { PageName } from './Sidebar'

export type ThemeMode = 'light' | 'dark' | 'system'

type HeaderProps = {
  activePage: PageName
  search: string
  searchable: boolean
  themeMode: ThemeMode
  onThemeModeChange: (mode: ThemeMode) => void
  onSearchChange: (value: string) => void
  onNavigate: (page: PageName) => void
}

const themeOptions: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀' },
  { value: 'dark', label: 'Dark', icon: '☾' },
  { value: 'system', label: 'System', icon: '◐' },
]

export function Header({ activePage, search, searchable, themeMode, onThemeModeChange, onSearchChange, onNavigate }: HeaderProps) {
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [mobileSearchPage, setMobileSearchPage] = useState<PageName | null>(null)
  const [themeOpen, setThemeOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const showMobileSearch = mobileSearchPage === activePage && searchable

  useEffect(() => {
    if (showMobileSearch) searchInput.current?.focus()
  }, [showMobileSearch])

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (!searchable) return
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (window.matchMedia('(max-width: 700px)').matches) setMobileSearchPage(activePage)
        searchInput.current?.focus()
      }
    }

    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [activePage, searchable])

  useEffect(() => {
    function dismissMenus(event: MouseEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setNoticeOpen(false)
        setThemeOpen(false)
        setProfileOpen(false)
      }
    }

    function closeMenus(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setNoticeOpen(false)
        setThemeOpen(false)
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', dismissMenus)
    window.addEventListener('keydown', closeMenus)
    return () => {
      document.removeEventListener('mousedown', dismissMenus)
      window.removeEventListener('keydown', closeMenus)
    }
  }, [])

  return (
    <header className={`topbar ${showMobileSearch ? 'mobile-search-active' : ''}`} ref={headerRef}>
      <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{activePage}</strong></div>
      <div className="topbar-actions">
        {searchable && (
          <label className={`search-box ${showMobileSearch ? 'mobile-search-open' : ''}`} onClick={() => {
            setNoticeOpen(false)
            setThemeOpen(false)
            setProfileOpen(false)
            if (window.matchMedia('(max-width: 700px)').matches) setMobileSearchPage(activePage)
          }}>
            <Icon name="search" size={17} />
            <input ref={searchInput} aria-label="Search current page" placeholder={`Search ${activePage.toLowerCase()}...`} value={search} onChange={(event) => onSearchChange(event.target.value)} />
            <kbd>⌘ K</kbd>
          </label>
        )}
        <div className="header-menu-wrap">
          <button className="header-menu-button theme-button" aria-label="Choose theme" aria-expanded={themeOpen} onClick={() => { setThemeOpen(!themeOpen); setNoticeOpen(false); setProfileOpen(false) }}>
            <span aria-hidden="true">{themeMode === 'dark' ? '☾' : themeMode === 'system' ? '◐' : '☀'}</span>
          </button>
          {themeOpen && (
            <div className="header-popover theme-popover" role="radiogroup" aria-label="Color theme">
              <strong>Appearance</strong>
              {themeOptions.map((option) => (
                <button key={option.value} role="radio" aria-checked={themeMode === option.value} className={`theme-option ${themeMode === option.value ? 'selected' : ''}`} onClick={() => { onThemeModeChange(option.value); setThemeOpen(false) }}>
                  <span aria-hidden="true">{option.icon}</span>{option.label}{themeMode === option.value && <span className="theme-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="header-menu-wrap">
          <button className="icon-button notification-button" aria-label="Notifications" aria-expanded={noticeOpen} onClick={() => { setNoticeOpen(!noticeOpen); setThemeOpen(false); setProfileOpen(false) }}>
            <Icon name="bell" size={19} /><span className="notification-dot" />
          </button>
          {noticeOpen && <div className="header-popover notification-popover"><strong>You’re all caught up</strong><span>New updates will show up here.</span></div>}
        </div>
        <div className="header-menu-wrap">
          <button className="top-profile" aria-label="Open Jay Solanki profile menu" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); setNoticeOpen(false); setThemeOpen(false) }}>JS</button>
          {profileOpen && (
            <div className="header-popover profile-popover">
              <div className="profile-popover-user"><strong>Jay Solanki</strong><span>Store owner</span></div>
              <button onClick={() => { onNavigate('Settings'); setProfileOpen(false) }}>Store settings</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
