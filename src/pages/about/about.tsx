import { useState, useEffect } from "react";

export default function About() {
  const [activeSection, setActiveSection] = useState("about");

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "mission", "history", "facts", "alumni"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-12">
      <div className="py-12 flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-8 md:mb-0 md:pr-8 mt-12 px-6">
          <div className="sticky top-24 bg-gray-100 rounded-lg p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className={`w-full text-left px-3 py-2 rounded ${activeSection === 'about' ? 'bg-[#FFB606] text-white' : 'text-black hover:bg-gray-200'}`}
                >
                  About CSEDU
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('mission')} 
                  className={`w-full text-left px-3 py-2 rounded ${activeSection === 'mission' ? 'bg-[#FFB606] text-white' : 'text-black hover:bg-gray-200'}`}
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('history')} 
                  className={`w-full text-left px-3 py-2 rounded ${activeSection === 'history' ? 'bg-[#FFB606] text-white' : 'text-black hover:bg-gray-200'}`}
                >
                  History
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('facts')} 
                  className={`w-full text-left px-3 py-2 rounded ${activeSection === 'facts' ? 'bg-[#FFB606] text-white' : 'text-black hover:bg-gray-200'}`}
                >
                  Key Facts & Figures
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('alumni')} 
                  className={`w-full text-left px-3 py-2 rounded ${activeSection === 'alumni' ? 'bg-[#FFB606] text-white' : 'text-black hover:bg-gray-200'}`}
                >
                  Notable Alumni
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:w-3/4">
        <div className="mb-8">
          <img src="/public/csedu_building.png" alt="CSEDU Building" className="w-full h-auto rounded-lg shadow-md" />
          
        </div>
        <section id="about" className="mb-12 px-6">
          <h2 className="text-2xl font-bold text-[#13274C] mb-4">About CSEDU</h2>
          <p className="text-gray-700 mb-6">
            The Department of Computer Science and Engineering of University of Dhaka (CSEDU) under the Faculty of Engineering and Technology (FoET) fosters quality education and research endeavors in diverse fields of computing. The CSEDU offers a 4 years Bachelor of Science, 1.5 years Master of Science, 2 years M.Phil, and Ph.D degree programs in Computer Science and Engineering. We also offer a Professional Masters in Information and Cyber Security (PMICS) degree program of 1.5 years duration. The CSEDU has become the finest and strongest academic department in the region for education and research in computing fields. We are proud to be the home of consecutive champion teams for regional and national level competitive programming contests. 
            <br /><br />
            Our undergraduate degree program attracts the most meritorious students of the country, intakes only 60 students in a year, and produces graduates who have gone on to great success in industry and academia at home and abroad. The students are offered opportunities to engage in complex problem solving, conducting cutting-edge researches, experiential learning, and depth of study within the discipline, alongside dedicated faculty and a strong team of student-centered advisors and staff. The graduate degree programs, supported by various scholarships and administered by the Faculty of Engineering and Technology (FoET), allow students the opportunity to work with experienced faculty members to expand their knowledge in a variety of CSE areas including Artificial Intelligence, Internet of Things, Cloud Computing, Image Intelligence, Networking, Crowdsourcing, Knowledge Engineering, etc. 
            <br /><br />
            We are also highly privileged to work with a large network of alumni, and a prospective advisory board that includes members from Amazon, Google, Microsoft, and Meta along with other leading technical companies and high-profile universities. This enables us to maintain a relevant curriculum and strong network for our new graduates, leading to a job placement rate of over 95%. Our research profile is also strong and growing, with several million Takas of grants awarded in the last five years, and five faculty members with excellent academic and research profiles joined recently. Active research areas within the department include algorithms, artificial intelligence, cloud computing, computer networking, crowdsourcing applications, data science, distributed systems, graphics and visualization, internet of things, machine learning and pattern mining, etc. The research groups are regularly publishing top-notch journal articles and peer-reviewed ranked conference papers. Our faculty members are dedicated to teaching and providing an engaging, rigorous, outcome based and welcoming classroom environment. 
            <br /><br />
            Given that AI, ML, IoT, Cloud Computing, Big Data Analytics, Cybersecurity, and other Fifth Industrial Revolution (5IR) technologies are playing a major role in building smart city applications as well as a smart society at large, our presence remains strong in the community as we fulfill our mission of research-driven education, industrial and public outreach, and service to the profession. We invite you to browse our website at www.du.ac.bd/body/CSE where you will find detailed information on our academic programs at the undergraduate and graduate levels, research and teaching profiles of our faculty, and student societies. We are confident that you will find a topic that sparks your interest.
          </p>
        </section>

        <section id="mission" className="mb-12 px-6">
          <h2 className="text-2xl font-bold text-[#13274C] mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            The Department of Computer Science and Engineering has been one of the pioneering organizations in the education sector of Bangladesh since its inception in 1992. The department is keen on pushing the boundaries of traditional education system and vigilant to face the challenges that the ever changing field of research brings forth. It is the optimum combination of knowledge generation and application that makes the distinctive feature of the department. 
            <br /><br />
            The department focuses on four major perceptions: 
            <br /><br />
            <strong>Excellence in Education.</strong> From the very beginning, the department is dedicated to provide the best education in the field of Computer Science and Engineering. Armed with a group of experienced faculty and the brightest of students, the department has made exemplary improvement in this field of education. The reflection of this effort can be found amongst the top researchers, programmers, or IT specialists working in top level universities and companies in Bangladesh and all over the world, who graduated from the department. 
            <br /><br />
            <strong>Reputation through Research.</strong> The department focuses heavily on the quality and impact of the researches done in the field of Computer Science and Engineering as well as in multidisciplinary researches conducted in the department. The researches have been focused towards responding to local and global real world crises as well as crossing the frontiers of traditional methods to create new knowledge. 
            <br /><br />
            <strong>Steps towards Society.</strong> The department is always ready to take the responsibility of taking the necessary steps to deploy ICT in social development. The department is keen to fulfill its social responsibility by taking up projects to automate institutional processes at the university and national levels, educate and train people, especially the young people of the country, through workshops on programming, software design, and other ICT training programs. 
            <br /><br />
            <strong>Equality for Everyone.</strong> Everyone in the Department of Computer Science and Engineering is treated and considered as equal. People's past, gender, financial background, ethnicity, religion are not at all considered in the assessment of their present performance. This place gives everyone the opportunity to make a name for themselves and stand out as a member of the CSEDU family. It creates a new identity for the students, one which will be remembered by their department and respected by all. 
            <br /><br />
            <strong>Concoction of Culture.</strong> The department opens its doors towards diversity. People from all over the country, from different cultural backgrounds come to the department and become a part of the same culture that is practised in the department. It's a place for mutual respect and admiration for everyone. This combination of variety ensures an accessible and tolerant environment in the department. An average of 24.59% women out of all students have already pursued degrees from the department which is a reflection of advancement for women in technology in Bangladesh.
          </p>
        </section>

        <section id="history" className="mb-12 px-6">
          <h2 className="text-2xl font-bold text-[#13274C] mb-4">History</h2>
          <p className="text-gray-700 mb-6">
            The journey of the Department of Computer Science and Engineering started in a bright morning of September 1992. It was a brainchild of Dr. M. Lutfar Rahman, a visionary Professor of the Department of Applied Physics and Electronics, University of Dhaka, who felt the urge to come up with an academic department to tackle the snowballing necessity for computer scientists and IT specialists. In spite of a humble beginning, the department, then known as Department of Computer Science, attracted the very best minds of the nation and soon accumulated a star studded faculty roster as well as the brightest of the students. 
            <br /><br />
            The department started with a single classroom offering M.Sc. degree in Computer Science under the Faculty of Science. In 1994, three year B.Sc. Honors program was introduced which was upgraded to four year B.Sc. Honors program in 1997. It is the first department in the Faculty of Science to introduce the four year BSc. program in the University of Dhaka. In 2004, the name of the department was changed to Computer Science and Engineering, leading to its inclusion in the freshly formed Faculty of Engineering and Technology in 2008. In 2010, the four point grading system was introduced in the Faculty of Engineering and Technology. 
            <br /><br />
            Initially, the department started with 20 students in the M.Sc. program in 1992, and then started B.Sc. (Hons) program from 1995 with 21 students. With the increasing demand of Computer Science graduates for the nation, University of Dhaka increased the number of seats for B.Sc. (Hons) program to 60 in 1995. So far, 25 batches have completed their undergraduate studies and 5 batches are currently pursuing their degrees from the department. In addition, 31 batches have completed the graduate study (MSc/ MS) programs and currently 1 batch is continuing their MS coursework/ research. Although only 11 researchers completed PhD from this department, currently there are 4 PhD students pursuing towards their degrees in addition to 1 MPhil students. 
            <br /><br />
            In total, the department has 39 active teachers, 19 of whom have already earned their PhD degrees. Currently,14 faculty members are on leave for pursuing their PhDs from different universities of the world. 
            <br /><br />
            A summary of the faculty members are tinted in the following table: 
            <br /><br />
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2"></th>
                    <th className="border border-gray-300 px-4 py-2">In Total</th>
                    <th className="border border-gray-300 px-4 py-2">In Service</th>
                    <th className="border border-gray-300 px-4 py-2">On Study Leave</th>
                    <th className="border border-gray-300 px-4 py-2">On Leave</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Professor</td>
                    <td className="border border-gray-300 px-4 py-2">14</td>
                    <td className="border border-gray-300 px-4 py-2">13</td>
                    <td className="border border-gray-300 px-4 py-2">0</td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Associate Professor</td>
                    <td className="border border-gray-300 px-4 py-2">6</td>
                    <td className="border border-gray-300 px-4 py-2">5</td>
                    <td className="border border-gray-300 px-4 py-2">0</td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Assistant Professor</td>
                    <td className="border border-gray-300 px-4 py-2">6</td>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                    <td className="border border-gray-300 px-4 py-2">2</td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Lecturer</td>
                    <td className="border border-gray-300 px-4 py-2">13</td>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                    <td className="border border-gray-300 px-4 py-2">10</td>
                    <td className="border border-gray-300 px-4 py-2">0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Total</td>
                    <td className="border border-gray-300 px-4 py-2">39</td>
                    <td className="border border-gray-300 px-4 py-2">24</td>
                    <td className="border border-gray-300 px-4 py-2">12</td>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            Currently, Professor Dr. Md. Abdur Razzaque is working as the 12th chairperson of the department and leading the progress of the department after successful completion of 11 ancestors: 
            <br /><br />
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2" colSpan={4}>Dept. of Computer Science</th>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2"></th>
                    <th className="border border-gray-300 px-4 py-2">Name of the Chairperson</th>
                    <th className="border border-gray-300 px-4 py-2">Starting Date</th>
                    <th className="border border-gray-300 px-4 py-2">Ending Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1.</td>
                    <td className="border border-gray-300 px-4 py-2">Prof. Dr. M. Lutfar Rahman</td>
                    <td className="border border-gray-300 px-4 py-2">01-09-1992</td>
                    <td className="border border-gray-300 px-4 py-2">31-08-1995</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2.</td>
                    <td className="border border-gray-300 px-4 py-2">Prof. Dr. Md. Abdul Mottalib</td>
                    <td className="border border-gray-300 px-4 py-2">01-09-1995</td>
                    <td className="border border-gray-300 px-4 py-2">31-08-1998</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">3.</td>
                    <td className="border border-gray-300 px-4 py-2">Dr. Md. Alamgir Hossain</td>
                    <td className="border border-gray-300 px-4 py-2">01-09-1998</td>
                    <td className="border border-gray-300 px-4 py-2">30-09-2000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">4.</td>
                    <td className="border border-gray-300 px-4 py-2">Md. Rezaul Karim</td>
                    <td className="border border-gray-300 px-4 py-2">01-10-2000</td>
                    <td className="border border-gray-300 px-4 py-2">10-02-2003</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">5.</td>
                    <td className="border border-gray-300 px-4 py-2">Dr. Hafiz Md. Hasan Babu</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2003</td>
                    <td className="border border-gray-300 px-4 py-2">–</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2" colSpan={4}>Dept. of Computer Science and Engineering</th>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2"></th>
                    <th className="border border-gray-300 px-4 py-2">Name of the Chairperson</th>
                    <th className="border border-gray-300 px-4 py-2">Starting Date</th>
                    <th className="border border-gray-300 px-4 py-2">Ending Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">5.</td>
                    <td className="border border-gray-300 px-4 py-2">Dr. Hafiz Md. Hasan Babu</td>
                    <td className="border border-gray-300 px-4 py-2">–</td>
                    <td className="border border-gray-300 px-4 py-2">18-02-2006</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">6.</td>
                    <td className="border border-gray-300 px-4 py-2">Dr. Md. Haider Ali</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2006</td>
                    <td className="border border-gray-300 px-4 py-2">18-02-2009</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">7.</td>
                    <td className="border border-gray-300 px-4 py-2">Prof. Dr. Suraiya Pervin</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2009</td>
                    <td className="border border-gray-300 px-4 py-2">18-02-2012</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">8.</td>
                    <td className="border border-gray-300 px-4 py-2">Dr. Md. Hasanuzzaman</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2012</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2015</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.</td>
                    <td className="border border-gray-300 px-4 py-2">Prof. Dr. Shabbir Ahmed</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2015</td>
                    <td className="border border-gray-300 px-4 py-2">18-02-2018</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">10.</td>
                    <td className="border border-gray-300 px-4 py-2">Prof. Dr. Md. Mustafizur Rahman</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2018</td>
                    <td className="border border-gray-300 px-4 py-2">18-02-2021</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">11.</td>
                    <td className="border border-gray-300 px-4 py-2">Prof. Dr. Saifuddin Md Tareeq</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2021</td>
                    <td className="border border-gray-300 px-4 py-2">18-02-2024</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">12.</td>
                    <td className="border border-gray-300 px-4 py-2">Prof. Dr. Md. Abdur Razzaque</td>
                    <td className="border border-gray-300 px-4 py-2">19-02-2024</td>
                    <td className="border border-gray-300 px-4 py-2">To date</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            Further, there are 15 dedicated officers and staffs who are working graciously in order to maintain smooth functioning of the administrative, technical and daily support activities of the department. 
            <br /><br />
            From its very inception, the Department of Computer Science and Engineering has been a symbol of endurance and excellence in both education as well as administrative sector. The department's pioneering stride towards better education and standard operational procedures have been spearheaded by the faculties, staffs and students of similar mentality. Today, CSEDU is deemed as one of the leading academic departments in the country fostering quality education, cutting-edge research and development industrial collaboration and student engagement in complex problem solving.
          </p>
        </section>

        <section id="facts" className="mb-12 px-6">
          <h2 className="text-2xl font-bold text-[#13274C] mb-4">Key Facts & Figures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Students</h3>
              <p className="text-2xl font-bold text-[#13274C]">10,000+</p>
            </div>
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Faculty</h3>
              <p className="text-2xl font-bold text-[#13274C]">30+</p>
            </div>
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Research Publications</h3>
              <p className="text-2xl font-bold text-[#13274C]">500+</p>
            </div>
          </div>
        </section>

        <section id="alumni" className="mb-12 px-6">
  <h2 className="text-2xl font-bold text-[#13274C] mb-4">Notable Alumni</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    {/* Alumni 1 */}
    <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center">
      <img
        src="/public/chairman.jpg"
        alt="Dr. Hafiz Md. Hasan Babu"
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h3 className="text-lg font-bold text-gray-800 mb-1">Dr. Md. Abdur Razzaque</h3>
      <p className="text-gray-600 mb-1">Professor & Chairman</p>
      <p className="text-gray-700">Class of 1996</p>
    </div>

    {/* Alumni 2 */}
    <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center">
      <img
        src="/public/babu.jpg"
        alt="Dr. Hafiz Md. Hasan Babu"
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h3 className="text-lg font-bold text-gray-800 mb-1">Dr. Hafiz Md. Hasan Babu</h3>
      <p className="text-gray-600 mb-1">Professor</p>
      <p className="text-gray-700">Class of 1992</p>
    </div>

    {/* Alumni 3 */}
    <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center">
      <img
        src="/public/ha.jpg"
        alt="Dr. Md. Haider Ali"
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h3 className="text-lg font-bold text-gray-800 mb-1">Dr. Md. Haider Ali</h3>
      <p className="text-gray-600 mb-1">Professor (Deputation)</p>
      <p className="text-gray-700">Class of 1998</p>
    </div>
  </div>
</section>

        </div>
      </div>
    </div>
  );
}