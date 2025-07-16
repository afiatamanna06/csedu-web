import { Link } from "@tanstack/react-router";

const news = [
  {
    title:
      "B-TopCS Training of Trainers (ToT) on “How to Make Top Management Aware of Cybersecurity (TMA)”",
    date: "May 15, 2025",
  },
  {
    title:
      "ভোজন উৎসব ১৪৩২: Celebrating Taste and Talent at DU – Hosted by CSEDU Students’ Club, GEBC, and...",
    date: "May 02, 2025",
  },
  {
    title:
      "CSEDU Celebrates Talent and Excellence at Cultural Program and Annual Prize Giving Ceremony 2025",
    date: "May 02, 2025",
  },
];

const newsCards = [
  {
    title:
      "B-TopCS Training of Trainers (ToT) on “How to Make Top Management Aware of Cybersecurity (TMA)”",
    image: "/seminar.jpg",
  },
  {
    title: "ভোজন উৎসব ১৪৩২",
    image: "/vojon.jpg",
  },
  {
    title: "Cultural and Annual Prize Giving Ceremony 2025",
    image: "/cultural.jpg",
  },
];

const News = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* News and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image side */}
        <div className="grid grid-cols-2 gap-6">
          {newsCards.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-md overflow-hidden ${
                i === 0 ? "col-span-2" : "col-span-1"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`w-full ${
                  i === 0 ? "h-[18rem]" : "h-[12rem]"
                } object-cover`}
              />
              <div className="absolute bottom-0 left-0 backdrop-blur-3xl w-full bg-black/60 text-white text-sm px-3 py-2">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Events list */}
        <div>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-14 border-b-2 border-[#FFB606] mb-8">
            News and Events
          </h3>
          <div className="space-y-6">
            {news.map((item, index) => {
              const [month, day] = new Date(item.date)
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
                .split(" ");
              return (
                <div
                  key={index}
                  className="bg-[#f9f9ff] cursor-pointer shadow-lg shadow-[#e8e8ff] rounded-md p-4 flex gap-4 transition"
                >
                  <div className="bg-[#E3DDF6] w-[7rem] h-[5rem] text-[#2B1472] flex flex-col justify-center items-center px-3 py-1 rounded-md">
                    <div className="w-min">
                      <div className="text-xs font-semibold min-w-[3rem] text-center">
                        {month}, {day}
                      </div>

                      <div className="text-xs text-center">2025</div>
                    </div>
                  </div>
                  <div className="text-base md:text-xl leading-snug">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-right">
            <Link
              to={"/news/events" as string}
              className="font-medium text-[#2B1472] text-lg hover:underline"
            >
              See all news and events →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
