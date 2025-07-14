import React from "react";

const FundedProjects: React.FC = () => {
  const ongoingProjects = [
    {
      title: "AI-Based Diagnostic System for Tropical Diseases",
      funding: "Ministry of Health, Bangladesh",
      amount: "BDT 45,00,000",
      duration: "2022-2024",
      pi: "Dr. Fahima Khanam",
      description: "Developing an AI-powered system to assist in diagnosing common tropical diseases from medical images and patient data."
    },
    {
      title: "Secure Blockchain Framework for Financial Transactions",
      funding: "Bangladesh Bank",
      amount: "BDT 60,00,000",
      duration: "2021-2024",
      pi: "Dr. A.B.M. Alim Al Islam",
      description: "Creating a secure and scalable blockchain solution for inter-bank transactions in Bangladesh."
    },
    {
      title: "Smart Traffic Management System for Dhaka City",
      funding: "Dhaka North City Corporation",
      amount: "BDT 35,00,000",
      duration: "2023-2025",
      pi: "Dr. Mohammad Nurul Huda",
      description: "Implementing IoT and data analytics to optimize traffic light timing and reduce congestion in Dhaka."
    }
  ];

  const completedProjects = [
    {
      title: "Bengali Natural Language Processing Toolkit",
      funding: "ICT Division, GoB",
      amount: "BDT 25,00,000",
      duration: "2019-2021",
      pi: "Dr. Mohammad Aminul Islam",
      outcome: "Developed open-source NLP tools for Bengali language processing, now used by several universities and tech companies."
    },
    {
      title: "Rural Telemedicine Platform",
      funding: "World Health Organization",
      amount: "USD 120,000",
      duration: "2018-2020",
      pi: "Dr. Rashedur Rahman",
      outcome: "Deployed in 15 rural health centers, serving over 50,000 patients with remote specialist consultations."
    },
    {
      title: "Cybersecurity Training Program",
      funding: "UNDP Bangladesh",
      amount: "USD 85,000",
      duration: "2020-2021",
      pi: "Dr. Mohammad Shoyaib",
      outcome: "Trained 200 government officials in cybersecurity best practices and threat mitigation."
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="mx-8 mb-8 mt-5">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Funded Projects"
          className="w-full h-120 object-cover rounded-t-lg"
        />
        <div className="bg-[#FFC300] py-4 px-6 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#13274C]">Funded Research Projects</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg mb-12 text-center">
            Our department actively engages in research projects funded by national and international organizations, addressing real-world challenges through innovative solutions.
          </p>
          
          {/* Ongoing Projects */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-2">Ongoing Projects</h2>
            <div className="space-y-6">
              {ongoingProjects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2 text-[#13274C]">{project.title}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p><span className="font-medium">Funding Agency:</span> {project.funding}</p>
                      <p><span className="font-medium">Amount:</span> {project.amount}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Duration:</span> {project.duration}</p>
                      <p><span className="font-medium">Principal Investigator:</span> {project.pi}</p>
                    </div>
                  </div>
                  <p><span className="font-medium">Description:</span> {project.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Completed Projects */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-2">Recently Completed Projects</h2>
            <div className="space-y-6">
              {completedProjects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2 text-[#13274C]">{project.title}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p><span className="font-medium">Funding Agency:</span> {project.funding}</p>
                      <p><span className="font-medium">Amount:</span> {project.amount}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Duration:</span> {project.duration}</p>
                      <p><span className="font-medium">Principal Investigator:</span> {project.pi}</p>
                    </div>
                  </div>
                  <p><span className="font-medium">Outcome:</span> {project.outcome}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 text-[#13274C]">Interested in collaboration?</h3>
            <p className="mb-6">We welcome partnerships with industry, government, and academic institutions for research projects.</p>
            <div className="flex justify-center space-x-4">
              <a 
                href="mailto:research@cse.du.ac.bd" 
                className="bg-[#13274C] hover:bg-[#13274C]/90 text-white font-semibold py-2 px-6 rounded-md"
              >
                Contact Research Office
              </a>
              <a 
                href="/research-facilities" 
                className="bg-[#FFC300] hover:bg-[#FFC300]/90 text-[#13274C] font-semibold py-2 px-6 rounded-md"
              >
                View Our Facilities
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FundedProjects;