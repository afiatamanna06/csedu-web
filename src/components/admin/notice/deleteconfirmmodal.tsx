import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import type { Notice } from '../../../assets/assets';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Notice;
  onDelete: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, notice, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full mr-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Delete Notice</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this notice? This action cannot be undone.
            </p>
            
            {/* Notice Preview */}
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-400">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    src={notice.image}
                    alt={notice.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                    {notice.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {notice.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <span>Published: {notice.date}</span>
                    <span>Category: {notice.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">
                <strong>Warning:</strong> This will permanently delete the notice and all its associated data including attachments and PDF documents. This action cannot be reversed.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;