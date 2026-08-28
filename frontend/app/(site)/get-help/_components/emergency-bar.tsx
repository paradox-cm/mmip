import { LuMessageSquareText, LuTriangleAlert } from 'react-icons/lu'

import { cn } from '@/lib/utils'

const ACTION_CLASSES =
  'inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 text-sm font-semibold outline-none transition-[background-color,box-shadow,transform] duration-fast ease-standard active:scale-[0.98] motion-reduce:active:scale-100 sm:px-4 sm:text-button'

/**
 * The always-visible emergency strip. Sticks directly below the fixed h-20
 * header so 911 stays one tap away no matter how far the reader scrolls.
 */
export default function EmergencyBar() {
  return (
    <div className="sticky top-20 z-40 border-b border-help-active bg-help text-help-foreground">
      <div className="container">
        <div className="flex min-h-14 items-center justify-between gap-3 py-2">
          <p className="flex min-w-0 items-center gap-2.5 text-sm font-medium sm:text-base">
            <LuTriangleAlert aria-hidden="true" className="size-5 shrink-0" />
            <span className="min-w-0">
              <span className="font-bold">
                In immediate danger<span className="max-sm:hidden"> right now</span>?
              </span>{' '}
              <span className="max-md:hidden">Call 911 and say where you are first.</span>
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="tel:911"
              className={cn(
                ACTION_CLASSES,
                'bg-help-foreground text-help hover:bg-help-foreground/90',
              )}
            >
              Call 911
            </a>
            <a
              href="sms:988"
              className={cn(
                ACTION_CLASSES,
                'border border-help-foreground/40 text-help-foreground hover:border-help-foreground hover:bg-help-hover',
              )}
            >
              <LuMessageSquareText aria-hidden="true" className="size-4" />
              Text 988
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
