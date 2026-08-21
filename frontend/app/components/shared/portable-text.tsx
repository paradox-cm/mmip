/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity'

import PortableImage from '@/app/components/shared/portable-image'
import ResolvedLink from '@/app/components/shared/resolved-link'
import { cn } from '@/lib/utils'
import type { SanityImage } from '@/types'

export default function CustomPortableText({
  className,
  paragraphClassName,
  value,
}: {
  className?: string
  paragraphClassName?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className={cn('text-base', paragraphClassName)}>{children}</p>,
      lead: ({ children }) => <p className="text-lg">{children}</p>,
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute inset-y-0 left-0 -ml-6 flex items-center opacity-0 transition-opacity group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => {
        // Add an anchor to the h2
        return (
          <h2 className="group relative" id={value?._key}>
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute inset-y-0 left-0 -ml-6 flex items-center opacity-0 transition-opacity group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        )
      },
      h3: ({ children, value }) => {
        // Add an anchor to the h2
        return (
          <h3 className="group relative" id={value?._key}>
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute inset-y-0 left-0 -ml-6 flex items-center opacity-0 transition-opacity group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h3>
        )
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
    types: {
      portableImage: ({ value }: { value: SanityImage }) => {
        return <PortableImage image={value} />
      },
    },
  }

  return (
    <div
      className={cn(
        'prose prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-link-hover',
        className,
      )}
    >
      <PortableText components={components} value={value} />
    </div>
  )
}
