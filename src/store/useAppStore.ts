import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tasks as initialTasks } from "@/data/mockData";
import type { Task, TaskColumn } from "@/types";

interface AppState {
  darkMode: boolean;
  sidebarOpen: boolean;
  notificationsOpen: boolean;
  tasks: Task[];
  toggleTheme: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleNotifications: () => void;
  closeNotifications: () => void;
  moveTask: (taskId: string, column: TaskColumn) => void;
}

function syncTheme(darkMode: boolean) {
  document.documentElement.classList.toggle("dark", darkMode);
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      sidebarOpen: false,
      notificationsOpen: false,
      tasks: initialTasks,
      toggleTheme: () =>
        set((state) => {
          syncTheme(!state.darkMode);
          return { darkMode: !state.darkMode };
        }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      closeSidebar: () => set({ sidebarOpen: false }),
      toggleNotifications: () => set((state) => ({ notificationsOpen: !state.notificationsOpen })),
      closeNotifications: () => set({ notificationsOpen: false }),
      moveTask: (taskId, column) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, column } : task)),
        })),
    }),
    {
      name: "goodday-preferences",
      partialize: (state) => ({ darkMode: state.darkMode, tasks: state.tasks }),
      onRehydrateStorage: () => (state) => syncTheme(state?.darkMode ?? false),
    },
  ),
);
