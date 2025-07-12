import React, { useState, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import NoticeCard from '@/components/notice/noticecard';
import Pagination from '@/components/pagination/pagination';
import { sampleNotices, noticeCategories} from '@/assets/assets';
import { getActiveNotices, getArchivedNotices } from '@/utils/noticeutils';

const Notice: React.FC = () => {
  const location = useLocation();
  
  // Check if current path is archived
  const isArchivedPage = location.pathname === '/news/notice/archived';
  const [showArchived, setShowArchived] = useState(isArchivedPage);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Update showArchived when route changes
  useEffect(() => {
    setShowArchived(isArchivedPage);
  }, [isArchivedPage]);

  // Reset page when switching between active and archived
  useEffect(() => {
    setCurrentPage(1);
  }, [showArchived]);

  // Generate years from 2005 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2004 }, (_, i) => 2005 + i).reverse();
  
  // Months array
  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    
    switch(filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'year':
        setSelectedYear(value);
        break;
      case 'month':
        setSelectedMonth(value);
        break;
      case 'sort':
        setSortOrder(value);
        break;
    }
  };

  // Use active or archived notices based on showArchived state
  const noticesToShow = showArchived ? getArchivedNotices(sampleNotices) : getActiveNotices(sampleNotices);

  const filteredNotices = noticesToShow.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Year and Month filtering
    let matchesYearMonth = true;
    if (selectedYear || selectedMonth) {
      const noticeDate = new Date(notice.date);
      const noticeYear = noticeDate.getFullYear().toString();
      const noticeMonth = (noticeDate.getMonth() + 1).toString().padStart(2, '0');
      
      if (selectedYear && noticeYear !== selectedYear) {
        matchesYearMonth = false;
      }
      if (selectedMonth && noticeMonth !== selectedMonth) {
        matchesYearMonth = false;
      }
    }
    
    return matchesCategory && matchesSearch && matchesYearMonth;
  }).sort((a, b) => {
    // Sort by date based on sortOrder
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (sortOrder === 'newest') {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  const clearYearMonthFilters = () => {
    setSelectedYear('');
    setSelectedMonth('');
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

const toggleArchived = () => {
  setSelectedCategory('all');
  setSelectedYear('');
  setSelectedMonth('');
  setSearchQuery('');

  if (showArchived) {
    window.location.href = '/news/notice';
  } else {
    window.location.href = '/news/notice/archived';
  }
};


  return (
    <div className="bg-gray-50 py-16 pt-40 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Notice Board title */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {/* Left side - Title with icon */}
            <div className="flex items-center">
              <svg 
                className="h-8 w-8 text-primary mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {showArchived ? (
                <h2 className="text-3xl font-bold text-primary">
                  Archived Notices
                </h2>
              ) : (
                <h2 className="text-3xl font-bold text-primary">
                  Notice & Announcements
                </h2>
              )}
            </div>

            {/* Right side - Archive/Back button */}
            <div>
              {!showArchived && (
                <button
                  onClick={toggleArchived}
                  className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-primary hover:bg-yellow-500 hover:text-primary rounded-md transition-all duration-200 font-medium text-sm cursor-pointer hover:shadow-md"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  View Archived
                </button>
              )}
              
              {showArchived && (
                <button
                  onClick={toggleArchived}
                  className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-primary hover:bg-yellow-500 hover:text-primary rounded-md transition-all duration-200 font-medium text-sm cursor-pointer hover:shadow-md"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Active
                </button>
              )}
            </div>
          </div>
          <div className="w-80 h-1 bg-primary-y mb-8"></div>
        </div>

        {/* Archive Notice */}
        {showArchived && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-800">
              <svg 
                className="w-5 h-5 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">
                These notices have been automatically archived based on their expiry dates or manual archiving.
              </p>
            </div>
          </div>
        )}
        
        {/* Filter and Search Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Left Side - Category and Year/Month Dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Notice Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="border border-gray-300 text-gray-dark px-3 py-1.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-sm cursor-pointer hover:border-gray-400 hover:shadow-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              {noticeCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select
              value={selectedYear}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="cursor-pointer border border-gray-300 text-gray-dark px-3 py-1.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-sm hover:border-gray-400 hover:shadow-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Month Dropdown */}
            <select
              value={selectedMonth}
              onChange={(e) => handleFilterChange('month', e.target.value)}
              className="cursor-pointer border border-gray-300 text-gray-dark px-3 py-1.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-sm hover:border-gray-400 hover:shadow-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="cursor-pointer border border-gray-300 text-gray-dark px-3 py-1.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-sm hover:border-gray-400 hover:shadow-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="oldest">Oldest First</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Clear Year/Month Button */}
            {(selectedYear || selectedMonth) && (
              <button
                onClick={clearYearMonthFilters}
                className="cursor-pointer px-3 py-1.5 text-sm text-red-600 hover:text-red-800 border border-red-300 hover:border-red-400 rounded transition-colors hover:shadow-sm"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Right Side - Search Section */}
          <div className="flex items-center gap-4">
            {/* Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for notices..."
                className="border border-gray-300 text-gray-800 px-3 py-1.5 rounded-md text-sm w-70 focus:outline-none focus:ring-1 focus:ring-gray-300 pr-10" 
              />
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pr-3"
                type="submit">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Results Info */}
        {filteredNotices.length > 0 && (
          <div className="mb-6 text-md text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredNotices.length)} of {filteredNotices.length} results
          </div>
        )}

        {/* Notices List */}
        <div className="space-y-4 mb-12 px-4">
          {currentNotices.length > 0 ? (
            currentNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} isArchived={showArchived} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full py-8">
              {searchQuery ? `No notices found for "${searchQuery}"` : 'No notices found for the selected filters.'}
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Notice;