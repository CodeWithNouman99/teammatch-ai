import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/requests", label: "Requests" },
  { to: "/developers", label: "Developers" },
];

// The frame around every page after login: navigation on the side, the page in the middle.
// <Outlet /> is where React Router puts the current page.
export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen md:flex">
      <aside className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-2 bg-ink px-5 py-4 text-white md:sticky md:top-0 md:h-screen md:w-56 md:flex-col md:items-stretch md:px-4 md:py-6">
        <p className="font-display text-lg font-bold md:mb-6 md:px-2">TeamMatch AI</p>

        <nav className="flex gap-1 md:flex-col">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:mt-auto md:ml-0 md:block md:px-2">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="hidden text-xs text-white/50 capitalize md:block">{user.role}</p>
          <button onClick={logout} className="text-sm text-white/70 underline hover:text-white md:mt-3">
            Log out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}