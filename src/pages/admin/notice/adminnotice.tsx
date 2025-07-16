import React, { useState } from 'react';
import { Plus, Edit, Trash2} from 'lucide-react';
import { sampleNotices } from '../../../assets/assets';
import type { Notice } from '../../../assets/assets';
// Removed: import AddNoticeModal from '../../../components/admin/notice/addnoticemodal';
import EditNoticeModal from '../../../components/admin/notice/editnoticemodal';
import DeleteConfirmModal from '../../../components/admin/notice/deleteconfirmmodal';
import { useNavigate } from '@tanstack/react-router';

const AdminNotice: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>(sampleNotices);
  // Removed: const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const navigate = useNavigate();

  // const handleAddNotice = (newNotice: Omit<Notice, 'id'>) => {
  //   const notice: Notice = {
  //     ...newNotice,
  //     id: Math.max(...notices.map(n => n.id)) + 1
  //   };
  //   setNotices([notice, ...notices]);
  //   // Removed: setIsAddModalOpen(false);
  // };

  const handleEditNotice = (updatedNotice: Notice) => {
    setNotices(notices.map(notice => 
      notice.id === updatedNotice.id ? updatedNotice : notice
    ));
    setIsEditModalOpen(false);
    setSelectedNotice(null);
  };

  const handleDeleteNotice = (noticeId: number) => {
    setNotices(notices.filter(notice => notice.id !== noticeId));
    setIsDeleteModalOpen(false);
    setSelectedNotice(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'general': return 'bg-green-100 text-green-800';
      case 'administrative': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-primary">
              Notice and Announcements
            </h3>
            <div className="w-64 h-1 bg-yellow-400 mt-2"></div>
          </div>
          <button
            onClick={() => navigate({ to: "/dashboard/admin/notices/addnotice" as string })}
            className="bg-yellow-400 hover:bg-yellow-500 text-primary font-semibold px-6 py-2 rounded-md text-sm transition cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Notice
          </button>
        </div>
        
        {notices.length > 0 ? (
          <div className="my-10">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="border-b hover:bg-[#f4f0ff] group transition"
              >
                <div className="flex items-center justify-between gap-4 py-4 px-2 md:px-6">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#3D007B] group-hover:underline mb-2">
                      {notice.title}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                        {notice.category}
                      </span>
                      {isExpired(notice.expiryDate) && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Expired
                        </span>
                      )}
                      {/* {notice.attachments && notice.attachments.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Paperclip className="w-3 h-3" />
                          {notice.attachments.length} attachment(s)
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate({ to: `/dashboard/admin/notices/editnotice?id=${notice.id}` });
                      }}
                      className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Notice"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedNotice(notice);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 px-2 md:px-6 pb-3">
                  Published on: {notice.date} • Author: {notice.author} • Expires: {notice.expiryDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first notice.
            </p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md text-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2 inline" />
              Add First Notice
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Removed: AddNoticeModal */}
      {selectedNotice && (
        <>
          <EditNoticeModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedNotice(null);
            }}
            notice={selectedNotice}
            onEdit={handleEditNotice}
          />

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedNotice(null);
            }}
            notice={selectedNotice}
            onDelete={() => handleDeleteNotice(selectedNotice.id)}
          />
        </>
      )}
    </div>
  );
};

export default AdminNotice;