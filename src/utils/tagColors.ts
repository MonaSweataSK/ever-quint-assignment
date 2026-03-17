
export type TagColorVariant = 'indigo' | 'violet' | 'fuchsia' | 'rose' | 'amber' | 'emerald' | 'teal' | 'sky' | 'slate';

interface TagColorScheme {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

export const TAG_COLOR_SCHEMES: Record<TagColorVariant, TagColorScheme> = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', dot: 'bg-indigo-500' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100', dot: 'bg-violet-500' },
  fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-100', dot: 'bg-fuchsia-500' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', dot: 'bg-rose-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-500' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-100', dot: 'bg-teal-500' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100', dot: 'bg-sky-500' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100', dot: 'bg-slate-500' },
};

const VARIANTS = Object.keys(TAG_COLOR_SCHEMES) as TagColorVariant[];

/**
 * Generates a deterministic color scheme for a given tag name.
 */
export function getTagColorScheme(tagName: string): TagColorVariant {
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % VARIANTS.length;
  return VARIANTS[index];
}
