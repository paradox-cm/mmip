import { Image, type ImageProps } from 'next-sanity/image'

import { urlForImage } from '@/sanity/lib/utils'
import type { SanityImage } from '@/types'

import { stegaClean } from '@sanity/client/stega'

interface Props extends Omit<ImageProps, 'src'> {
  source: SanityImage | null
}

export default function SanityImage({
  source,
  alt = 'alt text',
  fill,
  sizes = '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 500px',
  quality = 80,
  loading,
  className,
  ...props
}: Props) {
  const isSVG = source?.extension === 'svg'
  const width = source?.metadata?.dimensions?.width || 900
  const height = source?.metadata?.dimensions?.height || 600
  const hasLqip = Boolean(source?.metadata && source.metadata.lqip)
  const imageUrl = !isSVG
    ? urlForImage(source)?.width(width).height(height).auto('format').url()
    : source.url

  const img = source?.asset?._ref ? (
    <Image
      src={imageUrl ?? ''}
      alt={stegaClean(alt)}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={!isSVG ? sizes : undefined}
      quality={quality}
      loading={loading}
      placeholder={!isSVG && hasLqip ? 'blur' : undefined}
      blurDataURL={!isSVG && hasLqip ? source.metadata?.lqip : undefined}
      className={className}
      {...props}
    />
  ) : (
    <div className="aspect-[3/2] rounded-md border bg-muted" />
  )

  return <div className="relative">{img}</div>
}
