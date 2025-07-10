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

import StudentOverview from "@/pages/dashboard/student/overview";
import FacultyMembers from "@/pages/people/faculty/all";
import OfficersAndStaff from "@/pages/people/staffs/staffs";
import DashboardLayout from "@/layouts/dashboard-layout";
import FacultyOverview from "@/pages/dashboard/faculty/overview";

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
  { path: "/people/faculty/all", component: FacultyMembers },
  { path: "/people/faculty/position", component: FacultyMembers },
  { path: "/people/faculty/research", component: FacultyMembers },
  { path: "/people/staffs", component: OfficersAndStaff },

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
    component: DashboardLayout,
    children: [
      {
        path: "/",
        component: StudentOverview,
      },
      {
        path: "overview",
        component: StudentOverview,
      },
      {
        path: "grades",
        component: Placeholder,
      },
      {
        path: "payments",
        component: Placeholder,
      },
      {
        path: "equipment-fees",
        component: Placeholder,
      },
      {
        path: "exam-routine",
        component: Placeholder,
      },
      {
        path: "courses",
        component: Placeholder,
      },
      {
        path: "semester-routine",
        component: Placeholder,
      },
      {
        path: "settings",
        component: Placeholder,
      },
    ],
  },

  {
    path: "/dashboard/faculty",
    component: DashboardLayout,
    children: [
      {
        path: "/",
        component: FacultyOverview,
      },
      {
        path: "overview",
        component: FacultyOverview,
      },
      {
        path: "schedule-exams",
        component: Placeholder,
      },
      {
        path: "grade-submission",
        component: Placeholder,
      },
      {
        path: "room-booking",
        component: Placeholder,
      },
      {
        path: "meetings",
        component: Placeholder,
      },
      {
        path: "settings",
        component: Placeholder,
      },
    ],
  },

  {
    path: "/dashboard/admin",
    component: DashboardLayout,
    children: [
      {
        path: "/",
        component: Placeholder,
      },
      {
        path: "overview",
        component: Placeholder,
      },
      {
        path: "users",
        component: Placeholder,
      },
      {
        path: "courses",
        component: Placeholder,
      },
      {
        path: "exams",
        component: Placeholder,
      },
      {
        path: "payments",
        component: Placeholder,
      },
      {
        path: "settings",
        component: Placeholder,
      },
    ],
  },

  {
    path: "/dashboard/alumni",
    component: DashboardLayout,
    children: [
      {
        path: "/",
        component: Placeholder,
      },
      {
        path: "overview",
        component: Placeholder,
      },
      {
        path: "events",
        component: Placeholder,
      },
      {
        path: "settings",
        component: Placeholder,
      },
    ],
  },
] as const satisfies ReadonlyArray<{
  path: string;
  component: RouteComponent;
  children?: ReadonlyArray<{
    path: string;
    component: RouteComponent;
  }>;
}>;
