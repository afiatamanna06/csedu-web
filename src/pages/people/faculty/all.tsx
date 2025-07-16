import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { useNavigate } from "@tanstack/react-router";

interface Faculty {
  name: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  rank: string;
  interests: string[];
}

const facultyMembers: Faculty[] = [
  {
    name: "Dr. Md. Abdur Razzaque",
    title: "Professor & Chairman",
    email: "razzaque@du.ac.bd",
    phone: "01840663980",
    photo: "/faculty1.jpg",
    rank: "Professor",
    interests: ["IoT", "Distributed Systems"],
  },
  {
    name: "Dr. Md. Haider Ali",
    title: "Professor (Deputation)",
    email: "haider@du.ac.bd",
    phone: "+880244685057",
    photo: "/faculty2.jpg",
    rank: "Professor",
    interests: ["AI", "ML"],
  },
  {
    name: "Dr. Hafiz Md. Hasan Babu",
    title: "Professor",
    email: "hafizbabu@du.ac.bd",
    phone: "+88-01713310515",
    photo: "/faculty3.jpg",
    rank: "Professor",
    interests: ["Quantum Computing", "VLSI"],
  },
  {
    name: "Dr. Md. Rezaul Karim",
    title: "Professor",
    email: "karim@du.ac.bd",
    phone: "880-2-9661900/7424",
    photo: "/faculty4.jpg",
    rank: "Professor",
    interests: ["Database", "Information Systems"],
  },
  {
    name: "Dr. Md. Mustafizur Rahman",
    title: "Professor",
    email: "mustafiz@du.ac.bd",
    phone: "880-1927-196-301",
    photo: "/faculty5.jpg",
    rank: "Professor",
    interests: ["Software Engineering"],
  },
  {
    name: "Dr. Saifuddin Md. Tareeq",
    title: "Professor",
    email: "sm.tareeq@du.ac.bd",
    phone: "880-2-9661900",
    photo: "/faculty6.jpg",
    rank: "Professor",
    interests: ["Cybersecurity"],
  },
];

const allRanks = ["Professor", "Associate Professor", "Assistant Professor"];
const allInterests = [
  "IoT",
  "Distributed Systems",
  "AI",
  "ML",
  "Quantum Computing",
  "VLSI",
  "Database",
  "Information Systems",
  "Software Engineering",
  "Cybersecurity",
];

export default function FacultyMembers() {
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  const filtered = facultyMembers.filter((faculty) => {
    const matchesRank =
      selectedRanks.length === 0 || selectedRanks.includes(faculty.rank);
    const matchesInterest =
      selectedInterests.length === 0 ||
      faculty.interests.some((interest) =>
        selectedInterests.includes(interest)
      );
    return matchesRank && matchesInterest;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 mt-[4rem] lg:mt-[8rem]">
      <h1 className="text-3xl font-bold mb-6 text-center">Faculty Members</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filter By</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Rank</h3>
            {allRanks.map((rank) => (
              <div key={rank} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  checked={selectedRanks.includes(rank)}
                  onCheckedChange={() =>
                    toggleFilter(rank, selectedRanks, setSelectedRanks)
                  }
                />
                <label>{rank}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Research Interests</h3>
            {allInterests.map((interest) => (
              <div key={interest} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  checked={selectedInterests.includes(interest)}
                  onCheckedChange={() =>
                    toggleFilter(
                      interest,
                      selectedInterests,
                      setSelectedInterests
                    )
                  }
                />
                <label>{interest}</label>
              </div>
            ))}
          </div>
        </aside>

        {/* Faculty Cards */}
        <div className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
            {filtered.map((faculty, i) => (
              <Card
                key={i}
                className="shadow-lg rounded-2xl flex flex-col items-center text-center p-6"
              >
                <Avatar className="mb-4">
                  <AvatarImage
                    src={faculty.photo}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <AvatarFallback>{getInitials(faculty.name)}</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">{faculty.name}</h2>
                <p className="text-sm text-gray-500">{faculty.title}</p>
                <p className="text-sm mt-2">Email: {faculty.email}</p>
                <p className="text-sm">Phone: {faculty.phone}</p>
                <Button className="mt-4 w-full" onClick={() => { window.location.href = `/profile?name=${encodeURIComponent(faculty.name)}`; }}>View</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
