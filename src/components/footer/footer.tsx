import { Facebook, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

const quickLinks = [
  {
    section: "Quick Links",
    links: [
      { label: "About", path: "/about/history" },
      { label: "Academic", path: "/academic" },
      { label: "Research Areas", path: "/research-areas" },
      { label: "Publications", path: "/publications" },
    ],
  },
  {
    section: "Quick Links",
    links: [
      { label: "Faculty", path: "/people/faculty/all" },
      { label: "Scholarship and Financial Aids", path: "/scholarships" },
      { label: "Foreign Student Admission Fees", path: "/foreign-admissions" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#2B1472] text-white px-6 md:px-16 lg:px-28 pt-20 pb-10">
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
            <h4 className="font-semibold border-b-2 border-yellow-400 inline-block mb-3">
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
              <h4 className="font-semibold border-b-2 border-yellow-400 inline-block mb-3">
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
              <h4 className="font-semibold border-b-2 border-yellow-400 inline-block mb-3">
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
  );
}
