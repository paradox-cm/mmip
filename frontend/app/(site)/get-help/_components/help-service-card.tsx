import {
  LuClock,
  LuExternalLink,
  LuGlobe,
  LuMapPin,
  LuMessageSquareText,
  LuPhone,
} from 'react-icons/lu'

import { Badge } from '@/app/components/ui/badge'
import { type HelpService, mapsHref, telHref } from '@/lib/get-help'
import { cn, formatWebsiteUrl } from '@/lib/utils'

type Props = {
  service: HelpService
  /** Larger dial targets for the 24/7 hotline wall. */
  emphasis?: boolean
  /** Keeps the document outline honest wherever the card is nested. */
  headingLevel?: 'h3' | 'h4' | 'h5'
  className?: string
}

/**
 * One directory entry: who they are, tap-to-call numbers, and an address
 * that opens in Google Maps.
 */
export default function HelpServiceCard({
  service,
  emphasis = false,
  headingLevel = 'h3',
  className,
}: Props) {
  const Heading = headingLevel
  const showHours = Boolean(service.hours) && service.hours !== '24/7'

  return (
    <article className={cn('flex min-w-0 flex-col gap-3 rounded-xl border bg-card p-5', className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
        <Heading className="min-w-0 font-sans text-base font-semibold leading-snug text-foreground">
          {service.name}
        </Heading>
        {(service.native || service.hours === '24/7') && (
          <span className="flex shrink-0 flex-wrap gap-1.5">
            {service.hours === '24/7' && (
              <Badge variant="outline">
                <LuClock aria-hidden="true" />
                24/7
              </Badge>
            )}
            {service.native && (
              <Badge variant="service" appearance="soft">
                Native-led
              </Badge>
            )}
          </span>
        )}
      </div>

      <p className="text-sm leading-body text-foreground-subtle">{service.description}</p>

      <div className="mt-auto flex flex-col pt-1">
        {service.phones.map(phone => (
          <a
            key={phone.number}
            href={telHref(phone.number)}
            aria-label={`Call ${service.name}, ${phone.label}: ${phone.number}`}
            className="flex min-h-11 w-fit max-w-full items-center gap-2 rounded-md text-foreground outline-none hover:underline"
          >
            <LuPhone aria-hidden="true" className="size-4 shrink-0 text-help" />
            <span className={cn('whitespace-nowrap font-semibold', emphasis && 'text-lg')}>
              {phone.number}
            </span>
            <span className="min-w-0 text-sm text-foreground-muted">· {phone.label}</span>
          </a>
        ))}

        {service.text && (
          <p className="flex min-h-11 w-fit items-center gap-2 text-sm text-foreground">
            <LuMessageSquareText aria-hidden="true" className="size-4 shrink-0 text-help" />
            {service.text}
          </p>
        )}

        {showHours && (
          <p className="flex min-h-11 w-fit items-center gap-2 text-sm text-foreground-subtle">
            <LuClock aria-hidden="true" className="size-4 shrink-0 text-foreground-muted" />
            {service.hours}
          </p>
        )}

        {service.address && (
          <a
            href={mapsHref(service.name, service.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 w-fit max-w-full items-center gap-2 rounded-md py-1 text-sm text-foreground-subtle outline-none hover:text-foreground hover:underline"
          >
            <LuMapPin aria-hidden="true" className="size-4 shrink-0 text-foreground-muted" />
            <span className="min-w-0">
              {service.address}
              <LuExternalLink
                aria-hidden="true"
                className="mb-0.5 ml-1.5 inline size-3.5 text-foreground-muted"
              />
              <span className="sr-only"> (opens in Google Maps)</span>
            </span>
          </a>
        )}

        {service.website && (
          <a
            href={service.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 w-fit max-w-full items-center gap-2 rounded-md text-sm text-link outline-none hover:text-link-hover hover:underline"
          >
            <LuGlobe aria-hidden="true" className="size-4 shrink-0" />
            <span className="min-w-0 truncate">{formatWebsiteUrl(service.website)}</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}
