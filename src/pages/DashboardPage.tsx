import { CalendarDays, CheckCircle2, Clock3, FolderKanban, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import UserGreeting from "@/components/UserGreeting";
import { ProductivityChart } from "@/components/charts/ProductivityChart";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/UserContext";
import { activities, members as demoMembers, notifications, projects } from "@/data/mockData";
import { useDelayedLoad } from "@/hooks/useDelayedLoad";
import { formatDate } from "@/lib/utils";

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function DashboardPage() {
  const loading = useDelayedLoad();
  const { project, assignedMembers } = useUser();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2026, 4, 17),
    to: new Date(2026, 4, 23),
  });
  const summary = [
    { name: "Tasks completed", value: "126", change: "+12%", icon: CheckCircle2, color: "text-green-600 bg-green-50 dark:bg-green-500/10" },
    { name: "Active projects", value: project ? "1" : "14", change: project ? "New" : "+2", icon: FolderKanban, color: "text-primary bg-primary/10" },
    { name: "Team members", value: project ? String(assignedMembers.length) : "18", change: project ? "Assigned" : "+8%", icon: Users, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
    { name: "Productivity", value: "86%", change: "+5%", icon: TrendingUp, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10" },
  ];

  return (
    <>
      <div className="mb-7">
        <UserGreeting />
        <p className="muted mt-1 text-sm">Here is what is happening with your workspace today.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map(({ name, value, change, icon: Icon, color }) => (
          <Card key={name} className="transition-transform hover:-translate-y-0.5">
            {loading ? (
              <><Skeleton className="mb-6 size-12" /><Skeleton className="h-7 w-20" /><Skeleton className="mt-3 h-4 w-32" /></>
            ) : (
              <>
                <div className={`mb-6 flex size-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="size-6" />
                </div>
                <p className="text-2xl font-bold dark:text-white">{value}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="font-semibold text-success">{change}</span>
                  <span className="muted">{name}</span>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      {project && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <div>
                <Badge variant="success">Your project</Badge>
                <CardTitle className="mt-3 text-xl">{project.name}</CardTitle>
              </div>
              <Badge>{project.category}</Badge>
            </CardHeader>
            <p className="muted text-sm">{project.description}</p>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-primary/5 p-3 text-sm font-medium text-primary dark:bg-primary/10">
              <CalendarDays className="size-4" />Due {formatDate(project.dueDate)}
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Assigned members</CardTitle>
              <span className="muted text-sm">{assignedMembers.length} assigned</span>
            </CardHeader>
            <div className="grid gap-3 sm:grid-cols-2">
              {assignedMembers.map((member, index) => (
                <div key={member.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                  <Avatar initials={initials(member.name)} color={["bg-primary", "bg-pink-500", "bg-emerald-500", "bg-amber-500"][index % 4]} className="size-9" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold dark:text-white">{member.name}</p>
                    <p className="muted truncate text-xs">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Productivity overview</CardTitle>
              <p className="muted mt-1 text-sm">Tasks completed this week</p>
            </div>
            <Badge variant="success">+12.4%</Badge>
          </CardHeader>
          <ProductivityChart date={date} />
        </Card>
        <Card>
          <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
          <div className="flex justify-center border-b border-slate-100 pb-2 dark:border-slate-800">
            <Calendar mode="range" selected={date} onSelect={setDate} className="rounded-md" />
          </div>
          <div className="mx-4 mb-4 mt-4 rounded-xl bg-primary/5 p-3 text-sm dark:bg-primary/10">
            <p className="font-medium text-primary"><CalendarDays className="mr-2 inline size-4" />Design sync - 2:00 PM</p>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr_0.95fr]">
        <Card>
          <CardHeader><CardTitle>Active projects</CardTitle><button className="text-sm font-medium text-primary">View all</button></CardHeader>
          <div className="space-y-5">
            {project && (
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium dark:text-white">{project.name}</span>
                  <span className="text-primary">New</span>
                </div>
                <Progress value={5} />
              </div>
            )}
            {projects.slice(0, project ? 2 : 3).map((activeProject) => (
              <div key={activeProject.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium dark:text-white">{activeProject.name}</span>
                  <span className="muted">{activeProject.progress}%</span>
                </div>
                <Progress value={activeProject.progress} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <div className="space-y-4">
            {activities.slice(0, 3).map((activity, index) => (
              <div key={activity.id} className="flex gap-3">
                <Avatar initials={demoMembers[index].initials} color={demoMembers[index].color} className="size-9" />
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">{activity.author}</strong> {activity.action} <strong>{activity.target}</strong>
                  <span className="muted mt-1 block text-xs">{activity.time}</span>
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/65">
                <p className="text-sm font-medium dark:text-white">{notification.title}</p>
                <p className="muted mt-1 text-xs">{notification.detail}</p>
              </div>
            ))}
          </div>
          <p className="muted mt-4 text-xs">Next project deadline: {formatDate(project?.dueDate ?? projects[1].dueDate)}</p>
        </Card>
      </div>
    </>
  );
}
