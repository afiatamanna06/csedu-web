
export function DepartmentOverview() {
  return (
    <div className="relative w-full h-[100%]">
      <img
        src="/landing.jpg"
        alt="Department Banner"
        className="w-full h-[100%] absolute object-cover"
      />
      <div className="w-full h-[100%] absolute bg-gradient-to-b from-[#13274C] to-[#13274C6f] backdrop-blur-[2px]"></div>
      <div className="relative w-full h-[30rem] flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
        <p className="text-3xl md:text-5xl mt-16 md:mt-0 lg:text-6xl max-w-[60rem] font-bold text-white text-center">
          Department of Computer Science and Engineering
        </p>
        <p className="text-white max-w-[60rem] text-base md:text-lg lg:text-xl mt-12 mb-6 text-center">
          As one of the pioneering departments in Bangladesh, CSEDU emphasizes
          rigorous academics, research-driven learning, and a strong foundation
          in computing principles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 p-10 -mb-50 z-20 lg:min-w-[60vw] rounded-md bg-gradient-to-t from-[#FFB606] to-[#F4D20E] gap-6 mt-6">
          <StatCard value="39" label="Total faculty members" />
          <StatCard value="298" label="Total students" />
          <StatCard value="78" label="Total female students" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B1472]">{value}</span>
      <span className="text-center mt-1 lg:text-lg">{label}</span>
    </div>
  );
}
