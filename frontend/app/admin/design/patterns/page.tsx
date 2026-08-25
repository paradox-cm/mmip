import Breadcrumbs from '@/app/components/shared/breadcrumbs'
import PostCard from '@/app/components/shared/card/post-card'
import SearchCard from '@/app/components/shared/card/search-card'
import ServiceCard from '@/app/components/shared/card/service-card'
import TribeCard from '@/app/components/shared/card/tribe-card'
import ContactPanel from '@/app/components/shared/contact-panel'
import PageActions from '@/app/components/shared/page-actions'
import Section from '@/app/components/shared/section'

import { HeroSearchDemo } from '../_components/component-demos'
import PageHeader, { DocCode, DocSection } from '../_components/page-header'
import Preview from '../_components/preview'
import { fixturePost, fixtureSearchPost, fixtureService, fixtureTribe } from '../_lib/fixtures'

export const metadata = { title: 'Patterns' }

export default function PatternsPage() {
  return (
    <>
      <PageHeader
        title="Patterns"
        description="Composed product UI using the same components as the public site. Card data here is fixture content, not Sanity."
      />

      <DocSection
        title="Search"
        description="Hero search is a landmark form with a visible label, 44px+ controls, and a submit action. On the public home page it also shows typeahead links. Submitting here stays on this page."
      >
        <Preview>
          <HeroSearchDemo />
        </Preview>
      </DocSection>

      <DocSection title="Section rhythm">
        <Preview className="p-0">
          <Section className="px-6">
            <h3 className="font-heading text-2xl">Section</h3>
            <p className="mt-2 max-w-reading text-foreground-subtle">
              Vertical padding scales from <DocCode>py-8</DocCode> to <DocCode>lg:py-20</DocCode>. Use
              it for page bands, not for dense docs.
            </p>
          </Section>
        </Preview>
      </DocSection>

      <DocSection
        title="Resource card"
        description="Same PostCard as the home featured grid. Tints use bg-content-* semantics from CARD_THEME in lib/constants.ts."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Preview label="Vertical" className="overflow-visible">
            <PostCard post={fixturePost} />
          </Preview>
          <Preview label="Horizontal" className="overflow-visible">
            <PostCard post={fixturePost} orientation="horizontal" />
          </Preview>
        </div>
      </DocSection>

      <DocSection title="Tribe card">
        <div className="grid gap-4 md:grid-cols-2">
          <Preview label="Grid" className="overflow-visible">
            <TribeCard tribe={fixtureTribe} />
          </Preview>
          <Preview label="List" className="overflow-visible">
            <TribeCard tribe={fixtureTribe} layout="list" />
          </Preview>
        </div>
      </DocSection>

      <DocSection
        title="Category icons"
        description="Home “Explore by category” uses TaxonomyIcon masks tinted with brand-emphasis — the same token as headings and the logo. CMS artwork without a local icon falls back to .brand-artwork with a dark-only filter."
      >
        <p className="max-w-reading text-foreground-subtle">
          Prefer <DocCode>TaxonomyIcon</DocCode> and <DocCode>LogoMark</DocCode> over raw SVG fills so
          dark mode stays aligned without per-asset filters.
        </p>
      </DocSection>

      <DocSection title="Service card">
        <div className="grid gap-4 md:grid-cols-2">
          <Preview label="Grid" className="overflow-visible">
            <ServiceCard service={fixtureService} />
          </Preview>
          <Preview label="List" className="overflow-visible">
            <ServiceCard service={fixtureService} layout="list" />
          </Preview>
        </div>
      </DocSection>

      <DocSection
        title="Breadcrumbs and page actions"
        description="Deep editorial URLs get a breadcrumb. Guides and articles expose copy, share, and print without an account."
      >
        <div className="grid gap-4">
          <Preview label="Breadcrumb">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/admin/design' },
                { label: 'Guides', href: '/admin/design/patterns' },
                { label: 'Document a report' },
              ]}
            />
          </Preview>
          <Preview label="Copy, share, print">
            <PageActions title="How to document a missing person report" />
          </Preview>
          <Preview label="Contact actions">
            <ContactPanel
              contact={{
                address: '123 Cahuilla Rd',
                city: 'Anza',
                state: 'CA',
                zip: '92539',
                phone: '951-555-0100',
                email: 'help@example.org',
                website: 'https://example.org',
              }}
            />
          </Preview>
        </div>
      </DocSection>

      <DocSection title="Search card">
        <div className="grid gap-4 md:grid-cols-2">
          <Preview label="Vertical" className="overflow-visible">
            <SearchCard post={fixtureSearchPost} />
          </Preview>
          <Preview label="Horizontal" className="overflow-visible">
            <SearchCard post={fixtureSearchPost} orientation="horizontal" />
          </Preview>
        </div>
      </DocSection>
    </>
  )
}
