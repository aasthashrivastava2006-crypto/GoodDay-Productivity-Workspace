import { activities, members, notifications, projects, tasks, workspaces } from "@/data/mockData";
import type { Project, Task, Workspace } from "@/types";

const pause = (ms = 450) => new Promise((resolve) => window.setTimeout(resolve, ms));

// These methods mirror future API boundaries while returning stable demo data.
export const api = {
  async getDashboard() {
    await pause();
    return { activities, members, notifications, projects };
  },
  async getProjects(): Promise<Project[]> {
    await pause(320);
    return projects;
  },
  async getTasks(): Promise<Task[]> {
    await pause(320);
    return tasks;
  },
  async getWorkspaces(): Promise<Workspace[]> {
    await pause(320);
    return workspaces;
  },
  async signIn(email: string, _password: string) {
    await pause(650);
    return { name: email.split("@")[0] || "Astha", email };
  },
};
