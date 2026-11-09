export type CampaignStatus = 'Active' | 'Paused' | 'Draft'

export type Campaign = {
  id: number
  name: string
  channel: string
  audience: string
  reached: string
  conversion: string
  status: CampaignStatus
}

export const initialCampaigns: Campaign[] = [
  { id: 1, name: 'Summer welcome series', channel: 'Email · Automated', audience: '1,284 subscribers', reached: '1,102', conversion: '8.4%', status: 'Active' },
  { id: 2, name: 'Weekend favorites', channel: 'Email · One-time', audience: '846 subscribers', reached: '846', conversion: '5.2%', status: 'Active' },
  { id: 3, name: 'Spring launch retargeting', channel: 'Social · Paid', audience: '3,420 people', reached: '3,108', conversion: '3.8%', status: 'Paused' },
]
