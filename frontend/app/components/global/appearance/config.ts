export const APPEARANCE_STORAGE_KEY = 'rr-appearance'

export const APPEARANCES = ['light', 'dark', 'system'] as const

export type Appearance = (typeof APPEARANCES)[number]
export type ResolvedAppearance = Exclude<Appearance, 'system'>

/** Browser chrome / PWA theme-color. Matches sand-50 and sand-950. */
export const APPEARANCE_THEME_COLORS: Record<ResolvedAppearance, string> = {
  light: '#fcf8f3',
  dark: '#020100',
}

export function isAppearance(value: unknown): value is Appearance {
  return APPEARANCES.includes(value as Appearance)
}

/**
 * Runs before first paint so the document already carries the right appearance
 * when React hydrates. Kept dependency-free and inlined into <head>.
 */
export const appearanceBootScript = `(function(){try{
var stored=localStorage.getItem('${APPEARANCE_STORAGE_KEY}');
var appearance=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';
var dark=appearance==='dark'||(appearance==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
var root=document.documentElement;
root.classList.toggle('dark',dark);
root.setAttribute('data-color-scheme',dark?'dark':'light');
root.style.colorScheme=dark?'dark':'light';
var meta=document.querySelector('meta[name="theme-color"]');
if(meta) meta.setAttribute('content',dark?'${APPEARANCE_THEME_COLORS.dark}':'${APPEARANCE_THEME_COLORS.light}');
}catch(e){}})();`
