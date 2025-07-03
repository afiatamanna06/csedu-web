import About from "@/pages/about/about";
import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";
import Notice from "@/pages/notice/notice";
import type { RouteComponent } from "@tanstack/react-router";

export const routeConfigs = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/notice", component: Notice },
] as const satisfies ReadonlyArray<{
  path: string;
  component: RouteComponent;
}>;
