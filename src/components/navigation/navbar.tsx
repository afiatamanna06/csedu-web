import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import Banner from "../banner/banner";

type NavItem = {
  name: string;
  href?: string;
  submenu?: NavItem[];
};

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    {
      name: "About",
      submenu: [{ name: "History", href: "/about/history" }],
    },
    {
      name: "Academic",
      submenu: [
        { name: "Programs", href: "/academic/programs" },
        { name: "Courses", href: "/academic/courses" },
        { name: "Academic Calendar", href: "/academic/calendar" },
        { name: "Exam Schedule", href: "/academic/exam-schedule" },
      ],
    },
    // Update Admission section - remove submenu
    { name: "Admission", href: "/admission" },
    {
      name: "People",
      submenu: [
        {
          name: "Faculty Members",
          href: "/people/faculty",
          // submenu: [
          //   { name: "All", href: "/people/faculty/all" },
          //   { name: "Position", href: "/people/faculty/position" },
          //   { name: "Research", href: "/people/faculty/research" },
          // ],
        },
        { name: "Officers and Staffs", href: "/people/staffs" },
      ],
    },
    {
      name: "Research",
      submenu: [
        // Change "Research Areas" to "Research Highlights"
        { name: "Research Highlights", href: "/award_and_research_highlights" },
        { name: "Research Areas", href: "/research-areas" },
        { name: "Publications", href: "/publications" },
        { name: "Funded Projects", href: "/funded-projects" },
        { name: "Research Facilities", href: "/research-facilities" },
      ],
    },
    {
      name: "Student",
      submenu: [
        { name: "Student Activities", href: "/student/activities" },
        { name: "Student Acheivements", href: "/student/acheivements" },
        {
          name: "Scholarship and Financial Aids",
          href: "/student/scholarships",
        },
        { name: "Foreign Student Admission Fees", href: "/student/foreign" },
      ],
    },
    {
      name: "Alumni",
      submenu: [
        { name: "Alumni Network", href: "/alumni/network" },
        { name: "Alumni Achievements", href: "/alumni/achievements" },
        { name: "Alumni Events", href: "/alumni/events" },
      ],
    },
    {
      name: "News",
      submenu: [
        // { name: "Latest News", href: "/news/latest" },
        { name: "Events", href: "/news/events" },
        { name: "Announcements", href: "/news/notice" },
      ],
    },
    {
      name: "Login",
      submenu: [
        { name: "Login", href: "/login" },
        { name: "Admin Signup", href: "/admin/signup" },
        { name: "Student/Faculty Signup", href:"/signup"}
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full bg-white/95 backdrop-blur-lg shadow-sm fixed top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 shadow-md lg:px-0 lg:py-0">
          <Banner />
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {/* Mobile Search */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="mr-2 bg-[#2B1472] p-2.5 rounded-md hover:bg-[#1a0d4c] transition-colors">
                  <Search className="text-white" />
                </button>
              </SheetTrigger>
              <SheetContent className="backdrop-blur-lg bg-white">
                <SheetHeader>
                  <SheetTitle>Search here</SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Input id="sheet-demo-username" defaultValue="@peduarte" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <button
              className=""
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className="hidden lg:flex bg-[#EFEFFFbf] backdrop-blur-lg px-4 py-3 justify-between items-center">
          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navItems.map((item, index) => (
              <DesktopMenuItem key={index} item={item} />
            ))}
          </div>
          {/* Search Button */}
          <div className="hidden lg:flex">
            <Sheet>
              <SheetTrigger asChild>
                <button className="mr-2 bg-[#2B1472] p-2.5 rounded-md hover:bg-[#1a0d4c] transition-colors">
                  <Search className="text-white" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search here</SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Input id="sheet-demo-username" defaultValue="@peduarte" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-sm max-h-[80vh] overflow-auto">
            {navItems.map((item, index) => (
              <MobileMenuItem
                key={index}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                item={item}
              />
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

const DesktopMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
  if (!item.submenu) {
    return (
      <Link to={item.href!} className="hover:text-blue-600 transition">
        {item.name}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button className="hover:text-blue-600 transition flex flex-row items-center gap-1">
        {item.name} <ChevronDown size={18} />
      </button>
      <div className="absolute left-0 top-full bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
        {item.submenu.map((sub, idx) => (
          <div key={idx} className="relative group">
            {sub.submenu ? (
              <>
                <button className="w-[10rem] text-left px-4 py-2 hover:bg-gray-100">
                  {sub.name}
                </button>
                <div className="absolute left-full top-0 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  {sub.submenu.map((deep, deepIdx) => (
                    <Link
                      key={deepIdx}
                      to={deep.href!}
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      {deep.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={sub.href!}
                className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
              >
                {sub.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileMenuItem: React.FC<{ item: NavItem; onClick: () => void }> = ({
  item,
  onClick,
}) => {
  const [open, setOpen] = React.useState(false);

  if (!item.submenu) {
    return (
      <Link
        to={item.href!}
        onClick={onClick}
        className="block px-4 py-2 hover:bg-gray-100"
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        {item.name}
      </button>
      {open && (
        <div className="pl-4 border-l">
          {item.submenu.map((sub, idx) => (
            <div key={idx}>
              {!sub.submenu ? (
                <Link
                  to={sub.href!}
                  onClick={onClick}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {sub.name}
                </Link>
              ) : (
                <MobileSubMenu item={sub} onClick={onClick} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileSubMenu: React.FC<{ item: NavItem; onClick: () => void }> = ({
  item,
  onClick,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        {item.name}
      </button>
      {open && (
        <div className="pl-4 border-l">
          {item.submenu?.map((sub, idx) => (
            <Link
              key={idx}
              to={sub.href!}
              onClick={onClick}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
