import React, { useState, useEffect } from "react";
import { Calendar, User, MapPin, Clock, FileText } from "lucide-react";
import { useSearch } from "@tanstack/react-router";
import { sampleNotices, type Notice } from "../../../assets/assets"; // adjust path if needed
import { toast } from "react-toastify";
import axios from "axios";

const EditNotice = () => {
  const search = useSearch({ from: "__root__" });
  const noticeId = Number(search.id);

  // Find the notice by ID from sampleNotices (replace with API call in real app)
  const foundNotice = sampleNotices.find((n) => n.id === noticeId);

  const initialData: Notice = foundNotice || {
    id: 0, // Add this line to match Notice interface
    title: "",
    description: "",
    detailedDescription: "",
    pdfFile: null as File | null,
    category: "general" as "general" | "academic" | "administrative",
    date: new Date().toISOString().split("T")[0],
    expiryDate: "",
    author: "",
    location: "",
    time: "",
    isArchived: false as const,
  };

  const [formData, setFormData] = useState<Notice>(initialData);

  // If the notice changes (e.g. on navigation), update formData
  useEffect(() => {
    setFormData(initialData);
  }, [noticeId]);

  // If no id is provided, you can show a message or redirect
  if (!search.id || isNaN(noticeId)) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-600 mb-4">Invalid Notice</h2>
        <p>No notice selected or invalid notice ID.</p>
      </div>
    );
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, pdfFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, pdfFile: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("detailed_description", formData.detailedDescription);
    form.append("category", formData.category);
    form.append("date", formData.date);
    form.append("expiry_date", formData.expiryDate);
    form.append("author", formData.author);
    form.append("location", formData.location);
    form.append("time", formData.time);
    if (formData.pdfFile) {
      form.append("pdf_file", formData.pdfFile);
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/notice/update/${formData.id}`,
        form,
        {
          headers: {
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message || "Notice updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to update notice.");
    }
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-[#3D007B] mb-4">Edit Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Notice Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md transition-all duration-200 focus:w-[102%] hover:border-[#7C3AED] text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Enter notice title"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md transition-all duration-200 focus:w-[102%] hover:border-[#7C3AED] text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Brief description for preview"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.detailedDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detailedDescription: e.target.value,
                  })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md transition-all duration-200 focus:w-[102%] hover:border-[#7C3AED] text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Full detailed description"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as
                      | "general"
                      | "academic"
                      | "administrative",
                  })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              >
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="administrative">Administrative</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <FileText className="w-3 h-3 inline mr-1" />
                PDF Document
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="block w-full text-sm text-gray-800 cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#3D007B] hover:file:bg-yellow-100"
              />
              {formData.pdfFile && (
                <span className="text-xs text-gray-600 mt-1 block">
                  Selected: {formData.pdfFile.name}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                Publication Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Clock className="w-3 h-3 inline mr-1" />
                Expiry Date *
              </label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <User className="w-3 h-3 inline mr-1" />
                Author *
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Author name and designation"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <MapPin className="w-3 h-3 inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Event location or department"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Clock className="w-3 h-3 inline mr-1" />
                Time Details
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Time, duration, or schedule details"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isArchived"
            checked={formData.isArchived}
            onChange={(e) =>
              setFormData({ ...formData, isArchived: e.target.checked })
            }
            className="w-3 h-3 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
          />
          <label htmlFor="isArchived" className="ml-2 text-xs text-[#3D007B]">
            Archive this notice (will not be visible to users)
          </label>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-1.5 border border-gray-300 text-[#3D007B] rounded-md hover:bg-[#f4f0ff] transition-colors cursor-pointer text-sm"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-yellow-400 text-[#3D007B] font-semibold rounded-md hover:bg-yellow-500 transition-colors cursor-pointer text-sm"
          >
            Update Notice
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotice;
