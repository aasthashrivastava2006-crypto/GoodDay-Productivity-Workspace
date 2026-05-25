interface Role {
  id: string;
  name: string;
}

export const availableRoles: Role[] = [
  { id: "project_owner", name: "Project Owner" },
  { id: "project_manager", name: "Project Manager" },
  { id: "product_manager", name: "Product Manager" },
  { id: "designer", name: "UX/UI Designer" },
  { id: "frontend_developer", name: "Frontend Developer" },
  { id: "backend_developer", name: "Backend Developer" },
  { id: "qa_engineer", name: "QA Engineer" },
  { id: "data_analyst", name: "Data Analyst" },
  { id: "marketing", name: "Marketing Manager" },
  { id: "support", name: "Support Engineer" },
];

interface RoleDropdownProps {
  selectedRole: string;
  onChange: (role: string) => void;
  id?: string;
}

export default function RoleDropdown({ selectedRole, onChange, id }: RoleDropdownProps) {
  return (
    <select
      id={id}
      value={selectedRole}
      onChange={(event) => onChange(event.target.value)}
      required
      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
    >
      <option value="">Select required role</option>
      {availableRoles.map((role) => (
        <option key={role.id} value={role.name}>{role.name}</option>
      ))}
    </select>
  );
}
