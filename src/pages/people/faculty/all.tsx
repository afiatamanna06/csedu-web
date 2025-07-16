import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { FileUser, Link2 } from "lucide-react";
import { useFaculty } from "@/hooks/use-faculty";

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
    photo: "/chairman.jpg",
    rank: "Professor",
    interests: ["IoT", "Distributed Systems"],
  },
  {
    name: "Dr. Md. Haider Ali",
    title: "Professor (Deputation)",
    email: "haider@du.ac.bd",
    phone: "+880244685057",
    photo: "/ha.jpg",
    rank: "Professor",
    interests: ["AI", "ML"],
  },
  {
    name: "Dr. Hafiz Md. Hasan Babu",
    title: "Professor",
    email: "hafizbabu@du.ac.bd",
    phone: "+88-01713310515",
    photo: "/babu.jpg",
    rank: "Professor",
    interests: ["Quantum Computing", "VLSI"],
  },
  {
    name: "Dr. Md. Rezaul Karim",
    title: "Professor",
    email: "karim@du.ac.bd",
    phone: "880-2-9661900/7424",
    photo: "/rk.jpg",
    rank: "Professor",
    interests: ["Database", "Information Systems"],
  },
  {
    name: "Dr. Md. Mustafizur Rahman",
    title: "Professor",
    email: "mustafiz@du.ac.bd",
    phone: "880-1927-196-301",
    photo: "/rony.jpg",
    rank: "Professor",
    interests: ["Software Engineering"],
  },
  {
    name: "Dr. Saifuddin Md. Tareeq",
    title: "Professor",
    email: "sm.tareeq@du.ac.bd",
    phone: "880-2-9661900",
    photo: "/tareq.jpg",
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
  const { data, isSuccess } = useFaculty();

  if (isSuccess) console.log("Faculty Data:", data);

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
    <div className="min-h-screen bg-gray-100 mt-[4rem] lg:mt-[8rem]">
      <div className="relative w-full h-[100%]">
        <img
          src="/landing.jpg"
          alt="Department Banner"
          className="w-full h-[100%] absolute object-cover"
        />
        <div className="w-full h-[100%] absolute bg-gradient-to-b from-[#13274C] to-[#13274C6f] backdrop-blur-[2px]"></div>
        <div className="relative w-full h-[15rem] md:h-[17rem] flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
          <p className="text-3xl md:text-5xl mt-8 md:mt-0 max-w-[60rem] font-bold text-white text-center">
            Faculty Members
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:container mx-auto px-4 pt-10 pb-20">
        {/* Sidebar Filters */}
        <aside className="w-full h-full lg:w-64 bg-white p-4 rounded-lg shadow-lg shadow-[#e5ddff]">
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
          <div className="grid gap-8 lg:gap-x-20 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {filtered.map((faculty, i) => (
              <Card
                key={i}
                className="shadow-lg shadow-[#e5ddff] border-none rounded-2xl flex flex-col p-0"
              >
                {faculty.photo ? (
                  <div className="pt-4 px-4 overflow-hidden">
                    <img
                      src={faculty.photo}
                      alt={faculty.name}
                      className="w-full h-[20rem] lg:h-[18rem] rounded-xl object-cover"
                    />
                  </div>
                ) : (
                  <Avatar className="mb-4">
                    <AvatarFallback>{getInitials(faculty.name)}</AvatarFallback>
                  </Avatar>
                )}
                <h2 className="text-lg font-semibold px-4">{faculty.name}</h2>
                <p className="text-sm text-gray-500 -mt-4 px-4">
                  {faculty.title}
                </p>
                <p className="text-sm px-4">Email: {faculty.email}</p>
                <p className="text-sm px-4 -mt-4">Phone: {faculty.phone}</p>
                <div className="flex flex-row justify-between items-center gap-2 -mt-4 p-4">
                  <div className="flex flex-row items-center gap-2">
                    <button>
                      <Link2 size={22} />
                    </button>
                    <button>
                      <FileUser size={22} />
                    </button>
                  </div>
                  <Button className="mt-1 px-8 py-3 bg-[#2B1472] rounded-[6px] font-semibold cursor-pointer hover:bg-[#1a0d4c] text-white transition-colors">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
