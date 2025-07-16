import React from "react";
import csImage from "@/assets/researchh.png";

const AwardAndResearchHighlights: React.FC = () => {
  const researchHighlights = [
    {
      title: "Artificial Intelligence and Machine Learning",
      description: "Our department is actively engaged in cutting-edge research in AI and ML, focusing on natural language processing, computer vision, and deep learning applications.",
      achievements: [
        "Published 15+ papers in top-tier conferences like CVPR, ICLR, and NeurIPS",
        "Developed a novel approach to Bengali language processing",
        "Created an AI-powered healthcare diagnostic system"
      ]
    },
    {
      title: "Cybersecurity and Network Systems",
      description: "The cybersecurity research group focuses on developing robust security protocols, intrusion detection systems, and blockchain applications.",
      achievements: [
        "Secured national funding for critical infrastructure protection research",
        "Developed a lightweight encryption algorithm for IoT devices",
        "Created a blockchain-based secure voting system"
      ]
    },
    {
      title: "Data Science and Big Data Analytics",
      description: "Our data science team works on efficient algorithms for processing large-scale data, with applications in social network analysis, bioinformatics, and smart cities.",
      achievements: [
        "Developed a scalable framework for real-time urban data processing",
        "Created novel clustering algorithms for genomic data",
        "Built predictive models for traffic management in Dhaka city"
      ]
    }
  ];

  const awards = [
    {
      title: "National ICT Award 2023",
      recipient: "Dr. Aminul Islam",
      description: "Awarded for outstanding contributions to cybersecurity research and education in Bangladesh."
    },
    {
      title: "Best Paper Award at ICCIT 2022",
      recipient: "Dr. Saiful Islam and Research Team",
      description: "Recognized for groundbreaking research on 'Efficient Deep Learning Models for Resource-Constrained Devices'."
    },
    {
      title: "Young Researcher Award",
      recipient: "Dr. Fahima Khanam",
      description: "Awarded by the Ministry of Science and Technology for exceptional research in AI for healthcare."
    },
    {
      title: "Innovation Challenge Winner 2023",
      recipient: "Student Research Group led by Prof. Rahman",
      description: "Won the national innovation challenge for developing a smart agriculture monitoring system."
    }
  ];

  return (
    <div className="pt-24">
      {/* Image with side margins - Added from Admission page */}
      <div className="mx-8 mb-8 mt-5">
        <img
          src={csImage}
          alt="CSE Department"
          className="w-full h-120 object-cover rounded-t-lg"
        />
        {/* Yellow bar with title */}
        <div className="bg-[#FFC300] py-4 px-6 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#13274C]">Award and Research Highlights</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg mb-12 text-center">
            Celebrating excellence in research and innovation at the Department of Computer Science and Engineering, University of Dhaka.
          </p>
          
          {/* Awards Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-2">Recent Awards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2 text-[#13274C]">{award.title}</h3>
                  <p className="font-medium text-[#FFC300] mb-2">Recipient: {award.recipient}</p>
                  <p>{award.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Research Highlights Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-2">Research Highlights</h2>
            <div className="space-y-8">
              {researchHighlights.map((highlight, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#13274C]">{highlight.title}</h3>
                  <p className="mb-4">{highlight.description}</p>
                  <h4 className="font-medium text-[#13274C] mb-2">Key Achievements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {highlight.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 text-[#13274C]">Interested in our research?</h3>
            <p className="mb-6">Contact us to learn more about research opportunities and collaborations.</p>
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

export default AwardAndResearchHighlights;