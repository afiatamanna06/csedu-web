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
      'B-TopCS Training of Trainers (ToT) on “How to Make Top Management Aware of Cybersecurity (TMA)”',
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
    <div className="container mx-auto px-4 py-8">
      {/* News and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image side */}
        <div className="grid grid-cols-2 gap-6">
          {newsCards.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-md overflow-hidden ${i === 0 ? "col-span-2" : "col-span-1"}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`w-full ${i === 0 ? "h-[18rem]" : "h-[12rem]"} object-cover`}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm px-3 py-2">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Events list */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
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
                  className="bg-[#f9f9ff] border border-purple-100 rounded-md p-4 flex gap-4 hover:shadow-sm transition"
                >
                  <div className="bg-[#3D007B] text-white text-center px-3 py-1 rounded-md text-sm font-medium">
                    <div className="text-xs">{month}</div>
                    <div className="text-lg font-bold">{day}</div>
                    <div className="text-[10px]">2025</div>
                  </div>
                  <div className="text-sm leading-snug">{item.title}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-right">
            <Link
              to="/"
              className="text-sm font-medium text-[#3D007B] hover:underline"
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
