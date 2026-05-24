import { MessageSquare, Plus, Send } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { activities, members } from "@/data/mockData";

const messages = [
  { id: "c1", user: members[1], text: "Updated the mobile prototype with the new navigation.", time: "10:18 AM" },
  { id: "c2", user: members[0], text: "Looks great. Can we review it during today's sync?", time: "10:20 AM" },
  { id: "c3", user: members[2], text: "I'll prepare the implementation estimate before then.", time: "10:26 AM" },
];

export function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <PageHeader
        title="Team collaboration"
        description="Stay aligned across conversations, updates, and ownership."
        action={<Button onClick={() => setInviteOpen(true)}><Plus className="size-4" />Invite member</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.95fr]">
        <Card>
          <CardHeader><CardTitle>Team members</CardTitle><span className="muted text-sm">{members.length} people</span></CardHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <Avatar initials={member.initials} color={member.color} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold dark:text-white">{member.name}</p>
                  <p className="muted truncate text-xs">{member.role}</p>
                </div>
                <span className={`ml-auto size-2.5 rounded-full ${member.online ? "bg-success" : "bg-slate-300"}`} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Activity feed</CardTitle></CardHeader>
          <div className="space-y-5">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-3">
                <Avatar initials={members[index].initials} color={members[index].color} className="size-9" />
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong className="dark:text-white">{activity.author}</strong> {activity.action} <strong>{activity.target}</strong>
                  <span className="muted mt-1 block text-xs">{activity.time}</span>
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <CardTitle>Product team chat</CardTitle>
          </div>
          <span className="text-sm text-success">4 online</span>
        </CardHeader>
        <div className="space-y-4">
          {messages.map((chat) => (
            <div key={chat.id} className="flex items-start gap-3">
              <Avatar initials={chat.user.initials} color={chat.user.color} />
              <div className="max-w-2xl rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                <div className="mb-1 flex gap-3 text-xs"><strong className="dark:text-white">{chat.user.name}</strong><span className="muted">{chat.time}</span></div>
                <p className="text-sm text-slate-700 dark:text-slate-200">{chat.text}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="mt-6 flex gap-2" onSubmit={(event) => { event.preventDefault(); setMessage(""); }}>
          <Input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message..." />
          <Button size="icon" type="submit" aria-label="Send"><Send className="size-4" /></Button>
        </form>
      </Card>
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen} title="Invite teammate">
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setInviteOpen(false); }}>
          <Input type="email" placeholder="Email address" required />
          <Input placeholder="Role (e.g. Product Designer)" />
          <Button className="w-full" type="submit">Send invitation</Button>
        </form>
      </Dialog>
    </>
  );
}
