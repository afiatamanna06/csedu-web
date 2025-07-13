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

  // ✅ Add these optional fields if used in some events only
  requiresTshirt?: boolean;
  requiresEmergencyContact?: boolean;
  includesMeals?: boolean;
}

export interface Notice {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  pdfFile: File | null;
  category: 'academic' | 'general' | 'administrative';
  date: string;
  expiryDate: string;
  author: string;
  location: string;
  time: string;
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
    image: career,
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
];

export const sampleNotices: Notice[] = [
  {
    id: 1,
    title: "Final Examination Schedule Spring 2025 - Important Updates",
    description: "Final examination schedule for Spring 2025 semester has been announced with important updates regarding exam venues, timings, and special instructions for students.",
    detailedDescription: "The Examination Committee announces the Final Examination Schedule for Spring 2025 semester. All students are required to carefully review their examination details and comply with the updated examination protocols.\n\nKey Updates:\n• Examinations will be conducted from July 15-30, 2025\n• New seating arrangements with increased social distancing\n• Digital hall tickets mandatory - available on student portal\n• Identity verification required with student ID and hall ticket\n• Calculator policy updated for mathematics and engineering courses\n• Special accommodations available for students with disabilities\n\nImportant Instructions:\n• Arrive 30 minutes before exam time\n• Bring transparent water bottle and blue/black pens\n• Mobile phones strictly prohibited in exam halls\n• Medical emergency contacts available during exams\n• Makeup exams scheduled for August 2-5, 2025\n\nFor any queries regarding exam schedules, seating arrangements, or special requirements, contact the Examination Office immediately. Late applications for makeup exams will not be entertained.\n\nStudents must verify their registration status and resolve any academic or financial clearance issues before the examination period begins.",
    pdfFile: null,
    category: 'academic',
    date: 'July 10, 2025',
    expiryDate: 'July 30, 2025',
    author: 'Dr. Mohammad Rahman, Controller of Examinations',
    location: 'Multiple Examination Halls - Check Portal',
    time: 'July 15-30, 2025',
    isArchived: false
  },
  {
    id: 4,
    title: "Campus Safety and Security Enhancement Initiative",
    description: "Implementation of comprehensive security upgrades including smart access control, enhanced surveillance systems, and emergency response protocols for student and staff safety.",
    detailedDescription: "The Campus Security Office announces a major security enhancement initiative to ensure the safety and well-being of all students, faculty, and staff members. This comprehensive upgrade represents a significant investment in modern security infrastructure and protocols.\n\nNew Security Features:\n• Smart Card Access Control System\n  - RFID-enabled student/staff ID cards\n  - Building-specific access permissions\n  - Real-time entry/exit logging\n  - Visitor management system\n\n• Enhanced Surveillance Network\n  - 200+ high-definition security cameras\n  - Facial recognition technology\n  - Night vision capabilities\n  - 24/7 monitoring center\n  - Mobile app for security alerts\n\n• Emergency Response System\n  - Panic buttons in all buildings\n  - Mass notification system\n  - Emergency communication app\n  - Automated lockdown capabilities\n  - Direct connection to local police\n\n• Cybersecurity Measures\n  - Network intrusion detection\n  - Endpoint protection for all devices\n  - Regular security awareness training\n  - Secure Wi-Fi with WPA3 encryption\n  - Multi-factor authentication\n\nSafety Protocols:\n• Mandatory safety orientation for new students\n• Monthly emergency drills\n• 24/7 security patrol teams\n• Well-lit pathways and parking areas\n• Emergency call boxes at strategic locations\n• Bicycle and vehicle registration system\n\nCompliance Requirements:\n• All students must activate new ID cards\n• Complete online security training module\n• Update emergency contact information\n• Report suspicious activities immediately\n• Follow visitor escort policies\n\nTraining Schedule:\n• Faculty training: June 20-25, 2025\n• Staff training: June 26-30, 2025\n• Student orientation: July 1-15, 2025\n• Ongoing refresher sessions quarterly\n\nFor assistance with ID card activation or security training, visit the Security Office or contact the helpdesk. All security measures are designed to maintain an open academic environment while ensuring maximum safety.",
    pdfFile: null,
    category: 'administrative',
    date: 'May 15, 2025',
    expiryDate: 'December 31, 2025',
    author: 'Mr. Abdul Karim, Chief Security Officer',
    location: 'Campus-wide Implementation',
    time: 'Phased Implementation: June-August 2025',
    isArchived: false
  },
  {
    id: 5,
    title: "Annual Cultural Festival 2025 - 'Digital Heritage'",
    description: "Join CSEDU's grandest cultural celebration featuring traditional and digital arts, international food festival, tech exhibitions, and performances by renowned artists.",
    detailedDescription: "The Cultural Committee proudly presents the Annual Cultural Festival 2025 with the theme 'Digital Heritage' - a spectacular celebration that bridges traditional Bangladeshi culture with modern digital innovation. This three-day extravaganza promises unforgettable experiences for the entire CSEDU community.\n\nFestival Highlights:\n\nDay 1 - Traditional Cultural Day (April 10)\n• Opening ceremony with traditional dance performances\n• Folk music concert featuring renowned artists\n• Traditional craft exhibitions and workshops\n• Poetry recitation and storytelling sessions\n• Classical dance competitions\n• Traditional costume display\n• Handicraft market and artisan demonstrations\n\nDay 2 - Digital Innovation Day (April 11)\n• Tech startup exhibitions\n• Digital art and animation showcases\n• Gaming tournaments (e-sports)\n• Virtual reality experiences\n• AI and robotics demonstrations\n• Short film festival\n• Digital photography competitions\n• Interactive multimedia installations\n\nDay 3 - Fusion Finale (April 12)\n• International cultural performances\n• Modern fusion dance competitions\n• Band concerts and live music\n• Fashion show featuring traditional-modern fusion\n• Grand finale with celebrity guest performances\n• Award ceremonies and prize distributions\n\nFood and Dining:\n• International food court with 25+ cuisines\n• Traditional Bengali food stalls\n• Modern fusion restaurants\n• Dessert corner with local and international sweets\n• Organic and healthy food options\n• Special dietary accommodations\n\nCompetitions and Prizes:\n• Dance competitions (Solo, Group, Fusion)\n• Singing contests (Classical, Modern, Folk)\n• Drama and theater performances\n• Photography and videography contests\n• Creative writing competitions\n• Art and craft exhibitions\n• Tech innovation showcase\n\nTotal Prize Pool: 2,00,000 BDT\n\nRegistration Categories:\n• Individual performances\n• Group/team events\n• Inter-departmental competitions\n• Alumni participation\n• Guest participant category\n\nRegistration Fees:\n• Students: 200 BDT (includes all-day access and meals)\n• Faculty/Staff: 500 BDT\n• Alumni: 800 BDT\n• General public: 1000 BDT\n\nSpecial Features:\n• Live streaming of all major events\n• Professional photography and videography\n• Social media integration with event hashtags\n• Mobile app for schedule and navigation\n• Networking lounges for participants\n• First aid and medical support\n• Security and crowd management\n\nRegistration Deadline: March 25, 2025\nVolunteer Registration: March 15, 2025\n\nContact Information:\nCultural Committee Office\nEmail: cultural@csedu.edu.bd\nPhone: +880-2-55167850\nWebsite: culture.csedu.edu.bd",
    pdfFile: null,
    category: 'general',
    date: 'February 15, 2025',
    expiryDate: 'April 12, 2025',
    author: 'Ms. Rafia Ahmed, Cultural Committee Chair',
    location: 'CSEDU Main Campus - Multiple Venues',
    time: 'April 10-12, 2025 (9:00 AM - 10:00 PM)',
    isArchived: false
  },
  {
    id: 6,
    title: "New Academic Curriculum 2025-26 - Industry-Aligned Updates",
    description: "Major curriculum revision incorporating latest industry trends, emerging technologies, and enhanced practical learning components effective from Fall 2025 semester.",
    detailedDescription: "The Academic Affairs Committee announces significant curriculum updates for the 2025-26 academic year, designed to align with current industry demands and emerging technology trends. These changes ensure our graduates remain competitive in the global job market.\n\nCurriculum Highlights:\n\nCore Subject Updates:\n• Advanced Machine Learning and Deep Learning (New)\n• Cloud Computing and DevOps Practices (Enhanced)\n• Cybersecurity and Ethical Hacking (Expanded)\n• Mobile Application Development (iOS/Android)\n• Web Development with Modern Frameworks\n• Data Science and Big Data Analytics\n• Blockchain Technology and Cryptocurrency\n• Internet of Things (IoT) and Embedded Systems\n• Software Engineering with Agile Methodologies\n• Human-Computer Interaction and UX Design\n\nIndustry Integration:\n• 50% increase in practical lab hours\n• Mandatory industry internship (12 weeks)\n• Guest lectures by industry experts\n• Real-world project collaborations\n• Professional certification integration\n• Startup incubation program participation\n• Industry mentorship assignments\n\nNew Specialization Tracks:\n1. Artificial Intelligence and Machine Learning\n   - Deep Learning Architectures\n   - Computer Vision and NLP\n   - AI Ethics and Responsible Computing\n   - Research Methodology in AI\n\n2. Cybersecurity and Information Assurance\n   - Network Security and Penetration Testing\n   - Digital Forensics and Incident Response\n   - Cryptography and Blockchain Security\n   - Security Policy and Risk Management\n\n3. Software Engineering and DevOps\n   - Advanced Software Architecture\n   - Continuous Integration/Deployment\n   - Microservices and Container Technologies\n   - Quality Assurance and Testing\n\n4. Data Science and Analytics\n   - Big Data Technologies\n   - Statistical Analysis and Modeling\n   - Business Intelligence and Visualization\n   - Data Mining and Pattern Recognition\n\nPractical Learning Enhancements:\n• State-of-the-art laboratory equipment\n• Cloud computing resources (AWS, Azure, GCP)\n• Industry-standard software licenses\n• Virtual reality and augmented reality labs\n• High-performance computing cluster\n• Maker space for hardware projects\n\nAssessment Method Changes:\n• 40% continuous assessment, 60% final examination\n• Project-based learning emphasis\n• Peer review and collaboration assessment\n• Industry presentation requirements\n• Portfolio development tracking\n• Skills-based competency evaluation\n\nFaculty Development:\n• Industry training programs for faculty\n• Research collaboration initiatives\n• International faculty exchange program\n• Professional development workshops\n• Technology certification programs\n\nStudent Support Services:\n• Academic advising enhancements\n• Career counseling integration\n• Peer tutoring programs\n• Online learning platform upgrades\n• Mental health and wellness support\n\nImplementation Timeline:\n• Faculty training: July-August 2025\n• Infrastructure setup: August 2025\n• Student orientation: September 2025\n• Full implementation: Fall 2025 semester\n\nFor detailed curriculum information, course descriptions, and academic planning assistance, contact the Academic Affairs Office or visit the updated student portal.",
    pdfFile: null,
    category: 'academic',
    date: 'May 1, 2025',
    expiryDate: 'September 30, 2025',
    author: 'Prof. Dr. Mahmud Hassan, Academic Affairs Dean',
    location: 'All Academic Departments',
    time: 'Effective Fall 2025 Semester',
    isArchived: false
  },
  {
    id: 7,
    title: "Mental Health and Wellness Support Program Launch",
    description: "Comprehensive mental health initiative providing counseling services, stress management workshops, wellness activities, and 24/7 support for student well-being.",
    detailedDescription: "The Student Affairs Office launches a comprehensive Mental Health and Wellness Support Program to prioritize student well-being and academic success. This initiative addresses the growing need for mental health support in academic environments.\n\nProgram Components:\n\nCounseling Services:\n• Individual counseling sessions with licensed therapists\n• Group therapy and support groups\n• Crisis intervention and emergency support\n• Specialized counseling for academic stress\n• Family counseling sessions\n• Peer counseling training program\n• Online counseling platform availability\n\nWellness Workshops:\n• Stress management and relaxation techniques\n• Mindfulness and meditation sessions\n• Time management and study skills\n• Healthy relationship building\n• Financial wellness and budgeting\n• Career anxiety and future planning\n• Sleep hygiene and healthy habits\n\nMental Health Awareness:\n• Monthly awareness campaigns\n• Mental health first aid training\n• Faculty sensitivity training\n• Stigma reduction initiatives\n• Educational seminars and webinars\n• Resource distribution and information sessions\n\nWellness Activities:\n• Yoga and fitness classes\n• Art therapy and creative expression\n• Music therapy sessions\n• Outdoor adventure programs\n• Meditation gardens and quiet spaces\n• Therapy animals program\n• Recreation and sports activities\n\nSupport Resources:\n\n24/7 Helpline Services:\n• Crisis intervention hotline\n• Text-based support system\n• Emergency response protocol\n• Referral to external specialists\n• Hospital coordination for emergencies\n\nDigital Mental Health Platform:\n• Self-assessment tools\n• Guided meditation apps\n• Mood tracking applications\n• Educational resources library\n• Appointment scheduling system\n• Anonymous support forums\n\nPeer Support Network:\n• Trained peer counselors\n• Student mental health ambassadors\n• Residential life support integration\n• Study group facilitation\n• Social connection events\n\nSpecialized Programs:\n\nAcademic Stress Management:\n• Exam anxiety workshops\n• Study skills optimization\n• Time management coaching\n• Academic goal setting\n• Performance anxiety treatment\n\nTransition Support:\n• New student adjustment programs\n• International student support\n• Graduate school preparation\n• Career transition counseling\n• Life skills development\n\nDiversity and Inclusion:\n• Culturally sensitive counseling\n• LGBTQ+ support groups\n• Religious and spiritual counseling\n• Disability support integration\n• International student services\n\nProgram Access:\n• All services free for enrolled students\n• Confidential and private sessions\n• Flexible scheduling options\n• Walk-in emergency support\n• Online and in-person options\n• Multiple language support available\n\nFaculty and Staff Training:\n• Mental health awareness workshops\n• Early intervention training\n• Referral process education\n• Crisis response protocols\n• Creating supportive classroom environments\n\nCommunity Partnerships:\n• Local healthcare providers\n• Mental health organizations\n• Community wellness centers\n• Healthcare insurance coordination\n• Specialized treatment facilities\n\nTo access services, visit the Student Wellness Center, call the 24/7 helpline, or schedule appointments through the student portal. All services are strictly confidential and designed to support academic and personal success.",
    pdfFile: null,
    category: 'general',
    date: 'May 20, 2025',
    expiryDate: 'December 31, 2025',
    author: 'Dr. Sarah Ahmed, Student Wellness Director',
    location: 'Student Wellness Center & Campus-wide',
    time: '24/7 Support Available',
    isArchived: false
  },
  {
    id: 8,
    title: "Green Campus Sustainability Initiative 2025",
    description: "Comprehensive environmental sustainability program featuring renewable energy, waste reduction, carbon neutrality goals, and student engagement in eco-friendly practices.",
    detailedDescription: "The Environmental Committee launches the Green Campus Sustainability Initiative 2025, a comprehensive program aimed at achieving carbon neutrality by 2030 while fostering environmental consciousness within the CSEDU community.\n\nSustainability Goals:\n\nCarbon Neutrality Targets:\n• 50% reduction in carbon emissions by 2027\n• 100% renewable energy transition by 2028\n• Carbon-neutral campus operations by 2030\n• Net-positive environmental impact by 2035\n\nRenewable Energy Projects:\n• 500kW solar panel installation on campus buildings\n• Wind energy turbines for supplementary power\n• Geothermal heating and cooling systems\n• Energy-efficient LED lighting campus-wide\n• Smart building automation systems\n• Electric vehicle charging stations\n\nWaste Management Program:\n\nZero Waste Initiative:\n• Comprehensive recycling programs\n• Organic waste composting facilities\n• Electronic waste collection and processing\n• Plastic reduction and elimination policies\n• Reusable material promotion campaigns\n• Waste audit and tracking systems\n\nCircular Economy Practices:\n• Campus repair and reuse centers\n• Book and equipment sharing programs\n• Sustainable procurement policies\n• Local vendor preference systems\n• Green building materials usage\n• Water conservation and recycling\n\nEnvironmental Education:\n\nSustainability Curriculum:\n• Environmental science integration\n• Green technology courses\n• Sustainable business practices\n• Climate change and adaptation studies\n• Renewable energy engineering\n• Environmental policy and law\n\nStudent Engagement Programs:\n• Eco-club and environmental societies\n• Green campus ambassadors program\n• Sustainability competition and challenges\n• Environmental research projects\n• Community outreach and awareness\n• International environmental partnerships\n\nGreen Infrastructure:\n\nNatural Environment Enhancement:\n• Native plant landscaping\n• Pollinator gardens and bee-friendly spaces\n• Rainwater harvesting systems\n• Green roofs and living walls\n• Urban farming and community gardens\n• Wildlife habitat preservation\n\nSustainable Transportation:\n• Bicycle sharing programs\n• Electric shuttle services\n• Carpooling coordination systems\n• Public transportation incentives\n• Walking and cycling path improvements\n• Reduced parking footprint\n\nCommunity Impact:\n\nLocal Environmental Projects:\n• River cleanup initiatives\n• Tree planting campaigns\n• Air quality monitoring\n• Community solar projects\n• Environmental education outreach\n• Sustainable agriculture support\n\nIndustry Partnerships:\n• Green technology collaborations\n• Sustainable business development\n• Environmental consulting services\n• Clean energy research projects\n• Eco-friendly product development\n• Environmental impact assessments\n\nImplementation Timeline:\n\nPhase 1 (2025):\n• Solar panel installation begins\n• Waste reduction programs launch\n• Student engagement campaigns\n• Baseline environmental assessment\n\nPhase 2 (2026-2027):\n• Renewable energy expansion\n• Green building retrofits\n• Advanced recycling systems\n• Sustainability curriculum integration\n\nPhase 3 (2028-2030):\n• Full renewable energy transition\n• Carbon neutrality achievement\n• Community impact scaling\n• International recognition pursuits\n\nStudent Involvement Opportunities:\n• Environmental research assistantships\n• Green campus volunteer programs\n• Sustainability project leadership\n• Eco-innovation competitions\n• Environmental advocacy roles\n• Community engagement activities\n\nMeasurement and Reporting:\n• Monthly sustainability metrics\n• Annual environmental impact reports\n• Carbon footprint tracking\n• Waste reduction measurements\n• Energy efficiency monitoring\n• Community engagement assessments\n\nFor more information about volunteering, research opportunities, or sustainability initiatives, contact the Environmental Office or visit the Green Campus portal.",
    pdfFile: null,
    category: 'general',
    date: 'April 22, 2025',
    expiryDate: 'December 31, 2030',
    author: 'Prof. Dr. Nusrat Jahan, Environmental Committee Chair',
    location: 'Campus-wide Implementation',
    time: 'Multi-year Initiative (2025-2030)',
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