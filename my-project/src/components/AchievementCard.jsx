import { useState } from "react";

const AchievementCard = ({
  title,
  content,
  fullContent,
  imageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/efc7f2f5f4d1653c03959e03d906668889a54bb1?width=2708",
}) => {
  return (
    <div className="w-full max-w-[1355px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative h-[542px]">
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt="Achievement"
        />
      </div>

      {/* Yellow Header Section */}
      <div className="bg-[#FFC300] py-3 px-6 text-center">
        <h3 className="text-[rgba(19,39,76,0.7)] font-['Poppins'] text-2xl font-extrabold">
          Achievements of our students
        </h3>
      </div>

      {/* Content Section */}
      <div className="p-8 border border-[rgba(116,116,116,0.5)]">
        {/* Title with centered divider */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-[#13274C] font-['Poppins'] text-3xl font-semibold text-center mb-8">
            {title}
          </h2>
          <div className="w-[650px] h-[2px] bg-[#FFC300]"></div>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          <p className="text-black font-['Inter'] text-lg font-light leading-relaxed">
            {fullContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
