import {
  Outlet,
  createRouter,
  createRootRoute,
  createRoute,
  type RouteComponent,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar } from "@/components/navigation/navbar";
import Footer from "@/components/footer/footer";
import { routeConfigs } from "./route-configs";

console.log("Route configuration loading...");

// 1. Define root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
      <Footer />
    </div>
  ),
});

// 2. Helper to create nested routes recursively
function createRouteRecursive(
  config: {
    path: string;
    component: RouteComponent;
    children?: readonly {
      path: string;
      component: RouteComponent;
    }[];
  },
  getParentRoute: () => import("@tanstack/react-router").AnyRoute
) {
  const route = createRoute({
    path: config.path,
    component: config.component,
    getParentRoute,
  });

  // Handle children if exist
  if (config.children?.length) {
    const childrenRoutes = config.children.map((child) =>
      createRouteRecursive(child, () => route)
    );
    route.addChildren(childrenRoutes);
  }

  return route;
}

// 3. Generate routes from config
const appRoutes = routeConfigs.map((config) =>
  createRouteRecursive(config, () => rootRoute)
);

// 4. Attach all children to root
const routeTree = rootRoute.addChildren(appRoutes);

// 5. Create the router
export const router = createRouter({ routeTree });

// 6. Register router globally
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
