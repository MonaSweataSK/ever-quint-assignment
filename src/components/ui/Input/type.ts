import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The label for the input
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Icon to display to the left of the input
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display to the right of the input
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the field is required (will show an asterisk)
   */
  required?: boolean;
}
