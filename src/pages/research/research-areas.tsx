import React, { useState } from "react";
import { X } from "lucide-react";

const ResearchAreas: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<null | any>(null);

  const researchAreas = [
    {
      title: "Artificial Intelligence & Machine Learning",
      description: "Our AI research focuses on developing innovative algorithms and models for various applications including natural language processing, computer vision, and predictive analytics.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. Mohammad Aminul Islam", "Dr. Fahima Khanam", "Dr. Saiful Islam"],
      details: {
        projects: [
          "Bengali NLP Toolkit Development",
          "AI for Healthcare Diagnostics",
          "Autonomous Vehicle Perception Systems"
        ],
        publications: 28,
        labs: "AI Research Lab (Room 501)",
        equipment: [
          "NVIDIA DGX A100 systems",
          "High-performance computing cluster",
          "Specialized ML workstations"
        ]
      }
    },
    {
      title: "Cybersecurity & Blockchain",
      description: "Research in cybersecurity includes developing secure protocols, intrusion detection systems, and blockchain applications for secure transactions and data integrity.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. A.B.M. Alim Al Islam", "Dr. Mohammad Shoyaib", "Dr. Rashedur Rahman"],
      details: {
        projects: [
          "National Cybersecurity Framework",
          "Blockchain for Financial Systems",
          "IoT Security Protocols"
        ],
        publications: 19,
        labs: "Cybersecurity Lab (Room 402)",
        equipment: [
          "Hardware security modules",
          "Forensic analysis workstations",
          "Isolated test network"
        ]
      }
    },
    {
      title: "Data Science & Big Data Analytics",
      description: "Our team works on efficient algorithms for processing large-scale data with applications in social network analysis, bioinformatics, and urban computing.",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. Mohammad Nurul Huda", "Dr. Md. Abdur Razzak", "Dr. Mohammad Shafiul Alam"],
      details: {
        projects: [
          "Urban Data Analytics Platform",
          "Genomic Data Processing Framework",
          "Real-time Social Media Analysis"
        ],
        publications: 32,
        labs: "Data Science Lab (Room 303)",
        equipment: [
          "500TB distributed storage system",
          "Apache Spark/Hadoop cluster",
          "Visualization workstations"
        ]
      }
    },
    {
      title: "Computer Networks & IoT",
      description: "Research focuses on network protocols, wireless communication, and Internet of Things (IoT) applications for smart cities and industrial automation.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. Mohammad Asaduzzaman", "Dr. Md. Mustafizur Rahman", "Dr. Mohammad Abu Yousuf"],
      details: {
        projects: [
          "5G Network Optimization",
          "Smart City IoT Infrastructure",
          "Industrial Automation Systems"
        ],
        publications: 21,
        labs: "Networking Lab (Room 305)",
        equipment: [
          "Software-defined networking testbed",
          "IoT development kits",
          "Network protocol analyzers"
        ]
      }
    },
    {
      title: "Human-Computer Interaction",
      description: "This area focuses on designing intuitive user interfaces, accessibility technologies, and studying user behavior with computing systems.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. S.M. Abdullah Al-Mamun", "Dr. Mohammad Shoyaib", "Dr. Mohammad Zafar Iqbal"],
      details: {
        projects: [
          "Accessible Computing for Disabilities",
          "VR/AR Interaction Techniques",
          "Eye-tracking Applications"
        ],
        publications: 17,
        labs: "HCI Lab (Room 208)",
        equipment: [
          "Eye-tracking systems",
          "Motion capture devices",
          "VR/AR equipment"
        ]
      }
    },
    {
      title: "Computer Vision & Image Processing",
      description: "Research in computer vision focuses on developing algorithms for object recognition, image analysis, and medical imaging applications.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. Nabeel Mohammed", "Dr. Sifat Momen", "Dr. A.K.M. Mahbubur Rahman"],
      details: {
        projects: [
          "Medical Image Analysis",
          "Autonomous Surveillance Systems",
          "3D Reconstruction Techniques"
        ],
        publications: 24,
        labs: "Vision Lab (Room 407)",
        equipment: [
          "High-resolution cameras",
          "GPU-accelerated workstations",
          "Medical imaging devices"
        ]
      }
    },
    {
      title: "Cloud Computing & Distributed Systems",
      description: "This area investigates scalable cloud architectures, edge computing solutions, and distributed algorithms for large-scale systems.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. Mohammad Shahidur Rahman", "Dr. Md. Tarique Jamal", "Dr. Farhana Sarker"],
      details: {
        projects: [
          "Edge Computing Framework",
          "Distributed Database Systems",
          "Cloud Resource Optimization"
        ],
        publications: 19,
        labs: "Cloud Computing Lab (Room 506)",
        equipment: [
          "Private cloud infrastructure",
          "Container orchestration systems",
          "Distributed computing testbed"
        ]
      }
    },
    {
      title: "Natural Language Processing",
      description: "Our NLP research focuses on developing tools and techniques for Bengali and other regional languages, including machine translation and sentiment analysis.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      faculty: ["Dr. Mohammad Kaykobad", "Dr. Mumit Khan", "Dr. Shamsuzzoha Bayzid"],
      details: {
        projects: [
          "Bengali Language Model Development",
          "Multilingual Machine Translation",
          "Sentiment Analysis for Social Media"
        ],
        publications: 26,
        labs: "NLP Lab (Room 409)",
        equipment: [
          "High-performance text processing servers",
          "Linguistic annotation workstations",
          "Multilingual corpus databases"
        ]
      }
    }
  ];

  const handleAreaClick = (area: any) => {
    setSelectedArea(area);
  };

  const closeModal = () => {
    setSelectedArea(null);
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="mx-8 mb-8 mt-5">
        <img
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Research Areas"
          className="w-full h-120 object-cover rounded-t-lg"
        />
        <div className="bg-[#FFC300] py-4 px-6 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#13274C]">Research Areas</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg mb-12 text-center">
            Explore our diverse research areas where faculty and students collaborate to push the boundaries of computer science and engineering.
          </p>
          
          {/* Research Areas Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {researchAreas.map((area, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                  onClick={() => handleAreaClick(area)}
                >
                  <img 
                    src={area.image} 
                    alt={area.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-[#13274C]">{area.title}</h3>
                    <p className="mb-4">{area.description}</p>
                    <h4 className="font-medium text-[#13274C] mb-2">Faculty Involved:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {area.faculty.map((name, idx) => (
                        <li key={idx}>{name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Modal for Detailed View */}
          {selectedArea && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#13274C]">{selectedArea.title}</h2>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6">
                  <img 
                    src={selectedArea.image} 
                    alt={selectedArea.title} 
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <p className="text-lg mb-6">{selectedArea.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[#13274C] border-b-2 border-[#FFC300] pb-2">
                        Faculty Members
                      </h3>
                      <ul className="space-y-2">
                        {selectedArea.faculty.map((name: string, idx: number) => (
                          <li key={idx} className="flex items-center">
                            <span className="bg-[#13274C] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              {idx + 1}
                            </span>
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[#13274C] border-b-2 border-[#FFC300] pb-2">
                        Research Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-[#13274C]">Active Projects:</h4>
                          <ul className="list-disc pl-5 mt-2">
                            {selectedArea.details.projects.map((project: string, idx: number) => (
                              <li key={idx}>{project}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-[#13274C]">Recent Publications:</h4>
                          <p>{selectedArea.details.publications} in last 3 years</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-[#13274C]">Research Lab:</h4>
                          <p>{selectedArea.details.labs}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-[#13274C]">Key Equipment:</h4>
                          <ul className="list-disc pl-5 mt-2">
                            {selectedArea.details.equipment.map((item: string, idx: number) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-[#13274C]">Interested in this research area?</h3>
                    <p className="mb-4">Contact the faculty members or our research office for opportunities.</p>
                    <button className="bg-[#13274C] hover:bg-[#13274C]/90 text-white font-semibold py-2 px-6 rounded-md">
                      Contact Research Office
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 text-[#13274C]">Want to join our research?</h3>
            <p className="mb-6">Contact the respective faculty members or our research office for opportunities.</p>
            <div className="flex justify-center">
              <a 
                href="mailto:research@cse.du.ac.bd" 
                className="bg-[#13274C] hover:bg-[#13274C]/90 text-white font-semibold py-2 px-6 rounded-md"
              >
                Contact Research Office
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchAreas;