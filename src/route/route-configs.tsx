import About from "@/pages/about/about";
import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";
import type { RouteComponent } from "@tanstack/react-router";

export const routeConfigs = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
] as const satisfies ReadonlyArray<{
  path: string;
  component: RouteComponent;
}>;
