import { Plus, Trash2, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import RoleDropdown from "@/components/RoleDropdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser, type AssignedMember, type OnboardingProject } from "@/context/UserContext";

type MemberDraft = Omit<AssignedMember, "id">;

const emptyMember: MemberDraft = { name: "", email: "", role: "" };

export default function SetupTeamPage() {
  const navigate = useNavigate();
  const { user, completeSetup } = useUser();
  const [project, setProject] = useState<OnboardingProject>({
    name: "",
    category: "",
    dueDate: "",
    description: "",
  });
  const [members, setMembers] = useState<MemberDraft[]>([{ ...emptyMember }]);

  if (!user) return <Navigate to="/signup" replace />;

  function updateProject(field: keyof OnboardingProject, value: string) {
    setProject((current) => ({ ...current, [field]: value }));
  }

  function updateMember(index: number, field: keyof MemberDraft, value: string) {
    setMembers((current) => current.map((member, position) => (
      position === index ? { ...member, [field]: value } : member
    )));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const assignedMembers = members.map((member, index) => ({ ...member, id: `assigned-${index + 1}` }));
    completeSetup(project, assignedMembers);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-canvas p-4 dark:bg-night sm:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">G</span>
          <div>
            <p className="text-xl font-bold dark:text-white">GoodDay</p>
            <p className="muted text-sm">Welcome, {user.name}. Set up your first project.</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-6">
          <Card>
            <h1 className="text-2xl font-bold dark:text-white">Project details</h1>
            <p className="muted mt-1 text-sm">Create the project your team will start with.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Input value={project.name} onChange={(event) => updateProject("name", event.target.value)} placeholder="Project name" required />
              <Input value={project.category} onChange={(event) => updateProject("category", event.target.value)} placeholder="Project category" required />
              <Input type="date" value={project.dueDate} onChange={(event) => updateProject("dueDate", event.target.value)} required />
              <Input value={project.description} onChange={(event) => updateProject("description", event.target.value)} placeholder="Short project goal" required />
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold dark:text-white">
                  <Users className="size-5 text-primary" />Assign members
                </h2>
                <p className="muted mt-1 text-sm">Every member must be assigned a role.</p>
              </div>
              <Button type="button" variant="outline" onClick={() => setMembers((current) => [...current, { ...emptyMember }])}>
                <Plus className="size-4" />Add member
              </Button>
            </div>
            <div className="mt-6 space-y-4">
              {members.map((member, index) => (
                <div key={`member-${index}`} className="grid gap-3 rounded-xl border border-slate-100 p-4 dark:border-slate-800 sm:grid-cols-[1fr_1fr_1fr_auto]">
                  <Input value={member.name} onChange={(event) => updateMember(index, "name", event.target.value)} placeholder="Member name" required />
                  <Input type="email" value={member.email} onChange={(event) => updateMember(index, "email", event.target.value)} placeholder="Member email" required />
                  <RoleDropdown selectedRole={member.role} onChange={(role) => updateMember(index, "role", role)} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={members.length === 1}
                    onClick={() => setMembers((current) => current.filter((_, position) => position !== index))}
                    aria-label="Remove member"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex justify-end">
            <Button type="submit" size="lg">Create project and open dashboard</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
