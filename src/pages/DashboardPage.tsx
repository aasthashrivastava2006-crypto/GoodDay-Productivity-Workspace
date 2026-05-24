import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarDays, CheckCircle2, Clock3, FolderKanban, TrendingUp } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { ProductivityChart } from "@/components/charts/ProductivityChart";
import { activities, members, notifications, projects } from "@/data/mockData";
import { useDelayedLoad } from "@/hooks/useDelayedLoad";
import { formatDate } from "@/lib/utils";

const summary = [
  { name: "Tasks completed", value: "126", change: "+12%", icon: CheckCircle2, color: "text-green-600 bg-green-50 dark:bg-green-500/10" },
  { name: "Active projects", value: "14", change: "+2", icon: FolderKanban, color: "text-primary bg-primary/10" },
  { name: "Hours tracked", value: "92.5", change: "+8%", icon: Clock3, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
  { name: "Productivity", value: "86%", change: "+5%", icon: TrendingUp, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10" },
];

export function DashboardPage() {
  const loading = useDelayedLoad();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2026, 4, 17),
    to: new Date(2026, 4, 23),
  });

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">Good morning, Astha</h1>
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
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <div className="flex justify-center border-b border-slate-100 pb-2 dark:border-slate-800">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </div>
          <div className="mx-4 mt-4 mb-4 rounded-xl bg-primary/5 p-3 text-sm dark:bg-primary/10">
            <p className="font-medium text-primary"><CalendarDays className="mr-2 inline size-4" />Design sync · 2:00 PM</p>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr_0.95fr]">
        <Card>
          <CardHeader><CardTitle>Active projects</CardTitle><button className="text-sm font-medium text-primary">View all</button></CardHeader>
          <div className="space-y-5">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium dark:text-white">{project.name}</span>
                  <span className="muted">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <div className="space-y-4">
            {activities.slice(0, 3).map((activity, index) => (
              <div key={activity.id} className="flex gap-3">
                <Avatar initials={members[index].initials} color={members[index].color} className="size-9" />
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
          <p className="muted mt-4 text-xs">Next project deadline: {formatDate(projects[1].dueDate)}</p>
        </Card>
      </div>
    </>
  );
}
