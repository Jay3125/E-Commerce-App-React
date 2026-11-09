import type { ReactNode } from 'react'

type PageHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description: string
  actions?: ReactNode
}

export function PageHeading({ eyebrow = 'STORE OVERVIEW', title, description, actions }: PageHeadingProps) {
  return (
    <section className="page-heading">
      <div>
        <div className="eyebrow"><span className="live-dot" /> {eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="heading-actions">{actions}</div>}
    </section>
  )
}
