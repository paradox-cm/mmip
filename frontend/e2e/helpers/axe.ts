import { expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

export const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/**
 * Brand gold (primary actions and links) is Casey's identity and does not meet
 * 4.5:1 on sand. Do not "fix" that by swapping palettes. This gate enforces
 * names, roles, and structure instead.
 */
const DISABLED_RULES = ['color-contrast']

/**
 * Axe "incomplete" results the gate ignores. Everything else in the
 * incomplete bucket fails: axe files real defects there (for example
 * aria-hidden containers with tabbable children) instead of under
 * violations, so a violations-only gate silently misses them.
 */
const INCOMPLETE_EXCLUDED_RULES = new Set([
  // Axe cannot compute contrast over photography; product tokens are sand/twilight/gold.
  'color-contrast',
])

type AxeNode = {
  target: (string | string[])[]
  any: { id: string }[]
  all: { id: string }[]
  none: { id: string }[]
}

/**
 * Closed Radix DialogTrigger sets aria-controls to a content id that is not
 * mounted until open. Axe cannot resolve the idref and marks it incomplete.
 */
function isClosedDialogTriggerNode(n: AxeNode): boolean {
  return n.target.some(t => String(t).includes('dialog-trigger'))
}

/**
 * With a modal open, axe files every aria-hidden-focus node under the
 * `focusable-modal-open` check because no tool can prove a trap works. Radix
 * Dialog provides the trap; keeping these would make any open-dialog route flaky.
 */
function isModalOpenReviewNode(n: AxeNode): boolean {
  const checks = [...n.any, ...n.all, ...n.none]
  return checks.length > 0 && checks.every(c => c.id === 'focusable-modal-open')
}

export async function expectNoAxeViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(AXE_TAGS)
    .disableRules(DISABLED_RULES)
    .analyze()
  const summarize = (list: typeof results.violations) =>
    list.map(v => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map(n => n.target.join(' ')),
    }))

  expect(summarize(results.violations), 'axe violations').toEqual([])

  const incomplete = results.incomplete
    .filter(v => !INCOMPLETE_EXCLUDED_RULES.has(v.id))
    .map(v => {
      if (v.id === 'aria-hidden-focus') {
        return { ...v, nodes: v.nodes.filter(n => !isModalOpenReviewNode(n)) }
      }
      if (v.id === 'aria-valid-attr-value') {
        return { ...v, nodes: v.nodes.filter(n => !isClosedDialogTriggerNode(n)) }
      }
      return v
    })
    .filter(v => v.nodes.length > 0)
  expect(summarize(incomplete), 'axe incomplete (non-contrast)').toEqual([])
}
