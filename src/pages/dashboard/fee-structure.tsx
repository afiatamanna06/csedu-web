import { Card } from "@/components/ui/card";

const FeeStructure = () => {
  return (
    <div className="p-8 space-y-8 bg-[#0F2545] min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-8 rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-5xl font-extrabold text-[#0F2545] mb-2">৳ 45,500</h3>
            <p className="text-gray-700 text-xl font-semibold">Total Fees Paid</p>
          </Card>

          <Card className="p-8 rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-5xl font-extrabold text-[#0F2545] mb-2">৳ 17,000</h3>
            <p className="text-gray-700 text-xl font-semibold">Outstanding Balance</p>
          </Card>

          <Card className="p-8 rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-5xl font-extrabold text-[#0F2545] mb-2">6/8</h3>
            <p className="text-gray-700 text-xl font-semibold">Semesters Completed</p>
          </Card>

          <Card className="p-8 rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-5xl font-extrabold text-[#0F2545] mb-2">৳ 62,500</h3>
            <p className="text-gray-700 text-xl font-semibold">Total Program Cost</p>
          </Card>
        </div>

        {/* Semester Fee Structure */}
        <div className="bg-white rounded-[20px] p-10 shadow-lg">
          <h2 className="text-4xl font-bold text-[#0F2545] mb-10">Semester Fee Structure</h2>
          
          <div className="space-y-8">
            {/* 1st Year 1st Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">1st Year 1st Semester</span>
                </div>

                <div className="bg-[#F39C12] bg-opacity-10 border-2 border-[#F39C12] text-[#F39C12] px-6 py-2.5 rounded-full font-bold text-lg">
                  ✓ Paid
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Admission Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 7,000</span>
              </div>

              <button className="w-full bg-[#F39C12] text-white py-5 rounded-xl font-bold text-xl hover:bg-[#E67E22] transition-colors">
                Completed
              </button>
            </Card>

            {/* 1st Year 2nd Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">1st Year 2nd Semester</span>
                </div>

                <div className="bg-[#F39C12] bg-opacity-10 border-2 border-[#F39C12] text-[#F39C12] px-6 py-2.5 rounded-full font-bold text-lg">
                  ✓ Paid
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Lab Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 500</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 2,500</span>
              </div>

              <button className="w-full bg-[#F39C12] text-white py-5 rounded-xl font-bold text-xl hover:bg-[#E67E22] transition-colors">
                Completed
              </button>
            </Card>

            {/* 2nd Year 1st Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">2nd Year 1st Semester</span>
                </div>

                <div className="bg-[#F39C12] bg-opacity-10 border-2 border-[#F39C12] text-[#F39C12] px-6 py-2.5 rounded-full font-bold text-lg">
                  ✓ Paid
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Admission Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 7,000</span>
              </div>

              <button className="w-full bg-[#F39C12] text-white py-5 rounded-xl font-bold text-xl hover:bg-[#E67E22] transition-colors">
                Completed
              </button>
            </Card>
            
            {/* 2nd Year 2nd Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">2nd Year 2nd Semester</span>
                </div>

                <div className="bg-[#F39C12] bg-opacity-10 border-2 border-[#F39C12] text-[#F39C12] px-6 py-2.5 rounded-full font-bold text-lg">
                  ✓ Paid
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Lab Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 500</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 2,500</span>
              </div>

              <button className="w-full bg-[#F39C12] text-white py-5 rounded-xl font-bold text-xl hover:bg-[#E67E22] transition-colors">
                Completed
              </button>
            </Card>
            
            {/* 3rd Year 1st Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">3rd Year 1st Semester</span>
                </div>

                <div className="bg-[#F39C12] bg-opacity-10 border-2 border-[#F39C12] text-[#F39C12] px-6 py-2.5 rounded-full font-bold text-lg">
                  ✓ Paid
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Admission Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 7,000</span>
              </div>

              <button className="w-full bg-[#F39C12] text-white py-5 rounded-xl font-bold text-xl hover:bg-[#E67E22] transition-colors">
                Completed
              </button>
            </Card>
            
            {/* 3rd Year 2nd Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">3rd Year 2nd Semester</span>
                </div>

                <div className="bg-gray-200 text-gray-600 px-6 py-2.5 rounded-full font-bold text-lg">
                  Pending
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Lab Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 500</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 2,500</span>
              </div>

              <button className="w-full bg-gray-200 text-gray-700 py-5 rounded-xl font-bold text-xl hover:bg-gray-300 transition-colors">
                Pay Now
              </button>
            </Card>
            
            {/* 4th Year 1st Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">4th Year 1st Semester</span>
                </div>

                <div className="bg-gray-200 text-gray-600 px-6 py-2.5 rounded-full font-bold text-lg">
                  Upcoming
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Admission Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 7,000</span>
              </div>

              <button className="w-full bg-gray-200 text-gray-700 py-5 rounded-xl font-bold text-xl hover:bg-gray-300 transition-colors cursor-not-allowed opacity-70">
                Not Available Yet
              </button>
            </Card>
            
            {/* 4th Year 2nd Semester */}
            <Card className="p-8 rounded-[20px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="bg-[#0F2545] text-white px-8 py-4 rounded-xl">
                  <span className="text-xl font-bold">4th Year 2nd Semester</span>
                </div>

                <div className="bg-gray-200 text-gray-600 px-6 py-2.5 rounded-full font-bold text-lg">
                  Upcoming
                </div>
              </div>

              <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Semester Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 2,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Lab Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F2545] font-semibold text-xl">Thesis/Project Fee</span>
                  <span className="text-[#0F2545] font-bold text-2xl">৳ 1,000</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[#0F2545] font-bold text-3xl">Total</span>
                <span className="text-[#0F2545] font-bold text-3xl">৳ 3,500</span>
              </div>

              <button className="w-full bg-gray-200 text-gray-700 py-5 rounded-xl font-bold text-xl hover:bg-gray-300 transition-colors cursor-not-allowed opacity-70">
                Not Available Yet
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;