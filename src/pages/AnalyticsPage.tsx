import { ArrowUpRight, CircleCheck, Clock3, Target } from "lucide-react";
import { DistributionChart, EfficiencyChart, OutputChart } from "@/components/charts/AnalyticsCharts";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { projectDistribution } from "@/data/mockData";

const metrics = [
  { label: "Completed tasks", value: "128", delta: "+14%", icon: CircleCheck },
  { label: "Average cycle time", value: "3.2d", delta: "-0.4d", icon: Clock3 },
  { label: "Delivery rate", value: "91%", delta: "+5%", icon: Target },
];

export function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Measure project delivery and your team's productivity health." />
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map(({ label, value, delta, icon: Icon }) => (
          <Card key={label} className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary"><Icon className="size-5" /></div>
            <div>
              <p className="muted text-xs">{label}</p>
              <p className="mt-1 text-2xl font-bold dark:text-white">{value}</p>
            </div>
            <span className="ml-auto flex items-center text-xs font-medium text-success"><ArrowUpRight className="size-3" />{delta}</span>
          </Card>
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader><CardTitle>Project progress</CardTitle></CardHeader>
          <DistributionChart />
          <div className="grid grid-cols-2 gap-3">
            {projectDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="muted">{item.name}</span>
                <span className="ml-auto font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Monthly task output</CardTitle></CardHeader>
          <OutputChart />
        </Card>
      </div>
      <Card className="mt-5">
        <CardHeader><CardTitle>Productivity efficiency</CardTitle></CardHeader>
        <EfficiencyChart />
      </Card>
    </>
  );
}
