import Image from 'next/image'
import Link from 'next/link'

import LogoMark from '@/app/components/shared/logo-mark'
import ResolvedLink from '@/app/components/shared/resolved-link'
import { cn } from '@/lib/utils'
import CommunityBgImg from '@/public/images/community-bg.png'
import CommunityEagleImg from '@/public/images/community-eagle.png'
import { sanityFetch } from '@/sanity/lib/live'
import { navigationQuery } from '@/sanity/lib/queries'

const FOOTER_LINK_CLASSES =
  'rounded-md outline-none transition-colors duration-fast ease-standard hover:text-link-hover focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-subtle'

export default async function Footer() {
  const { data } = await sanityFetch({
    query: navigationQuery,
  })

  // More robust data selection
  const resourcesDropdown = data?.primaryNav?.find(
    nav => nav.type === 'dropdown' && nav.dropdownLabel?.toLowerCase().includes('resource'),
  )

  const aboutLink = data?.primaryNav?.find(
    nav => nav.type === 'link' && nav.link?.label?.toLowerCase() === 'about',
  )

  return (
    <footer className="bg-background">
      <BuiltBy />
      <div className="container relative z-10">
        <div className="rounded-t-2xl bg-background-subtle">
          <div className="flex flex-col gap-10 px-4 py-8 md:gap-16 md:px-8 md:py-12">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:gap-24">
              <div className="flex">
                <Link
                  className={cn('flex flex-1 items-center gap-3', FOOTER_LINK_CLASSES)}
                  href="/"
                  aria-label="Resilient Relatives Home"
                >
                  <LogoMark className="size-12" />
                  <span className="text-body font-medium leading-none">
                    Resilient
                    <br />
                    Relatives
                  </span>
                </Link>
              </div>

              <nav className="grid w-full flex-1 grid-cols-1 gap-8 md:grid-cols-3">
                {/* Resources Section */}
                {resourcesDropdown?.dropdownItems && (
                  <div className="flex flex-col gap-4">
                    <div className="font-bold">{resourcesDropdown.dropdownLabel}</div>
                    <ul className="flex flex-col gap-4">
                      {resourcesDropdown.dropdownItems.map((link, idx) => (
                        <li key={idx}>
                          <ResolvedLink link={link} className={FOOTER_LINK_CLASSES}>
                            {link.label}
                          </ResolvedLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Company Section */}
                {aboutLink?.link && (
                  <div className="flex flex-col gap-4">
                    <div className="font-bold">Company</div>
                    <ul>
                      <li>
                        <ResolvedLink link={aboutLink.link} className={FOOTER_LINK_CLASSES}>
                          {aboutLink.link.label}
                        </ResolvedLink>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Connect Section */}
                <div className="flex flex-col gap-4">
                  <div className="font-bold">Connect</div>
                  <ul>
                    <li>
                      <a href="mailto:CCVAP@cahuilla-nsn.gov" className={FOOTER_LINK_CLASSES}>
                        Email us
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <hr />

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-label text-foreground-muted">
                &copy; {new Date().getFullYear()} Resilient Relatives. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function BuiltBy() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 z-0 mx-auto max-w-[1640px]">
        <Image
          src={CommunityBgImg}
          alt="Community background"
          className="min-h-[280px] object-cover md:min-h-[500px]"
        />
      </div>
      <div className="container relative z-10 flex flex-col items-center gap-4 py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="w-[207px]">
          <Image src={CommunityEagleImg} alt="Community eagle" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-2xl md:text-3xl">Built by and for Native communities.</h2>
          <p className="text-center">For families, advocates, and future generations.</p>
        </div>
      </div>
    </div>
  )
}
