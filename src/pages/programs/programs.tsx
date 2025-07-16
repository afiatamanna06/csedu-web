import React, { useState } from "react";
import "./programs.css";
import { useNavigate } from "@tanstack/react-router";

const sidebarItems = [
  { label: "UNDERGRADUATE", sub: [] },
  { label: "GRADUATE", sub: [] },
  { label: "MPhil", sub: [] },
  { label: "PhD", sub: [] },
];

type SummaryItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const programSummaries: Record<
  "UNDERGRADUATE" | "GRADUATE" | "MPhil" | "PhD",
  SummaryItem[]
> = {
  UNDERGRADUATE: [
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 13l8-4 8 4-8 4-8-4zm0 2.5l8 4 8-4M8 16.5v3l8 4 8-4v-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ),
      label: "DEGREE",
      value: "B.Sc. in Computer Science and Engineering",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 10a4 4 0 110 8 4 4 0 010-8zm0 10c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "FACULTY",
      value: "Engineering and Technology",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "DURATION",
      value: "4 YEARS",
    },
  ],
  GRADUATE: [
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 13l8-4 8 4-8 4-8-4zm0 2.5l8 4 8-4M8 16.5v3l8 4 8-4v-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ),
      label: "DEGREE",
      value: "MSc in Computer Science and Engineering",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 10a4 4 0 110 8 4 4 0 010-8zm0 10c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "FACULTY",
      value: "Engineering and Technology",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "DURATION",
      value: "1.5 YEARS",
    },
  ],
  MPhil: [
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 13l8-4 8 4-8 4-8-4zm0 2.5l8 4 8-4M8 16.5v3l8 4 8-4v-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ),
      label: "DEGREE",
      value: "MPhil in Computer Science and Engineering",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 10a4 4 0 110 8 4 4 0 010-8zm0 10c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "FACULTY",
      value: "Engineering and Technology",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "DURATION",
      value: "2 YEARS",
    },
  ],
  PhD: [
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 13l8-4 8 4-8 4-8-4zm0 2.5l8 4 8-4M8 16.5v3l8 4 8-4v-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ),
      label: "DEGREE",
      value: "PhD in Computer Science and Engineering",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 10a4 4 0 110 8 4 4 0 010-8zm0 10c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "FACULTY",
      value: "Engineering and Technology",
    },
    {
      icon: (
        <span className="programs-summary-svg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z"
              fill="currentColor"
            />
          </svg>
        </span>
      ),
      label: "DURATION",
      value: "4 YEARS",
    },
  ],
};

type Course = {
  code: string;
  title: string;
  type: string;
  year: string;
  semester: string;
  credit: string;
  status: string;
};

