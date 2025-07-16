import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Application {
  id: string;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  passingProgram: string;
  cgpa: number;
  transcriptUrl: string;
  applyFor: "MSc" | "MPhil" | "PhD";
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: Date;
  recommender1Email: string;
  recommender2Email: string;
  paymentStatus: 'pending' | 'paid';
}

const initialApplications: Application[] = [
  {
    id: "1",
    fullName: "Ramisha Jannat",
    studentId: "2019331530",
    email: "ramisha@cs.du.ac.bd",
    phone: "+880123456789",
    passingProgram: "BSc in CSE",
    cgpa: 3.8,
    transcriptUrl: "transcripts/2019331530.pdf",
    applyFor: "MSc",
    status: "pending",
    submittedAt: new Date("2023-10-15"),
    recommender1Email: "recommender1@example.com",
    recommender2Email: "recommender2@example.com",
    paymentStatus: "paid"
  },
  {
  id: "2",
  fullName: "Mohammad Limon",
  studentId: "2019331520",
  email: "limon@cs.du.ac.bd",
  phone: "+880187654321",
  passingProgram: "BSc in CSE",
  cgpa: 3.6,
  transcriptUrl: "transcripts/2019331520.pdf",
  applyFor: "MSc",
  status: "pending",
  submittedAt: new Date("2023-10-18"),
  recommender1Email: "prof1@example.com",
  recommender2Email: "prof2@example.com",
  paymentStatus: "paid"
},
{
  id: "3",
  fullName: "Shoaib Islam",
  studentId: "2017331501",
  email: "shoaib@cs.du.ac.bd",
  phone: "+880191234567",
  passingProgram: "MSc in CSE",
  cgpa: 3.9,
  transcriptUrl: "transcripts/2017331501.pdf",
  applyFor: "PhD",
  status: "pending",
  submittedAt: new Date("2023-09-16"),
  recommender1Email: "advisor1@example.com",
  recommender2Email: "advisor2@example.com",
  paymentStatus: "paid"
},
{
  id: "4",
  fullName: "Tasnim Ahmed",
  studentId: "2018331545",
  email: "tasnim@cs.du.ac.bd",
  phone: "+880171234567",
  passingProgram: "BSc in CSE",
  cgpa: 3.7,
  transcriptUrl: "transcripts/2018331545.pdf",
  applyFor: "MPhil",
  status: "pending",
  submittedAt: new Date("2023-10-20"),
  recommender1Email: "lecturer1@example.com",
  recommender2Email: "lecturer2@example.com",
  paymentStatus: "pending"
},
{
  id: "5",
  fullName: "Nadia Rahman",
  studentId: "2019331578",
  email: "nadia@cs.du.ac.bd",
  phone: "+880191112223",
  passingProgram: "BSc in Software Engineering",
  cgpa: 3.85,
  transcriptUrl: "transcripts/2019331578.pdf",
  applyFor: "MSc",
  status: "pending",
  submittedAt: new Date("2023-11-05"),
  recommender1Email: "professor1@example.com",
  recommender2Email: "professor2@example.com",
  paymentStatus: "paid"
},
{
  id: "6",
  fullName: "Arif Hossain",
  studentId: "2017331590",
  email: "arif@cs.du.ac.bd",
  phone: "+880171998877",
  passingProgram: "MSc in CSE",
  cgpa: 3.95,
  transcriptUrl: "transcripts/2017331590.pdf",
  applyFor: "PhD",
  status: "pending",
  submittedAt: new Date("2023-08-14"),
  recommender1Email: "advisor3@example.com",
  recommender2Email: "advisor4@example.com",
  paymentStatus: "paid"
},
{
  id: "7",
  fullName: "Farzana Yasmin",
  studentId: "2018331602",
  email: "farzana@cs.du.ac.bd",
  phone: "+880192233445",
  passingProgram: "BSc in CSE",
  cgpa: 3.65,
  transcriptUrl: "transcripts/2018331602.pdf",
  applyFor: "MPhil",
  status: "pending",
  submittedAt: new Date("2023-12-01"),
  recommender1Email: "lecturer3@example.com",
  recommender2Email: "lecturer4@example.com",
  paymentStatus: "pending"
},
{
  id: "8",
  fullName: "Hridi Hasan",
  studentId: "2016331520",
  email: "hridi@cs.du.ac.bd",
  phone: "+880172211334",
  passingProgram: "MSc in CSE",
  cgpa: 3.88,
  transcriptUrl: "transcripts/2016331520.pdf",
  applyFor: "PhD",
  status: "pending",
  submittedAt: new Date("2023-07-22"),
  recommender1Email: "advisor5@example.com",
  recommender2Email: "advisor6@example.com",
  paymentStatus: "paid"
},
{
  id: "9",
  fullName: "Shamima Akter",
  studentId: "2019331633",
  email: "shamima@cs.du.ac.bd",
  phone: "+880170099887",
  passingProgram: "BSc in Software Engineering",
  cgpa: 3.72,
  transcriptUrl: "transcripts/2019331633.pdf",
  applyFor: "MSc",
  status: "pending",
  submittedAt: new Date("2023-09-28"),
  recommender1Email: "professor3@example.com",
  recommender2Email: "professor4@example.com",
  paymentStatus: "pending"
},
{
  id: "10",
  fullName: "Rakibul Islam",
  studentId: "2017331655",
  email: "rakibul@cs.du.ac.bd",
  phone: "+880191122334",
  passingProgram: "MSc in CSE",
  cgpa: 3.90,
  transcriptUrl: "transcripts/2017331655.pdf",
  applyFor: "PhD",
  status: "pending",
  submittedAt: new Date("2023-10-11"),
  recommender1Email: "advisor7@example.com",
  recommender2Email: "advisor8@example.com",
  paymentStatus: "paid"
}

];

