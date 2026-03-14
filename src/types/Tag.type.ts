

export type TagVariant = 'primary' | 'success' | 'warning' | 'info' | 'error' | 'gray';
export type TagSize = 'sm' | 'md' | 'lg';

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
