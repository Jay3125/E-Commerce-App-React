export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="page-footer">
      <span>© {year} Ecommerce Dashboard</span>
      <span>All systems operational <i className="live-dot" /></span>
    </footer>
  )
}
