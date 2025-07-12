"use client"

import type React from "react"
import type { Notice } from "@/assets/assets"
import { isExpired } from "@/utils/dateutils"
import "../../styles/colors.css"

interface LatestNoticeCardProps {
  notice: Notice
  onDownloadPDF: (item: Notice, e: React.MouseEvent) => void
  onViewDetails: (item: Notice, e: React.MouseEvent) => void
}

const LatestNotice: React.FC<LatestNoticeCardProps> = ({ notice, onDownloadPDF, onViewDetails }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const noticeIsArchived = isExpired(notice?.expiryDate)

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2">
              {notice.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <svg className="w-4 h-4 text-primary-y" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 7h12v8a1 1 0 01-1 1H5a1 1 0 01-1-1V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formatDate(notice.date)}</span>
            </div>
            {notice.description && <p className="text-gray-600 text-sm line-clamp-2 mb-3">{notice.description}</p>}
            {notice.category && (
              <span className="inline-block bg-light-purple text-purple text-xs px-2 py-1 rounded-full">
                {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            {/* First row: Archived badge and Download PDF button */}
            <div className="flex items-center gap-3">
              {noticeIsArchived && (
                <div className="bg-archive-bg text-archive-text border border-archive-border px-1.5 py-0.5 rounded text-xs font-medium shadow-sm">
                  Archived
                </div>
              )}
              <button
                onClick={(e) => onDownloadPDF(notice, e)}
                className="flex items-center gap-2 px-1 py-1.5 bg-primary-y hover:bg-primary-y/90 text-primary rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer w-32"
                title="Download PDF"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </button>
            </div>
            {/* Second row: View Details button positioned below Download PDF */}
            <div className="flex justify-end">
              <button
                onClick={(e) => onViewDetails(notice, e)}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer w-32"
                title="View Details"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestNotice