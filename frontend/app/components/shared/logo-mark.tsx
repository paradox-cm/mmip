import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
}

/** Brand mark via CSS mask so it shares the heading and category-icon token. */
export default function LogoMark({ className }: LogoMarkProps) {
  return <span aria-hidden className={cn('logo-mark', className)} />
}
