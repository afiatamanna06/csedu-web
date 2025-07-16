import React from "react";

const ResearchFacilities: React.FC = () => {
  const facilities = [
    {
      name: "AI & Data Science Lab",
      location: "Room 501, CSE Building",
      description: "Equipped with high-performance computing clusters, GPU servers, and large-scale data storage for AI and data science research.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      equipment: [
        "10 GPU servers (NVIDIA Tesla V100)",
        "50 TB NAS storage",
        "High-speed networking infrastructure"
      ]
    },
    {
      name: "Cybersecurity Research Lab",
      location: "Room 402, CSE Building",
      description: "Dedicated secure environment for cybersecurity research including penetration testing, network security analysis, and cryptography research.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      equipment: [
        "Isolated test network",
        "Hardware security modules",
        "Forensic analysis workstations"
      ]
    },
    {
      name: "IoT & Embedded Systems Lab",
      location: "Room 305, CSE Building",
      description: "Facility for developing and testing IoT devices and embedded systems with various sensors and prototyping tools.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      equipment: [
        "Various IoT development kits",
        "3D printers for prototyping",
        "Sensor arrays for environmental monitoring"
      ]
    },
    {
      name: "Human-Computer Interaction Lab",
      location: "Room 208, CSE Building",
      description: "Specialized facility for usability studies, eye-tracking experiments, and interactive system development.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      equipment: [
        "Eye-tracking systems",
        "Motion capture devices",
        "Various VR/AR equipment"
      ]
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="mx-8 mb-8 mt-5">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Research Facilities"
          className="w-full h-120 object-cover rounded-t-lg"
        />
        <div className="bg-[#FFC300] py-4 px-6 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#13274C]">Research Facilities</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg mb-12 text-center">
            Our department boasts state-of-the-art research facilities equipped with modern technologies to support cutting-edge research across various domains of computer science.
          </p>
          
          {/* Facilities Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#13274C]">{facility.name}</h3>
                    <p className="text-[#FFC300] font-medium mb-2">{facility.location}</p>
                    <p className="mb-4">{facility.description}</p>
                    <h4 className="font-medium text-[#13274C] mb-2">Key Equipment:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {facility.equipment.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Booking Information */}
          <section className="mb-16 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#13274C] border-b-2 border-[#FFC300] pb-2">Facility Usage Policy</h2>
            <div className="space-y-4">
              <p>
                Our research facilities are available for use by faculty members, graduate students, and approved undergraduate researchers.
              </p>
              <p>
                <span className="font-medium">Priority Access:</span> Faculty and PhD students working on funded research projects have priority access to specialized equipment.
              </p>
              <p>
                <span className="font-medium">Training Requirement:</span> Some facilities require completion of safety and operation training before access is granted.
              </p>
            </div>
          </section>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 text-[#13274C]">Need to use our facilities?</h3>
            <p className="mb-6">Contact the lab manager or your faculty advisor for access and training.</p>
            <div className="flex justify-center">
              <a 
                href="mailto:facilities@cse.du.ac.bd" 
                className="bg-[#13274C] hover:bg-[#13274C]/90 text-white font-semibold py-2 px-6 rounded-md"
              >
                Contact Lab Manager
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchFacilities;