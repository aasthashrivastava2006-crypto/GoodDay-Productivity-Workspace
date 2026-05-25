// src/services/teamService.ts
// Service layer for role management, task assignment, and team profile retrieval.
// Adjust endpoint URLs as needed to match your backend routes.

export interface Role {
  id: string;
  name: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  progress: number; // 0-100 percentage representing task completion
}

/** Fetch the list of roles from the backend */
export async function getRoles(): Promise<Role[]> {
  const resp = await fetch('/api/roles');
  if (!resp.ok) throw new Error('Failed to fetch roles');
  return resp.json();
}

/** Assign tasks to a member based on the selected role */
export async function assignTasksToMember(memberId: string, roleId: string): Promise<void> {
  const resp = await fetch('/api/assign-tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberId, roleId }),
  });
  if (!resp.ok) throw new Error('Failed to assign tasks');
}

/** Retrieve the current user's team profile, including members and their progress */
export async function getTeamProfile(): Promise<TeamMember[]> {
  const resp = await fetch('/api/team/profile');
  if (!resp.ok) throw new Error('Failed to fetch team profile');
  return resp.json();
}
