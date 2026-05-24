import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyOutput, projectDistribution } from "@/data/mockData";

export function DistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={projectDistribution} dataKey="value" innerRadius={68} outerRadius={91} paddingAngle={4}>
          {projectDistribution.map((item) => <Cell key={item.name} fill={item.fill} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function OutputChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={monthlyOutput}>
        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" opacity={0.7} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94A3B8" fontSize={12} />
        <YAxis axisLine={false} tickLine={false} stroke="#94A3B8" fontSize={12} />
        <Tooltip cursor={{ fill: "#F1F5F9" }} />
        <Bar dataKey="tasks" fill="#5B5FEF" radius={[7, 7, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EfficiencyChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={monthlyOutput}>
        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" opacity={0.7} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94A3B8" fontSize={12} />
        <YAxis domain={[60, 100]} axisLine={false} tickLine={false} stroke="#94A3B8" fontSize={12} />
        <Tooltip />
        <Line type="monotone" dataKey="efficiency" stroke="#22C55E" strokeWidth={3} dot={{ fill: "#22C55E", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}