import About from "@/pages/about/about";
import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";
import Notice from "@/pages/notice/notice";
import NoticeDetails from "@/pages/notice/noticedetails";
import Events from "@/pages/events/events";
import EventDetails from "@/pages/events/eventdetails";
import StudentActivity from "@/pages/studentactivity/studentactivity";
import type { RouteComponent } from "@tanstack/react-router";

export const routeConfigs = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/notice", component: Notice },
  { path: "/notice/archived", component: Notice },
  { path: "/notice/$noticeId", component: NoticeDetails },
  { path: "/events", component: Events },
  { path: "/events/$eventId", component: EventDetails },
  { path: "/student-activity", component: StudentActivity },
] as const satisfies ReadonlyArray<{
  path: string;
  component: RouteComponent;
}>;