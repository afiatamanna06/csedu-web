// components/AcademicPrograms.tsx
import { useState } from "react";
import { cn } from "@/lib/utils"; // Optional: use your className utility
import {
  Briefcase,
  FileBadge,
  FileSearch2,
  GraduationCap,
  School,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

type Program = {
  title: string;
  duration: string;
  description?: string[];
  icon: React.ReactNode;
  image?: string;
  link?: string;
};

const programs: Program[] = [
  {
    title: "B.Sc. in Computer Science and Engineering",
    duration:
      "4 years of undergraduate program with 150 minimum required credits",
    description: [
      "4 years of undergraduate program with 150 minimum required credits",
      "Consists of 8 semesters",
      "150 minimum required credits",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "/academic/programs",
    icon: <GraduationCap size={40} />,
  },
  {
    title: "M.Sc. in Computer Science and Engineering",
    duration: "1.5 years of graduate program",
    description: [
      "1.5 years of graduate program",
      "Consists of 2 semesters",
      "36 minimum required credits",
    ],
    icon: <FileBadge size={40} />,
    image: "/cultural.jpg", // Replace with your actual image path
    link: "/academic/programs",
  },
  {
    title: "Professional Masters in Information and Cybersecurity (PMICS)",
    duration:
      "Duration of the program is one year and six month (three semesters).",
    description: [
      "Duration of the program is one year and six month (three semesters). ",
      "Consists of 3 semesters",
      "The program will be consisting of 36 credits of which 27 credits will be course work and 9 credits will be project work.",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "/academic/programs",
    icon: <Briefcase size={40} />,
  },
  {
    title: "MPhil in Computer Science and Engineering",
    duration: "2 years of MPhil program with 36 scholarship opportunities",
    description: [
      "2 years of MPhil program with 36 scholarship opportunities",
      "1st year is for coursework and the thesis work is done in the 2nd year",
      "MPhil researchers should complete 2 theory courses, each of 100 marks, or 4 theory courses, each of 50 marks in his/her first year",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "/academic/programs",
    icon: <FileSearch2 size={40} />,
  },
  {
    title: "PhD in Computer Science and Engineering",
    duration: "4 years of PhD program with 5 scholarship opportunities",
    description: [
      "4 years of PhD program with 5 scholarship opportunities",
      "Registered PhD researchers should complete 3 theory courses, each of 3 credit hours",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "/academic/programs",
    icon: <School size={40} />,
  },
];

export default function AcademicPrograms() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (window.innerWidth < 1024) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div className="bg-[#F7F7FA] px-4 py-8 ">
      <section className="relative mx-auto container">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#2B1472] mt-16 mb-10">
          Academic Programs
        </h2>
        <div className="">
          {programs.map((program, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                onMouseEnter={() =>
                  window.innerWidth >= 1024 && setActiveIndex(index)
                }
                onMouseLeave={() =>
                  window.innerWidth >= 1024 && setActiveIndex(null)
                }
                className={cn(
                  "transition-all duration-300 border-t flex flex-col lg:flex-row items-start lg:items-center justify-between overflow-hidden",
                  isActive
                    ? "bg-[#2B1472] text-white shadow-lg scale-[1.01]"
                    : "text-black hover:bg-[#3D007B] hover:text-white hover:scale-[1.01]",
                  "cursor-pointer p-6 gap-4"
                )}
              >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`${
                      isActive ? "bg-[#FFB606]" : "bg-[#E3DDF6]"
                    } text-[#2B1472] p-4 rounded-full`}
                  >
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{program.title}</h3>
                    {!isActive && (
                      <p className="mt-3 text-[#7A7A7A]">{program.duration}</p>
                    )}

                    {/* Extra Description */}
                    {isActive && program.description && (
                      <ul className="mt-3 list-disc list-inside space-y-1 text-[#dcd1ff]">
                        {program.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}

                    {/* Program link */}
                    {isActive && program.link && (
                      <Link
                        to={program.link}
                        className="mt-3 inline-block text-[#FFB606] text-lg font-medium hover:underline"
                      >
                        See program details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
