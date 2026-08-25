export default function SkipLink({
  href = '#main-content',
  children = 'Skip to content',
}: {
  href?: string
  children?: string
}) {
  return (
    <a
      href={href}
      className="focus-ring fixed left-4 top-4 z-[100] inline-flex translate-y-[calc(-100%-1.5rem)] items-center rounded-lg border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-lg focus-visible:translate-y-0"
    >
      {children}
    </a>
  )
}
