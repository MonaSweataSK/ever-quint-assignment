import React from 'react';

export type ModalDimensions = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top' | 'left' | 'right';

export interface ModalProps {
  /**
   * Whether the modal is currently open
   */
  isOpen: boolean;
  /**
   * Callback when the modal is closed
   */
  onClose: () => void;
  /**
   * Callback when the modal is opened
   */
  onOpen?: () => void;
  /**
   * Dimensions of the modal
   * @default 'md'
   */
  dimensions?: ModalDimensions;
  /**
   * Vertical position of the modal
   * @default 'center'
   */
  position?: ModalPosition;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Additional actions to render in the header
   */
  headerActions?: React.ReactNode;
  /**
   * Whether to remove default padding from the modal body
   * @default false
   */
  noPadding?: boolean;
  /**
   * Additional CSS classes for the modal container
   */
  className?: string;
}
