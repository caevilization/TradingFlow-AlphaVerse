import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '../../../../../utils/utils';

interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Search...',
  className,
  disabled = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setSearch('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(i => (i >= filteredOptions.length - 1 ? 0 : i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(i => (i <= 0 ? filteredOptions.length - 1 : i - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? search : selectedOption?.label || ''}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            'w-full px-3 py-2 text-sm bg-white dark:bg-tf-base-bg1 rounded-md',
            'border border-tf-base-bg2-lmode dark:border-tf-base-bg2',
            'focus:border-tf-accent-primary-light dark:focus:border-tf-accent-primary focus:ring-1',
            'focus:ring-tf-accent-primary-light dark:focus:ring-tf-accent-primary',
            'placeholder:text-tf-base-subtext-lmode dark:placeholder:text-tf-base-subtext',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'disabled:bg-tf-base-bg2-lmode/10 dark:disabled:bg-tf-base-bg2/10',
            className
          )}
        />
        <SearchIcon className="absolute right-3 top-2.5 h-4 w-4 text-tf-text-secondary pointer-events-none" />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={cn(
                'px-3 py-2 text-sm cursor-pointer',
                'hover:bg-tf-accent-primary-light/10 dark:hover:bg-tf-accent-primary/10',
                index === highlightedIndex &&
                  'bg-tf-accent-primary-light/10 dark:bg-tf-accent-primary/10',
                option.value === value &&
                  'text-tf-accent-primary-light dark:text-tf-accent-primary font-medium'
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
