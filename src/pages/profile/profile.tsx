import { useState } from "react";
import "./profile.css";

// TypeScript interfaces for the data structure
interface Education {
  degree: string;
  major: string;
  institute: string;
  year: string;
}

interface Experience {
  title: string;
  organization: string;
  duration: string;
  year: string;
}

interface Award {
  title: string;
  type: string;
  description: string;
  year: string;
}

interface ResearchProfile {
  label: string;
  icon: string;
  url: string;
  btnLabel: string;
}

interface ProfileData {
  name: string;
  title: string;
  photo: string;
  bio: string;
  education: Education[];
  experience: Experience[];
  awards: Award[];
  researchProfiles: ResearchProfile[];
}

// All profile data in a single object
const profileData: ProfileData = {
  name: "Wenxin Du",
  title: "Professor",
  photo: "https://randomuser.me/api/portraits/women/44.jpg",
  bio: "Wenxin Du is a Professor of Finance and the Sylvan C. Coleman Professor of Financial Management at the Harvard Business School. She studies global currency and fixed income markets, central banking, financial regulations, and emerging market finance. She was the recipient of 2022 Award for Economics in Central Banking, and was named the Alfred P. Sloan Foundation Research Fellow 2021-2023.",
  education: [
    {
      degree: "Ph.D.",
      major: "Computer Graphics",
      institute: "Toyohashi University of Technology",
      year: "2001",
    },
    {
      degree: "Masters",
      major: "Computer Graphics",
      institute: "Toyohashi University of Technology",
      year: "1990",
    },
    {
      degree: "Bachelor",
      major: "Computer Graphics",
      institute: "Toyohashi University of Technology",
      year: "1987",
    },
  ],
  experience: [
    {
      title: "Professor",
      organization:
        "Dept of Computer Science & Engineering, University of Dhaka",
      duration: "18 Years",
      year: "2007-PRESENT",
    },
    {
      title: "Associate Professor",
      organization:
        "Dept of Computer Science & Engineering, University of Dhaka",
      duration: "4 Years",
      year: "2003-2007",
    },
    {
      title: "Associate Professor",
      organization:
        "Dept of CSE, Shah Jalal University of Science and Technology",
      duration: "7 Years",
      year: "1995-2003",
    },
    {
      title: "Scientific Officer",
      organization: "Bangladesh Atomic Energy Commission",
      duration: "5 Years",
      year: "1990-1995",
    },
  ],
  awards: [
    {
      title: "Best Researcher Award",
      type: "Academic Excellence",
      description: "Outstanding contributions to research",
      year: "2001",
    },
    {
      title: "Young Faculty Award",
      type: "Early Career",
      description:
        "Promising early-career faculty demonstrating high potential",
      year: "1990",
    },
    {
      title: "Best Paper Award",
      type: "Research Publication",
      description: "Best paper in a peer-reviewed international journal",
      year: "1987",
    },
  ],
  researchProfiles: [
    {
      label: "GOOGLE SCHOLARS",
      icon: "🎓",
      url: "#",
      btnLabel: "VIEW PROFILE",
    },
    { label: "RESEARCH GATE", icon: "🎓", url: "#", btnLabel: "VIEW PROFILE" },
    { label: "CURRICULUM VITAE", icon: "📄", url: "#", btnLabel: "VIEW" },
    {
      label: "PERSONAL WEBSITE",
      icon: "🌐",
      url: "#",
      btnLabel: "VIEW PROFILE",
    },
  ],
};

const courses = [
  {
    number: "01",
    title: "Computer Networking",
    description: "15 weeks per semester 1 mid-term + 1 final exam / semister",
    detailsUrl: "#",
  },
  {
    number: "02",
    title: "Data and Telecommunication",
    description: "15 weeks per semester1 mid-term + 1 final exam / semister",
    detailsUrl: "#",
  },
  {
    number: "03",
    title: "Digital Logic Design",
    description: "15 weeks per semester1 mid-term + 1 final exam / semister",
    detailsUrl: "#",
  },
  {
    number: "04",
    title: "Human Robot Interaction",
    description: "15 weeks per semester1 mid-term + 1 final exam / semister",
    detailsUrl: "#",
  },
  {
    number: "05",
    title: "Machine Learning",
    description: "15 weeks per semester1 mid-term + 1 final exam / semister",
    detailsUrl: "#",
  },
];

