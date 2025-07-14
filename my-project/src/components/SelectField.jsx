import { useState } from "react";

const ChevronDownIcon = () => (
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
);

const SelectField = ({
  label,
  value,
  options,
  onChange,
  className = "",
  nested = false,
  zIndex = 10
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${nested ? '' : 'z-[' + zIndex + ']'} ${className}`}>
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
          <ChevronDownIcon />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
