import { useState } from "react";

const DatePicker = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const dates = generateDates();

  return (
    <div className="relative z-10">
      {/* Label */}
      <div className="bg-[#FFC300] py-2.5 rounded-t-lg border-2 border-[#FFC300]">
        <div className="text-center text-sm font-medium">
          {label}
        </div>
      </div>

      {/* Select Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border-2 border-[#FFC300] rounded-b-lg cursor-pointer -mt-[2px]"
      >
        <div className="px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm truncate pr-2">{value}</span>
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

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {dates.map((date, index) => (
              <div
                key={index}
                className="px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  onChange(formatDate(date));
                  setIsOpen(false);
                }}
              >
                {formatDate(date)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker; 