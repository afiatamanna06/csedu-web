import React, { useState, useRef, useEffect } from "react";

const options = ["BSc", "MSc", "M.Phil", "PhD", "Overall"];

const AcademicCalendar: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Overall"]);
  const [imagePath, setImagePath] = useState<string | null>("/all.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionToggle = (option: string) => {
    let updated: string[];

    if (selectedOptions.includes(option)) {
      updated = selectedOptions.filter((opt) => opt !== option);
    } else {
      updated = [...selectedOptions.filter((v) => v !== "Overall"), option];
    }

    if (updated.length === 0) updated = ["Overall"];

    setSelectedOptions(updated);
  };

  const handleFilter = () => {
    const hasBScOrMSc =
      selectedOptions.includes("BSc") || selectedOptions.includes("MSc");
    const hasPhDOrMPhil =
      selectedOptions.includes("PhD") || selectedOptions.includes("M.Phil");
    const isOverall = selectedOptions.includes("Overall");

    if (isOverall) {
      setImagePath("/all.png");
    } else if (hasBScOrMSc && !hasPhDOrMPhil) {
      setImagePath("/bsc.jpg");
    } else if (hasPhDOrMPhil && !hasBScOrMSc) {
      setImagePath("/phd.jpg");
    } else if (hasBScOrMSc && hasPhDOrMPhil) {
      setImagePath("/all.png");
    } else {
      setImagePath(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="py-12">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#13274C] mb-4 ml-4 md:ml-12">
          Academic Calendar
        </h2>
        <p className="text-gray-700 mb-6 ml-4 md:ml-12">
          Select program types from the dropdown and apply the filter to view the calendar.
        </p>
      </section>

      {/* Custom Dropdown */}
      <div className="ml-4 md:ml-12 mb-6 flex flex-col md:flex-row items-start gap-4">
        <div className="relative w-64" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedOptions.length > 0
              ? selectedOptions.join(", ")
              : "Select Option"}
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionToggle(option)}
                    className="mr-2 accent-blue-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleFilter}
          className="bg-[#13274C] text-white px-6 py-3 rounded-md hover:bg-[#ECB31D] hover:text-black transition duration-300"
        >
          Filter
        </button>
      </div>

      {/* Image Output */}
      <div className="ml-4 md:ml-12 mr-4 md:mr-12">
        {imagePath ? (
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <img
              src={imagePath}
              alt="Academic Calendar"
              className="w-full h-auto rounded"
            />
          </div>
        ) : (
          <p className="text-gray-500">
            Please select options and click "Filter" to view the calendar.
          </p>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendar;
