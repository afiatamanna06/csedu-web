import { useState } from "react";

const DateTimePicker = ({ label, selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    if (!date) return false;
    const selected = new Date(selectedDate);
    return date.getDate() === selected.getDate() &&
           date.getMonth() === selected.getMonth() &&
           date.getFullYear() === selected.getFullYear();
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (date) => {
    if (!date || isPastDate(date)) return;
    onDateChange(formatDate(date));
    setIsOpen(false);
  };

  return (
    <div className="relative z-10">
      {/* Label */}
      <div className="bg-[#FFC300] py-2.5 rounded-t-lg border-2 border-[#FFC300]">
        <div className="text-center text-sm font-medium">
          {label}
        </div>
      </div>

      {/* Selected Date Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border-2 border-[#FFC300] rounded-b-lg cursor-pointer -mt-[2px]"
      >
        <div className="px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm truncate pr-2">
            {selectedDate}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="absolute z-20 w-[320px] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-sm font-medium">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Weekday Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {generateCalendarDays().map((date, index) => (
                <div
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className={`
                    text-center py-2 text-sm rounded-full
                    ${date ? 'cursor-pointer' : ''}
                    ${isPastDate(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${
                      isSelected(date)
                        ? 'bg-[#13274C] text-white'
                        : isToday(date)
                        ? 'bg-[#FFC300] text-[#13274C]'
                        : date
                        ? 'hover:bg-gray-100'
                        : ''
                    }
                  `}
                >
                  {date ? date.getDate() : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker; 