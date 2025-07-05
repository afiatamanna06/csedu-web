// components/AcademicPrograms.tsx
import { useState } from "react";
import { cn } from "@/lib/utils"; // Optional: use your className utility

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
    duration: "4 years of undergraduate program with 150 minimum required credits",
    description: [
      "1.5 years of graduate program",
      "Consists of 2 semesters",
      "36 minimum required credits",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "#",
    icon: <span className="text-3xl">🎓</span>,
  },
  {
    title: "M.Sc. in Computer Science and Engineering",
    duration: "1.5 years of graduate program",
    description: [
      "1.5 years of graduate program",
      "Consists of 2 semesters",
      "36 minimum required credits",
    ],
    icon: <span className="text-3xl">📘</span>,
    image: "/cultural.jpg", // Replace with your actual image path
    link: "#",
  },
  {
    title: "Professional Masters in Information and Cybersecurity (PMICS)",
    duration: "1.5 years of graduate program with 36 minimum required credits",
    description: [
      "1.5 years of graduate program",
      "Consists of 2 semesters",
      "36 minimum required credits",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "#",
    icon: <span className="text-3xl">💼</span>,
  },
  {
    title: "MPhil in Computer Science and Engineering",
    duration: "2 years of MPhil program with 36 scholarship opportunities",
    description: [
      "1.5 years of graduate program",
      "Consists of 2 semesters",
      "36 minimum required credits",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "#",
    icon: <span className="text-3xl">📄</span>,
  },
  {
    title: "PhD in Computer Science and Engineering",
    duration: "4 years of PhD program with 5 scholarship opportunities",
    description: [
      "1.5 years of graduate program",
      "Consists of 2 semesters",
      "36 minimum required credits",
    ],
    image: "/cultural.jpg", // Replace with your actual image path
    link: "#",
    icon: <span className="text-3xl">🎓</span>,
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
    <section className="px-4 py-8 mt-[10rem] md:mt-[7rem] lg:mt-[6rem] bg-white relative mx-auto container">
      <h2 className="text-3xl font-bold text-center text-[#3D007B] mb-8">
        Academic Programs
      </h2>
      <div className="space-y-6">
        {programs.map((program, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => window.innerWidth >= 1024 && setActiveIndex(index)}
              onMouseLeave={() => window.innerWidth >= 1024 && setActiveIndex(null)}
              className={cn(
                "transition-all duration-300 border rounded-lg flex flex-col lg:flex-row items-start lg:items-center justify-between overflow-hidden",
                isActive
                  ? "bg-[#3D007B] text-white shadow-lg scale-[1.01]"
                  : "bg-white text-black hover:bg-[#3D007B] hover:text-white hover:scale-[1.01]",
                "cursor-pointer p-6 gap-4"
              )}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-purple-100 text-[#3D007B] p-4 rounded-full">
                  {program.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {program.title}
                  </h3>
                  <p className="text-sm mt-1">
                    {program.duration}
                  </p>

                  {/* Extra Description */}
                  {(isActive && program.description) && (
                    <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                      {program.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}

                  {/* Program link */}
                  {isActive && program.link && (
                    <a
                      href={program.link}
                      className="mt-3 inline-block text-yellow-300 font-medium text-sm hover:underline"
                    >
                      See program details →
                    </a>
                  )}
                </div>
              </div>

              {/* Optional image */}
              {isActive && program.image && (
                <img
                  src={program.image}
                  alt="Program"
                  className="w-full max-w-[20rem] h-[10rem] object-cover rounded-md hidden lg:block"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
