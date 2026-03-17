

export interface TagEditorProps {
  /** Array of current tags */
  tags: string[];
  /** Callback when tags change */
  onChange: (tags: string[]) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Maximum number of tags allowed */
  limit?: number;
  /** Label for the component */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Whether the component is required */
  required?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Array of existing tags in the workspace for suggestions */
  suggestions?: string[];
  /** Additional CSS classes */
  className?: string;
}
