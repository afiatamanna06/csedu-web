import React, { useState } from "react";

interface Mail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

const mockMails: Mail[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    subject: "Admission Inquiry",
    message: "I would like to know more about MSc admission.",
    receivedAt: "2025-07-14 15:32",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    subject: "Faculty Question",
    message: "Can I meet the chairman regarding thesis topics?",
    receivedAt: "2025-07-14 14:10",
  },
];

const AdminInbox: React.FC = () => {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-[#13274C] mb-6">Inbox</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar list */}
        <div className="col-span-1 border-r border-gray-300 pr-4">
          <ul className="space-y-4">
            {mockMails.map((mail) => (
              <li
                key={mail.id}
                onClick={() => setSelectedMail(mail)}
                className={`p-4 border rounded-md cursor-pointer hover:bg-gray-100 ${
                  selectedMail?.id === mail.id ? "bg-gray-100" : ""
                }`}
              >
                <p className="text-sm text-gray-500">{mail.receivedAt}</p>
                <p className="font-semibold">{mail.subject}</p>
                <p className="text-sm text-gray-600">
                  From: {mail.firstName} {mail.lastName}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Mail detail */}
        <div className="col-span-2">
          {selectedMail ? (
            <div className="p-6 border rounded-md shadow">
              <h3 className="text-xl font-bold text-[#13274C] mb-2">{selectedMail.subject}</h3>
              <p className="text-sm text-gray-500 mb-1">
                From: {selectedMail.firstName} {selectedMail.lastName} &lt;{selectedMail.email}&gt;
              </p>
              <p className="text-sm text-gray-500 mb-4">Received: {selectedMail.receivedAt}</p>
              <div className="text-gray-800 whitespace-pre-wrap">{selectedMail.message}</div>
            </div>
          ) : (
            <p className="text-gray-600">Select a message from the inbox to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInbox;