const AdminAdmission: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filterProgram, setFilterProgram] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Calculate statistics
  const totalApplications = applications.length;
  const mscApplications = applications.filter(app => app.applyFor === "MSc").length;
  const mphilApplications = applications.filter(app => app.applyFor === "MPhil").length;
  const phdApplications = applications.filter(app => app.applyFor === "PhD").length;

  const pendingApplications = applications.filter(app => app.status === "pending").length;
  const acceptedApplications = applications.filter(app => app.status === "accepted").length;
  const rejectedApplications = applications.filter(app => app.status === "rejected").length;


  // Filter applications based on selected program
  // const filteredApplications = filterProgram === "all" 
  //   ? applications 
  //   : applications.filter(app => app.applyFor === filterProgram);


  const filteredApplications = applications.filter(app => {
    const programMatch = filterProgram === "all" || app.applyFor === filterProgram;
    const statusMatch = filterStatus === "all" || app.status === filterStatus;
    return programMatch && statusMatch;
  });

  const sendEmail = async (email: string, subject: string, body: string) => {
    await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: email, subject, body }),
    });
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'accepted' | 'rejected') => {
    const app = applications.find(a => a.id === id);
    if (!app) return;

    // Update status
    setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a));

    // Send appropriate email
    if (newStatus === "accepted") {
      const subject = "Admission Acceptance - Interview Invitation";
      const body = `Dear ${app.fullName},\n\nCongratulations! You have been accepted for the ${app.applyFor} program.\n\nDetails:\n- Student ID: ${app.studentId}\n- Program: ${app.applyFor}\n- CGPA: ${app.cgpa}\n\nPlease attend an interview on [Date] at [Time]. Contact us at +880123456789 for any queries.\n\nBest regards,\nCSEDU Admission Office`;
      await sendEmail(app.email, subject, body);
      alert(`Acceptance email sent to ${app.email}`);
    } else if (newStatus === "rejected") {
      const subject = "Admission Application Status";
      const body = `Dear ${app.fullName},\n\nThank you for your application to the ${app.applyFor} program. We regret to inform you that your application was not successful.\n\nDetails:\n- Student ID: ${app.studentId}\n- Program: ${app.applyFor}\n- CGPA: ${app.cgpa}\n\nBest regards,\nCSEDU Admission Office`;
      await sendEmail(app.email, subject, body);
      alert(`Rejection email sent to ${app.email}`);
    }
  };

  // In the transcript section of the modal:
  <a 
    href="https://example.com/demo-transcript.pdf" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-600 hover:underline"
  >
    View Transcript
  </a>
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-[#13274C] mb-6">Student Applications</h1>
      
      {/* Statistics and Filter */}
      <div className="mb-7 grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Applications</p>
          <p className="text-2xl font-bold">{totalApplications}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">MSc Applications</p>
          <p className="text-2xl font-bold">{mscApplications}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">MPhil Applications</p>
          <p className="text-2xl font-bold">{mphilApplications}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">PhD Applications</p>
          <p className="text-2xl font-bold">{phdApplications}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold">{pendingApplications}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-2xl font-bold">{acceptedApplications}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold">{rejectedApplications}</p>
        </Card>
      </div>

      {/* program Filter */}
      {/* Filters - Now side by side */}
      <div className="mb-6 flex gap-4 items-center">
        <Select onValueChange={setFilterProgram} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="MSc">MSc</SelectItem>
            <SelectItem value="MPhil">MPhil</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={setFilterStatus} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications List */}
      <div className="grid gap-6">
        {filteredApplications.map(app => (
          <Card 
            key={app.id} 
            className="p-6 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedApp(app)}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p><strong>Name:</strong> {app.fullName}</p>
                <p><strong>Student ID:</strong> {app.studentId}</p>
                <p><strong>Program:</strong> {app.applyFor}</p>
                <p><strong>Status:</strong> <span className={`capitalize font-semibold ${app.status === "accepted" ? "text-green-600" : app.status === "rejected" ? "text-red-600" : "text-gray-600"}`}>{app.status}</span></p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={(e) => { e.stopPropagation(); handleStatusChange(app.id, "accepted"); }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Accept
                </Button>
                <Button
                  onClick={(e) => { e.stopPropagation(); handleStatusChange(app.id, "rejected"); }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedApp?.fullName}'s Application</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Student ID:</strong> {selectedApp.studentId}</p>
                  <p><strong>Email:</strong> {selectedApp.email}</p>
                  <p><strong>Phone:</strong> {selectedApp.phone}</p>
                  <p><strong>Program Applied:</strong> {selectedApp.applyFor}</p>
                </div>
                <div>
                  <p><strong>Passing Program:</strong> {selectedApp.passingProgram}</p>
                  <p><strong>CGPA:</strong> {selectedApp.cgpa}</p>
                  <p><strong>Submitted At:</strong> {selectedApp.submittedAt.toLocaleDateString()}</p>
                  <p><strong>Payment Status:</strong> <span className={`capitalize font-semibold ${selectedApp.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>{selectedApp.paymentStatus}</span></p>
                </div>
              </div>
              
              <div>
                <p className="font-semibold">Recommenders:</p>
                <ul className="list-disc pl-5">
                  <li>{selectedApp.recommender1Email}</li>
                  <li>{selectedApp.recommender2Email}</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold">Transcript:</p>
                <a href={selectedApp.transcriptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Transcript
                </a>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  onClick={() => {
                    handleStatusChange(selectedApp.id, "accepted");
                    setSelectedApp(null);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => {
                    handleStatusChange(selectedApp.id, "rejected");
                    setSelectedApp(null);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdmission;