const programCourses: Record<keyof typeof programSummaries, Course[]> = {
  UNDERGRADUATE: [
    {
      code: "CSE101",
      title: "Introduction to Programming",
      type: "Core",
      year: "1",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE102",
      title: "Discrete Mathematics",
      type: "Core",
      year: "1",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE103",
      title: "Computer Fundamentals",
      type: "Core",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE104",
      title: "Mathematics I",
      type: "Core",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE201",
      title: "Data Structures",
      type: "Core",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE202",
      title: "Algorithms",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE203",
      title: "Mathematics II",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE204",
      title: "Digital Logic Design",
      type: "Core",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE301",
      title: "Operating Systems",
      type: "Core",
      year: "3",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE302",
      title: "Database Systems",
      type: "Core",
      year: "3",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE303",
      title: "Computer Networks",
      type: "Core",
      year: "3",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE304",
      title: "Software Engineering",
      type: "Core",
      year: "3",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE305",
      title: "Web Technologies",
      type: "Elective",
      year: "3",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE306",
      title: "Microprocessors",
      type: "Core",
      year: "3",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE401",
      title: "Artificial Intelligence",
      type: "Elective",
      year: "4",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE402",
      title: "Machine Learning",
      type: "Elective",
      year: "4",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE403",
      title: "Computer Graphics",
      type: "Elective",
      year: "4",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE404",
      title: "Compiler Design",
      type: "Core",
      year: "4",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE405",
      title: "Project/Thesis",
      type: "Core",
      year: "4",
      semester: "2",
      credit: "6.0",
      status: "Active",
    },
    {
      code: "CSE406",
      title: "Entrepreneurship",
      type: "Elective",
      year: "4",
      semester: "2",
      credit: "2.0",
      status: "Inactive",
    },
  ],
  GRADUATE: [
    {
      code: "CSE501",
      title: "Advanced Algorithms",
      type: "Core",
      year: "1",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE502",
      title: "Distributed Systems",
      type: "Core",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE503",
      title: "Advanced Database Systems",
      type: "Elective",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE504",
      title: "Research Methodology",
      type: "Core",
      year: "1",
      semester: "1",
      credit: "2.0",
      status: "Active",
    },
    {
      code: "CSE505",
      title: "Advanced Computer Networks",
      type: "Elective",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE506",
      title: "Cloud Computing",
      type: "Elective",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE507",
      title: "Big Data Analytics",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE508",
      title: "Cyber Security",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE509",
      title: "Natural Language Processing",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE510",
      title: "Pattern Recognition",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE511",
      title: "Advanced Software Engineering",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE512",
      title: "Wireless Sensor Networks",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE513",
      title: "Bioinformatics",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE514",
      title: "Image Processing",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE515",
      title: "Robotics",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE516",
      title: "Advanced Operating Systems",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE517",
      title: "Parallel Computing",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE518",
      title: "Advanced Machine Learning",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE519",
      title: "Quantum Computing",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE520",
      title: "Graduate Project",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "6.0",
      status: "Active",
    },
  ],
  MPhil: [
    {
      code: "CSE601",
      title: "Research Seminar",
      type: "Core",
      year: "1",
      semester: "1",
      credit: "2.0",
      status: "Active",
    },
    {
      code: "CSE602",
      title: "Thesis Work",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "6.0",
      status: "Active",
    },
    {
      code: "CSE603",
      title: "Advanced Topics in CSE",
      type: "Elective",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE604",
      title: "Research Ethics",
      type: "Core",
      year: "1",
      semester: "1",
      credit: "2.0",
      status: "Active",
    },
    {
      code: "CSE605",
      title: "Advanced Data Analysis",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE606",
      title: "Scientific Writing",
      type: "Core",
      year: "2",
      semester: "1",
      credit: "2.0",
      status: "Active",
    },
    {
      code: "CSE607",
      title: "Advanced Research Methods",
      type: "Core",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE608",
      title: "Special Topics",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE609",
      title: "Colloquium",
      type: "Core",
      year: "2",
      semester: "1",
      credit: "1.0",
      status: "Active",
    },
    {
      code: "CSE610",
      title: "Research Presentation",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "1.0",
      status: "Active",
    },
    {
      code: "CSE611",
      title: "Advanced Seminar",
      type: "Elective",
      year: "1",
      semester: "2",
      credit: "2.0",
      status: "Active",
    },
    {
      code: "CSE612",
      title: "Research Internship",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "2.0",
      status: "Inactive",
    },
    {
      code: "CSE613",
      title: "Advanced Computing",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE614",
      title: "Research Project",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "4.0",
      status: "Active",
    },
    {
      code: "CSE615",
      title: "Advanced Data Mining",
      type: "Elective",
      year: "1",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE616",
      title: "Advanced AI",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE617",
      title: "Advanced Robotics",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE618",
      title: "Advanced Pattern Recognition",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE619",
      title: "Advanced Quantum Computing",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE620",
      title: "MPhil Project",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "6.0",
      status: "Active",
    },
  ],
  PhD: [
    {
      code: "CSE701",
      title: "Advanced Research Methods",
      type: "Core",
      year: "1",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE702",
      title: "Dissertation",
      type: "Core",
      year: "4",
      semester: "2",
      credit: "12.0",
      status: "Active",
    },
    {
      code: "CSE703",
      title: "Advanced Seminar I",
      type: "Core",
      year: "1",
      semester: "2",
      credit: "2.0",
      status: "Active",
    },
    {
      code: "CSE704",
      title: "Advanced Seminar II",
      type: "Core",
      year: "2",
      semester: "1",
      credit: "2.0",
      status: "Active",
    },
    {
      code: "CSE705",
      title: "Research Proposal",
      type: "Core",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE706",
      title: "Research Progress",
      type: "Core",
      year: "3",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE707",
      title: "Research Publication",
      type: "Core",
      year: "3",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE708",
      title: "Advanced Topics in Research",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE709",
      title: "Advanced Data Science",
      type: "Elective",
      year: "2",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE710",
      title: "Advanced Machine Learning",
      type: "Elective",
      year: "2",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE711",
      title: "Advanced Quantum Computing",
      type: "Elective",
      year: "3",
      semester: "1",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE712",
      title: "Advanced Robotics",
      type: "Elective",
      year: "3",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE713",
      title: "Advanced Pattern Recognition",
      type: "Elective",
      year: "3",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE714",
      title: "Advanced Bioinformatics",
      type: "Elective",
      year: "4",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE715",
      title: "Advanced Image Processing",
      type: "Elective",
      year: "4",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE716",
      title: "Advanced Cloud Computing",
      type: "Elective",
      year: "4",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE717",
      title: "Advanced Cyber Security",
      type: "Elective",
      year: "4",
      semester: "2",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE718",
      title: "Advanced Big Data Analytics",
      type: "Elective",
      year: "4",
      semester: "1",
      credit: "3.0",
      status: "Active",
    },
    {
      code: "CSE719",
      title: "Advanced NLP",
      type: "Elective",
      year: "4",
      semester: "2",
      credit: "3.0",
      status: "Inactive",
    },
    {
      code: "CSE720",
      title: "PhD Project",
      type: "Core",
      year: "4",
      semester: "2",
      credit: "6.0",
      status: "Active",
    },
  ],
};

