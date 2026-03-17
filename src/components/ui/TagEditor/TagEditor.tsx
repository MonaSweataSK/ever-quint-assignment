import React, { useState, useRef, type KeyboardEvent } from 'react';
import type { TagEditorProps } from '../../../types/TagEditor.type';

/**
 * A premium Tag Editor component.
 * Allows users to add tags by pressing Enter and remove them with a cross icon.
 */
export const TagEditor: React.FC<TagEditorProps> = ({
  tags,
  onChange,
  placeholder = 'Add a tag...',
  limit,
  label,
  error,
  required,
  disabled,
  suggestions = [],
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = React.useMemo(() => {
    if (!inputValue.trim()) return [];
    return suggestions.filter(
      (s) => 
        s.toLowerCase().includes(inputValue.toLowerCase()) && 
        !tags.some(t => t.toLowerCase() === s.toLowerCase())
    ).slice(0, 5);
  }, [suggestions, inputValue, tags]);

  const addTag = (val: string) => {
    const trimmedVal = val.trim();
    if (trimmedVal && !tags.some(t => t.toLowerCase() === trimmedVal.toLowerCase())) {
      if (!limit || tags.length < limit) {
        onChange([...tags, trimmedVal]);
        setInputValue('');
        setHighlightedIndex(-1);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
        addTag(filteredSuggestions[highlightedIndex]);
      } else {
        addTag(inputValue);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Escape') {
      setHighlightedIndex(-1);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      const newTags = [...tags];
      newTags.pop();
      onChange(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (disabled) return;
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  // Base container styles mimicking a premium input
  const containerClasses = `
    group flex flex-wrap gap-2 items-center w-full min-h-[44px] 
    rounded-lg border px-3 py-1.5 transition-all duration-200 ease-in-out
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white cursor-text'}
    ${error ? 'border-rose-500' : isFocused ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-gray-200 hover:border-gray-300'}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      {label && (
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-rose-500 text-xs">*</span>}
        </label>
      )}

      <div
        className={containerClasses}
        onClick={handleContainerClick}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={(e) => {
          // Prevent blur if clicking on a suggestion
          if (suggestionsRef.current?.contains(e.relatedTarget as Node)) return;
          setIsFocused(false);
          setHighlightedIndex(-1);
        }}
      >
        {/* Render Tags */}
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium animate-in zoom-in-95 duration-200"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="hover:bg-blue-100 p-0.5 rounded-full transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </span>
        ))}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHighlightedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled || (limit ? tags.length >= limit : false)}
          className={`
            flex-1 min-w-[120px] outline-none text-sm bg-transparent
            placeholder:text-gray-400 text-gray-900
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          autoComplete="off"
        />

        {/* Limit Indicator */}
        {limit && (
          <div className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider tabular-nums">
            {tags.length} / {limit}
          </div>
        )}
      </div>

      {/* Suggestion Dropdown */}
      {isFocused && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-[60] left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="p-1">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`
                  w-full text-left px-3 py-2 text-sm rounded-md transition-colors
                  ${highlightedIndex === index ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs font-medium text-rose-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default TagEditor;

