import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const notices = [
  {
    title:
      "১৫-০৫-২০২৫ তারিখের ইনকোর্স/মিডটার্ম পরীক্ষার সময় পরিবর্তন সংক্রান্ত বিজ্ঞপ্তি",
    date: "Published on: May 14, 2025",
  },
  {
    title: "ইফতার ও দোয়া অনুষ্ঠান-২০২৫ সংক্রান্ত বিজ্ঞপ্তি",
    date: "Published on: March 06, 2025",
  },
  {
    title:
      "একজন অ্যাসালানাই এর অভিযোগের প্রেক্ষিতে বিভাগীয় আন্তঃব্যক্তিক সম্পর্ক উন্নয়ন ও দৃষ্টিনির্মাণ...",
    date: "Published on: March 06, 2025",
  },
];

const Notices = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h3 className="text-xl font-semibold text-center text-gray-900">
        Notice and Announcements
      </h3>
      <div className="my-10">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="border-b hover:bg-[#f4f0ff] group transition"
          >
            <Link
              to="/"
              className="flex items-center justify-between gap-4 py-4 px-2 md:px-6 text-sm font-medium text-[#3D007B] group-hover:underline"
            >
              <div>{notice.title}</div>
              <ArrowRight className="min-w-5 group-hover:text-[#3D007B]" />
            </Link>
            <p className="text-xs text-gray-500 px-2 md:px-6 pb-3">
              {notice.date}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md text-sm transition"
        >
          View all announcements
        </Link>
      </div>
    </div>
  );
};

export default Notices;
