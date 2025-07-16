import { Facebook, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

const quickLinks = [
  {
    section: "Quick Links",
    links: [
      { label: "About", path: "/about/history" },
      { label: "Academic", path: "/academic/programs" },
      { label: "Admission", path: "/admission" },
      { label: "Research Areas", path: "/research-areas" },
    ],
  },
  {
    section: "Quick Links",
    links: [
      { label: "Faculty", path: "/people/faculty" },
      { label: "Announcements", path: "/news/notice" },
      { label: "Publications", path: "/publications" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="bg-[#2B1472] text-white">
      <footer className=" container mx-auto  px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex md:flex-col lg:flex-row items-center md:items-start lg:items-center gap-3 mb-4">
              <img src="/logo.png" alt="CSEDU Logo" className="w-16 md:w-12" />
              <div>
                <h3 className="font-semibold">
                  Department of Computer Science and Engineering (CSEDU)
                </h3>
                <p>Dhaka University Campus, Dhaka-1000.</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <h4 className="font-semibold border-b-2 border-[#FFB606] inline-block mb-3">
                Contact
              </h4>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:office@cse.du.ac.bd" className="underline">
                  office@cse.du.ac.bd
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:chairman.cse@du.ac.bd" className="underline">
                  chairman.cse@du.ac.bd
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> +88 09666 911 463 (Ext7421)
              </p>
            </div>
          </div>

          {/* Dynamic Quick Links */}
          <div className="flex flex-col flex-1 md:flex-row justify-center gap-12">
            {quickLinks.slice(0, 1).map(({ section, links }, index) => (
              <div key={index}>
                <h4 className="font-semibold border-b-2 border-[#FFB606] inline-block mb-3">
                  {section}
                </h4>
                <ul className="space-y-2 text-sm">
                  {links.map(({ label, path }) => (
                    <li key={path}>
                      <Link to={path} className="hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col flex-1 md:flex-row justify-center gap-12">
            {quickLinks.slice(1, 2).map(({ section, links }, index) => (
              <div key={index}>
                <h4 className="font-semibold border-b-2 border-[#FFB606] inline-block mb-3">
                  {section}
                </h4>
                <ul className="space-y-2 text-sm">
                  {links.map(({ label, path }) => (
                    <li key={path}>
                      <Link to={path} className="hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6 bg-white opacity-30" />

        {/* Bottom Footer Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {year} University of Dhaka. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <p>Follow us on</p>
            <a
              href="https://www.facebook.com/Dept.CSE.DU"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="text-white" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
