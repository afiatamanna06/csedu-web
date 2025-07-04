import { Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

const quickLinks = [
  {
    section: "Quick Links",
    links: [
      { label: "About", path: "/about" },
      { label: "Academic", path: "/academic" },
      { label: "Research Areas", path: "/research-areas" },
      { label: "Publications", path: "/publications" },
    ],
  },
  {
    section: "Quick Links",
    links: [
      { label: "Faculty", path: "/faculty" },
      { label: "Scholarship and Financial Aids", path: "/scholarships" },
      { label: "Foreign Student Admission Fees", path: "/foreign-admissions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#3D007B] text-white px-6 md:px-16 lg:px-28 pt-20 pb-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="CSEDU Logo" className="w-12" />
            <div>
              <h3 className="font-semibold">
                Department of Computer Science and Engineering (CSEDU)
              </h3>
              <p>Dhaka University Campus, Dhaka-1000.</p>
            </div>
          </div>

          <div className="mt-4 space-y-1 text-sm">
            <p>
              📧{" "}
              <a href="mailto:office@cse.du.ac.bd" className="underline">
                office@cse.du.ac.bd
              </a>
            </p>
            <p>
              📧{" "}
              <a href="mailto:chairman.cse@du.ac.bd" className="underline">
                chairman.cse@du.ac.bd
              </a>
            </p>
            <p>📞 +88 09666 911 463 (Ext7421)</p>
          </div>
        </div>

        {/* Dynamic Quick Links */}
        <div className="flex flex-col flex-1 md:flex-row justify-center gap-12">
          {quickLinks.slice(0, 1).map(({ section, links }, index) => (
            <div key={index}>
              <h4 className="font-semibold border-b-2 border-yellow-400 inline-block mb-2">
                {section}
              </h4>
              <ul className="space-y-1 text-sm">
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
              <h4 className="font-semibold border-b-2 border-yellow-400 inline-block mb-2">
                {section}
              </h4>
              <ul className="space-y-1 text-sm">
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
        <p>© 2025 University of Dhaka. All Rights Reserved.</p>
        <div className="flex items-center gap-2">
          <p>Follow us on</p>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
