"use client"

import type React from "react"

import { useParams } from "@tanstack/react-router"
import { Calendar, MapPin, Clock, User, ChevronLeft, Share2, Printer } from "lucide-react"
import { sampleNotices, type Notice } from "../../assets/assets"
import { isExpired } from "../../utils/dateutils"
import LatestNotice from "../../components/notice/latestnotice"

const NoticeDetails = () => {
  const { noticeId } = useParams({ from: "__root__" })

  // Find the notice item by ID - using sampleNotices
  const notice = sampleNotices.find((item) => item.id === Number.parseInt(noticeId))

  // Check if notice is archived based on expiry date
  const noticeIsArchived = isExpired(notice?.expiryDate)

  // If notice not found, show error message
  if (!notice) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notice Not Found</h2>
          <p className="text-gray-600 mb-6">The requested notice could not be found.</p>
          <button
            onClick={() => (window.location.href = "/news/notice")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Notices
          </button>
        </div>
      </div>
    )
  }

  // Get the latest notices (excluding current notice and archived status based on current view)
  const getLatestNotices = (currentNoticeId: string, limit = 2) => {
    return sampleNotices
      .filter((item) => {
        const itemIsArchived = isExpired(item.expiryDate)
        return item.id !== Number.parseInt(currentNoticeId) && itemIsArchived === noticeIsArchived
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: notice.title,
        text: notice.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Notice link copied to clipboard!")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDownloadPDF = (item: Notice, e: React.MouseEvent) => {
    e.stopPropagation()

    if (item.pdfFile) {
      const url = URL.createObjectURL(item.pdfFile)
      const link = document.createElement("a")
      link.href = url
      link.download = `${item.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      alert("PDF not available for this notice")
    }
  }

  const handleViewDetails = (item: Notice, e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `/news/notice/${item.id}`
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Change this line - increase px-4 to px-16 or px-20 for more horizontal padding */}
      <div className="w-full max-w-[1440px] mx-auto px-30 py-16">
        {/* Back Button - reduce top padding since we added py-16 */}
        <div className="pt-[90px] pb-[22px]">
          <button
            onClick={() => (window.location.href = noticeIsArchived ? "/news/notice/archived" : "/news/notice")}
            className="flex items-center gap-3 text-[#13274C] hover:text-[#13274C]/80 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold text-base leading-6">Back to Notice</span>
          </button>
        </div>
          {/* Main Title */}
          <div className="mb-[25px] flex justify-between items-start">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold text-[26px] leading-[39px] text-black max-w-[974px]">{notice.title}</h1>
              {noticeIsArchived && (
                <div className="bg-archive-bg text-archive-text border border-archive-border px-1.5 py-0.5 rounded text-xs font-medium shadow-sm">
                  Archived
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-shrink-0">
              <button
                onClick={handleShare}
                className="w-[40px] h-[40px] bg-[#FFF7ED] rounded-full flex items-center justify-center hover:bg-[#FFF7ED]/80 transition-colors cursor-pointer"
              >
                <Share2 className="w-5 h-5 text-[#565252]" />
              </button>
              <button
                onClick={() => window.print()}
                className="w-[40px] h-[40px] bg-[#FFF7ED] rounded-full flex items-center justify-center hover:bg-[#FFF7ED]/80 transition-colors cursor-pointer"
              >
                <Printer className="w-5 h-5 text-[#565252]" />
              </button>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-[#E5E7EB] mb-[25px]"></div>

          {/* Notice Info Grid */}
          <div className="grid grid-cols-2 gap-[642px] mb-[25px]">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-[43px] h-[40px] bg-[#EFF6FF] rounded flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-[21px] text-[#374151]">{formatDate(notice.date)}</p>
                  <p className="text-xs leading-[18px] text-[#6B7280]">Published Date</p>
                </div>
              </div>

              {notice.time && (
                <div className="flex items-center gap-4">
                  <div className="w-[43px] h-[40px] bg-[#F0FDF4] rounded flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-[21px] text-[#374151]">{notice.time}</p>
                    <p className="text-xs leading-[18px] text-[#6B7280]">Time</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {notice.author && (
                <div className="flex items-center gap-4">
                  <div className="w-[44px] h-[40px] bg-[#FFF7ED] rounded flex items-center justify-center">
                    <User className="w-6 h-6 text-[#EA580C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-[21px] text-[#374151]">{notice.author}</p>
                    <p className="text-xs leading-[18px] text-[#6B7280]">Author</p>
                  </div>
                </div>
              )}

              {notice.location && (
                <div className="flex items-center gap-4">
                  <div className="w-[43.8px] h-[38px] bg-[#FAF5FF] rounded flex items-center justify-center">
                    <MapPin className="w-[19.8px] h-[22px] text-[#9333EA]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-[21px] text-[#374151]">{notice.location}</p>
                    <p className="text-xs leading-[18px] text-[#6B7280]">Location</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-[#E5E7EB] mb-[30px]"></div>

          {/* Notice Content */}
          <div className="mb-[50px]">
            <div className="max-w-[1162px] text-l leading-[30px] text-[#374151] font-medium text-justify">
              {notice.detailedDescription ? (
                notice.detailedDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 whitespace-pre-line">
                    {paragraph.trim()}
                  </p>
                ))
              ) : (
                <p className="whitespace-pre-line">{notice.description}</p>
              )}
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-[#E5E7EB] mb-[60px]"></div>

          {/* Latest Notice Section */}
          <div className="mb-[60px]">
            <h2 className="font-semibold text-[26px] leading-[39px] text-black mb-[39px]">Latest Notice</h2>

            <div className="space-y-[37px] mb-[60px]">
              {getLatestNotices(noticeId).map((item) => (
                <LatestNotice
                  key={item.id}
                  notice={item}
                  onDownloadPDF={handleDownloadPDF}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => (window.location.href = noticeIsArchived ? "/news/notice/archived" : "/news/notice")}
                className="w-[150px] h-[40px] bg-yellow-400 border-[3px] border-yellow-400 rounded-md flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-colors cursor-pointer mx-auto"
              >
                <span className="font-semibold text-sm leading-5 text-[#13274C]">View More News</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default NoticeDetails
