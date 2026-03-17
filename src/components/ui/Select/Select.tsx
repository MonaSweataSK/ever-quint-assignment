import React, { useState, useRef, useEffect, useMemo } from 'react';
import Input from '../Input/Input';
import type { SelectProps, SelectOption } from '../../../types/Select.type';

/**
 * A custom Select component with support for searching, icons, and validation.
 * Reuses the Input component for a consistent look and feel.
 */
export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  defaultValue,
  onChange,
  searchable = false,
  leftIcon,
  rightIcon,
  disabled,
  error,
  placeholder = 'Select an option',
  required,
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with controlled value prop
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Find the label for the selected value
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === selectedValue),
    [options, selectedValue]
  );

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    setSearchTerm('');
    setIsOpen(false);
    onChange?.(option.value);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    if (searchable && isOpen) {
      // Don't toggle if we're already open and trying to type
      e.stopPropagation();
      return;
    }
    
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) setSearchTerm('');
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger: Reusing Input component */}
      <div className="relative" onClick={handleInputClick}>
        <Input
          id={id}
          label={label}
          required={required}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={!searchable || !isOpen}
          value={isOpen && searchable ? searchTerm : selectedOption?.label || ''}
          onChange={(e) => {
            if (searchable && isOpen) {
              setSearchTerm(e.target.value);
            }
          }}
          onClick={(e) => isOpen && searchable && e.stopPropagation()}
          autoComplete="off"
          className="cursor-pointer"
          leftIcon={leftIcon}
          rightIcon={
            rightIcon || (
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )
          }
        />
        {/* Transparent overlay removed for searchable to allow input interaction */}
        {(!searchable || !isOpen) ? (
          <div className="absolute inset-0 top-7 cursor-pointer" />
        ) : null}
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-xl max-h-60 overflow-y-auto transform transition-all duration-200 ease-out animate-in fade-in slide-in-from-top-2">
          {filteredOptions.length > 0 ? (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <button
                  key={option.key || option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full text-left px-3 py-2 text-sm rounded-md transition-colors
                    ${selectedValue === option.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 italic">No options found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
