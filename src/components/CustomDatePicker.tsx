import React, { useState, useRef, useEffect } from 'react';
import '../styles/custom-date-picker.css';

interface CustomDatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select Date',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [displayDate, setDisplayDate] = useState(new Date()); // For calendar navigation
  const containerRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setDisplayDate(date);
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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    // Adjust for timezone offset to ensure the string representation is correct local date
    // Or simpler: just use the format YYYY-MM-DD
    const dateString = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    setSelectedDate(newDate);
    setIsOpen(false);
    if (onChange) {
      onChange(dateString);
    }
  };

  const renderCalendarDays = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      const isToday = new Date().toDateString() === currentDate.toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return placeholder;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className={`custom-datepicker-container ${className}`} ref={containerRef}>
      <div
        className={`custom-datepicker-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{formatDate(selectedDate)}</span>
        <span className="custom-datepicker-icon">📅</span>
      </div>

      <div className={`custom-datepicker-calendar ${isOpen ? 'is-open' : ''}`}>
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={handlePrevMonth}>&lt;</button>
          <span className="calendar-title">
            {displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button className="calendar-nav-btn" onClick={handleNextMonth}>&gt;</button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
