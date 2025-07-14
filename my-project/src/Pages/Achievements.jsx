import AchievementCard from "../components/AchievementCard";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title:
        "Success of DU Teams at UIU Inter-University Programming     Contest 2025",
      content:
        "The University of Dhaka once again demonstrated its programming excellence by fielding six teams that competed with determination and skill. Two teams, in particular, achieved remarkable success: The team DU_Primordius, consisting of Munawar Shakil Muhit, Md. Ibrahim Khandakar, and Asif Jawad, emerged as The Champion of the competition. Solving seven problems, they showcased extraordinary technical expertise, logical thinking, and teamwork. Their ability to tackle a variety of challenging problems with innovative solutions set them apart from the competition and secured their position at the top.\n\nAnother strong performance came from DU_Singularity, a team comprising Sakib Hassan, Yeamin Kaiser, and Ujan Samaddar. This team earned the 6th position overall, solving six problems. Their resilience and consistency throughout the competition demonstrated their capability to handle high-pressure situations and their commitment to excellence in competitive programming. The problem set for the UIU IUPC 2025 was renowned for its difficulty, covering a wide range of topics that tested participants on algorithmic thinking, data structure optimization, and advanced programming concepts. The teams faced problems that required not only deep technical knowledge but also the ability to strategize and manage time effectively.",
      fullContent:
        "The University of Dhaka once again demonstrated its programming excellence by fielding six teams that competed with determination and skill. Two teams, in particular, achieved remarkable success: The team DU_Primordius, consisting of Munawar Shakil Muhit, Md. Ibrahim Khandakar, and Asif Jawad, emerged as The Champion of the competition. Solving seven problems, they showcased extraordinary technical expertise, logical thinking, and teamwork. Their ability to tackle a variety of challenging problems with innovative solutions set them apart from the competition and secured their position at the top.\n\nAnother strong performance came from DU_Singularity, a team comprising Sakib Hassan, Yeamin Kaiser, and Ujan Samaddar. This team earned the 6th position overall, solving six problems. Their resilience and consistency throughout the competition demonstrated their capability to handle high-pressure situations and their commitment to excellence in competitive programming. The problem set for the UIU IUPC 2025 was renowned for its difficulty, covering a wide range of topics that tested participants on algorithmic thinking, data structure optimization, and advanced programming concepts. The teams faced problems that required not only deep technical knowledge but also the ability to strategize and manage time effectively.\n\nThe competition was held in a highly competitive environment with participants from top universities across the country. The success of these teams reflects the quality of education and training provided by the Department of Computer Science and Engineering at the University of Dhaka. Both teams showed exceptional preparation, spending countless hours honing their skills in algorithm design, data structures, and competitive programming techniques.\n\nThe achievement of DU_Primordius as champions is particularly noteworthy as it demonstrates the department's commitment to excellence in competitive programming. The team's victory was the result of months of rigorous training, practice sessions, and participation in various programming contests throughout the year. Their success serves as an inspiration to other students and reinforces the department's reputation as a center of excellence in computer science education.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/efc7f2f5f4d1653c03959e03d906668889a54bb1?width=2708",
    },
    {
      id: 2,
      title:
        "Excellent Performance of the DU Teams at MIAKI Presents KUET IUPC 2025",
      content:
        "The MIAKI Presents KUET Inter-University Programming Contest (IUPC) 2025 took place on January 4th, 2025, at Khulna University of Engineering and Technology (KUET). This prestigious event brought together talented programmers from universities across the country to compete in a challenging and exciting environment.\n\nThe University of Dhaka demonstrated outstanding performance at the event, fielding six teams that showcased exceptional problem-solving skills and determination. Among these teams, two stood out with remarkable achievements: The team DU_Primordius, comprising Munawar Shakil Muhit, Md. Ibrahim Khandakar, and Asif Jawad, achieved the prestigious position of First Runner-Up in the competition. The team managed to solve an impressive seven problems, which is a testament to their technical expertise and exceptional teamwork. Their ability to approach complex problems with innovative solutions was evident throughout the competition, earning them a well-deserved place among the top teams.\n\nAnother team, DU_Singularity, also left a strong impression with their outstanding performance. The team, consisting of Sakib Hassan, Yeamin Kaiser, and Ujan Samaddar, secured the 5th position overall. Like DU_Primodius, they solved seven challenging problems",
      fullContent:
        "The MIAKI Presents KUET Inter-University Programming Contest (IUPC) 2025 took place on January 4th, 2025, at Khulna University of Engineering and Technology (KUET). This prestigious event brought together talented programmers from universities across the country to compete in a challenging and exciting environment.\n\nThe University of Dhaka demonstrated outstanding performance at the event, fielding six teams that showcased exceptional problem-solving skills and determination. Among these teams, two stood out with remarkable achievements: The team DU_Primordius, comprising Munawar Shakil Muhit, Md. Ibrahim Khandakar, and Asif Jawad, achieved the prestigious position of First Runner-Up in the competition. The team managed to solve an impressive seven problems, which is a testament to their technical expertise and exceptional teamwork. Their ability to approach complex problems with innovative solutions was evident throughout the competition, earning them a well-deserved place among the top teams.\n\nAnother team, DU_Singularity, also left a strong impression with their outstanding performance. The team, consisting of Sakib Hassan, Yeamin Kaiser, and Ujan Samaddar, secured the 5th position overall. Like DU_Primodius, they solved seven challenging problems and demonstrated remarkable consistency throughout the competition.\n\nThe contest featured problems that tested various aspects of competitive programming, including algorithm design, data structure implementation, mathematical problem-solving, and optimization techniques. The teams had to work under time pressure while maintaining accuracy and efficiency in their solutions.\n\nThe success of these teams at KUET IUPC 2025 further solidifies the University of Dhaka's position as a leading institution in competitive programming. The achievements reflect the dedication of both the students and the faculty members who provide guidance and support for competitive programming activities.\n\nThese accomplishments serve as motivation for future students and demonstrate the high standards of education and training in the Department of Computer Science and Engineering at the University of Dhaka.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d086bb65c3d2ed2fea52066b4523564ade6fb6fe?width=2708",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="text-center py-12 bg-white shadow-sm">
        <h1 className="text-4xl font-bold text-[#13274C] font-['Poppins']">
          Student Achievements
        </h1>
        <p className="text-xl text-gray-600 mt-3 font-['Inter']">
          Celebrating the remarkable accomplishments of our students
        </p>
      </div>

      {/* Achievement Cards Container */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              title={achievement.title}
              content={achievement.content}
              fullContent={achievement.fullContent}
              imageUrl={achievement.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* View More Achievements Button */}
      <div className="text-center pb-16">
        <button className="inline-flex h-12 px-8 justify-center items-center rounded-full bg-[#0F264F] hover:bg-[#1a3562] transition-colors duration-200 text-white font-['Public_Sans'] text-base font-bold shadow-lg">
          View More Achievements
        </button>
      </div>
    </div>
  );
};

export default Achievements;
