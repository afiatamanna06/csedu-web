import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";
import { type RouteComponent } from "@tanstack/react-router";

import { Placeholder } from "@/components/placeholder";
import {
  AdminLogin,
  AlumniLogin,
  FacultyLogin,
  StudentLogin,
} from "@/pages/auth/login/login";

import StudentLayout from "@/layouts/student-layout";
import StudentOverview from "@/pages/dashboard/student/overview";

const FacultyDashboard = Placeholder;
const AdminDashboard = Placeholder;
const AlumniDashboard = Placeholder;

export const routeConfigs = [
  // Base
  { path: "/", component: Home },
  { path: "/contact", component: Contact },

  // About
  { path: "/about/history", component: Placeholder },
  { path: "/about/mission-vision", component: Placeholder },

  // Academic
  { path: "/academic/programs", component: Placeholder },
  { path: "/academic/courses", component: Placeholder },
  { path: "/academic/calendar", component: Placeholder },
  { path: "/academic/exam-schedule", component: Placeholder },

  // Admission
  { path: "/admission/undergraduate", component: Placeholder },
  { path: "/admission/graduate", component: Placeholder },

  // People
  { path: "/people/faculty/all", component: Placeholder },
  { path: "/people/faculty/position", component: Placeholder },
  { path: "/people/faculty/research", component: Placeholder },
  { path: "/people/staffs", component: Placeholder },

  // Research
  { path: "/research/areas", component: Placeholder },
  { path: "/research/publications", component: Placeholder },
  { path: "/research/projects", component: Placeholder },
  { path: "/research/facilities", component: Placeholder },

  // Student
  { path: "/student/activities", component: Placeholder },
  { path: "/student/acheivements", component: Placeholder },
  { path: "/student/scholarships", component: Placeholder },
  { path: "/student/foreign", component: Placeholder },

  // Alumni
  { path: "/alumni/network", component: Placeholder },
  { path: "/alumni/achievements", component: Placeholder },
  { path: "/alumni/events", component: Placeholder },

  // News
  { path: "/news/latest", component: Placeholder },
  { path: "/news/events", component: Placeholder },
  { path: "/news/announcements", component: Placeholder },

  // Login
  { path: "/login/faculty", component: FacultyLogin },
  { path: "/login/student", component: StudentLogin },
  { path: "/login/admin", component: AdminLogin },
  { path: "/login/alumni", component: AlumniLogin },

  // Student Dashboard with layout and child routes
  {
    path: "/dashboard/student",
    component: StudentLayout, // layout with sidebar
    children: [
      {
        path: "/dashboard/student",
        component: StudentOverview, // default when visiting /dashboard/student
      },
      {
        path: "/dashboard/student/overview",
        component: StudentOverview,
      },
      {
        path: "/dashboard/student/courses",
        component: Placeholder,
      },
      {
        path: "/dashboard/student/results",
        component: Placeholder,
      },
      {
        path: "/dashboard/student/settings",
        component: Placeholder,
      },
    ],
  },

  // Other Dashboards
  { path: "/dashboard/faculty", component: FacultyDashboard },
  { path: "/dashboard/admin", component: AdminDashboard },
  { path: "/dashboard/alumni", component: AlumniDashboard },
] as const satisfies ReadonlyArray<{
  path: string;
  component: RouteComponent;
  children?: ReadonlyArray<{
    path: string;
    component: RouteComponent;
  }>;
}>;
