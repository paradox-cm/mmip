import { LuSearch } from 'react-icons/lu'

import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Spinner } from '@/app/components/ui/spinner'
import Tile from '@/app/components/ui/tile'

import {
  CommandDemo,
  DialogDemo,
  NavigationMenuDemo,
  SelectDemo,
} from '../_components/component-demos'
import PageHeader, { DocCode, DocSection } from '../_components/page-header'
import Preview from '../_components/preview'

export const metadata = { title: 'Components' }

const toc = [
  { href: '#button', label: 'Button' },
  { href: '#button-contrast', label: 'Button contrast' },
  { href: '#badge', label: 'Badge' },
  { href: '#input', label: 'Input' },
  { href: '#select', label: 'Select' },
  { href: '#dialog', label: 'Dialog' },
  { href: '#spinner', label: 'Spinner' },
  { href: '#tile', label: 'Tile' },
  { href: '#command', label: 'Command' },
  { href: '#navigation-menu', label: 'Navigation menu' },
]

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Components"
        description="Live primitives from app/components/ui. Variants match the CVA definitions in code — nothing fictional."
      />

      <nav aria-label="On this page" className="flex flex-wrap gap-2">
        {toc.map(item => (
          <a
            key={item.href}
            href={item.href}
            className="focus-ring inline-flex min-h-8 items-center rounded-full border bg-card px-3 py-1.5 text-sm text-foreground-subtle hover:border-strong hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <DocSection
        id="button"
        title="Button"
        description="Variants: default, help, outline, ghost, link. Sizes include a 44px default and dedicated icon sizes."
      >
        <div className="grid gap-4">
          <Preview label="Variants">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="help">Get Help</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </Preview>
          <Preview label="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Search">
                <LuSearch aria-hidden="true" />
              </Button>
            </div>
          </Preview>
          <Preview label="States">
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled outline
              </Button>
            </div>
          </Preview>
        </div>
        <p className="text-sm text-foreground-subtle">
          Use <DocCode>asChild</DocCode> with Next.js <DocCode>Link</DocCode> for navigation. Prefer
          submit type only inside forms — the default type is button. Default, outline, and ghost
          press with <DocCode>interactive-press</DocCode>; the link variant does not scale. The
          terracotta <DocCode>help</DocCode> variant is reserved for the Get Help crisis CTA (header,
          footer, and <DocCode>/get-help</DocCode>) — do not reuse it for ordinary actions.
        </p>
      </DocSection>

      <DocSection id="badge" title="Badge" description="Status and content-type labels. Not a control.">
        <Preview label="Solid">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="article">article</Badge>
            <Badge variant="guide">guide</Badge>
            <Badge variant="tool">tool</Badge>
            <Badge variant="service">service</Badge>
            <Badge variant="tribe">tribe</Badge>
          </div>
        </Preview>
        <Preview label="Soft (content-type metadata)">
          <div className="flex flex-wrap gap-2">
            <Badge variant="article" appearance="soft">
              article
            </Badge>
            <Badge variant="guide" appearance="soft">
              guide
            </Badge>
            <Badge variant="tool" appearance="soft">
              tool
            </Badge>
            <Badge variant="service" appearance="soft">
              service
            </Badge>
            <Badge variant="tribe" appearance="soft">
              tribe
            </Badge>
          </div>
        </Preview>
        <p className="text-sm text-foreground-subtle">
          Content-type colors come from CVA. Toggle Dark in the catalog header to verify soft badge
          Soft badge variants use <DocCode>bg-content-*</DocCode> semantics — the same tokens as
          CARD_THEME cards.
        </p>
      </DocSection>

      <DocSection
        id="button-contrast"
        title="Button contrast"
        description="Filled primary deepened in light so white ink clears AA. Dark primary unchanged."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 pr-4 font-medium">Variant</th>
                <th className="py-2 pr-4 font-medium">Light</th>
                <th className="py-2 font-medium">Dark</th>
              </tr>
            </thead>
            <tbody className="text-foreground-subtle">
              <tr className="border-b">
                <td className="py-2 pr-4">Primary</td>
                <td className="py-2 pr-4">gold-900 / white (~5.3:1)</td>
                <td className="py-2">gold-400 / sand-950 (~12:1)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Secondary</td>
                <td className="py-2 pr-4">twilight-900 / white (~6.4:1)</td>
                <td className="py-2">sand-100 / sand-950 (~18:1)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Outline / ghost</td>
                <td className="py-2 pr-4">explicit foreground</td>
                <td className="py-2">explicit foreground</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Destructive</td>
                <td className="py-2 pr-4">~4.8:1</td>
                <td className="py-2">~4.8:1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-foreground-subtle">
          Brighter gold remains for links, focus rings, and accents — only the filled primary action
          deepened in light.
        </p>
      </DocSection>

      <DocSection id="input" title="Input">
        <Preview>
          <div className="grid max-w-md gap-4">
            <div className="grid gap-2">
              <label htmlFor="ds-input" className="text-sm font-medium">
                Name
              </label>
              <Input id="ds-input" placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="ds-input-disabled" className="text-sm font-medium">
                Disabled
              </label>
              <Input id="ds-input-disabled" placeholder="Unavailable" disabled />
            </div>
            <div className="grid gap-2">
              <label htmlFor="ds-input-invalid" className="text-sm font-medium">
                Invalid
              </label>
              <Input
                id="ds-input-invalid"
                placeholder="Required"
                aria-invalid="true"
                aria-describedby="ds-input-invalid-hint"
              />
              <p id="ds-input-invalid-hint" className="text-sm text-error-foreground">
                This field is required.
              </p>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="select" title="Select">
        <SelectDemo />
      </DocSection>

      <DocSection id="dialog" title="Dialog">
        <DialogDemo />
      </DocSection>

      <DocSection id="spinner" title="Spinner">
        <Preview>
          <div className="flex items-center gap-3">
            <Spinner className="size-6" />
            <span className="text-sm text-foreground-subtle">Loading status is announced.</span>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="tile" title="Tile" description="Surface used by tribe, service, category, and topic cards.">
        <Preview>
          <a href="#tile" className="focus-ring interactive-card group block rounded-xl">
            <Tile>
              <p className="font-medium">Tile surface</p>
              <p className="text-sm text-foreground-subtle">
                Hover warms the fill and border. Press scales the parent{' '}
                <DocCode>interactive-card</DocCode>. Reduced motion removes both.
              </p>
            </Tile>
          </a>
        </Preview>
      </DocSection>

      <DocSection id="command" title="Command">
        <CommandDemo />
      </DocSection>

      <DocSection
        id="navigation-menu"
        title="Navigation menu"
        description="Same primitive as the public header. Links here jump to sections on this page."
      >
        <NavigationMenuDemo />
      </DocSection>
    </>
  )
}
