import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  /**
   * The label for the select field
   */
  label?: string;
  /**
   * List of options to choose from
   */
  options: SelectOption[];
  /**
   * The currently selected value
   */
  value?: string;
  /**
   * Default selected value
   */
  defaultValue?: string;
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Whether the user can search through options
   * @default false
   */
  searchable?: boolean;
  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right (usually a chevron)
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Unique ID for the select field
   */
  id?: string;
}
