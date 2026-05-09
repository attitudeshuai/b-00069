import React, { useState, useRef, useEffect } from 'react';
import '../styles/custom-select.css';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: (string | Option)[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to objects
  const normalizedOptions: Option[] = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const currentLabel = normalizedOptions.find(opt => opt.value === selectedValue)?.label || placeholder;

  return (
    <div className={`custom-select-container ${className}`} ref={containerRef}>
      <div
        className={`custom-select-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLabel}</span>
        <svg
          className="custom-select-arrow"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L1 4H11L6 9Z"
            fill={isOpen ? "#667eea" : "#6b7280"}
          />
        </svg>
      </div>
      <div className={`custom-select-options ${isOpen ? 'is-open' : ''}`}>
        {normalizedOptions.map((option, index) => (
          <div
            key={`${option.value}-${index}`}
            className={`custom-select-option ${option.value === selectedValue ? 'selected' : ''}`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
