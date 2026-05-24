export type ProjectStatus = "On track" | "At risk" | "Planning" | "Completed";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type TaskColumn = "Backlog" | "To Do" | "In Progress" | "Review" | "Completed";

export interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
  email: string;
  online: boolean;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  progress: number;
  status: ProjectStatus;
  dueDate: string;
  memberIds: string[];
  tasks: number;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  column: TaskColumn;
  priority: Priority;
  tags: string[];
  dueDate: string;
  assigneeId: string;
  description: string;
}

export interface Workspace {
  id: string;
  name: string;
  plan: string;
  projects: number;
  members: number;
  completion: number;
}

export interface Activity {
  id: string;
  author: string;
  action: string;
  target: string;
  time: string;
}

export interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
}
