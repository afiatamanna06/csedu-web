import React from "react";
import ProgramButton from "@/components/admission/program-button";
import csImage from "@/assets/cs.png";

const Admission: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Image with side margins */}
      <div className="mx-8 mb-8">
        <img 
          src={csImage} 
          alt="CSE Department" 
          className="w-full h-150 object-cover rounded-t-lg"
        />
        {/* Yellow bar with title */}
        <div className="bg-[#FFC300] py-4 px-6 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#13274C]">Admission</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-8 max-w-6xl">
        {/* Program Selection - Improved layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-16 gap-30">
          <div className="md:w-1/3 text-center md:text-right mt-35 mr-30">
            <h2 className="text-4xl font-bold mb-2 text-[#13274C]">
              Select
            </h2>
            <h2 className="text-4xl font-bold text-[#13274C] ml-50 border-b-3 border-[#FFC300] pb-4  ">
              Program
            </h2>
          </div>
          <div className="md:w-1/3 grid grid-cols-1 gap-6">
            <ProgramButton program="M.Sc." href="/apply-msc" className="text-3xl py-5" />
            <ProgramButton program="MPhil" href="/apply-mphil" className="text-3xl py-5" />
            <ProgramButton program="PhD" href="/apply-phd" className="text-3xl py-5" />
          </div>
        </div>

        {/* Two Column Information Section with enhanced content */}
        <div className="grid md:grid-cols-1 gap-10 mb-16">
          {/* Left Column - Admission Features */}
          <div className="bg-white p-8 ml-2 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-3">
              Admission Features
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-[#FFC300] mr-3 text-xl">•</span>
                <span>World-class faculty with PhDs from top international universities</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFC300] mr-3 text-xl">•</span>
                <span>State-of-the-art research facilities and laboratories</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFC300] mr-3 text-xl">•</span>
                <span>Industry-relevant curriculum updated annually</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFC300] mr-3 text-xl">•</span>
                <span>Strong alumni network with global reach</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFC300] mr-3 text-xl">•</span>
                <span>International collaboration and exchange programs</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Admission Steps */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-3">
              Admission Steps
            </h2>
            <ol className="space-y-5 text-lg text-gray-700 list-decimal pl-6">
              <li className="pl-2">Check eligibility requirements on our website</li>
              <li className="pl-2">Complete the online application form with all details</li>
              <li className="pl-2">Submit required documents (transcripts, certificates)</li>
              <li className="pl-2">Appear for admission test (if applicable for your program)</li>
              <li className="pl-2">Complete the interview process with faculty members</li>
              <li className="pl-2">Receive admission decision via email within 2 weeks</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;