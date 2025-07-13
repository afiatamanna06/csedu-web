import { useState } from "react"
import Pagination from "@/components/pagination/pagination"

export default function StudentActivity() {
  const [currentPage, setCurrentPage] = useState(1)
  
  // Sample data for the existing clubs
  const studentActivities = [
    {
      id: 1,
      title: "CSEDU Students Club",
      description: "The CSEDU Students' Club is the central platform for fostering student engagement, collaboration, and holistic development within the Department of Computer Science and Engineering at the University of Dhaka. Dedicated to enhancing campus life, the club organizes a wide range of academic, cultural, social, and tech-driven events throughout the year. From orientation programs and career seminars to hackathons, cultural nights, and sports tournaments, the CSEDU Students' Club is at the heart of student activities. It serves as a bridge between the department and its students, ensuring an inclusive and vibrant community where leadership, creativity, and teamwork thrive.",
      motto: "Lead. Connect. Inspire.",
      image: "/csedusc.png",
      alt: "CSEDU Students Club"
    },
    {
      id: 2,
      title: "CSEDU Informatics Club", 
      description: "The CSEDU Informatics Club is a student-run organization that champions the spirit of competitive programming, problem solving, and algorithmic thinking within CSEDU. Inspired by international platforms such as the ICPC, IOI, and Google Code Jam, the club nurtures talent through regular contests, training sessions, and workshops. Whether you're a beginner curious about algorithms or a seasoned coder aiming for global stages, the Informatics Club provides mentorship, peer learning, and a supportive environment to grow. The club has proudly produced numerous national and international programming contest participants and continues to push the boundaries of excellence in informatics.",
      motto: "Think Deep. Solve Smart. Compete Bold.",
      image: "/cseduic.png", 
      alt: "CSEDU Informatics Club"
    }
  ]

  const itemsPerPage = 2
  const totalPages = Math.ceil(studentActivities.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const currentActivities = studentActivities.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white mt-35">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-primary mb-4">Student Activity</h1>
          <div className="w-65 h-1 bg-primary-y mb-8"></div>
        </div>

        {/* CSEDU Students Club Section */}
        <div className="bg-white rounded-lg p-2 mb-8">
          <div className="flex gap-28">
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-black mb-4">CSEDU Students Club</h2>
                <p className="text-lg text-gray-800 leading-relaxed text-justify">
                  The CSEDU Students' Club is the central platform for fostering student engagement, collaboration, and
                  holistic development within the Department of Computer Science and Engineering at the University of
                  Dhaka. Dedicated to enhancing campus life, the club organizes a wide range of academic, cultural,
                  social, and tech-driven events throughout the year. From orientation programs and career seminars to
                  hackathons, cultural nights, and sports tournaments, the CSEDU Students' Club is at the heart of
                  student activities. It serves as a bridge between the department and its students, ensuring an
                  inclusive and vibrant community where leadership, creativity, and teamwork thrive.
                </p>
                <p className="text-lg text-gray-800 mt-4 font-semibold">Motto: "Lead. Connect. Inspire."</p>
              </div>
            </div>
            <div className="w-[400px] h-[225px] bg-gray-200 rounded-lg flex items-center justify-center">
              <img
                src="/csedusc.png"
                alt="CSEDU Students Club"
                width={400}
                height={250}
                className="rounded-md object-cover"
              />
            </div>
          </div>
        </div>

        {/* CSEDU Informatics Club Section */}
        <div className="bg-white rounded-lg p-2 mb-8">
          <div className="flex gap-28">
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-black mb-4">CSEDU Informatics Club</h2>
                <p className="text-lg text-gray-800 leading-relaxed text-justify">
                  The CSEDU Informatics Club is a student-run organization that champions the spirit of competitive
                  programming, problem solving, and algorithmic thinking within CSEDU. Inspired by international
                  platforms such as the ICPC, IOI, and Google Code Jam, the club nurtures talent through regular
                  contests, training sessions, and workshops. Whether you're a beginner curious about algorithms or a
                  seasoned coder aiming for global stages, the Informatics Club provides mentorship, peer learning, and
                  a supportive environment to grow. The club has proudly produced numerous national and international
                  programming contest participants and continues to push the boundaries of excellence in informatics.
                </p>
                <p className="text-lg text-gray-800 mt-4 font-semibold">
                  Motto: "Think Deep. Solve Smart. Compete Bold."
                </p>
              </div>
            </div>
            <div className="w-[400px] h-[225px] bg-gray-200 rounded-lg flex items-center justify-center">
              <img
                src="/cseduic.png"
                alt="CSEDU Informatics Club"
                width={400}
                height={250}
                className="rounded-md object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  )
}