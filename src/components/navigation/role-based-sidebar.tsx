import { useRouterState } from "@tanstack/react-router";
import type { SidebarLink } from "./sidebar";
import Sidebar from "./sidebar";

const sidebarLinks: Record<string, SidebarLink[]> = {
  student: [
    { label: "Overview", path: "/dashboard/student/overview" },
    { label: "Courses", path: "/dashboard/student/courses" },
    { label: "Grades", path: "/dashboard/student/grades" },
    // Fee Structure entry removed
    { label: "Exam Payments", path: "/dashboard/student/payments" },
    { label: "Equipment Booking", path: "/dashboard/student/equipment-booking" },
    { label: "Exam Routine", path: "/dashboard/student/exam-routine" },
    { label: "Semester Routine", path: "/dashboard/student/semester-routine" },
    { label: "Settings", path: "/dashboard/student/settings" },
  ],

  faculty: [
    { label: "Overview", path: "/dashboard/faculty/overview" },
    { label: "Schedule Exams", path: "/dashboard/faculty/schedule-exams" },
    { label: "Grade Submission", path: "/dashboard/faculty/grade-submission" },
    { label: "Room Booking", path: "/dashboard/faculty/room-booking" },
    { label: "Meetings", path: "/dashboard/faculty/meetings" },
    { label: "Settings", path: "/dashboard/faculty/settings" },
  ],

  admin: [
    { label: "Overview", path: "/dashboard/admin/overview" },
    { label: "Users", path: "/dashboard/admin/users" },
    { label: "Rooms", path: "/dashboard/admin/rooms" },
    { label: "Courses", path: "/dashboard/admin/courses" },
    { label: "Exams", path: "/dashboard/admin/exams" },
    { label: "Payments", path: "/dashboard/admin/payments" },
    { label: "Notices", path: "/dashboard/admin/notices" },
    { label: "Events", path: "/dashboard/admin/events" },
    { label: "Settings", path: "/dashboard/admin/settings" },
  ],

  alumni: [
    { label: "Overview", path: "/dashboard/alumni/overview" },
    { label: "Events", path: "/dashboard/alumni/events" },
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
  const profileLink = `/profile/${role}`;

  return <Sidebar title={title} links={links} onLinkClick={onLinkClick} profileLink={profileLink} />;
}