export default function Programs() {
  const [selectedSidebar, setSelectedSidebar] =
    useState<keyof typeof programSummaries>("UNDERGRADUATE");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("year-asc");
  const [filterType, setFilterType] = useState("All");
  const summary = programSummaries[selectedSidebar];
  const courses = programCourses[selectedSidebar];
  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Filter by search and type
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || c.type === filterType;
    return matchesSearch && matchesType;
  });

  // Sort
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "year-asc":
        return (
          Number(a.year) - Number(b.year) ||
          Number(a.semester) - Number(b.semester)
        );
      case "year-desc":
        return (
          Number(b.year) - Number(a.year) ||
          Number(b.semester) - Number(a.semester)
        );
      case "semester-asc":
        return (
          Number(a.semester) - Number(b.semester) ||
          Number(a.year) - Number(b.year)
        );
      case "semester-desc":
        return (
          Number(b.semester) - Number(a.semester) ||
          Number(b.year) - Number(a.year)
        );
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const totalEntries = sortedCourses.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalEntries);
  const paginatedCourses = sortedCourses.slice(startIdx - 1, endIdx);

  // Helper for pagination buttons
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  // Reset to page 1 when program, search, sort, or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedSidebar, search, sortBy, filterType]);

  // Get unique course types for filter dropdown
  const courseTypes = Array.from(new Set(courses.map((c) => c.type)));

  return (
    <div className="programs-page min-h-screen bg-gray-100 px-4 py-6 mt-[4rem] lg:mt-[8rem]">
      <aside className="programs-sidebar">
        <div className="programs-sidebar-title">PROGRAMS</div>
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            className={`programs-sidebar-item${
              selectedSidebar === item.label ? " active" : ""
            }`}
            onClick={() =>
              setSelectedSidebar(item.label as keyof typeof programSummaries)
            }
          >
            {item.label}
          </button>
        ))}
      </aside>
      <main className="programs-main">
        <div className="programs-summary-row">
          {summary.map((s: SummaryItem, i: number) => (
            <div className="programs-summary-card" key={i}>
              <div className="programs-summary-icon">{s.icon}</div>
              <div>
                <div className="programs-summary-label">{s.label}</div>
                <div className="programs-summary-value">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "32px 0 16px 0",
          }}
        >
          <button
            className="degree-outline-btn"
            onClick={() => navigate({ to: "/" })}
          >
            View Degree Overview
          </button>
        </div>
        <div className="programs-courses-card">
          <div className="programs-courses-header">
            <h2>All Courses</h2>
            <div className="programs-courses-controls">
              <input
                className="programs-search"
                placeholder="Search by code or title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="programs-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="year-asc">Sort by: Year (Ascending)</option>
                <option value="year-desc">Sort by: Year (Descending)</option>
                <option value="semester-asc">
                  Sort by: Semester (Ascending)
                </option>
                <option value="semester-desc">
                  Sort by: Semester (Descending)
                </option>
                <option value="title-asc">Sort by: Title (A-Z)</option>
                <option value="title-desc">Sort by: Title (Z-A)</option>
              </select>
              <select
                className="programs-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">Filter by: All Types</option>
                {courseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table className="programs-courses-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Course Type</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Credit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((c, i) => (
                <tr key={i}>
                  <td>{c.code}</td>
                  <td>{c.title}</td>
                  <td>{c.type}</td>
                  <td>{c.year}</td>
                  <td>{c.semester}</td>
                  <td>{c.credit}</td>
                  <td>
                    <span
                      className={`programs-status-badge ${
                        c.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="programs-pagination">
            <span>
              {`Showing data ${
                totalEntries === 0 ? 0 : startIdx
              } to ${endIdx} of ${totalEntries} entries`}
            </span>
            <div className="programs-pagination-controls">
              {getPageNumbers().map((num, idx) =>
                typeof num === "number" ? (
                  <button
                    key={num}
                    className={currentPage === num ? "active" : ""}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                ) : (
                  <span key={"ellipsis-" + idx} style={{ padding: "0 6px" }}>
                    ...
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
