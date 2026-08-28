import SanityImage from '@/app/components/shared/sanity-image'
import type { SanityImage as SanityImageType } from '@/types'

export default function CoverImage({ image }: { image: SanityImageType | null }) {
  const img =
    image && image?.asset?._ref ? (
      <SanityImage
        source={image}
        alt={image.alt}
        className="rounded"
        loading={undefined}
        priority={true}
      />
    ) : (
      <div className="rounded border bg-muted pt-[100%]" />
    )

  return <div className="relative">{img}</div>
}
