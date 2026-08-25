import { Badge } from '@/app/components/ui/badge'

import CopyButton from '../_components/copy-button'
import PageHeader, { DocCode, DocSection } from '../_components/page-header'
import { PaletteRow } from '../_components/swatch'
import { CONTENT_TYPE_TOKENS, DARK_REMAPPED_SEMANTICS, PRIMITIVE_PALETTES, SEMANTIC_TOKENS } from '../_lib/tokens'

export const metadata = { title: 'Color' }

export default function ColorPage() {
  return (
    <>
      <PageHeader
        title="Color"
        description="Primitive palettes and semantic roles. Swatches render the live Tailwind classes, so they cannot drift from globals.css."
      />

      <DocSection
        title="How to use color"
        description="Gold is the only primary action color. Brand ink is headlines (the logo blue). Twilight carries body text. Sand is the ground. Content types get a tinted card, not a new brand."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <p className="font-medium">Do</p>
            <p className="mt-1 text-sm text-foreground-subtle">
              Pair <DocCode>text-foreground</DocCode> on <DocCode>bg-background</DocCode>. Headings
              use <DocCode>text-foreground-heading</DocCode> (brand ink). Use{' '}
              <DocCode>bg-primary</DocCode> for the one action that moves the task forward.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="font-medium">Do</p>
            <p className="mt-1 text-sm text-foreground-subtle">
              Keep success, warning, error, and info for status — never as decorative fills.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="font-medium">Don&apos;t</p>
            <p className="mt-1 text-sm text-foreground-subtle">
              Don&apos;t hardcode hex, or use gold for large backgrounds. Don&apos;t rely on color
              alone for meaning.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Dark elevation"
        description="Warm charcoal on hue 75. Canvas is #26231f; cards and surfaces step up through harmonized sand-axis semantics. Toggle Dark in the catalog header."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <p className="font-medium">Elevation</p>
            <p className="mt-1 text-sm text-foreground-subtle">
              <DocCode>background-subtle</DocCode> (recessed) → <DocCode>background</DocCode>{' '}
              (#26231f) → <DocCode>background-emphasis</DocCode> (nav shell) →{' '}
              <DocCode>accent</DocCode> (hover wash) → <DocCode>card</DocCode> /{' '}
              <DocCode>surface</DocCode> → <DocCode>border</DocCode>.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="font-medium">Hue contract</p>
            <p className="mt-1 text-sm text-foreground-subtle">
              Neutrals stay on the sand axis (~68°) at chroma ~0.01 so brown is felt, not seen. Body
              text is warm off-white — never pure white, never cool zinc.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="font-medium">Dark remap policy</p>
            <p className="mt-1 text-sm text-foreground-subtle">
              Only semantic aliases remap under <DocCode>.dark</DocCode>:{' '}
              {DARK_REMAPPED_SEMANTICS.join('; ')}. Primitive palettes stay honest — toggle Dark to
              compare swatches. Product code uses <DocCode>bg-content-*</DocCode> for card tints, not{' '}
              <DocCode>dark:bg-twilight-*</DocCode>. <DocCode>brand-emphasis</DocCode> uses{' '}
              <DocCode>brandInk-400</DocCode> in dark (~6.1:1 on #26231f canvas).
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="font-medium">Actions</p>
            <p className="mt-1 text-sm text-foreground-subtle">
              Primary uses <DocCode>gold-900</DocCode> with white ink in light (~5.3:1) and{' '}
              <DocCode>gold-400</DocCode> with umber label in dark. Secondary becomes a light fill
              in dark. Logo and category icons use CSS masks tinted with{' '}
              <DocCode>brand-emphasis</DocCode>; CMS artwork may still use the{' '}
              <DocCode>brand-artwork</DocCode> filter.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection title="Semantic tokens" description="Role-based aliases used across components.">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {SEMANTIC_TOKENS.map(token => (
            <div key={token.cssVar} className="overflow-hidden rounded-lg border">
              <div
                className={`h-14 ring-1 ring-inset ring-border ${token.className}`}
                aria-hidden="true"
              />
              <div className="space-y-0.5 p-2">
                <p className="text-sm font-medium">{token.name}</p>
                <p className="text-xs text-foreground-subtle">{token.role}</p>
                <CopyButton value={token.className} />
                <CopyButton value={token.cssVar} />
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Content types"
        description="Card and badge tints from --content-* semantics in globals.css (CARD_THEME in lib/constants.ts)."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONTENT_TYPE_TOKENS.map(item => (
            <div key={item.name} className={`rounded-xl border p-4 ${item.className}`}>
              <Badge variant={item.badge} className="capitalize">
                {item.badge}
              </Badge>
              <p className="mt-3 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Primitive palettes">
        <p className="mb-6 max-w-reading text-sm text-foreground-subtle">
          Light-mode values only. Dark appearance remaps semantics above — not these steps.
        </p>
        <div className="space-y-10">
          {PRIMITIVE_PALETTES.map(palette => (
            <PaletteRow
              key={palette.name}
              name={palette.name}
              role={palette.role}
              swatches={palette.swatches}
            />
          ))}
        </div>
      </DocSection>
    </>
  )
}
