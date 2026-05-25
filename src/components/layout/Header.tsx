import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { notifications } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function Header() {
  const { user } = useUser();
  const displayName = user?.name ?? "Astha Shrivastava";
  const { darkMode, toggleTheme, toggleSidebar, notificationsOpen, toggleNotifications, closeNotifications } =
    useAppStore();
  const unread = notifications.filter((notification) => notification.unread).length;

  return (
    <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-slate-200/60 bg-canvas/88 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-night/90 sm:px-7">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="size-5" />
        </Button>
        <div className="relative hidden w-72 md:block xl:w-92">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="border-0 bg-slate-100 pl-10 dark:bg-slate-900" placeholder="Search projects, tasks..." />
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle color mode">
          {darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={toggleNotifications} aria-label="Notifications">
            <Bell className="size-5" />
            {unread > 0 && <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-canvas dark:ring-night" />}
          </Button>
          {notificationsOpen && (
            <div className="panel absolute right-0 top-12 w-[min(92vw,350px)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold dark:text-white">Notifications</p>
                <button onClick={closeNotifications} className="text-xs text-primary">Mark all read</button>
              </div>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div key={notification.id} className={cn("rounded-xl p-3 text-sm", notification.unread ? "bg-primary/5" : "bg-slate-50 dark:bg-slate-800/60")}>
                    <p className="font-medium dark:text-white">{notification.title}</p>
                    <p className="muted mt-1 text-xs">{notification.detail} - {notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="ml-1 flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900">
            <Avatar initials={getInitials(displayName)} className="size-9" />
            <span className="hidden text-sm font-medium dark:text-white sm:block">{displayName}</span>
            <ChevronDown className="hidden size-4 text-slate-400 sm:block" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" className="panel z-30 mt-2 w-48 p-2 text-sm">
              <DropdownMenu.Item asChild>
                <Link to="/profile" className="block cursor-pointer rounded-lg px-3 py-2 outline-none hover:bg-slate-100 dark:hover:bg-slate-800">Profile</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/settings" className="block cursor-pointer rounded-lg px-3 py-2 outline-none hover:bg-slate-100 dark:hover:bg-slate-800">Preferences</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-slate-100 dark:bg-slate-800" />
              <DropdownMenu.Item asChild>
                <Link to="/login" className="block cursor-pointer rounded-lg px-3 py-2 text-rose-600 outline-none hover:bg-rose-50 dark:hover:bg-rose-500/10">Sign out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
