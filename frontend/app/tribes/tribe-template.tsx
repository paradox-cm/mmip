import { LuClock, LuGlobe, LuMail, LuMapPin, LuPhone } from 'react-icons/lu'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CoverImage from '@/app/components/shared/cover-image'
import PortableText from '@/app/components/shared/portable-text'
import Section from '@/app/components/shared/section'
import { Badge } from '@/app/components/ui/badge'
import { REGION_LABELS } from '@/lib/constants'
import { formatWebsiteUrl } from '@/lib/utils'
import type { GetTribeQueryResult } from '@/sanity.types'

export default function TribeTemplate({ tribe }: { tribe: NonNullable<GetTribeQueryResult> }) {
  return (
    <>
      <Section className="border-b bg-sand-50 lg:py-24">
        <div className="container">
          <TribeHeader {...tribe} />
        </div>
      </Section>

      <Section className="border-b">
        <div className="container">
          <TribeBody {...tribe} />
        </div>
      </Section>
    </>
  )
}

function TribeHeader({
  name,
  shortDescription,
  region,
  coverImage,
}: Pick<NonNullable<GetTribeQueryResult>, 'name' | 'shortDescription' | 'region' | 'coverImage'>) {
  return (
    <div className="flex flex-col gap-16 md:flex-row md:items-center">
      <div className="flex w-full flex-[2] flex-col gap-6">
        <div className="flex flex-row items-center gap-1">
          <Link href="/tribes">
            <Badge variant="service" className="capitalize text-white">
              Tribe
            </Badge>
          </Link>
          <Badge variant="service" className="bg-transparent capitalize">
            {REGION_LABELS[region]}
          </Badge>
        </div>
        <h1>{name}</h1>
        {shortDescription?.length && (
          <PortableText
            className=""
            paragraphClassName="text-lg"
            value={shortDescription as PortableTextBlock[]}
          />
        )}
      </div>

      <div className="flex-1">
        <CoverImage image={coverImage} />
      </div>
    </div>
  )
}

function TribeBody({
  description,
  contactInfo,
}: Pick<NonNullable<GetTribeQueryResult>, 'description' | 'contactInfo'>) {
  return (
    <div className="flex flex-col gap-16 md:flex-row">
      <aside className="flex-1">
        <div className="flex max-w-80 flex-col gap-6 md:sticky md:top-36 lg:top-40">
          {/* Contact Information */}
          {contactInfo && (
            <div className="rounded-lg border bg-sand-50 p-6">
              <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
              <div className="space-y-3">
                {contactInfo.address && (
                  <div className="flex items-start gap-2">
                    <LuMapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="text-sm">
                      <div>{contactInfo.address}</div>
                      {(contactInfo.city || contactInfo.state || contactInfo.zip) && (
                        <div>
                          {[contactInfo.city, contactInfo.state, contactInfo.zip]
                            .filter(Boolean)
                            .join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {contactInfo.phone && (
                  <div className="flex items-center gap-2">
                    <LuPhone className="size-4 shrink-0 text-muted-foreground" />
                    <a href={`tel:${contactInfo.phone}`} className="text-sm hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                )}

                {contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <LuMail className="size-4 shrink-0 text-muted-foreground" />
                    <a href={`mailto:${contactInfo.email}`} className="text-sm hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                )}

                {contactInfo.website && (
                  <div className="flex items-center gap-2">
                    <LuGlobe className="size-4 shrink-0 text-muted-foreground" />
                    <a
                      href={contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      {formatWebsiteUrl(contactInfo.website)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      <article className="flex-[2]">
        <PortableText className="max-w-reading" value={description as PortableTextBlock[]} />
      </article>
    </div>
  )
}
