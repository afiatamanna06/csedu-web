import { Card } from "@/components/ui/card";

interface StudentPayment {
  studentId: string;
  name: string;
  totalPaid: number;
  outstanding: number;
  semesters: { semester: string; status: string; amount: number }[];
}

const PaymentStatus = () => {
  const students: StudentPayment[] = [
    {
      studentId: "STU001",
      name: "John Doe",
      totalPaid: 45500,
      outstanding: 17000,
      semesters: [
        { semester: "1st Year 1st Semester", status: "Paid", amount: 7000 },
        { semester: "1st Year 2nd Semester", status: "Paid", amount: 2500 },
        { semester: "2nd Year 1st Semester", status: "Paid", amount: 7000 },
        { semester: "2nd Year 2nd Semester", status: "Paid", amount: 2500 },
        { semester: "3rd Year 1st Semester", status: "Paid", amount: 7000 },
        { semester: "3rd Year 2nd Semester", status: "Pending", amount: 2500 },
        { semester: "4th Year 1st Semester", status: "Upcoming", amount: 7000 },
        { semester: "4th Year 2nd Semester", status: "Upcoming", amount: 3500 },
      ],
    },
    {
      studentId: "STU002",
      name: "Jane Smith",
      totalPaid: 38000,
      outstanding: 24500,
      semesters: [
        { semester: "1st Year 1st Semester", status: "Paid", amount: 7000 },
        { semester: "1st Year 2nd Semester", status: "Paid", amount: 2500 },
        { semester: "2nd Year 1st Semester", status: "Paid", amount: 7000 },
        { semester: "2nd Year 2nd Semester", status: "Pending", amount: 2500 },
        { semester: "3rd Year 1st Semester", status: "Pending", amount: 7000 },
        { semester: "3rd Year 2nd Semester", status: "Pending", amount: 2500 },
        { semester: "4th Year 1st Semester", status: "Upcoming", amount: 7000 },
        { semester: "4th Year 2nd Semester", status: "Upcoming", amount: 3500 },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#0F2545] min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-5xl font-extrabold text-[#0F2545] mb-2">৳ 83,500</h3>
            <p className="text-gray-700 text-xl font-semibold">Total Fees Collected</p>
          </Card>
          <Card className="p-8 rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-5xl font-extrabold text-[#0F2545] mb-2">৳ 41,500</h3>
            <p className="text-gray-700 text-xl font-semibold">Total Outstanding</p>
          </Card>
          <Card className="p-8 rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-5xl font-extrabold text-[#0F2545] mb-2">2</h3>
            <p className="text-gray-700 text-xl font-semibold">Active Students</p>
          </Card>
        </div>

        {/* Student Payment Status Table */}
        <Card className="p-10 rounded-[20px] shadow-lg border-0 bg-white">
          <h2 className="text-4xl font-bold text-[#0F2545] mb-10">Student Payment Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-[#0F2545] font-bold text-lg py-4 px-4">Student ID</th>
                  <th className="text-[#0F2545] font-bold text-lg py-4 px-4">Name</th>
                  <th className="text-[#0F2545] font-bold text-lg py-4 px-4">Total Paid</th>
                  <th className="text-[#0F2545] font-bold text-lg py-4 px-4">Outstanding</th>
                  <th className="text-[#0F2545] font-bold text-lg py-4 px-4">Semester Details</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.studentId} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="font-semibold text-[#0F2545] py-4 px-4">{student.studentId}</td>
                    <td className="font-semibold text-[#0F2545] py-4 px-4">{student.name}</td>
                    <td className="font-semibold text-[#0F2545] py-4 px-4">৳ {student.totalPaid.toLocaleString()}</td>
                    <td className="font-semibold text-[#0F2545] py-4 px-4">৳ {student.outstanding.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        {student.semesters.map((semester, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <span className="text-[#0F2545] text-sm">{semester.semester}</span>
                            <span
                              className={`px-4 py-1 rounded-full font-semibold text-sm ${
                                semester.status === "Paid"
                                  ? "bg-[#F39C12] bg-opacity-10 border-2 border-[#F39C12] text-[#F39C12]"
                                  : semester.status === "Pending"
                                  ? "bg-gray-200 text-gray-600"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {semester.status}
                            </span>
                            <span className="text-[#0F2545] font-semibold text-sm">৳ {semester.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentStatus;