import { useState } from "react";

export default function ChairmanMessage() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);
  return (
    <section className="px-6 md:px-16 py-14 bg-gradient-to-b from-[#f6f4fd] to-white">
      <div className="bg-white mx-auto container rounded-2xl shadow-lg shadow-[#f6f4fd] p-6 md:p-10 relative flex flex-col md:flex-row items-start gap-6 lg:gap-16">
        {/* Quote mark (optional decoration) */}
        <div className="absolute -top-20 md:-top-24 right-2 md:right-4 text-[180px] md:text-[250px] text-[#f2ebff]">
          &rdquo;
        </div>

        {/* Image + Name */}
        <div className="flex-shrink-0 md:text-center">
          <div className="bg-[#e4d8ff] p-2 rounded-xl">
            <img
              src="/chairman.jpg"
              alt="Chairman"
              className="w-full h-56 object-cover rounded-md"
            />
          </div>
          <p className="font-semibold ml-2 md:ml-0 mt-4">Dr. Md. Abdur Razzaque</p>
          <p className=" text-gray-500 ml-2 md:ml-0">Chairman, CSEDU</p>
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="italic text-gray-500 text-lg mb-2">
            Message from the Chairman
          </p>
          {/* Message content */}
          <p
            className={`text-gray-800 text-base md:text-lg leading-relaxed ${
              expanded ? "" : "line-clamp-4 sm:line-clamp-6 md:line-clamp-7"
            }`}
          >
            It's my immense pleasure to welcome you all to the Department of
            Computer Science and Engineering (CSE) at the University of Dhaka
            (also known as CSEDU). The CSEDU is a place where the brightest
            minds from home and abroad assemble to build their future careers at
            highly reputed organizations at home and abroad. The department has
            been inspiring the best and brightest for more than three decades in
            fostering the frontier technologies of Computer Science and
            Engineering. <br /> <br /> Our curriculum is world standard blended
            with the theories of computer science, practical engineering design,
            analysis, and development of solutions to complex engineering
            problems. Starting from fundamental hardware, software, and network
            technologies, we cover Artificial Intelligence (AI), Cybersecurity,
            Cloud Computing, Machine Learning, Blockchain, Human-Computer
            Interaction and Internet of Things (IoT). We render special focus on
            competitive programming, innovative design principles, creation of
            new knowledge, inter-disciplinary education, and enhancing the soft
            skills of the students. We keep Monday afternoon free in the student
            timetable, enabling them to pursue their passion outside the
            classroom activities. You may join any of the hundreds of clubs of
            the University and feel the genuineness and camaraderie of the
            student members.
          </p>

          {/* Read more / less toggle */}
          <button
            onClick={toggleExpanded}
            className="text-[#3D007B] text-lg font-semibold mt-2 hover:underline focus:outline-none"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
    </section>
  );
}
