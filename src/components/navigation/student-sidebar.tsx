import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { label: "Overview", path: "/dashboard/student/overview" },
  { label: "Courses", path: "/dashboard/student/courses" },
  { label: "Results", path: "/dashboard/student/results" },
  { label: "Fee Structure", path: "/dashboard/student/fee-structure" },
  { label: "Settings", path: "/dashboard/student/settings" },
];

interface StudentSidebarProps {
  onLinkClick?: () => void;
}

export default function StudentSidebar({ onLinkClick }: StudentSidebarProps) {
  const { location } = useRouterState();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 font-bold text-lg border-b">Student Dashboard</div>
      <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onLinkClick}
            className={`p-2 rounded hover:bg-blue-100 ${
              location.pathname === link.path ? "bg-blue-200" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
