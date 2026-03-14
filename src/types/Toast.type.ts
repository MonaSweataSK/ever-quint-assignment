import React from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 
  | 'top-right' 
  | 'top-left' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'top-center' 
  | 'bottom-center';

export interface ToastProps {
  /**
   * The message to display
   */
  text: string;
  /**
   * The visual style variant
   * @default 'info'
   */
  variant?: ToastVariant;
  /**
   * Duration in ms before auto-dismissing
   * @default 3000
   */
  duration?: number;
  /**
   * Where the toast appears on the screen
   * @default 'top-right'
   */
  position?: ToastPosition;
  /**
   * Icon on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon on the right
   */
  rightIcon?: React.ReactNode;
  /**
   * Callback when the toast is dismissed
   */
  onClose?: () => void;
}
