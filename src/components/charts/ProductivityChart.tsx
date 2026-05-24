import { useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { format, differenceInDays, addDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProductivityChartProps {
  date?: DateRange;
}

export function ProductivityChart({ date }: ProductivityChartProps) {
  const chartData = useMemo(() => {
    if (!date?.from) return [];

    if (date.to && differenceInDays(date.to, date.from) > 0) {
      // Date range selected: generate data for each day in range
      const days = differenceInDays(date.to, date.from) + 1;
      return Array.from({ length: days }).map((_, i) => {
        const currentDate = addDays(date.from!, i);
        return {
          name: format(currentDate, days > 7 ? "MMM d" : "EEE"),
          completed: Math.floor(Math.random() * 20) + 10,
        };
      });
    } else {
      // Single day selected: generate data by hours
      return [
        { name: "9 AM", completed: Math.floor(Math.random() * 5) + 1 },
        { name: "11 AM", completed: Math.floor(Math.random() * 10) + 5 },
        { name: "1 PM", completed: Math.floor(Math.random() * 8) + 3 },
        { name: "3 PM", completed: Math.floor(Math.random() * 12) + 6 },
        { name: "5 PM", completed: Math.floor(Math.random() * 15) + 8 },
      ];
    }
  }, [date]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="completed" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5B5FEF" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#5B5FEF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" opacity={0.65} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#94A3B8" />
          <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#94A3B8" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", boxShadow: "0 12px 24px rgba(15,23,42,.08)", backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          />
          <Area type="monotone" dataKey="completed" stroke="#5B5FEF" strokeWidth={3} fill="url(#completed)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}