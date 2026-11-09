import { useMemo, useState, type FormEvent } from 'react'
import { Icon } from '../components/Icon'
import { PageHeading } from '../components/PageHeading'
import type { Campaign, CampaignStatus } from '../data/marketing'

type MarketingPageProps = {
  search: string
  campaigns: Campaign[]
  onCreateCampaign: (name: string, channel: string, audience: string) => void
  onToggleCampaign: (id: number) => void
}

export function MarketingPage({ search, campaigns, onCreateCampaign, onToggleCampaign }: MarketingPageProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState('')
  const [createdCampaign, setCreatedCampaign] = useState('')
  const visibleCampaigns = useMemo(() => campaigns.filter((campaign) => `${campaign.name} ${campaign.channel} ${campaign.audience} ${campaign.status}`.toLowerCase().includes(search.trim().toLowerCase())), [campaigns, search])

  // Validate and submit the campaign details entered in the create form.
  function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const channel = String(formData.get('channel') ?? '')
    const audience = String(formData.get('audience') ?? '').trim()

    if (!name || !channel || !audience) {
      setError('Enter a campaign name, channel, and audience.')
      return
    }

    if (campaigns.some((campaign) => campaign.name.toLowerCase() === name.toLowerCase())) {
      setError('A campaign with this name already exists.')
      return
    }

    onCreateCampaign(name, channel, audience)
    setCreatedCampaign(name)
    setFormOpen(false)
    setError('')
  }

  function openForm() {
    setError('')
    setFormOpen(true)
  }

  return (
    <>
      <PageHeading
        eyebrow="GROW YOUR STORE"
        title="Marketing"
        description="Build campaigns and bring customers back to your store."
        actions={<button className="button button-primary" onClick={openForm}><Icon name="plus" size={17} /> Create campaign</button>}
      />
      <section className="catalog-summary">
        <div><span>Campaign revenue</span><strong>$8,420</strong></div>
        <div><span>Emails delivered</span><strong>12,486</strong></div>
        <div><span>Average open rate</span><strong>42.8%</strong></div>
        <div><span>Active campaigns</span><strong>{campaigns.filter((campaign) => campaign.status === 'Active').length}</strong></div>
      </section>
      {createdCampaign && <p className="inline-notice" role="status">{createdCampaign} saved as a draft. It is now in your campaign list.</p>}
      <article className="panel data-page-panel">
        <div className="panel-heading"><div><h2>Your campaigns</h2><p>{visibleCampaigns.length} campaigns shown · Drafts are saved until activated.</p></div></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>CAMPAIGN</th><th>AUDIENCE</th><th>REACHED</th><th>CONVERSION</th><th>STATUS</th><th>ACTION</th></tr></thead>
            <tbody>{visibleCampaigns.map((campaign) => {
              const statusTone = { Active: 'paid', Paused: 'pending', Draft: 'refunded' }[campaign.status as CampaignStatus]
              return (
                <tr key={campaign.id}>
                  <td><span className="customer-details"><strong>{campaign.name}</strong><small>{campaign.channel}</small></span></td>
                  <td className="muted-cell">{campaign.audience}</td>
                  <td className="muted-cell">{campaign.reached}</td>
                  <td><strong>{campaign.conversion}</strong></td>
                  <td><span className={`status-badge ${statusTone}`}><i />{campaign.status}</span></td>
                  <td>
                    <button className="button button-secondary small-action" onClick={() => onToggleCampaign(campaign.id)}>
                      {campaign.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                  </td>
                </tr>
              )
            })}
              {visibleCampaigns.length === 0 && <tr><td className="empty-state" colSpan={6}>No campaigns match your search.</td></tr>}
            </tbody>
          </table>
        </div>
      </article>
      {formOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setFormOpen(false)
        }}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="campaign-modal-title">
            <div className="product-modal-heading">
              <div><h2 id="campaign-modal-title">Create a campaign</h2><p>Save a campaign draft to your marketing list.</p></div>
              <button type="button" className="modal-close" aria-label="Close form" onClick={() => setFormOpen(false)}>×</button>
            </div>
            <form noValidate onSubmit={createCampaign}>
              <label className="settings-field"><span>Campaign name</span><input name="name" placeholder="e.g. Holiday launch" autoFocus maxLength={80} required /></label>
              <label className="settings-field"><span>Channel</span><select name="channel" defaultValue="" required><option value="" disabled>Select a channel</option><option>Email · One-time</option><option>Email · Automated</option><option>Social · Paid</option></select></label>
              <label className="settings-field"><span>Audience</span><select name="audience" defaultValue="" required><option value="" disabled>Select an audience</option><option>All subscribers</option><option>Returning customers</option><option>Recent customers</option></select></label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <div className="product-modal-actions">
                <button type="button" className="button button-secondary" onClick={() => setFormOpen(false)}>Cancel</button>
                <button type="submit" className="button button-primary">Save draft</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
