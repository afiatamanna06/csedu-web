import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import type { Event } from '../../../assets/assets';

interface DeleteEventConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onDelete: () => void;
}

const DeleteEventConfirmModal: React.FC<DeleteEventConfirmModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete();
    toast.success("Event deleted successfully!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[280px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-3 h-3 text-gray-400" />
        </button>

        {/* Icon and Message */}
        <div className="flex flex-col items-center pt-5 pb-2 px-3">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-1 text-center">Delete Event?</h2>
          <p className="text-gray-700 text-center text-xs mb-4">
            Are you sure you want to delete this event?
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-2 pb-4 px-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-xs font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs font-medium shadow-sm"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventConfirmModal;