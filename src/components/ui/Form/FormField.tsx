import React from 'react';

interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  onDoubleClick?: () => void;
}

/**
 * A reusable form field wrapper that handles labels and error messages.
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
  className = '',
  htmlFor,
  onDoubleClick,
}) => {
  return (
    <div 
      className={`flex flex-col gap-1.5 ${className}`}
      onDoubleClick={onDoubleClick}
    >
      {label && (
        <label 
          htmlFor={htmlFor}
          className="text-sm font-semibold text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}
      
      <div className="relative">
        {children}
      </div>

      {error && (
        <p className="text-xs font-medium text-rose-500 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
