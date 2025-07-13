import React, { useState } from "react";
import { Plus, Trash2, Calendar, User, MapPin, Clock, FileText } from "lucide-react";
import { assets } from "../../../assets/assets";
// import type { Notice } from '../../../assets/assets'; // If you want to use Notice type, uncomment this

const AddNotice: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    pdfUrl: "",
    category: "general",
    date: new Date().toISOString().split("T")[0],
    expiryDate: "",
    author: "",
    location: "",
    time: "",
    isArchived: false,
  });

  const [attachments, setAttachments] = useState<Array<{ name: string; url: string; size: string }>>([]);
  const [newAttachment, setNewAttachment] = useState({ name: "", url: "", size: "" });

  const pdfOptions = [
    { value: "", label: "No PDF" },
    { value: assets.pdf1, label: "PDF Document 1" },
    { value: assets.pdf2, label: "PDF Document 2" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      title: "",
      description: "",
      detailedDescription: "",
      pdfUrl: "",
      category: "general",
      date: new Date().toISOString().split("T")[0],
      expiryDate: "",
      author: "",
      location: "",
      time: "",
      isArchived: false,
    });
    setAttachments([]);
    setNewAttachment({ name: "", url: "", size: "" });
    alert("Notice added!");
  };

  const handleAddAttachment = () => {
    if (newAttachment.name && newAttachment.url && newAttachment.size) {
      setAttachments([...attachments, newAttachment]);
      setNewAttachment({ name: "", url: "", size: "" });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      detailedDescription: "",
      pdfUrl: "",
      category: "general",
      date: new Date().toISOString().split("T")[0],
      expiryDate: "",
      author: "",
      location: "",
      time: "",
      isArchived: false,
    });
    setAttachments([]);
    setNewAttachment({ name: "", url: "", size: "" });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-[#3D007B] mb-4">Add New Notice</h2>
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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              <select
                value={formData.pdfUrl}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800"
              >
                {pdfOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#7C3AED] transition-colors text-sm text-gray-800 placeholder:text-gray-400"
                placeholder="Time, duration, or schedule details"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="File name"
                value={newAttachment.name}
                onChange={(e) => setNewAttachment({ ...newAttachment, name: e.target.value })}
                className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors text-sm"
              />
              <input
                type="text"
                placeholder="File URL"
                value={newAttachment.url}
                onChange={(e) => setNewAttachment({ ...newAttachment, url: e.target.value })}
                className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors text-sm"
              />
              <input
                type="text"
                placeholder="File size (e.g., 2.3 MB)"
                value={newAttachment.size}
                onChange={(e) => setNewAttachment({ ...newAttachment, size: e.target.value })}
                className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors text-sm"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="inline-flex items-center justify-center px-3 py-1.5 bg-yellow-400 text-[#3D007B] font-semibold rounded-md hover:bg-yellow-500 transition-colors text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>
          </div>
          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md hover:bg-[#f4f0ff] transition-colors">
                  <div className="flex-1">
                    <span className="font-medium text-[#3D007B] text-sm">{attachment.name}</span>
                    <span className="text-gray-500 text-xs ml-2">({attachment.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isArchived"
            checked={formData.isArchived}
            onChange={(e) => setFormData({ ...formData, isArchived: e.target.checked })}
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
            Add Notice
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotice;