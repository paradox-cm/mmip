import type { GetPageQueryResult } from '@/sanity.types'

type CtaBlock = Extract<
  NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number],
  { _type: 'callToAction' }
>

type CtaProps = {
  block: CtaBlock
  index: number
}

export default function Cta({ block }: CtaProps) {
  return (
    <div className="container my-12">
      <div className="max-w-3xl rounded-2xl border bg-background-subtle">
        <div className="flex flex-col gap-6 p-6 md:p-12">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="text-h2 font-bold tracking-tight text-foreground-heading sm:text-4xl">
              {block.heading}
            </h2>
            <p className="text-body leading-8 text-foreground-subtle">{block.text}</p>
          </div>

          {/* The CTA button stays unrendered: the pageBuilder query does not
              dereference block.link, so there is no href to resolve yet. */}
        </div>
      </div>
    </div>
  )
}
