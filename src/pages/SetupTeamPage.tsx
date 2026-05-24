import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SetupTeamPage() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; role: string }>>([
    { name: "", role: "" },
  ]);

  const handleMemberChange = (index: number, field: "name" | "role", value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
  };

  const addMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "" }]);
  };

  const removeMember = (index: number) => {
    const newMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newMembers);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app you would send this data to the backend.
    console.log({ projectName, teamMembers });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Setup Your Team</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input
          name="projectName"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <div className="space-y-2">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex gap-2 items-end">
              <Input
                placeholder="Member name"
                value={member.name}
                onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                required
              />
              <Input
                placeholder="Role"
                value={member.role}
                onChange={(e) => handleMemberChange(idx, "role", e.target.value)}
                required
              />
              {teamMembers.length > 1 && (
                <Button type="button" variant="ghost" onClick={() => removeMember(idx)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addMember}>
          Add Member
        </Button>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}
