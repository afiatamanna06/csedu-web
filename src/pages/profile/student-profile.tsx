import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save, X, Upload } from "lucide-react";

const StudentProfile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    phone: "+8801234567890",
    photo: "https://randomuser.me/api/portraits/women/40.jpg"
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleEditField = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSaveField = (field: string) => {
    setProfileData(prev => ({ ...prev, [field]: tempValue }));
    setEditingField(null);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileData(prev => ({
            ...prev,
            photo: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
      setFileInputKey(Date.now());
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password change logic here
    setShowPasswordForm(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 mt-30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-semi-bold text-[#13274C]">Profile</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Profile Picture Section */}
            <div className="w-full lg:w-1/3 p-8 bg-gradient-to-b from-[#FFC300]/10 to-white flex flex-col items-center">
              <div className="relative mb-6">
                <Avatar className="w-48 h-48 border-4 border-[#FFC300]">
                  <img 
                    src={profileData.photo} 
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />
                </Avatar>
                <label 
                  htmlFor="photo-upload"
                  className="absolute -bottom-2 right-2 bg-[#13274C] p-3 rounded-full shadow-md cursor-pointer hover:bg-[#13274C]/90 transition-colors"
                >
                  <Upload size={20} className="text-white" />
                  <input
                    key={fileInputKey}
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
              <h2 className="text-2xl font-semibold text-[#13274C]">Ramisha Jannat</h2>
              <p className="text-lg text-[#13274C]/80">Batch: 2020</p>
              <p className="text-lg text-[#13274C]/80">8th Semester</p>
            </div>

            {/* Profile Information Section */}
            <div className="w-full lg:w-2/3 p-10">
              <div className="space-y-8">
                {/* Read-only fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-md font-medium text-[#13274C] mb-2">Student ID</label>
                    <Input value="CSE-2020-1-60-123" readOnly className="bg-gray-100 text-lg h-12" />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-[#13274C] mb-2">Email</label>
                    <Input value="ramisha-2020123456@cs.du.ac.bd" readOnly className="bg-gray-100 text-lg h-12" />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-[#13274C] mb-2">Department</label>
                    <Input value="Computer Science and Engineering" readOnly className="bg-gray-100 text-lg h-12" />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-[#13274C] mb-2">Batch</label>
                    <Input value="2020" readOnly className="bg-gray-100 text-lg h-12" />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-[#13274C] mb-2">Semester</label>
                    <Input value="8th" readOnly className="bg-gray-100 text-lg h-12" />
                  </div>
                </div>

                {/* Editable Phone Field */}
                <div>
                  <label className="block text-md font-medium text-[#13274C] mb-2">Phone</label>
                  <div className="flex items-center gap-3">
                    {editingField === 'phone' ? (
                      <>
                        <Input
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="flex-1 text-lg h-12"
                        />
                        <Button 
                          size="lg" 
                          className="h-12 w-12 bg-[#FFC300] hover:bg-[#FFC300]/90 text-[#13274C]" 
                          onClick={() => handleSaveField('phone')}
                        >
                          <Save size={20} />
                        </Button>
                        <Button 
                          size="lg"
                          className="h-12 w-12 bg-gray-200 hover:bg-gray-300 text-[#13274C]"
                          onClick={handleCancelEdit}
                        >
                          <X size={20} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input 
                          value={profileData.phone} 
                          readOnly 
                          className="flex-1 bg-gray-100 text-lg h-12" 
                        />
                        <Button 
                          size="lg"
                          className="h-12 w-12 bg-[#13274C] hover:bg-[#13274C]/90 text-white"
                          onClick={() => handleEditField('phone', profileData.phone)}
                        >
                          <Edit size={20} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Password Change Section */}
                <div className="pt-8 border-t-2 border-[#FFC300]">
                  <Button 
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="flex items-center gap-2 h-12 px-6 text-lg bg-[#13274C] hover:bg-[#13274C]/90 text-white"
                  >
                    Change Password
                  </Button>

                  {showPasswordForm && (
                    <form onSubmit={handlePasswordChange} className="mt-6 space-y-6">
                      <div>
                        <label className="block text-md font-medium text-[#13274C] mb-2">Current Password</label>
                        <Input 
                          type="password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                          className="h-12 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-md font-medium text-[#13274C] mb-2">New Password</label>
                        <Input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="h-12 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-md font-medium text-[#13274C] mb-2">Confirm New Password</label>
                        <Input 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="h-12 text-lg"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button type="submit" className="flex items-center gap-2 h-12 px-6 text-lg bg-[#FFC300] hover:bg-[#FFC300]/90 text-[#13274C]">
                          <Save size={20} /> Save Changes
                        </Button>
                        <Button 
                          className="flex items-center gap-2 h-12 px-6 text-lg bg-gray-200 hover:bg-gray-300 text-[#13274C]"
                          onClick={() => setShowPasswordForm(false)}
                        >
                          <X size={20} /> Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;