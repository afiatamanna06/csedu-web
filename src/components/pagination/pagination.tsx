import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center space-x-4 py-8 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
            currentPage === pageNumber
              ? 'bg-[#E8EDF5] text-black font-bold'
              : 'hover:bg-gray-100 text-black'
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;