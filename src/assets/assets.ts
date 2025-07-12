import iftar from './iftar.png';
import food_fest from './food_fest.png';
import research from './research.png';
import award from './award.png';
import career from './career.png';
import telco from './telco.png';
import policy from './policy.png';
import faculty from './faculty.png';
import security from './security.png';
import calender from './calendar.png';
import pdf1 from './pdf1.pdf';
import pdf2 from './pdf2.pdf';

export const assets = {
  iftar,
  food_fest,
  research,
  award,
  career,
  telco,
  policy,
  faculty,
  security, 
  calender, 
  pdf1, 
  pdf2
};

// TypeScript interfaces
export interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  detailedDescription: string;
  image: string;
  tags: string[];
  registrationOpen: boolean;
  registrationClosed: boolean;
  maxAttendees: number;
  currentAttendees: number;
  category: 'workshop' | 'hackathon' | 'seminar' | 'career' | 'bootcamp' | 'competition';
  organizer: string;
  registrationDeadline: string;
  contactEmail: string;
  requiresTshirt?: boolean;
  requiresEmergencyContact?: boolean;
  includesMeals?: boolean;
}

export interface Notice {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  pdfUrl?: string;
  category: 'academic' | 'general' | 'administrative';
  date: string;
  expiryDate: string;
  author: string;
  location: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  attachments?: Array<{
    name: string;
    url: string;
    size: string;
  }>;
  tags: string[];
  isArchived: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export const sampleEvents: Event[] = [
  {
    id: 1,
    title: "React Workshop 2025",
    date: "2025-06-15",
    startTime: "10:00",
    endTime: "16:00",
    location: "Computer Lab A",
    description: "Learn React.js fundamentals and build your first application with hands-on coding exercises.",
    detailedDescription: "Join us for an intensive React.js workshop designed for students who want to master modern frontend development. This comprehensive session covers React fundamentals including components, JSX, state management, props, hooks, and event handling.\n\nParticipants will build a complete web application from scratch, learning best practices for component architecture, state management with useState and useEffect hooks, and modern React patterns. The workshop includes hands-on coding exercises, debugging techniques, and deployment strategies.\n\nPrerequisites include basic JavaScript knowledge and familiarity with HTML/CSS. All necessary software and resources will be provided.",
    image: research,
    tags: ["Workshop", "Frontend", "Beginner"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 30,
    currentAttendees: 15,
    category: "workshop",
    organizer: "CSEDU Programming Club",
    registrationDeadline: "2025-06-10",
    contactEmail: "programming@csedu.edu.bd",
    requiresTshirt: true,
    requiresEmergencyContact: false,
    includesMeals: true
  },
  {
    id: 2,
    title: "AI/ML Hackathon 2025",
    date: "2025-06-22",
    startTime: "09:00",
    endTime: "18:00",
    location: "Main Auditorium",
    description: "48-hour hackathon focused on AI and machine learning solutions with cash prizes and mentorship.",
    detailedDescription: "Get ready for the most exciting AI/ML Hackathon of 2025! This 48-hour intensive coding competition challenges participants to develop innovative artificial intelligence and machine learning solutions for real-world problems.\n\nThemes include Healthcare AI, Educational Technology, Smart Cities, Environmental Solutions, and Financial Technology. Teams of 2-4 members will compete for cash prizes, internship opportunities, and mentorship programs with industry leaders.\n\nThe hackathon provides access to cloud computing resources, datasets, APIs, and guidance from AI experts. Workshops on machine learning frameworks, data preprocessing, and model deployment will be conducted throughout the event.",
    image: research,
    tags: ["Hackathon", "AI/ML", "Competition"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 100,
    currentAttendees: 67,
    category: "hackathon",
    organizer: "AI Research Lab",
    registrationDeadline: "2025-06-18",
    contactEmail: "ailab@csedu.edu.bd",
    requiresTshirt: true,
    requiresEmergencyContact: true,
    includesMeals: true
  },
  {
    id: 3,
    title: "Tech Career Fair 2025",
    date: "2025-07-05",
    startTime: "10:00",
    endTime: "15:00",
    location: "Student Center",
    description: "Meet top tech companies, explore career opportunities, and network with industry professionals.",
    detailedDescription: "The annual Tech Career Fair brings together leading technology companies, startups, and CSEDU students for networking, recruitment, and career exploration opportunities.\n\nParticipating companies include Google Bangladesh, Microsoft, Samsung R&D, Brain Station 23, Grameenphone, bKash, Pathao, and numerous innovative startups. Representatives will conduct on-spot interviews, discuss internship programs, and share insights about career paths in technology.\n\nStudents can explore opportunities in software development, data science, cybersecurity, product management, and emerging technologies. Career counseling sessions, resume reviews, and interview preparation workshops will be available throughout the event.",
    image: career,
    tags: ["Career", "Networking", "All Levels"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 200,
    currentAttendees: 89,
    category: "career",
    organizer: "Career Services Office",
    registrationDeadline: "2025-07-01",
    contactEmail: "careers@csedu.edu.bd"
  },
  {
    id: 4,
    title: "Cybersecurity Seminar",
    date: "2025-07-12",
    startTime: "14:00",
    endTime: "17:00",
    location: "Engineering Building Room 301",
    description: "Explore cybersecurity trends, ethical hacking, and digital privacy with industry experts.",
    detailedDescription: "Join cybersecurity experts for an in-depth seminar covering the latest trends, threats, and defensive strategies in information security. This comprehensive session addresses current cybersecurity challenges and emerging solutions.\n\nTopics include network security, ethical hacking methodologies, incident response, digital forensics, privacy protection, and compliance frameworks. Renowned speakers from leading cybersecurity firms will share real-world case studies and industry best practices.\n\nThe seminar features interactive demonstrations of security tools, hands-on workshops, and Q&A sessions with experts. Participants will receive cybersecurity resource materials and information about certification programs.",
    image: security,
    tags: ["Seminar", "Security", "Intermediate"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 50,
    currentAttendees: 23,
    category: "seminar",
    organizer: "Cybersecurity Research Group",
    registrationDeadline: "2025-07-08",
    contactEmail: "security@csedu.edu.bd"
  },
  {
    id: 5,
    title: "App Development Bootcamp",
    date: "2025-07-20",
    startTime: "09:00",
    endTime: "17:00",
    location: "Innovation Lab",
    description: "Intensive bootcamp covering iOS and Android development using React Native.",
    detailedDescription: "Master mobile app development through this intensive bootcamp covering cross-platform development with React Native. This comprehensive program teaches students to build professional mobile applications for both iOS and Android platforms.\n\nThe curriculum includes React Native fundamentals, navigation systems, state management, native module integration, API consumption, and app deployment strategies. Participants will develop complete mobile applications including user authentication, data persistence, and real-time features.\n\nExperienced mobile developers will provide mentorship and code reviews. The bootcamp concludes with app presentations and deployment to app stores. Prerequisites include JavaScript knowledge and React experience.",
    image: research,
    tags: ["Bootcamp", "Mobile", "Advanced"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 25,
    currentAttendees: 18,
    category: "bootcamp",
    organizer: "Mobile Development Lab",
    registrationDeadline: "2025-07-15",
    contactEmail: "mobile@csedu.edu.bd"
  },
  {
    id: 6,
    title: "Startup Pitch Competition",
    date: "2025-08-02",
    startTime: "13:00",
    endTime: "18:00",
    location: "Business Incubator",
    description: "Present startup ideas to investors and entrepreneurs for funding and mentorship opportunities.",
    detailedDescription: "Showcase your innovative startup ideas at the annual Startup Pitch Competition, where aspiring entrepreneurs present business concepts to experienced investors, successful entrepreneurs, and industry mentors.\n\nParticipants will present 5-minute pitches followed by Q&A sessions with the judging panel. Categories include EdTech, FinTech, HealthTech, AgriTech, and Social Impact startups. Winners receive seed funding, incubation support, and ongoing mentorship.\n\nThe competition provides networking opportunities with the startup ecosystem, feedback from industry experts, and connections with potential co-founders and team members. Professional development workshops on business planning, market validation, and fundraising strategies will be conducted.",
    image: award,
    tags: ["Competition", "Startup", "Entrepreneurship"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 40,
    currentAttendees: 31,
    category: "competition",
    organizer: "Innovation Hub",
    registrationDeadline: "2025-07-28",
    contactEmail: "innovation@csedu.edu.bd"
  },
  {
    id: 7,
    title: "Data Science Workshop Series",
    date: "2025-08-15",
    startTime: "10:00",
    endTime: "16:00",
    location: "Data Science Lab",
    description: "Comprehensive workshop covering data analysis, visualization, and machine learning with Python and R.",
    detailedDescription: "Enhance your data science skills through this comprehensive workshop series covering the complete data science pipeline from data collection to model deployment. The program is designed for students and professionals seeking practical data science experience.\n\nTopics include data cleaning and preprocessing, exploratory data analysis, statistical modeling, machine learning algorithms, data visualization, and result interpretation. Hands-on sessions with Python, R, Pandas, NumPy, Scikit-learn, and Tableau provide practical experience with industry-standard tools.\n\nParticipants work on real-world datasets and complete projects that can be added to their professional portfolios. The series concludes with project presentations and peer review sessions.",
    image: research,
    tags: ["Workshop", "Data Science", "Python"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 35,
    currentAttendees: 22,
    category: "workshop",
    organizer: "Data Science Club",
    registrationDeadline: "2025-08-10",
    contactEmail: "datascience@csedu.edu.bd"
  },
  {
    id: 8,
    title: "International Programming Contest",
    date: "2025-09-10",
    startTime: "09:00",
    endTime: "14:00",
    location: "Programming Contest Hall",
    description: "Competitive programming contest with international participants testing algorithmic skills.",
    detailedDescription: "Participate in the prestigious International Programming Contest featuring competitive programmers from universities worldwide. This challenging competition tests algorithmic thinking, problem-solving skills, and programming efficiency.\n\nThe contest includes multiple rounds with problems ranging from basic algorithms to advanced data structures and mathematical concepts. Teams of three members compete to solve complex programming challenges within strict time limits.\n\nPrizes include scholarships, internship opportunities, and recognition in the international competitive programming community. Training sessions and practice contests are available for preparation.",
    image: award,
    tags: ["Contest", "Programming", "International"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 150,
    currentAttendees: 98,
    category: "competition",
    organizer: "ACM Student Chapter",
    registrationDeadline: "2025-09-05",
    contactEmail: "acm@csedu.edu.bd"
  },
  {
    id: 9,
    title: "Blockchain Technology Summit",
    date: "2025-09-25",
    startTime: "09:00",
    endTime: "17:00",
    location: "Main Conference Hall",
    description: "Explore blockchain technology, cryptocurrency, and decentralized applications with industry experts.",
    detailedDescription: "Join the Blockchain Technology Summit to explore the revolutionary potential of distributed ledger technology, cryptocurrency, and decentralized applications. This comprehensive event brings together industry experts, researchers, and enthusiasts.\n\nSessions cover blockchain fundamentals, smart contract development, DeFi protocols, NFTs, cryptocurrency trading, and regulatory considerations. Hands-on workshops include Ethereum development, Solidity programming, and Web3 application building.\n\nNetworking opportunities with blockchain startups, cryptocurrency exchanges, and fintech companies provide insights into career opportunities in the rapidly growing blockchain industry.",
    image: telco,
    tags: ["Summit", "Blockchain", "Cryptocurrency"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 80,
    currentAttendees: 45,
    category: "seminar",
    organizer: "Blockchain Research Group",
    registrationDeadline: "2025-09-20",
    contactEmail: "blockchain@csedu.edu.bd"
  },
  {
    id: 10,
    title: "Alumni Networking Gala",
    date: "2025-10-15",
    startTime: "18:00",
    endTime: "22:00",
    location: "Grand Ballroom",
    description: "Annual networking gala connecting CSEDU alumni worldwide for mentorship and career guidance.",
    detailedDescription: "Join the prestigious Alumni Networking Gala, an annual celebration bringing together CSEDU graduates from leading technology companies worldwide. This elegant evening provides unparalleled networking opportunities and celebrates alumni achievements.\n\nAttendees include alumni from Google, Microsoft, Facebook, Amazon, local tech unicorns, and successful entrepreneurs. The gala features keynote presentations, panel discussions on industry trends, and informal networking sessions over dinner.\n\nStudents gain access to mentorship opportunities, career guidance, internship connections, and insights into global technology trends. The event strengthens the CSEDU alumni network and creates lasting professional relationships.",
    image: faculty,
    tags: ["Networking", "Alumni", "Career"],
    registrationOpen: true,
    registrationClosed: false,
    maxAttendees: 120,
    currentAttendees: 67,
    category: "career",
    organizer: "Alumni Relations Office",
    registrationDeadline: "2025-10-10",
    contactEmail: "alumni@csedu.edu.bd"
  }
];

export const sampleNotices: Notice[] = [
  {
    id: 1,
    title: "Final Examination Schedule Spring 2025 - Important Updates",
    description: "Final examination schedule for Spring 2025 semester has been announced with important updates regarding exam venues, timings, and special instructions for students.",
    detailedDescription: "The Examination Committee announces the Final Examination Schedule for Spring 2025 semester. All students are required to carefully review their examination details and comply with the updated examination protocols.\n\nKey Updates:\n• Examinations will be conducted from July 15-30, 2025\n• New seating arrangements with increased social distancing\n• Digital hall tickets mandatory - available on student portal\n• Identity verification required with student ID and hall ticket\n• Calculator policy updated for mathematics and engineering courses\n• Special accommodations available for students with disabilities\n\nImportant Instructions:\n• Arrive 30 minutes before exam time\n• Bring transparent water bottle and blue/black pens\n• Mobile phones strictly prohibited in exam halls\n• Medical emergency contacts available during exams\n• Makeup exams scheduled for August 2-5, 2025\n\nFor any queries regarding exam schedules, seating arrangements, or special requirements, contact the Examination Office immediately. Late applications for makeup exams will not be entertained.\n\nStudents must verify their registration status and resolve any academic or financial clearance issues before the examination period begins.",
    image: research,
    pdfUrl: pdf1,
    category: 'academic',
    date: 'July 10, 2025',
    expiryDate: 'July 30, 2025',
    author: 'Dr. Mohammad Rahman, Controller of Examinations',
    location: 'Multiple Examination Halls - Check Portal',
    time: 'July 15-30, 2025',
    priority: 'high',
    attachments: [
      { name: 'Final_Exam_Schedule_Spring_2025.pdf', url: pdf1, size: '2.3 MB' },
      { name: 'Examination_Guidelines.pdf', url: pdf2, size: '1.8 MB' }
    ],
    tags: ['examination', 'spring2025', 'important', 'schedule'],
    isArchived: false
  },
  {
    id: 2,
    title: "International Research Conference on AI & Machine Learning 2025",
    description: "Call for papers and registration for the prestigious International Research Conference on Artificial Intelligence and Machine Learning, featuring renowned speakers from top universities and tech companies.",
    detailedDescription: "The Department of Computer Science and Engineering proudly announces the International Research Conference on AI & Machine Learning 2025, scheduled for September 15-17, 2025. This premier academic event will bring together leading researchers, industry experts, and students from around the world.\n\nConference Highlights:\n• Keynote speakers from MIT, Stanford, Google DeepMind, and OpenAI\n• 150+ research paper presentations across 8 technical tracks\n• Industry exhibition featuring latest AI technologies\n• Startup pitch competition with $50,000 in prizes\n• Networking sessions with global AI community\n• Workshops on cutting-edge ML frameworks and tools\n\nResearch Tracks:\n1. Deep Learning and Neural Networks\n2. Computer Vision and Image Processing\n3. Natural Language Processing\n4. Robotics and Autonomous Systems\n5. AI Ethics and Responsible Computing\n6. Healthcare AI and Medical Informatics\n7. Fintech and AI in Finance\n8. Sustainable AI and Green Computing\n\nImportant Dates:\n• Paper submission deadline: August 1, 2025\n• Notification of acceptance: August 20, 2025\n• Camera-ready deadline: September 1, 2025\n• Early bird registration: July 15, 2025\n\nRegistration Fees:\n• Students: $150 (Early bird: $100)\n• Academics: $300 (Early bird: $250)\n• Industry: $500 (Early bird: $400)\n\nAll accepted papers will be published in IEEE proceedings and indexed in major databases. Best paper awards in each track with cash prizes and publication opportunities in top-tier journals.",
    image: research,
    pdfUrl: pdf1,
    category: 'academic',
    date: 'June 15, 2025',
    expiryDate: 'September 17, 2025',
    author: 'Prof. Dr. Ayesha Khan, Conference Chair',
    location: 'CSEDU Main Campus & Virtual Hybrid',
    time: 'September 15-17, 2025',
    priority: 'medium',
    attachments: [
      { name: 'Conference_Call_for_Papers.pdf', url: pdf1, size: '3.2 MB' },
      { name: 'Registration_Information.pdf', url: pdf2, size: '1.5 MB' },
      { name: 'Conference_Program_Draft.pdf', url: pdf1, size: '2.8 MB' }
    ],
    tags: ['research', 'conference', 'AI', 'ML', 'international'],
    isArchived: false
  },
  {
    id: 3,
    title: "Summer Internship Program 2025 - Tech Giants Partnership",
    description: "Exciting summer internship opportunities with Google, Microsoft, Amazon, and 20+ leading tech companies. Applications now open for undergraduate and graduate students.",
    detailedDescription: "The Career Services Office announces the launch of Summer Internship Program 2025, featuring partnerships with industry leaders and offering unprecedented opportunities for CSEDU students to gain hands-on experience in cutting-edge technology roles.\n\nPartner Companies:\n• FAANG Companies: Google, Meta, Amazon, Apple, Netflix\n• Microsoft, Intel, NVIDIA, Adobe, Salesforce\n• Local Tech Giants: Brain Station 23, Grameenphone, bKash\n• Emerging Startups: Pathao, Shohoz, Chaldal, Foodpanda\n• Financial Tech: iPay, SureCash, Rocket Internet\n\nInternship Tracks:\n1. Software Engineering (Full-Stack, Backend, Frontend)\n2. Data Science and Analytics\n3. Machine Learning Engineering\n4. DevOps and Cloud Computing\n5. Cybersecurity and Information Security\n6. Mobile App Development (iOS/Android)\n7. Product Management\n8. UI/UX Design and Research\n9. Quality Assurance and Testing\n10. Blockchain and Cryptocurrency\n\nProgram Benefits:\n• Competitive monthly stipends ($800-2000)\n• Mentorship from industry veterans\n• Access to premium tools and platforms\n• Networking opportunities with professionals\n• Performance-based pre-placement offers\n• Certificate of completion\n• Professional development workshops\n\nEligibility Criteria:\n• Minimum CGPA: 3.25/4.00\n• Completed at least 4 semesters\n• Strong programming skills in relevant technologies\n• Excellent communication skills\n• Demonstrated project experience\n\nApplication Requirements:\n• Updated resume and cover letter\n• Academic transcripts\n• Portfolio of projects (GitHub/personal website)\n• Two academic/professional references\n• Technical skills assessment\n\nApplication Process:\n1. Online application submission\n2. Technical screening test\n3. Company-specific interviews\n4. Final selection and placement\n\nDeadlines:\n• Application submission: July 1, 2025\n• Technical screening: July 15, 2025\n• Interview rounds: July 20-30, 2025\n• Final results: August 5, 2025\n• Internship period: August 15 - November 15, 2025",
    image: career,
    pdfUrl: pdf2,
    category: 'academic',
    date: 'June 1, 2025',
    expiryDate: 'July 1, 2025',
    author: 'Ms. Fatima Hassan, Career Services Director',
    location: 'Various Companies - Remote/On-site',
    time: 'Applications Due: July 1, 2025',
    priority: 'high',
    attachments: [
      { name: 'Internship_Program_Brochure.pdf', url: pdf1, size: '4.1 MB' },
      { name: 'Application_Guidelines.pdf', url: pdf2, size: '2.2 MB' },
      { name: 'Company_Profiles.pdf', url: pdf1, size: '5.8 MB' },
      { name: 'Technical_Requirements.pdf', url: pdf2, size: '1.9 MB' }
    ],
    tags: ['internship', 'career', 'summer2025', 'tech-companies'],
    isArchived: false
  },
  {
    id: 4,
    title: "Campus Safety and Security Enhancement Initiative",
    description: "Implementation of comprehensive security upgrades including smart access control, enhanced surveillance systems, and emergency response protocols for student and staff safety.",
    detailedDescription: "The Campus Security Office announces a major security enhancement initiative to ensure the safety and well-being of all students, faculty, and staff members. This comprehensive upgrade represents a significant investment in modern security infrastructure and protocols.\n\nNew Security Features:\n• Smart Card Access Control System\n  - RFID-enabled student/staff ID cards\n  - Building-specific access permissions\n  - Real-time entry/exit logging\n  - Visitor management system\n\n• Enhanced Surveillance Network\n  - 200+ high-definition security cameras\n  - Facial recognition technology\n  - Night vision capabilities\n  - 24/7 monitoring center\n  - Mobile app for security alerts\n\n• Emergency Response System\n  - Panic buttons in all buildings\n  - Mass notification system\n  - Emergency communication app\n  - Automated lockdown capabilities\n  - Direct connection to local police\n\n• Cybersecurity Measures\n  - Network intrusion detection\n  - Endpoint protection for all devices\n  - Regular security awareness training\n  - Secure Wi-Fi with WPA3 encryption\n  - Multi-factor authentication\n\nSafety Protocols:\n• Mandatory safety orientation for new students\n• Monthly emergency drills\n• 24/7 security patrol teams\n• Well-lit pathways and parking areas\n• Emergency call boxes at strategic locations\n• Bicycle and vehicle registration system\n\nCompliance Requirements:\n• All students must activate new ID cards\n• Complete online security training module\n• Update emergency contact information\n• Report suspicious activities immediately\n• Follow visitor escort policies\n\nTraining Schedule:\n• Faculty training: June 20-25, 2025\n• Staff training: June 26-30, 2025\n• Student orientation: July 1-15, 2025\n• Ongoing refresher sessions quarterly\n\nFor assistance with ID card activation or security training, visit the Security Office or contact the helpdesk. All security measures are designed to maintain an open academic environment while ensuring maximum safety.",
    image: security,
    pdfUrl: pdf1,
    category: 'administrative',
    date: 'May 15, 2025',
    expiryDate: 'December 31, 2025',
    author: 'Mr. Abdul Karim, Chief Security Officer',
    location: 'Campus-wide Implementation',
    time: 'Phased Implementation: June-August 2025',
    priority: 'high',
    attachments: [
      { name: 'Security_Enhancement_Overview.pdf', url: pdf1, size: '3.5 MB' },
      { name: 'ID_Card_Activation_Guide.pdf', url: pdf2, size: '1.2 MB' },
      { name: 'Emergency_Procedures.pdf', url: pdf1, size: '2.7 MB' },
      { name: 'Training_Schedule.pdf', url: pdf2, size: '0.8 MB' }
    ],
    tags: ['security', 'safety', 'campus', 'important', 'compliance'],
    isArchived: false
  },
  {
    id: 5,
    title: "Annual Cultural Festival 2025 - 'Digital Heritage'",
    description: "Join CSEDU's grandest cultural celebration featuring traditional and digital arts, international food festival, tech exhibitions, and performances by renowned artists.",
    detailedDescription: "The Cultural Committee proudly presents the Annual Cultural Festival 2025 with the theme 'Digital Heritage' - a spectacular celebration that bridges traditional Bangladeshi culture with modern digital innovation. This three-day extravaganza promises unforgettable experiences for the entire CSEDU community.\n\nFestival Highlights:\n\nDay 1 - Traditional Cultural Day (April 10)\n• Opening ceremony with traditional dance performances\n• Folk music concert featuring renowned artists\n• Traditional craft exhibitions and workshops\n• Poetry recitation and storytelling sessions\n• Classical dance competitions\n• Traditional costume display\n• Handicraft market and artisan demonstrations\n\nDay 2 - Digital Innovation Day (April 11)\n• Tech startup exhibitions\n• Digital art and animation showcases\n• Gaming tournaments (e-sports)\n• Virtual reality experiences\n• AI and robotics demonstrations\n• Short film festival\n• Digital photography competitions\n• Interactive multimedia installations\n\nDay 3 - Fusion Finale (April 12)\n• International cultural performances\n• Modern fusion dance competitions\n• Band concerts and live music\n• Fashion show featuring traditional-modern fusion\n• Grand finale with celebrity guest performances\n• Award ceremonies and prize distributions\n\nFood and Dining:\n• International food court with 25+ cuisines\n• Traditional Bengali food stalls\n• Modern fusion restaurants\n• Dessert corner with local and international sweets\n• Organic and healthy food options\n• Special dietary accommodations\n\nCompetitions and Prizes:\n• Dance competitions (Solo, Group, Fusion)\n• Singing contests (Classical, Modern, Folk)\n• Drama and theater performances\n• Photography and videography contests\n• Creative writing competitions\n• Art and craft exhibitions\n• Tech innovation showcase\n\nTotal Prize Pool: 2,00,000 BDT\n\nRegistration Categories:\n• Individual performances\n• Group/team events\n• Inter-departmental competitions\n• Alumni participation\n• Guest participant category\n\nRegistration Fees:\n• Students: 200 BDT (includes all-day access and meals)\n• Faculty/Staff: 500 BDT\n• Alumni: 800 BDT\n• General public: 1000 BDT\n\nSpecial Features:\n• Live streaming of all major events\n• Professional photography and videography\n• Social media integration with event hashtags\n• Mobile app for schedule and navigation\n• Networking lounges for participants\n• First aid and medical support\n• Security and crowd management\n\nRegistration Deadline: March 25, 2025\nVolunteer Registration: March 15, 2025\n\nContact Information:\nCultural Committee Office\nEmail: cultural@csedu.edu.bd\nPhone: +880-2-55167850\nWebsite: culture.csedu.edu.bd",
    image: iftar,
    pdfUrl: pdf2,
    category: 'general',
    date: 'February 15, 2025',
    expiryDate: 'April 12, 2025',
    author: 'Ms. Rafia Ahmed, Cultural Committee Chair',
    location: 'CSEDU Main Campus - Multiple Venues',
    time: 'April 10-12, 2025 (9:00 AM - 10:00 PM)',
    priority: 'medium',
    attachments: [
      { name: 'Cultural_Festival_Brochure.pdf', url: pdf1, size: '6.2 MB' },
      { name: 'Registration_Form.pdf', url: pdf2, size: '1.1 MB' },
      { name: 'Event_Schedule.pdf', url: pdf1, size: '2.9 MB' },
      { name: 'Venue_Map.pdf', url: pdf2, size: '3.4 MB' },
      { name: 'Competition_Rules.pdf', url: pdf1, size: '2.1 MB' }
    ],
    tags: ['cultural', 'festival', 'competition', 'celebration', 'digital-heritage'],
    isArchived: false
  },
  {
    id: 6,
    title: "New Academic Curriculum 2025-26 - Industry-Aligned Updates",
    description: "Major curriculum revision incorporating latest industry trends, emerging technologies, and enhanced practical learning components effective from Fall 2025 semester.",
    detailedDescription: "The Academic Affairs Committee announces significant curriculum updates for the 2025-26 academic year, designed to align with current industry demands and emerging technology trends. These changes ensure our graduates remain competitive in the global job market.\n\nCurriculum Highlights:\n\nCore Subject Updates:\n• Advanced Machine Learning and Deep Learning (New)\n• Cloud Computing and DevOps Practices (Enhanced)\n• Cybersecurity and Ethical Hacking (Expanded)\n• Mobile Application Development (iOS/Android)\n• Web Development with Modern Frameworks\n• Data Science and Big Data Analytics\n• Blockchain Technology and Cryptocurrency\n• Internet of Things (IoT) and Embedded Systems\n• Software Engineering with Agile Methodologies\n• Human-Computer Interaction and UX Design\n\nIndustry Integration:\n• 50% increase in practical lab hours\n• Mandatory industry internship (12 weeks)\n• Guest lectures by industry experts\n• Real-world project collaborations\n• Professional certification integration\n• Startup incubation program participation\n• Industry mentorship assignments\n\nNew Specialization Tracks:\n1. Artificial Intelligence and Machine Learning\n   - Deep Learning Architectures\n   - Computer Vision and NLP\n   - AI Ethics and Responsible Computing\n   - Research Methodology in AI\n\n2. Cybersecurity and Information Assurance\n   - Network Security and Penetration Testing\n   - Digital Forensics and Incident Response\n   - Cryptography and Blockchain Security\n   - Security Policy and Risk Management\n\n3. Software Engineering and DevOps\n   - Advanced Software Architecture\n   - Continuous Integration/Deployment\n   - Microservices and Container Technologies\n   - Quality Assurance and Testing\n\n4. Data Science and Analytics\n   - Big Data Technologies\n   - Statistical Analysis and Modeling\n   - Business Intelligence and Visualization\n   - Data Mining and Pattern Recognition\n\nPractical Learning Enhancements:\n• State-of-the-art laboratory equipment\n• Cloud computing resources (AWS, Azure, GCP)\n• Industry-standard software licenses\n• Virtual reality and augmented reality labs\n• High-performance computing cluster\n• Maker space for hardware projects\n\nAssessment Method Changes:\n• 40% continuous assessment, 60% final examination\n• Project-based learning emphasis\n• Peer review and collaboration assessment\n• Industry presentation requirements\n• Portfolio development tracking\n• Skills-based competency evaluation\n\nFaculty Development:\n• Industry training programs for faculty\n• Research collaboration initiatives\n• International faculty exchange program\n• Professional development workshops\n• Technology certification programs\n\nStudent Support Services:\n• Academic advising enhancements\n• Career counseling integration\n• Peer tutoring programs\n• Online learning platform upgrades\n• Mental health and wellness support\n\nImplementation Timeline:\n• Faculty training: July-August 2025\n• Infrastructure setup: August 2025\n• Student orientation: September 2025\n• Full implementation: Fall 2025 semester\n\nFor detailed curriculum information, course descriptions, and academic planning assistance, contact the Academic Affairs Office or visit the updated student portal.",
    image: policy,
    pdfUrl: pdf1,
    category: 'academic',
    date: 'May 1, 2025',
    expiryDate: 'September 30, 2025',
    author: 'Prof. Dr. Mahmud Hassan, Academic Affairs Dean',
    location: 'All Academic Departments',
    time: 'Effective Fall 2025 Semester',
    priority: 'high',
    attachments: [
      { name: 'New_Curriculum_Overview.pdf', url: pdf1, size: '8.7 MB' },
      { name: 'Course_Descriptions.pdf', url: pdf2, size: '12.3 MB' },
      { name: 'Specialization_Guide.pdf', url: pdf1, size: '4.6 MB' },
      { name: 'Assessment_Methods.pdf', url: pdf2, size: '3.1 MB' },
      { name: 'Industry_Partnership_Details.pdf', url: pdf1, size: '5.4 MB' }
    ],
    tags: ['curriculum', 'academic', 'industry-aligned', 'important', 'fall2025'],
    isArchived: false
  },
  {
    id: 7,
    title: "Mental Health and Wellness Support Program Launch",
    description: "Comprehensive mental health initiative providing counseling services, stress management workshops, wellness activities, and 24/7 support for student well-being.",
    detailedDescription: "The Student Affairs Office launches a comprehensive Mental Health and Wellness Support Program to prioritize student well-being and academic success. This initiative addresses the growing need for mental health support in academic environments.\n\nProgram Components:\n\nCounseling Services:\n• Individual counseling sessions with licensed therapists\n• Group therapy and support groups\n• Crisis intervention and emergency support\n• Specialized counseling for academic stress\n• Family counseling sessions\n• Peer counseling training program\n• Online counseling platform availability\n\nWellness Workshops:\n• Stress management and relaxation techniques\n• Mindfulness and meditation sessions\n• Time management and study skills\n• Healthy relationship building\n• Financial wellness and budgeting\n• Career anxiety and future planning\n• Sleep hygiene and healthy habits\n\nMental Health Awareness:\n• Monthly awareness campaigns\n• Mental health first aid training\n• Faculty sensitivity training\n• Stigma reduction initiatives\n• Educational seminars and webinars\n• Resource distribution and information sessions\n\nWellness Activities:\n• Yoga and fitness classes\n• Art therapy and creative expression\n• Music therapy sessions\n• Outdoor adventure programs\n• Meditation gardens and quiet spaces\n• Therapy animals program\n• Recreation and sports activities\n\nSupport Resources:\n\n24/7 Helpline Services:\n• Crisis intervention hotline\n• Text-based support system\n• Emergency response protocol\n• Referral to external specialists\n• Hospital coordination for emergencies\n\nDigital Mental Health Platform:\n• Self-assessment tools\n• Guided meditation apps\n• Mood tracking applications\n• Educational resources library\n• Appointment scheduling system\n• Anonymous support forums\n\nPeer Support Network:\n• Trained peer counselors\n• Student mental health ambassadors\n• Residential life support integration\n• Study group facilitation\n• Social connection events\n\nSpecialized Programs:\n\nAcademic Stress Management:\n• Exam anxiety workshops\n• Study skills optimization\n• Time management coaching\n• Academic goal setting\n• Performance anxiety treatment\n\nTransition Support:\n• New student adjustment programs\n• International student support\n• Graduate school preparation\n• Career transition counseling\n• Life skills development\n\nDiversity and Inclusion:\n• Culturally sensitive counseling\n• LGBTQ+ support groups\n• Religious and spiritual counseling\n• Disability support integration\n• International student services\n\nProgram Access:\n• All services free for enrolled students\n• Confidential and private sessions\n• Flexible scheduling options\n• Walk-in emergency support\n• Online and in-person options\n• Multiple language support available\n\nFaculty and Staff Training:\n• Mental health awareness workshops\n• Early intervention training\n• Referral process education\n• Crisis response protocols\n• Creating supportive classroom environments\n\nCommunity Partnerships:\n• Local healthcare providers\n• Mental health organizations\n• Community wellness centers\n• Healthcare insurance coordination\n• Specialized treatment facilities\n\nTo access services, visit the Student Wellness Center, call the 24/7 helpline, or schedule appointments through the student portal. All services are strictly confidential and designed to support academic and personal success.",
    image: iftar,
    pdfUrl: pdf2,
    category: 'general',
    date: 'May 20, 2025',
    expiryDate: 'December 31, 2025',
    author: 'Dr. Sarah Ahmed, Student Wellness Director',
    location: 'Student Wellness Center & Campus-wide',
    time: '24/7 Support Available',
    priority: 'high',
    attachments: [
      { name: 'Mental_Health_Program_Guide.pdf', url: pdf1, size: '4.8 MB' },
      { name: 'Crisis_Support_Resources.pdf', url: pdf2, size: '2.3 MB' },
      { name: 'Wellness_Activities_Schedule.pdf', url: pdf1, size: '3.7 MB' },
      { name: 'Faculty_Training_Manual.pdf', url: pdf2, size: '5.2 MB' }
    ],
    tags: ['mental-health', 'wellness', 'student-support', 'counseling', 'important'],
    isArchived: false
  },
  {
    id: 8,
    title: "Green Campus Sustainability Initiative 2025",
    description: "Comprehensive environmental sustainability program featuring renewable energy, waste reduction, carbon neutrality goals, and student engagement in eco-friendly practices.",
    detailedDescription: "The Environmental Committee launches the Green Campus Sustainability Initiative 2025, a comprehensive program aimed at achieving carbon neutrality by 2030 while fostering environmental consciousness within the CSEDU community.\n\nSustainability Goals:\n\nCarbon Neutrality Targets:\n• 50% reduction in carbon emissions by 2027\n• 100% renewable energy transition by 2028\n• Carbon-neutral campus operations by 2030\n• Net-positive environmental impact by 2035\n\nRenewable Energy Projects:\n• 500kW solar panel installation on campus buildings\n• Wind energy turbines for supplementary power\n• Geothermal heating and cooling systems\n• Energy-efficient LED lighting campus-wide\n• Smart building automation systems\n• Electric vehicle charging stations\n\nWaste Management Program:\n\nZero Waste Initiative:\n• Comprehensive recycling programs\n• Organic waste composting facilities\n• Electronic waste collection and processing\n• Plastic reduction and elimination policies\n• Reusable material promotion campaigns\n• Waste audit and tracking systems\n\nCircular Economy Practices:\n• Campus repair and reuse centers\n• Book and equipment sharing programs\n• Sustainable procurement policies\n• Local vendor preference systems\n• Green building materials usage\n• Water conservation and recycling\n\nEnvironmental Education:\n\nSustainability Curriculum:\n• Environmental science integration\n• Green technology courses\n• Sustainable business practices\n• Climate change and adaptation studies\n• Renewable energy engineering\n• Environmental policy and law\n\nStudent Engagement Programs:\n• Eco-club and environmental societies\n• Green campus ambassadors program\n• Sustainability competition and challenges\n• Environmental research projects\n• Community outreach and awareness\n• International environmental partnerships\n\nGreen Infrastructure:\n\nNatural Environment Enhancement:\n• Native plant landscaping\n• Pollinator gardens and bee-friendly spaces\n• Rainwater harvesting systems\n• Green roofs and living walls\n• Urban farming and community gardens\n• Wildlife habitat preservation\n\nSustainable Transportation:\n• Bicycle sharing programs\n• Electric shuttle services\n• Carpooling coordination systems\n• Public transportation incentives\n• Walking and cycling path improvements\n• Reduced parking footprint\n\nCommunity Impact:\n\nLocal Environmental Projects:\n• River cleanup initiatives\n• Tree planting campaigns\n• Air quality monitoring\n• Community solar projects\n• Environmental education outreach\n• Sustainable agriculture support\n\nIndustry Partnerships:\n• Green technology collaborations\n• Sustainable business development\n• Environmental consulting services\n• Clean energy research projects\n• Eco-friendly product development\n• Environmental impact assessments\n\nImplementation Timeline:\n\nPhase 1 (2025):\n• Solar panel installation begins\n• Waste reduction programs launch\n• Student engagement campaigns\n• Baseline environmental assessment\n\nPhase 2 (2026-2027):\n• Renewable energy expansion\n• Green building retrofits\n• Advanced recycling systems\n• Sustainability curriculum integration\n\nPhase 3 (2028-2030):\n• Full renewable energy transition\n• Carbon neutrality achievement\n• Community impact scaling\n• International recognition pursuits\n\nStudent Involvement Opportunities:\n• Environmental research assistantships\n• Green campus volunteer programs\n• Sustainability project leadership\n• Eco-innovation competitions\n• Environmental advocacy roles\n• Community engagement activities\n\nMeasurement and Reporting:\n• Monthly sustainability metrics\n• Annual environmental impact reports\n• Carbon footprint tracking\n• Waste reduction measurements\n• Energy efficiency monitoring\n• Community engagement assessments\n\nFor more information about volunteering, research opportunities, or sustainability initiatives, contact the Environmental Office or visit the Green Campus portal.",
    image: iftar,
    pdfUrl: pdf1,
    category: 'general',
    date: 'April 22, 2025',
    expiryDate: 'December 31, 2030',
    author: 'Prof. Dr. Nusrat Jahan, Environmental Committee Chair',
    location: 'Campus-wide Implementation',
    time: 'Multi-year Initiative (2025-2030)',
    priority: 'medium',
    attachments: [
      { name: 'Sustainability_Master_Plan.pdf', url: pdf1, size: '7.9 MB' },
      { name: 'Green_Technology_Guide.pdf', url: pdf2, size: '4.1 MB' },
      { name: 'Student_Engagement_Opportunities.pdf', url: pdf1, size: '2.8 MB' },
      { name: 'Environmental_Impact_Assessment.pdf', url: pdf2, size: '6.3 MB' }
    ],
    tags: ['sustainability', 'environment', 'green-campus', 'renewable-energy', 'long-term'],
    isArchived: false
  },
  {
    id: 9,
    title: "Digital Library Expansion and Advanced Research Resources",
    description: "Major upgrade to digital library infrastructure with access to premium databases, AI-powered research tools, virtual reality learning spaces, and 24/7 online services.",
    detailedDescription: "The Central Library announces a transformative digital expansion project that will revolutionize research and learning experiences for students, faculty, and researchers. This initiative represents the largest investment in academic resources in the university's history.\n\nDigital Resources Expansion:\n\nPremium Database Access:\n• IEEE Xplore Complete Collection\n• ACM Digital Library Full Access\n• SpringerLink Premium Subscription\n• Elsevier ScienceDirect Complete\n• Wiley Online Library Full Collection\n• Nature Publishing Group Access\n• JSTOR Academic Complete\n• Web of Science Premium\n• Scopus Advanced Analytics\n• Google Scholar Institutional Access\n\nSpecialized Technical Resources:\n• O'Reilly Learning Platform\n• Lynda.com/LinkedIn Learning\n• Coursera for Business\n• edX Professional Education\n• Pluralsight Technology Skills\n• Udemy Business Premium\n• MasterClass Institutional\n\nAI-Powered Research Tools:\n\nIntelligent Research Assistant:\n• Natural language query processing\n• Automatic literature review generation\n• Citation analysis and recommendations\n• Research trend identification\n• Plagiarism detection and prevention\n• Collaborative research platforms\n• Research impact measurement\n\nAdvanced Analytics:\n• Bibliometric analysis tools\n• Research collaboration mapping\n• Citation network visualization\n• Impact factor tracking\n• H-index calculation and monitoring\n• Research performance dashboards\n\nVirtual Reality Learning Spaces:\n\nImmersive Learning Environments:\n• Virtual reality laboratory simulations\n• 3D molecular modeling spaces\n• Historical site virtual tours\n• Architectural design visualization\n• Engineering project prototyping\n• Medical procedure simulations\n• Astronomy and space exploration\n\nCollaborative VR Rooms:\n• Multi-user virtual meetings\n• Shared whiteboard experiences\n• 3D model collaboration\n• Virtual presentation spaces\n• Remote learning facilitation\n• International collaboration support\n\nDigital Library Services:\n\n24/7 Online Support:\n• Chat-based research assistance\n• Virtual reference consultations\n• Online tutorial and training\n• Document delivery services\n• Interlibrary loan facilitation\n• Research appointment scheduling\n• Technical support hotline\n\nMobile Library Application:\n• Book and resource searching\n• Digital reading platform\n• Offline content access\n• Notification and renewal system\n• Study room booking\n• Research collaboration tools\n• Personal library dashboard\n\nPhysical Space Modernization:\n\nSmart Learning Environments:\n• Interactive smart whiteboards\n• Wireless charging stations\n• Climate-controlled study pods\n• Noise-canceling study areas\n• Collaborative group spaces\n• High-speed internet connectivity\n• Ergonomic furniture upgrades\n\nSpecialized Research Areas:\n• Data visualization studios\n• Digital media production labs\n• 3D printing and prototyping space\n• Quiet meditation and reflection areas\n• Podcast and video recording booths\n• Presentation practice rooms\n\nAdvanced Services:\n\nResearch Support Programs:\n• Personalized research consultations\n• Systematic review assistance\n• Data management planning\n• Grant writing support\n• Publication strategy guidance\n• Copyright and licensing advice\n• Research ethics consultation\n\nDigital Scholarship Services:\n• Institutional repository management\n• Open access publishing support\n• Digital humanities projects\n• Data visualization assistance\n• Web archiving services\n• Digital preservation programs\n\nTraining and Education:\n\nInformation Literacy Programs:\n• Research methodology workshops\n• Database searching techniques\n• Citation management training\n• Academic writing support\n• Critical thinking development\n• Digital literacy skills\n• Information evaluation methods\n\nFaculty Development:\n• Research tool training sessions\n• Digital pedagogy workshops\n• Technology integration support\n• Course reserve management\n• Online assessment tools\n• Learning management system training\n\nAccess and Availability:\n• 24/7 digital resource access\n• Remote authentication systems\n• VPN support for off-campus access\n• Mobile-optimized interfaces\n• Multi-device synchronization\n• Accessibility compliance features\n• Multiple language support\n\nImplementation Schedule:\n• Database integration: July 2025\n• VR space setup: August 2025\n• Physical renovation: September 2025\n• Full service launch: October 2025\n• Training programs: November 2025\n\nFor training sessions, research consultations, or technical support, contact the Digital Library Services team or visit the library portal for detailed guides and tutorials.",
    image: research,
    pdfUrl: pdf2,
    category: 'academic',
    date: 'June 10, 2025',
    expiryDate: 'December 31, 2025',
    author: 'Dr. Rashida Khatun, Chief Librarian',
    location: 'Central Library & Digital Platforms',
    time: 'Implementation: July-October 2025',
    priority: 'medium',
    attachments: [
      { name: 'Digital_Library_Overview.pdf', url: pdf1, size: '5.6 MB' },
      { name: 'Database_Access_Guide.pdf', url: pdf2, size: '3.9 MB' },
      { name: 'VR_Learning_Spaces.pdf', url: pdf1, size: '4.7 MB' },
      { name: 'Training_Schedule.pdf', url: pdf2, size: '2.1 MB' },
      { name: 'Research_Tools_Manual.pdf', url: pdf1, size: '8.3 MB' }
    ],
    tags: ['library', 'digital-resources', 'research', 'VR', 'academic-support'],
    isArchived: false
  },
  {
    id: 10,
    title: "Alumni Success Network and Mentorship Program 2025",
    description: "Comprehensive alumni engagement initiative connecting current students with successful graduates for mentorship, networking, career guidance, and professional development opportunities.",
    detailedDescription: "The Alumni Relations Office proudly launches the Alumni Success Network and Mentorship Program 2025, designed to bridge the gap between current students and accomplished CSEDU graduates working in leading organizations worldwide.\n\nProgram Overview:\n\nAlumni Network Statistics:\n• 15,000+ graduates in 50+ countries\n• 2,500+ working in Fortune 500 companies\n• 800+ entrepreneurs and startup founders\n• 300+ faculty members in top universities\n• 150+ government and policy positions\n• 500+ in leadership and executive roles\n\nMentorship Program Structure:\n\nOne-on-One Mentoring:\n• Personalized mentor-mentee matching\n• Monthly virtual or in-person meetings\n• Career guidance and professional development\n• Industry insights and market trends\n• Job search and interview preparation\n• Network expansion opportunities\n• Goal setting and achievement tracking\n\nGroup Mentoring Sessions:\n• Industry-specific group discussions\n• Skill development workshops\n• Leadership training programs\n• Entrepreneurship guidance\n• Research collaboration opportunities\n• Professional presentation skills\n• Networking event facilitation\n\nVirtual Mentorship Platform:\n• AI-powered mentor matching system\n• Video conferencing integration\n• Progress tracking and goal monitoring\n• Resource sharing capabilities\n• Event scheduling and calendar sync\n• Achievement recognition system\n• Feedback and evaluation tools\n\nCareer Development Services:\n\nIndustry-Specific Guidance:\nTechnology Sector:\n• Software Engineering (Google, Microsoft, Amazon)\n• Data Science and AI (Meta, Netflix, Tesla)\n• Cybersecurity (IBM, Cisco, FireEye)\n• Product Management (Apple, Uber, Airbnb)\n• Startup Ecosystem (Y Combinator, 500 Startups)\n\nFinancial Services:\n• Investment Banking (Goldman Sachs, JP Morgan)\n• Fintech Innovation (PayPal, Square, Stripe)\n• Risk Management (BlackRock, Vanguard)\n• Quantitative Analysis (Two Sigma, Renaissance)\n• Cryptocurrency and Blockchain (Coinbase, Binance)\n\nConsulting and Strategy:\n• Management Consulting (McKinsey, BCG, Bain)\n• Technology Consulting (Deloitte, Accenture)\n• Digital Transformation (IBM, PwC)\n• Strategy Development (Oliver Wyman, Booz Allen)\n\nAcademia and Research:\n• PhD Program Guidance\n• Research Methodology Training\n• Publication Strategy Development\n• Grant Writing and Funding\n• Academic Job Market Preparation\n• Conference Presentation Skills\n\nProfessional Development Workshops:\n\nSkill Enhancement Programs:\n• Communication and Presentation Skills\n• Leadership and Team Management\n• Project Management Certification\n• Negotiation and Conflict Resolution\n• Cultural Intelligence and Global Mindset\n• Personal Branding and Online Presence\n• Financial Planning and Investment\n\nIndustry Immersion Programs:\n• Company visits and office tours\n• Job shadowing opportunities\n• Internship placement assistance\n• Project collaboration with alumni companies\n• Guest lecture series by industry experts\n• Panel discussions and Q&A sessions\n\nNetworking Events:\n\nRegular Networking Opportunities:\n• Monthly virtual coffee chats\n• Quarterly regional meetups\n• Annual global alumni conference\n• Industry-specific networking events\n• Startup pitch competitions\n• Innovation showcases\n• Career fair participations\n\nSpecial Interest Groups:\n• Women in Technology Network\n• Entrepreneurs and Startup Founders\n• International Professionals Group\n• Young Alumni Network (< 5 years)\n• Senior Executive Circle\n• Academic and Research Network\n\nSuccess Stories and Impact:\n\nRecent Achievements:\n• 250+ successful job placements in 2024\n• 89% mentee satisfaction rate\n• 150+ internship opportunities provided\n• 50+ startup funding connections made\n• 75+ graduate school admissions\n• 30+ scholarship recipients\n\nGlobal Reach:\n• Mentors available in 25+ countries\n• 24/7 support across time zones\n• Multi-language assistance\n• Cultural adaptation guidance\n• International job market insights\n• Global mobility support\n\nProgram Benefits:\n\nFor Students:\n• Access to industry insider knowledge\n• Professional network expansion\n• Career clarity and direction\n• Skill development opportunities\n• Job placement assistance\n• Personal and professional growth\n• Scholarship and funding opportunities\n\nFor Alumni:\n• Giving back to alma mater\n• Talent pipeline for hiring\n• Professional development credits\n• Networking with peers\n• University engagement opportunities\n• Recognition and awards\n• Legacy building\n\nApplication Process:\n\n1. Complete online application form\n2. Upload resume and personal statement\n3. Specify mentorship preferences\n4. Participate in matching interview\n5. Attend orientation session\n6. Begin mentorship journey\n\nEligibility Requirements:\n• Current CSEDU students (undergraduate/graduate)\n• Minimum 3.0 CGPA requirement\n• Strong commitment to program participation\n• Professional communication skills\n• Clear career objectives\n• Willingness to engage actively\n\nProgram Duration:\n• Standard program: 12 months\n• Extended program: 24 months\n• Flexible scheduling options\n• Renewable based on performance\n• Opportunity for peer mentoring\n\nTo join the Alumni Success Network or apply for the mentorship program, visit the Alumni Portal or attend the information sessions scheduled throughout the semester. Transform your career trajectory with guidance from CSEDU's most successful graduates.",
    image: faculty,
    pdfUrl: pdf1,
    category: 'general',
    date: 'March 15, 2025',
    expiryDate: 'March 15, 2026',
    author: 'Mr. Rafiq Ahmed, Alumni Relations Director',
    location: 'Global Network - Virtual & In-Person',
    time: 'Year-round Program',
    priority: 'medium',
    attachments: [
      { name: 'Alumni_Network_Directory.pdf', url: pdf1, size: '9.8 MB' },
      { name: 'Mentorship_Program_Guide.pdf', url: pdf2, size: '4.5 MB' },
      { name: 'Success_Stories_Compilation.pdf', url: pdf1, size: '6.7 MB' },
      { name: 'Application_Instructions.pdf', url: pdf2, size: '2.3 MB' },
      { name: 'Networking_Event_Calendar.pdf', url: pdf1, size: '3.1 MB' }
    ],
    tags: ['alumni', 'mentorship', 'networking', 'career-development', 'professional-growth'],
    isArchived: false
  }
];

export const eventCategories: Category[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'workshop', name: 'Workshops' },
  { id: 'hackathon', name: 'Hackathons' },
  { id: 'seminar', name: 'Seminars' },
  { id: 'career', name: 'Career Events' },
  { id: 'bootcamp', name: 'Bootcamps' },
  { id: 'competition', name: 'Competitions' }
];

export const noticeCategories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'academic', name: 'Academic' },
  { id: 'general', name: 'General' },
  { id: 'administrative', name: 'Administrative' }
];