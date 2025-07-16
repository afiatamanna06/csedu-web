import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";

import Notice from "@/pages/notice/notice";
import NoticeDetails from "@/pages/notice/noticedetails";
import Events from "@/pages/events/events";
import EventDetails from "@/pages/events/eventdetails";
import StudentActivity from "@/pages/studentactivity/studentactivity";

import Profile from "@/pages/profile/profile";
import Programs from "@/pages/programs/programs";
import Degree from "@/pages/programs/degree";
import type { RouteComponent } from "@tanstack/react-router";

import About from "@/pages/about/about";
import Calender from "@/pages/academic/calender";

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

import AdminNotice from "@/pages/admin/notice/adminnotice";
import AddNotice from "@/pages/admin/notice/addnotice";
import EditNotice from "@/pages/admin/notice/editnotice";
import AdminEvents from "@/pages/admin/events/adminevents";
import AddEvents from "@/pages/admin/events/addevents";
import EditEvents from "@/pages/admin/events/editevents";

import FeeStructure from "@/pages/dashboard/fee-structure";
import EquipmentBooking from "@/pages/dashboard/equipment-booking";

import Admission from "@/pages/admission/admission";
import ApplyMsc from "@/pages/admission/apply-msc";
import ApplyPhd from "@/pages/admission/apply-phd";
import ApplyMphil from "@/pages/admission/apply-mphil";
import FormFillup from "@/pages/admission/form-fillup";
import AwardAndResearchHighlights from "@/pages/research/award-and-research-highlights";
import ResearchAreas from "@/pages/research/research-areas";
import Publications from "@/pages/research/publications";
import FundedProjects from "@/pages/research/funded-projects";
import ResearchFacilities from "@/pages/research/research-facilities";

import FacultyProfile from "@/pages/profile/faculty-profile";
import StudentProfile from "@/pages/profile/student-profile";

import SemesterRoutine from "@/pages/dashboard/student/semester-routine";
import Course from "@/pages/dashboard/student/course";
import AdminAdmission from "@/pages/admin/admission/admin-admission";


export const routeConfigs = [
  // Base
  { path: "/", component: Home },
  { path: "/contact", component: Contact },

  { path: "/profile", component: Profile },
  { path: "/programs", component: Programs },
  { path: "/degree", component: Degree },

  // About
  { path: "/about/history", component: About },
  { path: "/about/mission-vision", component: Placeholder },

  // Academic
  { path: "/academic/programs", component: Programs },
  { path: "/academic/courses", component: Placeholder },
  { path: "/academic/calendar", component: Calender },
  { path: "/academic/exam-schedule", component: Placeholder },

  // Admission
  { path: "/admission/undergraduate", component: Placeholder },
  { path: "/admission/graduate", component: Placeholder },

  // People
  // { path: "/people/faculty/all", component: FacultyMembers },
  // { path: "/people/faculty/position", component: FacultyMembers },
  // { path: "/people/faculty/research", component: FacultyMembers },
  { path: "/people/faculty", component: FacultyMembers },
  { path: "/people/staffs", component: OfficersAndStaff },



  // Student
  { path: "/student/activities", component: StudentActivity },
  { path: "/student/acheivements", component: Placeholder },
  { path: "/student/scholarships", component: Placeholder },
  { path: "/student/foreign", component: Placeholder },

  // Alumni
  { path: "/alumni/network", component: Placeholder },
  { path: "/alumni/achievements", component: Placeholder },
  { path: "/alumni/events", component: Placeholder },

  // News
  { path: "news/notice", component: Notice },
  { path: "news/notice/archived", component: Notice },
  { path: "news/notice/$noticeId", component: NoticeDetails },
  { path: "/news/events", component: Events },
  { path: "/news/events/$eventId", component: EventDetails },

  // Login
  { path: "/login/faculty", component: FacultyLogin },
  { path: "/login/student", component: StudentLogin },
  { path: "/login/admin", component: AdminLogin },
  { path: "/login/alumni", component: AlumniLogin },

    //admission
  { path: "/admission", component: Admission },
  { path: "/apply-msc", component: ApplyMsc },
  { path: "/apply-phd", component: ApplyPhd },
  { path: "/apply-mphil", component: ApplyMphil },
  { path: "/form-fillup", component: FormFillup },

  // Research
  { path: "/award_and_research_highlights", component: AwardAndResearchHighlights },
  { path: "/research-areas", component: ResearchAreas },
  { path: "/publications", component: Publications },
  { path: "/funded-projects", component: FundedProjects },
  { path: "/research-facilities", component: ResearchFacilities },

  //faculty profile, student profile
  { path: "/profile/faculty", component: FacultyProfile },
  { path: "/profile/student", component: StudentProfile },
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
        path: "fee-structure",
        component: FeeStructure,
      },
      {
        path: "equipment-booking",
        component: EquipmentBooking,
      },
      {
        path: "exam-routine",
        component: Placeholder,
      },
      {
        path: "courses",
        component: Course,
      },
      {
        path: "semester-routine",
        component: SemesterRoutine,
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
        path: "notices",
        component: AdminNotice,
      },
      {
        path: "notices/addnotice",
        component: AddNotice,
      },
      {
        path: "notices/editnotice",
        component: EditNotice,
      },

      {
        path: "events",
        component: AdminEvents,
      },
      {
        path: "events/addevents",
        component: AddEvents,
      },
      {
        path: "events/editevents",
        component: EditEvents,
      },
      {
        path: "admission",
        component: AdminAdmission,
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
