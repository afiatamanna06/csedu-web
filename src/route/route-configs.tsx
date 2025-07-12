import About from "@/pages/about/about";
import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";
import Profile from "@/pages/profile/profile";
import Programs from "@/pages/programs/programs";
import Degree from "@/pages/programs/degree";
import type { RouteComponent } from "@tanstack/react-router";

export const routeConfigs = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/profile", component: Profile },
  { path: "/programs", component: Programs },
  { path: "/degree", component: Degree },
] as const satisfies ReadonlyArray<{
  path: string;
  component: RouteComponent;
}>;
