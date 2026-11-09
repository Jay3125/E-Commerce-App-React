import { useMemo, useState } from 'react'
import { Icon } from '../components/Icon'
import { PageHeading } from '../components/PageHeading'

const guides = [
  { title: 'How do I manage and fulfill orders?', category: 'Orders', text: 'Learn how to review orders, update their status, and keep customers informed.' },
  { title: 'How can I add a product to my store?', category: 'Products', text: 'Create a product listing, add inventory, and organize products into collections.' },
  { title: 'Where can I see my store analytics?', category: 'Analytics', text: 'Explore sales, customer, and channel reporting for your store.' },
  { title: 'How do I set up a marketing campaign?', category: 'Marketing', text: 'Reach your customers with automated and one-time campaigns.' },
]

export function HelpCenterPage({ search }: { search: string }) {
  const [query, setQuery] = useState('')
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null)
  const term = query || search
  const visibleGuides = useMemo(() => guides.filter((guide) => `${guide.title} ${guide.category} ${guide.text}`.toLowerCase().includes(term.trim().toLowerCase())), [term])
  return (
    <>
      <PageHeading eyebrow="WE’RE HERE TO HELP" title="Help center" description="Find answers and get back to running your store." />
      <section className="help-search">
        <Icon name="search" size={20} />
        <input aria-label="Search help articles" placeholder="Search guides and help articles..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </section>
      <section className="guide-grid">
        {visibleGuides.map((guide) => {
          const isExpanded = expandedGuide === guide.title
          return (
            <article className="panel guide-card" key={guide.title}>
              <span>{guide.category}</span>
              <h2>{guide.title}</h2>
              <p>{guide.text}</p>
              {isExpanded && <p className="guide-details">Open the matching section from the sidebar, review the available details, and use the page controls to manage this part of your store.</p>}
              <button className="text-link" aria-expanded={isExpanded} onClick={() => setExpandedGuide(isExpanded ? null : guide.title)}>{isExpanded ? 'Close guide' : 'Read guide'} <Icon name="arrow" size={14} /></button>
            </article>
          )
        })}
        {visibleGuides.length === 0 && <p className="empty-guides">No help articles match your search.</p>}
      </section>
      <article className="panel support-card"><div><h2>Still need a hand?</h2><p>Our support team is happy to help with anything you need.</p></div><a className="button button-primary" href="mailto:support@ecommerce.com">Contact support</a></article>
    </>
  )
}
