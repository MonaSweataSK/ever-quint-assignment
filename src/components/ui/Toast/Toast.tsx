import React, { useEffect, useState } from 'react';
import type { ToastProps } from '../../../types/Toast.type';

/**
 * A premium Toast component for ephemeral notifications.
 * Supports multiple positions, semantic variants, and smooth animations.
 */
export const Toast: React.FC<ToastProps> = ({
  text,
  variant = 'info',
  duration = 3000,
  position = 'top-right',
  leftIcon,
  rightIcon,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Position-based styles
  const positionClasses = {
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  };

  // Variant-based styles
  const variantStyles = {
    success: 'bg-emerald-600 text-white shadow-emerald-200 focus:ring-emerald-500',
    error: 'bg-rose-600 text-white shadow-rose-200 focus:ring-rose-500',
    warning: 'bg-amber-500 text-white shadow-amber-200 focus:ring-amber-500',
    info: 'bg-blue-600 text-white shadow-blue-200 focus:ring-blue-500',
  };

  // Animation classes
  const animationClasses = isVisible
    ? 'opacity-100 scale-100 translate-y-0'
    : 'opacity-0 scale-95 -translate-y-2';

  return (
    <div
      className={`
        fixed z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
        transition-all duration-300 ease-out transform
        ${positionClasses[position]}
        ${variantStyles[variant]}
        ${animationClasses}
      `}
      role="alert"
    >
      {leftIcon && (
        <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 opacity-90">
          {leftIcon}
        </div>
      )}
      
      <p className="text-sm font-medium leading-tight">
        {text}
      </p>

      {rightIcon && (
        <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 opacity-90">
          {rightIcon}
        </div>
      )}

      {/* Close Button / Background dismiss indicator */}
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
        className="ml-2 p-1 rounded-md hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
