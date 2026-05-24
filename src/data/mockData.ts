import type {
  Activity,
  Member,
  Notification,
  Project,
  Task,
  TaskColumn,
  Workspace,
} from "@/types";

export const members: Member[] = [
  { id: "m1", name: "Astha Shrivastava", role: "Product Lead", initials: "AS", email: "astha@goodday.app", online: true, color: "bg-primary" },
  { id: "m2", name: "Alex Wu", role: "UX Designer", initials: "AW", email: "alex@goodday.app", online: true, color: "bg-pink-500" },
  { id: "m3", name: "Jordan Lee", role: "Frontend Engineer", initials: "JL", email: "jordan@goodday.app", online: false, color: "bg-amber-500" },
  { id: "m4", name: "Nina Shah", role: "Growth Analyst", initials: "NS", email: "nina@goodday.app", online: true, color: "bg-emerald-500" },
  { id: "m5", name: "Chris Kim", role: "QA Engineer", initials: "CK", email: "chris@goodday.app", online: false, color: "bg-cyan-500" },
];

export const projects: Project[] = [
  { id: "p1", name: "Mobile App Redesign", category: "Design", progress: 76, status: "On track", dueDate: "2026-06-08", memberIds: ["m1", "m2", "m3"], tasks: 24 },
  { id: "p2", name: "Growth Dashboard", category: "Analytics", progress: 43, status: "At risk", dueDate: "2026-05-28", memberIds: ["m1", "m4"], tasks: 18 },
  { id: "p3", name: "Automation Workflows", category: "Engineering", progress: 62, status: "On track", dueDate: "2026-06-16", memberIds: ["m3", "m5"], tasks: 31 },
  { id: "p4", name: "Brand Refresh", category: "Marketing", progress: 100, status: "Completed", dueDate: "2026-05-19", memberIds: ["m2", "m4"], tasks: 12 },
  { id: "p5", name: "Client Portal", category: "Product", progress: 18, status: "Planning", dueDate: "2026-07-03", memberIds: ["m1", "m3"], tasks: 42 },
  { id: "p6", name: "Q3 Launch Campaign", category: "Marketing", progress: 34, status: "On track", dueDate: "2026-06-30", memberIds: ["m2", "m4"], tasks: 16 },
];

export const taskColumns: TaskColumn[] = ["Backlog", "To Do", "In Progress", "Review", "Completed"];

export const tasks: Task[] = [
  { id: "t1", title: "Define onboarding user flow", project: "Mobile App Redesign", column: "Backlog", priority: "Medium", tags: ["UX", "Research"], dueDate: "2026-06-02", assigneeId: "m2", description: "Outline new user activation screens and first-run guidance." },
  { id: "t2", title: "Create API performance report", project: "Growth Dashboard", column: "To Do", priority: "High", tags: ["Data"], dueDate: "2026-05-26", assigneeId: "m4", description: "Gather query timing data and propose dashboard performance metrics." },
  { id: "t3", title: "Implement billing settings UI", project: "Client Portal", column: "In Progress", priority: "Urgent", tags: ["Frontend", "Billing"], dueDate: "2026-05-25", assigneeId: "m3", description: "Build subscription and payment method management panels." },
  { id: "t4", title: "Review automation trigger rules", project: "Automation Workflows", column: "Review", priority: "Medium", tags: ["QA"], dueDate: "2026-05-24", assigneeId: "m5", description: "Validate triggers, edge cases, and retry messaging." },
  { id: "t5", title: "Publish updated brand kit", project: "Brand Refresh", column: "Completed", priority: "Low", tags: ["Design"], dueDate: "2026-05-19", assigneeId: "m2", description: "Deliver finalized logos, type scales, and marketing templates." },
  { id: "t6", title: "Interview customer success team", project: "Client Portal", column: "Backlog", priority: "Low", tags: ["Research"], dueDate: "2026-06-10", assigneeId: "m1", description: "Identify frequent client portal support issues." },
  { id: "t7", title: "Finalize mobile navigation", project: "Mobile App Redesign", column: "In Progress", priority: "High", tags: ["Design"], dueDate: "2026-05-29", assigneeId: "m2", description: "Prepare navigational component specs for engineering." },
  { id: "t8", title: "QA campaign conversion events", project: "Q3 Launch Campaign", column: "To Do", priority: "Medium", tags: ["Growth"], dueDate: "2026-06-12", assigneeId: "m5", description: "Confirm analytics events on campaign landing paths." },
];

export const workspaces: Workspace[] = [
  { id: "w1", name: "GoodDay Product", plan: "Business", projects: 14, members: 18, completion: 78 },
  { id: "w2", name: "Marketing Studio", plan: "Pro", projects: 7, members: 9, completion: 56 },
  { id: "w3", name: "Design Systems", plan: "Pro", projects: 5, members: 6, completion: 91 },
];

export const activities: Activity[] = [
  { id: "a1", author: "Alex Wu", action: "uploaded new prototypes to", target: "Mobile App Redesign", time: "12 min ago" },
  { id: "a2", author: "Nina Shah", action: "completed analysis for", target: "Growth Dashboard", time: "45 min ago" },
  { id: "a3", author: "Jordan Lee", action: "moved a task to Review in", target: "Automation Workflows", time: "2 hours ago" },
  { id: "a4", author: "Astha Shrivastava", action: "created a new roadmap for", target: "Client Portal", time: "Yesterday" },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Task approaching due date", detail: "Billing settings UI is due tomorrow.", time: "5m", unread: true },
  { id: "n2", title: "New team invitation", detail: "Priya requested access to Product.", time: "1h", unread: true },
  { id: "n3", title: "Weekly summary ready", detail: "Your team's productivity rose 12%.", time: "4h", unread: false },
];

export const productivity = [
  { name: "Mon", completed: 18, planned: 22 },
  { name: "Tue", completed: 24, planned: 24 },
  { name: "Wed", completed: 21, planned: 25 },
  { name: "Thu", completed: 30, planned: 28 },
  { name: "Fri", completed: 27, planned: 30 },
  { name: "Sat", completed: 14, planned: 16 },
  { name: "Sun", completed: 19, planned: 18 },
];

export const projectDistribution = [
  { name: "Completed", value: 38, fill: "#22C55E" },
  { name: "Active", value: 42, fill: "#5B5FEF" },
  { name: "At risk", value: 12, fill: "#F59E0B" },
  { name: "Planning", value: 8, fill: "#CBD5E1" },
];

export const monthlyOutput = [
  { name: "Jan", tasks: 86, efficiency: 72 },
  { name: "Feb", tasks: 98, efficiency: 77 },
  { name: "Mar", tasks: 112, efficiency: 80 },
  { name: "Apr", tasks: 105, efficiency: 79 },
  { name: "May", tasks: 128, efficiency: 86 },
];
