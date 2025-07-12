import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, User, MapPin, Clock, FileText, Image as ImageIcon } from 'lucide-react';
import type { Notice } from '../../../assets/assets';
import { assets } from '../../../assets/assets';

interface AddNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (notice: Omit<Notice, 'id'>) => void;
}

const AddNoticeModal: React.FC<AddNoticeModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    image: '',
    pdfUrl: '',
    category: 'general' as Notice['category'],
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    author: '',
    location: '',
    time: '',
    isArchived: false,
  });

  const [attachments, setAttachments] = useState<Array<{ name: string; url: string; size: string }>>([]);
  const [newAttachment, setNewAttachment] = useState({ name: '', url: '', size: '' });

  const imageOptions = [
    { value: assets.iftar, label: 'Iftar Event' },
    { value: assets.food_fest, label: 'Food Festival' },
    { value: assets.research, label: 'Research' },
    { value: assets.award, label: 'Award Ceremony' },
    { value: assets.career, label: 'Career Event' },
    { value: assets.telco, label: 'Technology' },
    { value: assets.policy, label: 'Policy' },
    { value: assets.faculty, label: 'Faculty' },
    { value: assets.security, label: 'Security' },
    { value: assets.calender, label: 'Calendar Event' },
  ];

  const pdfOptions = [
    { value: '', label: 'No PDF' },
    { value: assets.pdf1, label: 'PDF Document 1' },
    { value: assets.pdf2, label: 'PDF Document 2' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const notice: Omit<Notice, 'id'> = {
      ...formData,
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    onAdd(notice);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      detailedDescription: '',
      image: '',
      pdfUrl: '',
      category: 'general',
      date: new Date().toISOString().split('T')[0],
      expiryDate: '',
      author: '',
      location: '',
      time: '',
      isArchived: false,
    });
    setAttachments([]);
    setNewAttachment({ name: '', url: '', size: '' });
  };

  const handleAddAttachment = () => {
    if (newAttachment.name && newAttachment.url && newAttachment.size) {
      setAttachments([...attachments, newAttachment]);
      setNewAttachment({ name: '', url: '', size: '' });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-[#3D007B]">Add New Notice</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f4f0ff] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#3D007B] border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-200 focus:w-[105%] hover:border-[#3D007B]"
                  placeholder="Enter notice title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-200 focus:w-[105%] hover:border-[#3D007B]"
                  placeholder="Brief description for preview"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-200 focus:w-[105%] hover:border-[#3D007B]"
                  placeholder="Full detailed description"
                />
              </div>
            </div>
          </div>

          {/* Media and Category */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#3D007B] border-b pb-2">Media & Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Cover Image *
                </label>
                <select
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                >
                  <option value="">Select an image</option>
                  {imageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Notice['category'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                >
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="administrative">Administrative</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  PDF Document
                </label>
                <select
                  value={formData.pdfUrl}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                >
                  {pdfOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dates and Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#3D007B] border-b pb-2">Dates & Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Publication Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Author *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                  placeholder="Author name and designation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                  placeholder="Event location or department"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#3D007B] mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time Details
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                  placeholder="Time, duration, or schedule details"
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#3D007B] border-b pb-2">Additional Attachments</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="File name"
                  value={newAttachment.name}
                  onChange={(e) => setNewAttachment({ ...newAttachment, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                />
                <input
                  type="text"
                  placeholder="File URL"
                  value={newAttachment.url}
                  onChange={(e) => setNewAttachment({ ...newAttachment, url: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                />
                <input
                  type="text"
                  placeholder="File size (e.g., 2.3 MB)"
                  value={newAttachment.size}
                  onChange={(e) => setNewAttachment({ ...newAttachment, size: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-[#3D007B] transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddAttachment}
                  className="inline-flex items-center justify-center px-4 py-2 bg-yellow-400 text-[#3D007B] font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </button>
              </div>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-3">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-[#f4f0ff] transition-colors">
                    <div className="flex-1">
                      <span className="font-medium text-[#3D007B]">{attachment.name}</span>
                      <span className="text-gray-500 text-sm ml-2">({attachment.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Archive Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isArchived"
              checked={formData.isArchived}
              onChange={(e) => setFormData({ ...formData, isArchived: e.target.checked })}
              className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
            />
            <label htmlFor="isArchived" className="ml-2 text-sm text-[#3D007B]">
              Archive this notice (will not be visible to users)
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-[#3D007B] rounded-lg hover:bg-[#f4f0ff] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 text-[#3D007B] rounded-lg hover:bg-[#f4f0ff] transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-400 text-[#3D007B] font-semibold rounded-lg hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            Add Notice
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddNoticeModal;