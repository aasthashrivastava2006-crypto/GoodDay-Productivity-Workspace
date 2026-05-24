import { CalendarDays, Filter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { members, projects } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

const filters: Array<"All" | ProjectStatus> = ["All", "On track", "At risk", "Planning", "Completed"];

function statusVariant(status: ProjectStatus) {
  if (status === "Completed") return "success";
  if (status === "At risk") return "warning";
  if (status === "Planning") return "muted";
  return "default";
}

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]>("All");
  const visibleProjects = useMemo(
    () => projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase()) && (status === "All" || project.status === status)),
    [query, status],
  );

  return (
    <>
      <PageHeader
        title="Projects"
        description="Track timelines, ownership, and delivery confidence."
        action={<Button><Plus className="size-4" />New project</Button>}
      />
      <div className="mb-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="mr-1 size-4 shrink-0 text-slate-400" />
          {filters.map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={status === filter ? "secondary" : "outline"}
              onClick={() => setStatus(filter)}
              className="shrink-0"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
      {visibleProjects.length === 0 ? (
        <Card className="py-16 text-center">
          <p className="font-medium dark:text-white">No projects found</p>
          <p className="muted mt-2 text-sm">Try another search or reset your filter.</p>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <Card key={project.id} className="transition-transform hover:-translate-y-1">
              <div className="flex justify-between gap-3">
                <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
                <span className="muted text-xs">{project.category}</span>
              </div>
              <h2 className="mt-5 text-lg font-semibold dark:text-white">{project.name}</h2>
              <p className="muted mt-1 flex items-center gap-1 text-sm">
                <CalendarDays className="size-4" />Due {formatDate(project.dueDate)}
              </p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="muted">{project.tasks} tasks</span>
                <span className="font-semibold">{project.progress}%</span>
              </div>
              <Progress className="mt-2" value={project.progress} />
              <div className="mt-5 flex -space-x-2">
                {project.memberIds.map((memberId) => {
                  const member = members.find((item) => item.id === memberId)!;
                  return <Avatar key={member.id} initials={member.initials} color={member.color} className="size-8 ring-2 ring-white dark:ring-slate-900" />;
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
