import { Plus, Settings2, Users } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { members, workspaces } from "@/data/mockData";

export function WorkspacesPage() {
  const [creating, setCreating] = useState(false);

  return (
    <>
      <PageHeader
        title="Workspaces"
        description="Manage shared spaces for your departments and initiatives."
        action={<Button onClick={() => setCreating(true)}><Plus className="size-4" />Create workspace</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {workspaces.map((workspace) => (
          <Card key={workspace.id} className="group transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                {workspace.name[0]}
              </div>
              <Button variant="ghost" size="icon" className="size-9"><Settings2 className="size-4" /></Button>
            </div>
            <h2 className="mt-5 text-lg font-semibold dark:text-white">{workspace.name}</h2>
            <p className="muted mt-1 text-sm">{workspace.plan} plan · {workspace.projects} projects</p>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="muted">Completion</span>
              <span className="font-semibold dark:text-white">{workspace.completion}%</span>
            </div>
            <Progress className="mt-2" value={workspace.completion} />
            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member) => (
                  <Avatar key={member.id} initials={member.initials} color={member.color} className="size-8 ring-2 ring-white dark:ring-slate-900" />
                ))}
              </div>
              <span className="muted flex items-center gap-1 text-sm"><Users className="size-4" />{workspace.members}</span>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <h2 className="text-lg font-semibold dark:text-white">Workspace members</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800">
              <Avatar initials={member.initials} color={member.color} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold dark:text-white">{member.name}</p>
                <p className="muted truncate text-xs">{member.role}</p>
              </div>
              <span className={`ml-auto size-2 rounded-full ${member.online ? "bg-success" : "bg-slate-300"}`} />
            </div>
          ))}
        </div>
      </Card>
      <Dialog open={creating} onOpenChange={setCreating} title="Create workspace">
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setCreating(false); }}>
          <Input placeholder="Workspace name" required />
          <Input placeholder="Description (optional)" />
          <Button className="w-full" type="submit">Create workspace</Button>
        </form>
      </Dialog>
    </>
  );
}
