import React from 'react';
import type { InputProps } from '../../../types/Input.type';

/**
 * A generic and robust Input component.
 * Supports various HTML input types with a consistent premium design.
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  required,
  disabled,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  // Base styles for the input container
  const containerClasses = `flex flex-col gap-1.5 w-full ${className}`;

  // Base styles for the input field itself
  const baseInputClasses = `
    flex w-full rounded-lg border bg-white px-3 py-2.5 text-sm ring-offset-white
    placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
    transition-all duration-200 ease-in-out
  `;

  // Status-based styles
  const statusClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-200 focus:ring-blue-500 hover:border-gray-300';

  // Adjust padding if icons are present
  const iconPaddingClasses = `
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
  `;

  const inputClasses = `${baseInputClasses} ${statusClasses} ${iconPaddingClasses}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500 text-xs" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center justify-center text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          required={required}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center justify-center text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs font-medium text-red-500 mt-0.5"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
