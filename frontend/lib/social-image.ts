export type SocialImage = {
  url: string
  alt?: string
  width?: number
  height?: number
}

export const DEFAULT_SOCIAL_MISSION = 'A Native-led resource for California Tribal communities.'

export const DEFAULT_SOCIAL_IMAGE: Required<SocialImage> = {
  url: '/opengraph-image',
  alt: `Resilient Relatives — ${DEFAULT_SOCIAL_MISSION}`,
  width: 1200,
  height: 630,
}

/**
 * Keeps intentional CMS artwork first while guaranteeing a branded social card
 * for pages that have not supplied an image yet.
 */
export function resolveSocialImage(...images: Array<SocialImage | undefined>): SocialImage {
  return images.find(image => Boolean(image?.url)) ?? DEFAULT_SOCIAL_IMAGE
}
