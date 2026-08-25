export type PaletteSwatch = {
  step: string
  className: string
  cssVar: string
}

export type Palette = {
  name: string
  role: string
  swatches: PaletteSwatch[]
}

export type SemanticToken = {
  name: string
  cssVar: string
  className: string
  role: string
}

/** Semantic groups that remap under .dark — primitives stay honest in the catalog. */
export const DARK_REMAPPED_SEMANTICS = [
  'Foundation (background, card, foreground)',
  'Brand emphasis',
  'Content-type tints (article, guide, tool, service)',
] as const

export const PRIMITIVE_PALETTES: Palette[] = [
  {
    name: 'Brand ink',
    role:
      'Logo blue (hue 260). 900 = #1C335B in light. Product code uses --brand-emphasis, not ramp steps.',
    swatches: [
      { step: '50', className: 'bg-brandInk-50', cssVar: '--color-brand-ink-50' },
      { step: '100', className: 'bg-brandInk-100', cssVar: '--color-brand-ink-100' },
      { step: '200', className: 'bg-brandInk-200', cssVar: '--color-brand-ink-200' },
      { step: '300', className: 'bg-brandInk-300', cssVar: '--color-brand-ink-300' },
      { step: '400', className: 'bg-brandInk-400', cssVar: '--color-brand-ink-400' },
      { step: '500', className: 'bg-brandInk-500', cssVar: '--color-brand-ink-500' },
      { step: '600', className: 'bg-brandInk-600', cssVar: '--color-brand-ink-600' },
      { step: '700', className: 'bg-brandInk-700', cssVar: '--color-brand-ink-700' },
      { step: '800', className: 'bg-brandInk-800', cssVar: '--color-brand-ink-800' },
      { step: '900', className: 'bg-brandInk-900', cssVar: '--color-brand-ink-900' },
      { step: '950', className: 'bg-brandInk-950', cssVar: '--color-brand-ink-950' },
    ],
  },
  {
    name: 'Sand',
    role: 'Ground, page surfaces, and quiet borders',
    swatches: [
      { step: '50', className: 'bg-sand-50', cssVar: '--color-sand-50' },
      { step: '75', className: 'bg-sand-75', cssVar: '--color-sand-75' },
      { step: '100', className: 'bg-sand-100', cssVar: '--color-sand-100' },
      { step: '200', className: 'bg-sand-200', cssVar: '--color-sand-200' },
      { step: '300', className: 'bg-sand-300', cssVar: '--color-sand-300' },
      { step: '400', className: 'bg-sand-400', cssVar: '--color-sand-400' },
      { step: '500', className: 'bg-sand-500', cssVar: '--color-sand-500' },
      { step: '600', className: 'bg-sand-600', cssVar: '--color-sand-600' },
      { step: '700', className: 'bg-sand-700', cssVar: '--color-sand-700' },
      { step: '800', className: 'bg-sand-800', cssVar: '--color-sand-800' },
      { step: '900', className: 'bg-sand-900', cssVar: '--color-sand-900' },
      { step: '950', className: 'bg-sand-950', cssVar: '--color-sand-950' },
    ],
  },
  {
    name: 'Twilight',
    role: 'Body text and secondary actions.',
    swatches: [
      { step: '50', className: 'bg-twilight-50', cssVar: '--color-twilight-50' },
      { step: '100', className: 'bg-twilight-100', cssVar: '--color-twilight-100' },
      { step: '200', className: 'bg-twilight-200', cssVar: '--color-twilight-200' },
      { step: '300', className: 'bg-twilight-300', cssVar: '--color-twilight-300' },
      { step: '400', className: 'bg-twilight-400', cssVar: '--color-twilight-400' },
      { step: '500', className: 'bg-twilight-500', cssVar: '--color-twilight-500' },
      { step: '600', className: 'bg-twilight-600', cssVar: '--color-twilight-600' },
      { step: '700', className: 'bg-twilight-700', cssVar: '--color-twilight-700' },
      { step: '800', className: 'bg-twilight-800', cssVar: '--color-twilight-800' },
      { step: '900', className: 'bg-twilight-900', cssVar: '--color-twilight-900' },
      { step: '950', className: 'bg-twilight-950', cssVar: '--color-twilight-950' },
    ],
  },
  {
    name: 'Gold',
    role: 'Primary action and accent.',
    swatches: [
      { step: '50', className: 'bg-gold-50', cssVar: '--color-gold-50' },
      { step: '100', className: 'bg-gold-100', cssVar: '--color-gold-100' },
      { step: '200', className: 'bg-gold-200', cssVar: '--color-gold-200' },
      { step: '300', className: 'bg-gold-300', cssVar: '--color-gold-300' },
      { step: '400', className: 'bg-gold-400', cssVar: '--color-gold-400' },
      { step: '500', className: 'bg-gold-500', cssVar: '--color-gold-500' },
      { step: '600', className: 'bg-gold-600', cssVar: '--color-gold-600' },
      { step: '700', className: 'bg-gold-700', cssVar: '--color-gold-700' },
      { step: '800', className: 'bg-gold-800', cssVar: '--color-gold-800' },
      { step: '900', className: 'bg-gold-900', cssVar: '--color-gold-900' },
    ],
  },
  {
    name: 'Terracota',
    role: 'Guide content and warm emphasis.',
    swatches: [
      { step: '50', className: 'bg-terracota-50', cssVar: '--color-terracota-50' },
      { step: '100', className: 'bg-terracota-100', cssVar: '--color-terracota-100' },
      { step: '200', className: 'bg-terracota-200', cssVar: '--color-terracota-200' },
      { step: '300', className: 'bg-terracota-300', cssVar: '--color-terracota-300' },
      { step: '400', className: 'bg-terracota-400', cssVar: '--color-terracota-400' },
      { step: '500', className: 'bg-terracota-500', cssVar: '--color-terracota-500' },
      { step: '600', className: 'bg-terracota-600', cssVar: '--color-terracota-600' },
      { step: '700', className: 'bg-terracota-700', cssVar: '--color-terracota-700' },
      { step: '800', className: 'bg-terracota-800', cssVar: '--color-terracota-800' },
      { step: '900', className: 'bg-terracota-900', cssVar: '--color-terracota-900' },
    ],
  },
  {
    name: 'Sage',
    role: 'Tool content and supportive states.',
    swatches: [
      { step: '50', className: 'bg-sage-50', cssVar: '--color-sage-50' },
      { step: '100', className: 'bg-sage-100', cssVar: '--color-sage-100' },
      { step: '200', className: 'bg-sage-200', cssVar: '--color-sage-200' },
      { step: '300', className: 'bg-sage-300', cssVar: '--color-sage-300' },
      { step: '400', className: 'bg-sage-400', cssVar: '--color-sage-400' },
      { step: '500', className: 'bg-sage-500', cssVar: '--color-sage-500' },
      { step: '600', className: 'bg-sage-600', cssVar: '--color-sage-600' },
      { step: '700', className: 'bg-sage-700', cssVar: '--color-sage-700' },
      { step: '800', className: 'bg-sage-800', cssVar: '--color-sage-800' },
      { step: '900', className: 'bg-sage-900', cssVar: '--color-sage-900' },
    ],
  },
  {
    name: 'Stone',
    role: 'Neutral overlays and supporting UI',
    swatches: [
      { step: '50', className: 'bg-stone-50', cssVar: '--color-stone-50' },
      { step: '100', className: 'bg-stone-100', cssVar: '--color-stone-100' },
      { step: '200', className: 'bg-stone-200', cssVar: '--color-stone-200' },
      { step: '300', className: 'bg-stone-300', cssVar: '--color-stone-300' },
      { step: '400', className: 'bg-stone-400', cssVar: '--color-stone-400' },
      { step: '500', className: 'bg-stone-500', cssVar: '--color-stone-500' },
      { step: '600', className: 'bg-stone-600', cssVar: '--color-stone-600' },
      { step: '700', className: 'bg-stone-700', cssVar: '--color-stone-700' },
      { step: '800', className: 'bg-stone-800', cssVar: '--color-stone-800' },
      { step: '900', className: 'bg-stone-900', cssVar: '--color-stone-900' },
      { step: '950', className: 'bg-stone-950', cssVar: '--color-stone-950' },
    ],
  },
  {
    name: 'Zinc',
    role: 'Muted and subtle foregrounds',
    swatches: [
      { step: '50', className: 'bg-zinc-50', cssVar: '--color-zinc-50' },
      { step: '100', className: 'bg-zinc-100', cssVar: '--color-zinc-100' },
      { step: '200', className: 'bg-zinc-200', cssVar: '--color-zinc-200' },
      { step: '300', className: 'bg-zinc-300', cssVar: '--color-zinc-300' },
      { step: '400', className: 'bg-zinc-400', cssVar: '--color-zinc-400' },
      { step: '500', className: 'bg-zinc-500', cssVar: '--color-zinc-500' },
      { step: '600', className: 'bg-zinc-600', cssVar: '--color-zinc-600' },
      { step: '700', className: 'bg-zinc-700', cssVar: '--color-zinc-700' },
      { step: '800', className: 'bg-zinc-800', cssVar: '--color-zinc-800' },
      { step: '900', className: 'bg-zinc-900', cssVar: '--color-zinc-900' },
    ],
  },
]

