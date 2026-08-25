import { RiArrowRightLine } from 'react-icons/ri'

import Link from 'next/link'

import SanityImage from '@/app/components/shared/sanity-image'
import TaxonomyIcon from '@/app/components/shared/taxonomy-icon'
import Tile from '@/app/components/ui/tile'
import { CARD_INTERACTION } from '@/lib/constants'
import { getTaxonomyIconSrc } from '@/lib/taxonomy-icons'
import { cn } from '@/lib/utils'
import { fetchCategories } from '@/sanity/lib/fetch'

import { stegaClean } from '@sanity/client/stega'

export default async function Categories() {
  const data = await fetchCategories()

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="mb-6 text-h3">Explore by category</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data.map(cat => {
          const iconSrc = getTaxonomyIconSrc('category', cat.slug, cat.name)

          return (
            <Link
              key={cat._id}
              href={`${cat.slug}`}
              className={cn('group block rounded-xl', CARD_INTERACTION)}
            >
              <Tile className="flex flex-col gap-6">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-xl font-medium">{cat.name}</p>
                  <div className="flex size-10 items-center justify-center rounded-pill bg-muted text-muted-foreground transition-colors duration-fast ease-standard group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <RiArrowRightLine className="size-5" />
                  </div>
                </div>
                {iconSrc ? (
                  <div className="relative flex items-center justify-center py-8">
                    <TaxonomyIcon kind="category" slug={cat.slug} name={cat.name} />
                  </div>
                ) : (
                  cat.image &&
                  cat.image.metadata && (
                    <div className="brand-artwork relative flex items-center justify-center py-8">
                      <SanityImage
                        source={cat.image}
                        alt={stegaClean(cat.image?.alt)}
                        fill={false}
                        sizes="100vw"
                      />
                    </div>
                  )
                )}
              </Tile>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
