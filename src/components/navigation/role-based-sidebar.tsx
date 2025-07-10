import { useRouterState } from "@tanstack/react-router";
import type { SidebarLink } from "./sidebar";
import Sidebar from "./sidebar";

const sidebarLinks: Record<string, SidebarLink[]> = {
  student: [
    { label: "Overview", path: "/dashboard/student/overview" },
    { label: "Courses", path: "/dashboard/student/courses" },
    { label: "Results", path: "/dashboard/student/results" },
    { label: "Settings", path: "/dashboard/student/settings" },
  ],
  faculty: [
    { label: "Overview", path: "/dashboard/faculty/overview" },
    { label: "Classes", path: "/dashboard/faculty/classes" },
    { label: "Research", path: "/dashboard/faculty/research" },
    { label: "Settings", path: "/dashboard/faculty/settings" },
  ],
  admin: [
    { label: "Dashboard", path: "/dashboard/admin/overview" },
    { label: "Users", path: "/dashboard/admin/users" },
    { label: "Reports", path: "/dashboard/admin/reports" },
    { label: "Settings", path: "/dashboard/admin/settings" },
  ],
  alumni: [
    { label: "Overview", path: "/dashboard/alumni/overview" },
    { label: "Events", path: "/dashboard/alumni/events" },
    { label: "Networking", path: "/dashboard/alumni/networking" },
    { label: "Settings", path: "/dashboard/alumni/settings" },
  ],
};

const getRoleFromPath = (pathname: string): string => {
  const segments = pathname.split("/");

  for (const role of Object.keys(sidebarLinks)) {
    if (segments.includes(role)) return role;
  }

  return "student"; // default fallback
};

export default function RoleBasedSidebar({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) {
  const { location } = useRouterState();
  const role = getRoleFromPath(location.pathname);
  const links = sidebarLinks[role];
  const title = `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;

  return <Sidebar title={title} links={links} onLinkClick={onLinkClick} />;
}
