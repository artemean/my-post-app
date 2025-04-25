import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="font-sans bg-sky-900">
      <div className="p-2 flex gap-2 text-sky-50">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr className="bg-sky-50 border-sky-50" />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
