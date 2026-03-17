

export type TagVariant = 'primary' | 'success' | 'warning' | 'info' | 'error' | 'gray' | 'indigo' | 'violet' | 'fuchsia' | 'rose' | 'amber' | 'emerald' | 'teal' | 'sky' | 'slate';
export type TagSize = 'sm' | 'md' | 'lg';

export interface Tag {
  id: string;
  name: string;
  color?: string; // Hex color
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface TagProps {
  /**
   * The text to display inside the tag
   */
  label: string;
  /**
   * The visual style variant
   * @default 'primary'
   */
  variant?: TagVariant;
  /**
   * The size of the tag
   * @default 'md'
   */
  size?: TagSize;
  /**
   * Whether to show a decorative dot
   * @default false
   */
  dot?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}