export const SEMANTIC_TOKENS: SemanticToken[] = [
  { name: 'background', cssVar: '--background', className: 'bg-background', role: 'Page canvas' },
  {
    name: 'background-subtle',
    cssVar: '--background-subtle',
    className: 'bg-background-subtle',
    role: 'Recessed bands',
  },
  {
    name: 'background-emphasis',
    cssVar: '--background-emphasis',
    className: 'bg-background-emphasis',
    role: 'Emphasized bands',
  },
  { name: 'foreground', cssVar: '--foreground', className: 'bg-foreground', role: 'Body text' },
  {
    name: 'foreground-heading',
    cssVar: '--foreground-heading',
    className: 'bg-foreground-heading',
    role: 'Headlines — shared brand blue',
  },
  {
    name: 'brand-emphasis',
    cssVar: '--brand-emphasis',
    className: 'bg-brand-emphasis',
    role: 'Logo and category icons — same blue as headlines',
  },
  {
    name: 'brand-mark',
    cssVar: '--brand-mark',
    className: 'bg-brand-mark',
    role: 'Compatibility alias for brand-emphasis',
  },
  {
    name: 'foreground-subtle',
    cssVar: '--foreground-subtle',
    className: 'bg-foreground-subtle',
    role: 'Supporting text',
  },
  {
    name: 'foreground-muted',
    cssVar: '--foreground-muted',
    className: 'bg-foreground-muted',
    role: 'Captions and hints',
  },
  {
    name: 'foreground-accent',
    cssVar: '--foreground-accent',
    className: 'bg-foreground-accent',
    role: 'Accent text',
  },
  { name: 'surface', cssVar: '--surface', className: 'bg-surface', role: 'Raised surface' },
  { name: 'card', cssVar: '--card', className: 'bg-card', role: 'Card fill' },
  {
    name: 'card-hover',
    cssVar: '--card-hover',
    className: 'bg-card-hover',
    role: 'Card hover fill',
  },
  { name: 'popover', cssVar: '--popover', className: 'bg-popover', role: 'Menus and dialogs' },
  { name: 'primary', cssVar: '--primary', className: 'bg-primary', role: 'Primary action' },
  {
    name: 'primary-hover',
    cssVar: '--primary-hover',
    className: 'bg-primary-hover',
    role: 'Primary hover',
  },
  { name: 'secondary', cssVar: '--secondary', className: 'bg-secondary', role: 'Secondary action' },
  { name: 'accent', cssVar: '--accent', className: 'bg-accent', role: 'Hover wash' },
  { name: 'muted', cssVar: '--muted', className: 'bg-muted', role: 'Muted fill' },
  { name: 'success', cssVar: '--success', className: 'bg-success', role: 'Success feedback' },
  { name: 'warning', cssVar: '--warning', className: 'bg-warning', role: 'Warning feedback' },
  { name: 'error', cssVar: '--error', className: 'bg-error', role: 'Error feedback' },
  { name: 'info', cssVar: '--info', className: 'bg-info', role: 'Info feedback' },
  { name: 'icon', cssVar: '--icon', className: 'bg-icon', role: 'Icons' },
  { name: 'border', cssVar: '--border', className: 'bg-border', role: 'Default border' },
  {
    name: 'border-strong',
    cssVar: '--border-strong',
    className: 'bg-border-strong',
    role: 'Hover / emphasis border',
  },
  {
    name: 'border-input',
    cssVar: '--border-input',
    className: 'bg-border-input',
    role: 'Input border',
  },
  { name: 'ring-focus', cssVar: '--ring-focus', className: 'bg-ring-focus', role: 'Focus ring' },
  { name: 'ring-error', cssVar: '--ring-error', className: 'bg-ring-error', role: 'Invalid focus' },
]

export const CONTENT_TYPE_TOKENS = [
  {
    name: 'Article',
    className: 'bg-content-article border-content-article-border',
    badge: 'article' as const,
  },
  {
    name: 'Guide',
    className: 'bg-content-guide border-content-guide-border',
    badge: 'guide' as const,
  },
  {
    name: 'Tool',
    className: 'bg-content-tool border-content-tool-border',
    badge: 'tool' as const,
  },
  {
    name: 'Service',
    className: 'bg-content-service border-content-service-border',
    badge: 'service' as const,
  },
]

export const CONTENT_SEMANTIC_TOKENS: SemanticToken[] = [
  {
    name: 'content-article',
    cssVar: '--content-article-surface',
    className: 'bg-content-article',
    role: 'Article card tint',
  },
  {
    name: 'content-guide',
    cssVar: '--content-guide-surface',
    className: 'bg-content-guide',
    role: 'Guide card tint',
  },
  {
    name: 'content-tool',
    cssVar: '--content-tool-surface',
    className: 'bg-content-tool',
    role: 'Tool card tint',
  },
  {
    name: 'content-service',
    cssVar: '--content-service-surface',
    className: 'bg-content-service',
    role: 'Service card tint',
  },
]
