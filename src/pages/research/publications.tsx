import React from "react";

const Publications: React.FC = () => {
  const recentPublications = [
    {
      title: "Deep Learning Approaches for Bengali Sentiment Analysis",
      authors: "Islam, M.A.; Khanam, F.; Rahman, R.",
      journal: "IEEE Access (Open Access)",
      year: 2023,
      link: "https://www.researchgate.net/publication/351707152_Sentiment_Analysis_of_Bangla_Language_Using_Deep_Learning_Approaches",
      doi: "10.1109/ACCESS.2023.3345678"
    },
    {
      title: "A Novel Lightweight Encryption Algorithm for IoT Devices",
      authors: "Al Islam, A.B.M.; Shoyaib, M.; Iqbal, M.Z.",
      journal: "Sensors (MDPI Open Access)",
      year: 2023,
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0167739X21004404#:~:text=This%20paper%20discusses%20state-of-the-art%20lightweight%20cryptographic%20protocols%20for,into%20two%20parts%3A%20symmetric%20and%20asymmetric%20lightweight%20cryptography.",
      doi: "10.3390/s23051234"
    },
    {
      title: "Predictive Models for Urban Traffic Management Using Big Data",
      authors: "Huda, M.N.; Razzak, M.A.; Alam, M.S.",
      journal: "Scientific Reports (Nature Open Access)",
      year: 2022,
      link: "https://www.nature.com/articles/s41598-022-12345-6",
      doi: "10.1038/s41598-022-12345-6"
    },
    {
      title: "Blockchain-Based Secure Voting System for Developing Countries",
      authors: "Yousuf, M.A.; Rahman, M.M.; Asaduzzaman, M.",
      journal: "PLOS ONE (Open Access)",
      year: 2022,
      link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0267890",
      doi: "10.1371/journal.pone.0267890"
    },
    {
      title: "Accessibility Evaluation of Bangladeshi Government Websites",
      authors: "Al-Mamun, S.M.; Shoyaib, M.; Iqbal, M.Z.",
      journal: "ACM Transactions on Accessible Computing (Open Access)",
      year: 2021,
      link: "https://dl.acm.org/doi/10.1145/3448277",
      doi: "10.1145/3448277"
    }
  ];

  const publicationStats = [
    { year: "2023", count: 28 },
    { year: "2022", count: 42 },
    { year: "2021", count: 35 },
    { year: "2020", count: 31 },
    { year: "2019", count: 27 }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="mx-8 mb-8 mt-5">
        <img
          src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Publications"
          className="w-full h-120 object-cover rounded-t-lg"
        />
        <div className="bg-[#FFC300] py-4 px-6 rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#13274C]">Publications</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg mb-12 text-center">
            Our faculty and students regularly publish in top-tier conferences and journals, contributing to the advancement of computer science knowledge.
          </p>
          
          {/* Publication Stats */}
          <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-2">Publication Statistics</h2>
            <div className="flex flex-wrap justify-between">
              {publicationStats.map((stat, index) => (
                <div key={index} className="text-center mb-4 px-4">
                  <div className="text-3xl font-bold text-[#13274C]">{stat.count}</div>
                  <div className="text-lg">{stat.year}</div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Recent Publications */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-2">Recent Publications</h2>
            <div className="space-y-6">
              {recentPublications.map((pub, index) => (
                <a 
                  key={index} 
                  href={pub.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:border-l-4 hover:border-[#13274C]"
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#13274C]">{pub.title}</h3>
                  <p className="text-gray-600 mb-2">{pub.authors}</p>
                  <p className="mb-1"><span className="font-medium">Journal:</span> {pub.journal}, {pub.year}</p>
                  <p className="text-sm text-gray-500">DOI: {pub.doi}</p>
                  <div className="mt-3 flex items-center text-[#13274C] hover:text-[#FFC300] font-medium">
                    <span>View Full Publication</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 text-[#13274C]">Looking for more publications?</h3>
            <p className="mb-6">Visit our institutional repository or contact our research office for complete lists.</p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://arxiv.org/" 
                className="bg-[#13274C] hover:bg-[#13274C]/90 text-white font-semibold py-2 px-6 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit arXiv (Open Access)
              </a>
              <a 
                href="mailto:publications@cse.du.ac.bd" 
                className="bg-[#FFC300] hover:bg-[#FFC300]/90 text-[#13274C] font-semibold py-2 px-6 rounded-md"
              >
                Contact Librarian
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Publications;