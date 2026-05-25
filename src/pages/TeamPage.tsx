import { MessageSquare, Plus, Send, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import RoleDropdown from "@/components/RoleDropdown";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser, type AssignedMember } from "@/context/UserContext";

const colors = ["bg-primary", "bg-pink-500", "bg-emerald-500", "bg-amber-500", "bg-cyan-500"];

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
}

export function TeamPage() {
  const { assignedMembers, project, addAssignedMember } = useUser();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [invite, setInvite] = useState({ name: "", email: "", role: "" });
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function submitInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addAssignedMember(invite);
    setInvite({ name: "", email: "", role: "" });
    setInviteOpen(false);
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setMessages((current) => [
      ...current,
      { id: `message-${Date.now()}`, author: "You", text: message.trim(), time: "Now" },
    ]);
    setMessage("");
  }

  return (
    <>
      <PageHeader
        title="Team collaboration"
        description={project ? `Assigned team for ${project.name}.` : "Members assigned to your project will appear here."}
        action={<Button onClick={() => setInviteOpen(true)}><Plus className="size-4" />Enroll member</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled members</CardTitle>
            <span className="muted text-sm">{assignedMembers.length} people</span>
          </CardHeader>
          {assignedMembers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-700">
              <UserPlus className="mx-auto size-8 text-slate-300" />
              <p className="mt-3 text-sm font-medium dark:text-white">No members enrolled</p>
              <p className="muted mt-1 text-sm">Enroll a member to assign a project role.</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {assignedMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} color={colors[index % colors.length]} />
              ))}
            </div>
          )}
        </Card>
        <Card>
          <CardHeader><CardTitle>Assignment activity</CardTitle></CardHeader>
          {assignedMembers.length === 0 ? (
            <p className="muted text-sm">No assignments recorded yet.</p>
          ) : (
            <div className="space-y-5">
              {assignedMembers.map((member, index) => (
                <div key={member.id} className="flex gap-3">
                  <Avatar initials={initials(member.name)} color={colors[index % colors.length]} className="size-9" />
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">{member.name}</strong> was enrolled as <strong>{member.role}</strong>
                    <span className="muted mt-1 block text-xs">Project assignment</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <CardTitle>Team chat</CardTitle>
          </div>
          <span className="text-sm text-success">{assignedMembers.length} enrolled</span>
        </CardHeader>
        {messages.length === 0 ? (
          <p className="muted mb-5 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/70">
            Start a conversation with your enrolled project team.
          </p>
        ) : (
          <div className="mb-5 space-y-4">
            {messages.map((chat) => (
              <div key={chat.id} className="flex items-start gap-3">
                <Avatar initials={initials(chat.author)} />
                <div className="max-w-2xl rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                  <div className="mb-1 flex gap-3 text-xs"><strong className="dark:text-white">{chat.author}</strong><span className="muted">{chat.time}</span></div>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{chat.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <form className="flex gap-2" onSubmit={sendMessage}>
          <Input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message..." />
          <Button size="icon" type="submit" aria-label="Send"><Send className="size-4" /></Button>
        </form>
      </Card>
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen} title="Enroll teammate">
        <form className="space-y-4" onSubmit={submitInvitation}>
          <Input value={invite.name} onChange={(event) => setInvite((current) => ({ ...current, name: event.target.value }))} placeholder="Full name" required />
          <Input value={invite.email} onChange={(event) => setInvite((current) => ({ ...current, email: event.target.value }))} type="email" placeholder="Email address" required />
          <RoleDropdown selectedRole={invite.role} onChange={(role) => setInvite((current) => ({ ...current, role }))} />
          <Button className="w-full" type="submit">Enroll member</Button>
        </form>
      </Dialog>
    </>
  );
}

function MemberCard({ member, color }: { member: AssignedMember; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 dark:border-slate-800">
      <Avatar initials={initials(member.name)} color={color} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold dark:text-white">{member.name}</p>
        <p className="muted truncate text-xs">{member.role}</p>
        <p className="muted truncate text-xs">{member.email}</p>
      </div>
      <span className="ml-auto size-2.5 rounded-full bg-success" />
    </div>
  );
}
