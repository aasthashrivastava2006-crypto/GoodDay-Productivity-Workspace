import {
  BarChart3,
  BriefcaseBusiness,
  CheckSquare,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workspaces", label: "Workspaces", icon: BriefcaseBusiness },
  { to: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/team", label: "Team", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, closeSidebar } = useAppStore();

  return (
    <>
      {sidebarOpen && <button className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden" onClick={closeSidebar} aria-label="Close navigation" />}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : undefined }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-68 -translate-x-full flex-col border-r border-slate-200/70 bg-white px-4 py-6 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0",
          sidebarOpen && "translate-x-0",
        )}
      >
        <div className="mb-10 flex items-center justify-between px-3">
          <NavLink to="/dashboard" className="flex items-center gap-3" onClick={closeSidebar}>
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">G</span>
            <div>
              <div className="text-xl font-bold dark:text-white">GoodDay</div>
              <div className="text-xs text-slate-400">Workspace</div>
            </div>
          </NavLink>
          <button onClick={closeSidebar} className="lg:hidden">
            <X className="size-5 text-slate-500" />
          </button>
        </div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  "flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-500 transition-colors dark:text-slate-400",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 dark:text-white"
                    : "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white",
                )
              }
            >
              <Icon className="size-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-primary p-4 text-white">
          <p className="text-xs font-medium text-indigo-100">PRO PLAN</p>
          <p className="mt-2 text-sm font-semibold">Unlock AI automation</p>
          <p className="mt-1 text-xs text-indigo-100">Save time on recurring workflows.</p>
          <Link 
            to="/upgrade" 
            onClick={closeSidebar}
            className="mt-4 block w-full rounded-lg bg-white/16 py-2 text-center text-xs font-semibold hover:bg-white/25"
          >
            Upgrade plan
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
