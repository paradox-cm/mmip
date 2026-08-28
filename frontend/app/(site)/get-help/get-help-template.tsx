'use client'

import { Suspense, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  LuCheck,
  LuEyeOff,
  LuFeather,
  LuHeartHandshake,
  LuHeartPulse,
  LuPhoneCall,
  LuScale,
  LuSearch,
  LuShield,
} from 'react-icons/lu'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import Breadcrumbs from '@/app/components/shared/breadcrumbs'
import Section from '@/app/components/shared/section'
import {
  groupByCategory,
  HELP_CATEGORY_LABELS,
  type HelpCategory,
  type HelpRegionId,
  isHelpRegionId,
} from '@/lib/get-help'
import {
  HELP_HOTLINES,
  HELP_MISSING_PERSON_RESOURCES,
  HELP_REGIONS,
  HELP_STATEWIDE_SUPPORT,
  HELP_VERIFIED_DATE,
} from '@/lib/get-help-data'
import { cn } from '@/lib/utils'

import EmergencyBar from './_components/emergency-bar'
import HelpServiceCard from './_components/help-service-card'

const DEFAULT_REGION: HelpRegionId = 'south'

const CATEGORY_ICONS: Record<HelpCategory, IconType> = {
  'crisis-hotlines': LuPhoneCall,
  'law-enforcement': LuShield,
  'missing-persons': LuSearch,
  'dv-sa': LuHeartHandshake,
  'native-health': LuHeartPulse,
  'legal-advocacy': LuScale,
}

/**
 * The first-72-hours checklist. Claims are sourced in docs/get-help/SOURCES.md
 * (oag.ca.gov/missing, Gov. Code § 8594.13, the NIWRC MMIW toolkit, and the
 * OVC family guide).
 */
const MISSING_PERSON_STEPS: { title: string; body: string }[] = [
  {
    title: 'Report it now — there is no waiting period',
    body: 'Call police or the sheriff where your relative was last seen. California law requires every department to take a missing person report right away, by phone or in person, no matter where the person disappeared. You never need to wait 24 hours, and you never need proof that something is wrong.',
  },
  {
    title: 'Give a full description',
    body: 'Legal name and nicknames, date of birth, height and weight, tattoos, scars and birthmarks, clothing last worn, vehicle and plate, medical conditions and medications, and their tribal affiliation.',
  },
  {
    title: 'Write everything down',
    body: 'Ask for the report number, plus the name, badge number and phone of the officer taking the report. Keep one notebook with every call you make, who you spoke to, and what they promised.',
  },
  {
    title: 'Ask what systems the case is entered into',
    body: 'Request immediate entry into NCIC, the FBI’s national database — for anyone under 21, federal law requires entry within two hours. Once the report exists, you can also create a case yourself in NamUs, the national missing persons database.',
  },
  {
    title: 'Ask about a Feather Alert',
    body: 'If your relative is Indigenous and may be in danger, ask the investigating agency to request a Feather Alert from the California Highway Patrol. Ask about other alerts too — Amber, Silver, Ashanti — and a be-on-the-lookout broadcast.',
  },
  {
    title: 'Make a flyer and share the work',
    body: 'Gather recent photos and make a flyer. Give friends and family specific jobs: calling hospitals, jails and shelters, posting flyers, watching social media for activity on their accounts.',
  },
  {
    title: 'Preserve evidence',
    body: 'Do not clean their room, car or last known location, and do not delete texts, call logs or social media accounts — investigators may need them. Photograph the area and limit who goes in.',
  },
  {
    title: 'Under 18? Also call NCMEC',
    body: 'After 911, call the National Center for Missing & Exploited Children at 1-800-843-5678 (24 hours). Children’s cases move on a faster, separate path — do not wait.',
  },
]

function GetHelpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [regionId, setRegionId] = useState<HelpRegionId>(() => {
    const fromParams = searchParams.get('region')
    return isHelpRegionId(fromParams) ? fromParams : DEFAULT_REGION
  })

  const region = HELP_REGIONS.find(entry => entry.id === regionId) ?? HELP_REGIONS[0]

  const [citySlug, setCitySlug] = useState<string>(() => {
    const fromParams = searchParams.get('city')
    return region.cities.some(entry => entry.slug === fromParams)
      ? (fromParams as string)
      : region.cities[0].slug
  })

  const city = region.cities.find(entry => entry.slug === citySlug) ?? region.cities[0]
  const cityGroups = groupByCategory(city.services)

  const updateSearchParams = (nextRegion: HelpRegionId, nextCity: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('region', nextRegion)
    params.set('city', nextCity)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const handleRegionChange = (nextRegionId: HelpRegionId) => {
    if (nextRegionId === regionId) return
    const nextRegion = HELP_REGIONS.find(entry => entry.id === nextRegionId)
    if (!nextRegion) return
    setRegionId(nextRegionId)
    setCitySlug(nextRegion.cities[0].slug)
    updateSearchParams(nextRegionId, nextRegion.cities[0].slug)
  }

  const handleCityChange = (nextCitySlug: string) => {
    setCitySlug(nextCitySlug)
    updateSearchParams(regionId, nextCitySlug)
  }

  return (
    <>
      <EmergencyBar />

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <Section className="pb-10 sm:pb-12 lg:pb-14">
        <div className="container flex flex-col gap-6">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Get Help' }]} />
          <div className="flex max-w-[62ch] flex-col gap-4">
            <h1 className="text-h1 text-foreground-heading">Get Help</h1>
            <p className="text-body text-foreground-subtle">
              Whether you are in danger right now, someone you love is missing, or you just need
              someone to talk to — you are not alone. Every number on this page is free to call, and
              the people who answer are there to help.
            </p>
            <p className="flex items-center gap-2 text-sm text-foreground-muted">
              <LuEyeOff aria-hidden="true" className="size-4 shrink-0" />
              Need to leave this site quickly? The eye button in the top bar hides it right away.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 24/7 hotlines ─────────────────────────────────────────── */}
      <Section className="border-t">
        <div className="container flex flex-col gap-8">
          <div className="flex max-w-[62ch] flex-col gap-3">
            <h2 id="hotlines" className="text-h2">
              Call or text now — someone is always there
            </h2>
            <p className="text-body-small text-foreground-subtle">
              Free and confidential, day or night. If a line is busy, try again or call 911.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {HELP_HOTLINES.map(service => (
              <HelpServiceCard key={service.name} service={service} emphasis headingLevel="h3" />
            ))}
          </div>
        </div>
      </Section>

      {/* ── If someone is missing ─────────────────────────────────── */}
      <Section className="border-t">
        <div className="container flex flex-col gap-10">
          <div className="flex max-w-[62ch] flex-col gap-3">
            <h2 id="missing-person" className="text-h2">
              If someone you love is missing
            </h2>
            <p className="text-body-small text-foreground-subtle">
              Act right away — you do not have to wait 24 hours, and you never need proof that
              something is wrong to make a report.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-lg font-semibold text-foreground">The first 72 hours</h3>
            <ol className="grid gap-4 md:grid-cols-2">
              {MISSING_PERSON_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex min-w-0 flex-col gap-2 rounded-xl border bg-background-subtle p-5"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-help text-sm font-bold text-help-foreground"
                    >
                      {index + 1}
                    </span>
                    <span className="font-sans text-base font-semibold text-foreground">
                      {step.title}
                    </span>
                  </span>
                  <p className="text-sm leading-body text-foreground-subtle">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-content-guide-border bg-content-guide p-5 sm:p-6">
            <p className="flex items-center gap-2.5 font-sans text-base font-semibold text-foreground">
              <LuFeather aria-hidden="true" className="size-5 shrink-0 text-help" />
              The Feather Alert is California law
            </p>
            <p className="max-w-[70ch] text-sm leading-body text-foreground-subtle">
              Since 2023, law enforcement can request a Feather Alert — like an Amber Alert — when
              an Indigenous person goes missing under unexplained or suspicious circumstances. If
              the agency taking your report does not mention it, ask them to request one through the
              California Highway Patrol. And if the agency makes no decision within 24 hours, state
              law (Government Code § 8594.13) lets your tribe request the alert from the CHP
              directly.
            </p>
          </div>

          {HELP_MISSING_PERSON_RESOURCES.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex max-w-[62ch] flex-col gap-1.5">
                <h3 className="font-sans text-lg font-semibold text-foreground">
                  Where to report and escalate
                </h3>
                <p className="text-sm text-foreground-subtle">
                  If the response stalls, feels dismissive, or the case crosses jurisdictions, these
                  agencies can act.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {HELP_MISSING_PERSON_RESOURCES.map(service => (
                  <HelpServiceCard key={service.name} service={service} headingLevel="h4" />
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ── Regional directory ────────────────────────────────────── */}
      <Section className="border-t">
        <div className="container flex flex-col gap-8">
          <div className="flex max-w-[62ch] flex-col gap-3">
            <h2 id="near-you" className="text-h2">
              Find help near you
            </h2>
            <p className="text-body-small text-foreground-subtle">
              Choose your region, then the area closest to you. Local police, sheriff, tribal and
              Native-led services, and crisis centers — every number is tap-to-call.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {HELP_REGIONS.map(entry => {
                const selected = entry.id === regionId
                return (
                  <button
                    key={entry.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleRegionChange(entry.id)}
                    className={cn(
                      'flex min-h-[72px] flex-col items-start gap-1 rounded-xl border p-4 text-left outline-none',
                      'transition-[background-color,border-color,transform] duration-fast ease-standard',
                      'active:scale-[0.99] motion-reduce:active:scale-100',
                      selected
                        ? 'border-help bg-card'
                        : 'border-border bg-background hover:border-strong hover:bg-accent',
                    )}
                  >
                    <span className="flex w-full items-center justify-between gap-2 font-sans text-base font-semibold text-foreground">
                      {entry.name}
                      {selected && (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-help text-help-foreground">
                          <LuCheck aria-hidden="true" className="size-3.5" />
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-foreground-subtle">{entry.description}</span>
                  </button>
                )
              })}
            </div>

            <div
              role="group"
              aria-label={`Areas in ${region.name}`}
              className="flex flex-wrap gap-2"
            >
              {region.cities.map(entry => {
                const selected = entry.slug === city.slug
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleCityChange(entry.slug)}
                    className={cn(
                      'rounded-pill border px-3 py-1.5 text-label font-medium outline-none transition-colors duration-fast ease-standard active:scale-[0.98] motion-reduce:active:scale-100',
                      selected
                        ? 'border-brand-emphasis bg-brand-emphasis text-background'
                        : 'border-border bg-background text-foreground-subtle hover:border-strong hover:bg-accent hover:text-foreground active:bg-accent-active',
                    )}
                  >
                    {entry.name}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-8 border-t pt-8">
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 text-foreground-heading">{city.name}</h3>
                <p className="text-sm text-foreground-muted">Serving {city.county}</p>
              </div>

              {cityGroups.length > 0 ? (
                <div className="flex flex-col gap-10">
                  {cityGroups.map(group => {
                    const Icon = CATEGORY_ICONS[group.category]
                    return (
                      <div key={group.category} className="flex flex-col gap-4">
                        <h4 className="flex items-center gap-2.5 font-sans text-base font-semibold text-foreground">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface text-icon">
                            <Icon aria-hidden="true" className="size-4" />
                          </span>
                          {HELP_CATEGORY_LABELS[group.category]}
                        </h4>
                        <div className="grid items-start gap-4 lg:grid-cols-2">
                          {group.services.map(service => (
                            <HelpServiceCard
                              key={service.name}
                              service={service}
                              headingLevel="h5"
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="max-w-[62ch] text-body-small text-foreground-subtle">
                  We are still gathering verified local contacts for this area. The statewide
                  hotlines above are available everywhere in California, and 911 works in every
                  county.
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Statewide support ─────────────────────────────────────── */}
      {HELP_STATEWIDE_SUPPORT.length > 0 && (
        <Section className="border-t">
          <div className="container flex flex-col gap-8">
            <div className="flex max-w-[62ch] flex-col gap-3">
              <h2 id="statewide" className="text-h2">
                More statewide support
              </h2>
              <p className="text-body-small text-foreground-subtle">
                Help with what comes after the first call — victim compensation, legal aid, and
                referrals anywhere in California.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {HELP_STATEWIDE_SUPPORT.map(service => (
                <HelpServiceCard key={service.name} service={service} headingLevel="h3" />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── About these numbers ───────────────────────────────────── */}
      <Section className="border-t bg-background-subtle">
        <div className="container flex max-w-[75ch] flex-col gap-3">
          <h2 className="text-h3">About these numbers</h2>
          <p className="text-body-small text-foreground-subtle">
            Every contact on this page was checked against the organization&apos;s own website in{' '}
            {HELP_VERIFIED_DATE}. If a number has changed or a service is missing, please email{' '}
            <a
              href="mailto:CCVAP@cahuilla-nsn.gov"
              className="font-medium text-link hover:text-link-hover hover:underline"
            >
              CCVAP@cahuilla-nsn.gov
            </a>{' '}
            so we can fix it.
          </p>
          <p className="text-body-small text-foreground-subtle">
            If you cannot get through to a local number, call 911 for emergencies or 988 for crisis
            support. For ongoing, non-urgent support, browse our{' '}
            <Link
              href="/services"
              className="font-medium text-link hover:text-link-hover hover:underline"
            >
              directory of MMIP support services
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  )
}

export default function GetHelpTemplate() {
  return (
    <Suspense
      fallback={
        <div className="container py-16 text-body-small text-foreground-muted">Loading…</div>
      }
    >
      <GetHelpContent />
    </Suspense>
  )
}
