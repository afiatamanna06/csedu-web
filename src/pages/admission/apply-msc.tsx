import React from "react";
import ApplicationSection from "@/components/admission/application-section";
import csImage from "@/assets/cs.png";

const ApplyMsc: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Image with side margins */}
      <div className="mx-8 mb-8">
        <img 
          src={csImage} 
          alt="CSE Department" 
          className="w-full h-140 object-cover rounded-t-lg"
        />
        {/* Yellow bar with title */}
        <div className="bg-[#FFC300] py-4 px-6 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#13274C]">Admission – M.Sc.</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-8 max-w-6xl">
        {/* Introduction Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-3">
            We consider each application with care
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            At the Department of CSE, University of Dhaka, we look beyond grades to understand your potential as a future computer scientist or engineer. We consider your analytical abilities, technical proficiency (e.g., programming, problem-solving), academic rigor, and passion for innovation—whether demonstrated through coursework, projects, research, or extracurricular engagement.
          </p>
          <p className="text-lg text-gray-700">
            Just as computing thrives on diverse perspectives, there is no "ideal" CSE applicant. We value curiosity, resilience, and a collaborative spirit. Whether you've excelled in competitions, contributed to open-source projects, or explored tech-driven solutions to local challenges, we welcome your unique story.
          </p>
        </div>
        
        <ApplicationSection programType="M.Sc." />
      </div>
    </div>
  );
};

export default ApplyMsc;