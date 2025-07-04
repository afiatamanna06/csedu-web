import About from "@/pages/about/about";
import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";
import Notice from "@/pages/notice/notice";
import NoticeDetails from "@/pages/notice/noticedetails";
import type { RouteComponent } from "@tanstack/react-router";

export const routeConfigs = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/notice", component: Notice },
  { path: "/notice/archived", component: Notice },
  { path: "/notice/$noticeId", component: NoticeDetails },
] as const satisfies ReadonlyArray<{
  path: string;
  component: RouteComponent;
}>;