function CoursesTab() {
  return (
    <div className="courses-tab">
      {courses.map((course) => (
        <div className="course-item" key={course.number}>
          <div className="course-number">{course.number}</div>
          <div className="course-content">
            <div className="course-title">{course.title}</div>
            <div className="course-desc">{course.description}</div>
            <a className="course-link" href={course.detailsUrl}>
              View Details <span className="arrow">→</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

const publications = [
  {
    type: "BOOKS",
    title:
      "Du, Wenxin, and Jesse Schreger. 'CIP Deviations, the Dollar, and Frictions in International Capital Markets.' Chap. 4 in Handbook of International Economics, Volume 6, edited by Gita Gopinath, Elhanan Helpman, and Kenneth Rogoff, 147–197. Handbooks in Economics. Elsevier BV, 2022.",
    url: "#",
  },
  {
    type: "JOURNAL",
    title:
      "Du, Wenxin, and Jesse Schreger. 'CIP Deviations, the Dollar, and Frictions in International Capital Markets.' Chap. 4 in Handbook of International Economics, Volume 6, edited by Gita Gopinath, Elhanan Helpman, and Kenneth Rogoff, 147–197. Handbooks in Economics. Elsevier BV, 2022.",
    url: "#",
  },
  {
    type: "CONFERENCE",
    title:
      "Du, Wenxin, and Jesse Schreger. 'CIP Deviations, the Dollar, and Frictions in International Capital Markets.' Chap. 4 in Handbook of International Economics, Volume 6, edited by Gita Gopinath, Elhanan Helpman, and Kenneth Rogoff, 147–197. Handbooks in Economics. Elsevier BV, 2022.",
    url: "#",
  },
  // ...repeat as needed for demo
  {
    type: "BOOKS",
    title:
      "Du, Wenxin, and Jesse Schreger. 'CIP Deviations, the Dollar, and Frictions in International Capital Markets.' Chap. 4 in Handbook of International Economics, Volume 6, edited by Gita Gopinath, Elhanan Helpman, and Kenneth Rogoff, 147–197. Handbooks in Economics. Elsevier BV, 2022.",
    url: "#",
  },
  {
    type: "BOOKS",
    title:
      "Du, Wenxin, and Jesse Schreger. 'CIP Deviations, the Dollar, and Frictions in International Capital Markets.' Chap. 4 in Handbook of International Economics, Volume 6, edited by Gita Gopinath, Elhanan Helpman, and Kenneth Rogoff, 147–197. Handbooks in Economics. Elsevier BV, 2022.",
    url: "#",
  },
  {
    type: "CONFERENCE",
    title:
      "Du, Wenxin, and Jesse Schreger. 'CIP Deviations, the Dollar, and Frictions in International Capital Markets.' Chap. 4 in Handbook of International Economics, Volume 6, edited by Gita Gopinath, Elhanan Helpman, and Kenneth Rogoff, 147–197. Handbooks in Economics. Elsevier BV, 2022.",
    url: "#",
  },
];

function PublicationsTab() {
  const [pubType, setPubType] = useState("BOOKS");
  const pubTypes = ["BOOKS", "JOURNAL", "CONFERENCE"];
  const filtered = publications.filter((pub) => pub.type === pubType);

  return (
    <div className="publications-tab">
      <div className="pub-type-tabs">
        {pubTypes.map((type) => (
          <button
            key={type}
            className={`pub-type-tab${pubType === type ? " active" : ""}`}
            onClick={() => setPubType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="pub-list">
        {filtered.map((pub, idx) => (
          <div className="pub-item" key={idx}>
            <div className="pub-title">
              <a href={pub.url} target="_blank" rel="noopener noreferrer">
                {pub.title}
              </a>
            </div>
            <a className="pub-link" href={pub.url}>
              View Details <span className="arrow">→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const contactInfo = {
  name: "Wenxin Du",
  title: "Professor",
  department:
    "Department of Computer Science and Engineering\nFaculty of Engineering and Technology",
  phone: "+1012 3456 789",
  email: "demo@gmail.com",
  address: "132 Dartmouth Street Boston,\nMassachusetts 02156 United States",
  socials: [
    { icon: "🌐", url: "#" },
    { icon: "🐦", url: "#" },
    { icon: "📸", url: "#" },
  ],
};

function ContactInfoTab() {
  return (
    <div className="contact-card">
      <div className="contact-left">
        <h2>Contact Information</h2>
        <div className="contact-person">
          <div className="contact-name">{contactInfo.name}</div>
          <div className="contact-title">{contactInfo.title}</div>
          <div className="contact-dept">{contactInfo.department}</div>
        </div>
        <div className="contact-details">
          <div>
            <span className="contact-icon">📞</span> {contactInfo.phone}
          </div>
          <div>
            <span className="contact-icon">✉️</span> {contactInfo.email}
          </div>
          <div>
            <span className="contact-icon">📍</span> {contactInfo.address}
          </div>
        </div>
        <div className="contact-socials">
          {contactInfo.socials.map((s, i) => (
            <a key={i} href={s.url} className="contact-social">
              {s.icon}
            </a>
          ))}
        </div>
        <div className="contact-bg-circles"></div>
      </div>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="contact-form-row">
          <div>
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>
        </div>
        <div className="contact-form-row">
          <div>
            <label>Email</label>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="text" placeholder="Phone Number" />
          </div>
        </div>
        <div className="contact-form-row">
          <div>
            <label>Select Subject?</label>
            <div className="contact-radio-group">
              <label>
                <input type="radio" name="subject" defaultChecked /> General
                Inquiry
              </label>
              <label>
                <input type="radio" name="subject" /> Collaboration Request
              </label>
              <label>
                <input type="radio" name="subject" /> Research Inquiry
              </label>
              <label>
                <input type="radio" name="subject" /> Invitation
              </label>
            </div>
          </div>
        </div>
        <div className="contact-form-message-group">
          <textarea placeholder=" " rows={3}></textarea>
          <label>Message</label>
        </div>
        <button className="contact-submit" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default function Profile() {
  const data = profileData;
  const [activeTab, setActiveTab] = useState("PROFILE");

  return (
    <div className="profile-page min-h-screen bg-gray-100 px-4 py-6 mt-[4rem] lg:mt-[8rem]">
      {/* Header */}
      <div className="profile-header">
        FACULTY AND RESEARCH &gt; {data.name}
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <img src={data.photo} alt={data.name} className="profile-photo" />
        <div className="profile-info">
          <h2>{data.name}</h2>
          <h4>{data.title}</h4>
          <p>{data.bio}</p>
        </div>
      </div>

      {/* Tabs and Tab Content inside a card */}
      <div className="tab-card">
        <div className="profile-tabs">
          {["PROFILE", "COURSES", "PUBLICATIONS", "CONTACT INFO"].map((tab) => (
            <button
              key={tab}
              className={`tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "PROFILE" && (
            <>
              {/* Education */}
              <section>
                <h3 className="section-title">EDUCATION</h3>
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>DEGREE NAME</th>
                      <th>MAJOR</th>
                      <th>INSTITUTE</th>
                      <th>YEAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.education.map((edu, i) => (
                      <tr key={i}>
                        <td>{edu.degree}</td>
                        <td>{edu.major}</td>
                        <td>{edu.institute}</td>
                        <td>{edu.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Experience */}
              <section>
                <h3 className="section-title">EXPERIENCE</h3>
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>ORGANIZATION</th>
                      <th>DURATION</th>
                      <th>YEAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.experience.map((exp, i) => (
                      <tr key={i}>
                        <td>{exp.title}</td>
                        <td>{exp.organization}</td>
                        <td>{exp.duration}</td>
                        <td>{exp.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Awards */}
              <section>
                <h3 className="section-title">AWARDS</h3>
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>AWARD TYPE</th>
                      <th>DESCRIPTION</th>
                      <th>YEAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.awards.map((award, i) => (
                      <tr key={i}>
                        <td>{award.title}</td>
                        <td>{award.type}</td>
                        <td>{award.description}</td>
                        <td>{award.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Research Profile */}
              <section>
                <h3 className="section-title">RESEARCH PROFILE</h3>
                <div className="research-card">
                  <div className="research-links">
                    {data.researchProfiles.map((profile, i) => (
                      <a
                        href={profile.url}
                        className="research-link"
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="research-link-icon">{profile.icon}</div>
                        {profile.label}
                        <div className="research-link-btn">
                          {profile.btnLabel}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
          {activeTab === "COURSES" && <CoursesTab />}
          {activeTab === "PUBLICATIONS" && <PublicationsTab />}
          {activeTab === "CONTACT INFO" && <ContactInfoTab />}
        </div>
      </div>
    </div>
  );
}
