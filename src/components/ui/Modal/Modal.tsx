import React, { useEffect, useState, useRef } from 'react';
import { type ModalProps, type ModalPosition } from './type';

/**
 * A highly customizable and accessible Modal component.
 * Features smooth animations, backdrop dismissal, and flexible dimensions/positioning.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  dimensions = 'md',
  position = 'center',
  title,
  children,
  className = '',
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle onOpen callback and conditional rendering for animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      onOpen?.();
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Small delay to allow exit animation
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = 'auto';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  // Dimension-based styles
  const isSide = position === 'left' || position === 'right';

  const dimensionStyles = {
    sm: isSide ? 'w-80' : 'max-w-md',
    md: isSide ? 'w-96' : 'max-w-2xl',
    lg: isSide ? 'w-[32rem]' : 'max-w-4xl',
    xl: isSide ? 'w-[48rem]' : 'max-w-6xl',
    full: isSide ? 'w-screen' : 'max-w-[95vw] h-[90vh]',
  };

  // Position-based styles
  const positionStyles: Record<ModalPosition, string> = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-20',
    left: 'items-stretch justify-start',
    right: 'items-stretch justify-end',
  };

  // Animation logic for content
  const getAnimationClasses = () => {
    if (!isOpen) {
      if (position === 'left') return 'opacity-0 -translate-x-full';
      if (position === 'right') return 'opacity-0 translate-x-full';
      return 'opacity-0 scale-95 translate-y-4';
    }
    return 'opacity-100 scale-100 translate-y-0';
  };

  return (
    <div 
      className={`fixed inset-0 z-[200] flex transition-all duration-300 ${positionStyles[position]}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content container */}
      <div 
        ref={containerRef}
        className={`
          relative w-full bg-white shadow-2xl border-gray-100 flex flex-col overflow-hidden
          transition-all duration-300 transform
          ${isSide ? 'h-full rounded-none' : 'mx-6 rounded-2xl border'}
          ${dimensionStyles[dimensions]}
          ${getAnimationClasses()}
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className={`text-lg font-semibold text-gray-900 leading-none ${!title ? 'opacity-0' : ''}`}>
            {title || 'Modal'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            aria-label="Close Modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
