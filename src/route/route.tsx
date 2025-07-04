import { Navbar } from "@/components/navigation/navbar";
import {
  Outlet,
  createRouter,
  createRootRoute,
  type RouteComponent,
  createRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { routeConfigs } from "./route-configs";
import Footer from "@/components/footer/footer";
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

function createChildRoute<TPath extends string>(
  path: TPath,
  component: RouteComponent
) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
  });
}

const childRoutes = routeConfigs.map((config) =>
  createChildRoute(config.path, config.component)
);

const routeTree = rootRoute.addChildren(childRoutes);

export const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
