import React from 'react';
import type { TagProps } from '../../../types/Tag.type';

/**
 * A versatile Tag/Badge component for categorization and status display.
 * Designed with a premium aesthetic using soft colors and clear typography.
 */
export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';

  // Variant-specific styles (Premium soft palette)
  const variantStyles = {
    primary: 'bg-blue-50 text-blue-700 border border-blue-100',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    error: 'bg-rose-50 text-rose-700 border border-rose-100',
    info: 'bg-sky-50 text-sky-700 border border-sky-100',
    gray: 'bg-gray-50 text-gray-700 border border-gray-100',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2',
  };

  // Dot styles
  const dotStyles = {
    primary: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-sky-500',
    gray: 'bg-gray-500',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <span className={combinedClasses}>
      {dot && (
        <span 
          className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} 
          aria-hidden="true" 
        />
      )}
      {label}
    </span>
  );
};

export default Tag;
