import Footer from '@/app/components/global/footer'
import Header from '@/app/components/global/header'
import CommandPalette from '@/app/components/shared/command-palette'
import NavigationHistory from '@/app/components/shared/navigation-history'
import SkipLink from '@/app/components/shared/skip-link'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationHistory>
      <div className="flex min-h-screen flex-col pt-20">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CommandPalette />
      </div>
    </NavigationHistory>
  )
}
