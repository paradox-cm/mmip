import SealAnimation from '@/app/components/shared/seal-animation'
import { loadSealMarkup } from '@/lib/seal-markup'

import PageHeader, { DocCode, DocSection } from '../_components/page-header'
import Preview from '../_components/preview'

export const metadata = { title: 'Seal animation' }

export default async function SealAnimationPage() {
  const svgMarkup = await loadSealMarkup()

  return (
    <>
      <PageHeader
        title="Seal animation"
        description="The Resilient Relatives seal enters with a drawn California outline, a warm fill, and lettering that resolves around the mark. The final frame preserves the source artwork exactly."
      />

      <DocSection
        title="Animated seal"
        description="The cinematic reveal is reserved for entry. Afterward, the lettering responds independently to hover."
      >
        <Preview className="flex min-h-96 items-center justify-center bg-background-subtle p-6 sm:min-h-[32rem] sm:p-10">
          <SealAnimation svgMarkup={svgMarkup} />
        </Preview>
      </DocSection>

      <DocSection title="Playback">
        <ul className="max-w-reading list-disc space-y-2 pl-5 text-foreground-subtle">
          <li>The outline, fill, and lettering sequence autoplays once on page entry.</li>
          <li>Mouse or pen hover gradually sends the lettering into a slow clockwise orbit.</li>
          <li>Pointer exit eases the lettering back to its original alignment without snapping.</li>
          <li>Tap, click, Enter, or Space replays the entry sequence at any point.</li>
        </ul>
      </DocSection>

      <DocSection title="Motion and color">
        <p className="max-w-reading text-foreground-subtle">
          Light appearance matches the source terracotta and gold. Dark appearance uses the
          theme-aware <DocCode>brand-seal-wordmark</DocCode> and <DocCode>brand-seal-mark</DocCode>{' '}
          roles for stronger contrast. With reduced motion, the completed seal is shown immediately
          and replay is disabled.
        </p>
      </DocSection>
    </>
  )
}
