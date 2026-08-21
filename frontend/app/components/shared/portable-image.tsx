import SanityImage from '@/app/components/shared/sanity-image'
import type { SanityImage as SanityImageType } from '@/types'

export default function PortableImage({ image }: { image: SanityImageType }) {
  const img = image?.asset?._ref ? (
    <SanityImage source={image} alt={image.alt} className="w-full rounded" />
  ) : (
    <div className="bg-muted" style={{ paddingTop: '100%' }} />
  )

  return <div className="relative">{img}</div>
}
