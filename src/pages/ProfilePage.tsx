// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { Bell, Camera, Lock, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getTeamProfile, getRoles, Role, TeamMember } from "@/services/teamService";

export function ProfilePage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [teamData, roles] = await Promise.all([getTeamProfile(), getRoles()]);
        setTeam(teamData);
        const map: Record<string, string> = {};
        roles.forEach((r: Role) => {
          map[r.id] = r.name;
        });
        setRolesMap(map);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="Profile" description="Manage your personal details and account security." />
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <Card className="text-center">
          <div className="relative mx-auto w-fit">
            <Avatar initials="AS" className="size-24 text-2xl" />
            <button className="absolute -bottom-1 -right-1 rounded-full bg-primary p-2 text-white">
              <Camera className="size-4" />
            </button>
          </div>
          <h2 className="mt-5 text-xl font-bold dark:text-white">Astha Shrivastava</h2>
          <p className="muted mt-1 text-sm">Product Lead</p>
          <div className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-left text-sm dark:border-slate-800">
            <p className="flex items-center gap-3">
              <Mail className="size-4 text-slate-400" />
              astha@goodday.app
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="size-4 text-slate-400" />
              Bengaluru, India
            </p>
          </div>
        </Card>
        <div className="space-y-5">
          {/* Team Members Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <div className="p-4 space-y-4">
              {team.map((member) => (
                <div key={member.id} className="border-b pb-2 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium dark:text-white">{member.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{rolesMap[member.role] ?? member.role}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* Existing Edit Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Edit profile</CardTitle>
              <Button size="sm">Save changes</Button>
            </CardHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input defaultValue="Astha" aria-label="First name" />
              <Input defaultValue="Shrivastava" aria-label="Last name" />
              <Input defaultValue="astha@goodday.app" aria-label="Email" />
              <Input defaultValue="Product Lead" aria-label="Role" />
            </div>
          </Card>
          {/* Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            {[
              { icon: Bell, title: "Email notifications", detail: "Project updates and deadlines" },
              { icon: Lock, title: "Two-factor authentication", detail: "Secure your GoodDay account" },
            ].map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0 dark:border-slate-800"
              >
                <Icon className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium dark:text-white">{title}</p>
                  <p className="muted text-xs">{detail}</p>
                </div>
                <button className="ml-auto h-6 w-11 rounded-full bg-primary p-1">
                  <span className="block size-4 translate-x-5 rounded-full bg-white" />
                </button>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}
