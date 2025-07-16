import { Link } from "@tanstack/react-router";
import { Medal } from "lucide-react";

const tags = [
  { label: "Machine Learning", top: "top-4", left: "-left-4" },
  { label: "Data Mining", top: "top-6", right: "-right-4" },
  { label: "Digital Forensic", bottom: "bottom-6", left: "-left-4" },
  { label: "Human Robot Interaction", bottom: "-bottom-4", right: "-right-4" },
];

const researchNews = [
  {
    title: "ঢাবি থেকে ৩৪জন গবেষকের পিএইচ.ডি. এবং ৯জনের এম.ফিল ডিগ্রি লাভ",
    desc: "ঢাকা বিশ্ববিদ্যালয় থেকে সম্প্রতি ৩৪জন গবেষক পিএইচ.ডি, ৯জন এম.ফিল এবং ১৯জন ডি.এ ডিগ্রি অর্জন করেছেন।",
  },
  // {
  //   title: "ঢাবি থেকে ৩৪জন গবেষকের পিএইচ.ডি. এবং ৫জনের এম.ফিল ডিগ্রি লাভ",
  //   desc: "ঢাকা বিশ্ববিদ্যালয় থেকে সম্প্রতি ৩৪জন গবেষক পিএইচ.ডি, ৫জন এম.ফিল এবং ৯জন ডি.এ ডিগ্রি অর্জন করেছেন।",
  // },
  // {
  //   title: "ঢাবি থেকে ৩৪জন গবেষকের পিএইচ.ডি. এবং ৯জনের এম.ফিল ডিগ্রি লাভ",
  //   desc: "ঢাকা বিশ্ববিদ্যালয় থেকে সম্প্রতি ৩৪জন গবেষক পিএইচ.ডি, ৯জন এম.ফিল এবং ১৯জন ডি.এ ডিগ্রি অর্জন করেছেন।",
  // },
];

export default function ResearchOpportunities() {
  return (
    <section className="bg-[#2B1472] text-white px-6 md:px-16 py-20 space-y-16">
      {/* Top Section */}
      <div className="grid lg:grid-cols-2 gap-10 relative z-1 mx-auto container">
        {/* Left */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 lg:mt-6">
            Research Opportunities
          </h2>
          <p className="leading-relaxed text-xl mb-4">
            We offer research opportunities in wide range of areas. These areas
            focus on up-to-date technological advancements to encompass the
            invention of new technologies, their refinement, and their
            widespread adoption.
          </p>
          <Link
            to={"/research-areas" as string}
            className="text-[#FFB606] font-medium mt-6 text-xl hover:underline"
          >
            Explore our research areas →
          </Link>
        </div>

        {/* Right */}
        <div className="relative rounded-md w-full h-[260px]">
          <img
            src="/seminar.jpg"
            alt="Research Seminar"
            className="w-full h-full object-cover rounded-md"
          />
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`absolute px-4 py-2 bg-[#FFB606] text-sm md:text-base text-black z-2 font-semibold ${
                tag.top || ""
              } ${tag.left || ""} ${tag.right || ""} ${tag.bottom || ""}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className=" bg-gradient-to-b from-[#f5f2ff] to-white border-l-6 border-yellow-400 rounded-md px-4 md:px-10 py-10 space-y-6 text-black mx-auto container">
        <div
          className={`grid ${
            researchNews.length === 1
              ? "md:grid-cols-1"
              : researchNews.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-3"
          }  gap-6`}
        >
          {researchNews.map((news, i) => (
            <div
              key={i}
              className={`p-6 relative bg-white/20 shadow-lg shadow-[#f6f4fd] rounded-xl`}
            >
              <div className="bg-[#2B1472] p-3 w-min rounded-full mb-3">
                <Medal className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-xl mb-2">{news.title}</h4>
              <p className="text-gray-600 text-lg mb-4">{news.desc}</p>
              <Link
                to="/"
                className="text-[#FFB606] text-lg font-semibold hover:underline"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
        <div className="text-right">
          <Link
            to={"/award_and_research_highlights" as string}
            className="text-lg font-semibold text-[#2B1472] hover:underline"
          >
            View all research news →
          </Link>
        </div>
      </div>
    </section>
  );
}
