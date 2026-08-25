import Image from 'next/image'

import about01 from '@/public/images/about-01.png'

export const ABOUT_PAGE_SLUG = 'about'

export function isAboutPage(slug?: string | null) {
  return slug === ABOUT_PAGE_SLUG
}

export function AboutHeaderImage() {
  return (
    <Image
      src={about01}
      alt="Illustration of a white feather standing before a golden sun"
      className="h-auto w-[7.5rem] shrink-0 sm:w-40 md:w-52 lg:w-[286px]"
      sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, (max-width: 1024px) 208px, 286px"
      priority
    />
  )
}
