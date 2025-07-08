import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { label: "Overview", path: "/dashboard/student/overview" },
  { label: "Courses", path: "/dashboard/student/courses" },
  { label: "Results", path: "/dashboard/student/results" },
  { label: "Settings", path: "/dashboard/student/settings" },
];

export default function StudentSidebar() {
  const { location } = useRouterState();

  return (
    <aside className="w-64 bg-white shadow-lg border-r">
      <div className="p-4 font-bold text-lg">Student Dashboard</div>
      <nav className="flex flex-col gap-1 p-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`p-2 rounded hover:bg-blue-100 ${
              location.pathname === link.path ? "bg-blue-200" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
