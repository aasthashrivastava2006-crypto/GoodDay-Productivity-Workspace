import { CreditCard, Palette, PlugZap, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";

export function SettingsPage() {
  const { darkMode, toggleTheme } = useAppStore();

  return (
    <>
      <PageHeader title="Settings" description="Configure your workspace, billing, appearance, and integrations." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle><Settings2 className="mr-2 inline size-5 text-primary" />Workspace settings</CardTitle></CardHeader>
          <div className="space-y-4">
            <Input defaultValue="GoodDay Product" aria-label="Workspace name" />
            <Input defaultValue="goodday-product" aria-label="Workspace slug" />
            <Button>Save workspace</Button>
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle><Palette className="mr-2 inline size-5 text-primary" />Appearance</CardTitle></CardHeader>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <div>
              <p className="text-sm font-medium dark:text-white">Dark mode</p>
              <p className="muted text-xs">Use a low-light interface theme</p>
            </div>
            <button onClick={toggleTheme} className={`h-7 w-12 rounded-full p-1 transition-colors ${darkMode ? "bg-primary" : "bg-slate-300"}`}>
              <span className={`block size-5 rounded-full bg-white transition-transform ${darkMode ? "translate-x-5" : ""}`} />
            </button>
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle><CreditCard className="mr-2 inline size-5 text-primary" />Billing</CardTitle><Badge variant="success">Business</Badge></CardHeader>
          <p className="muted text-sm">Your next billing cycle begins June 23, 2026.</p>
          <p className="mt-5 text-3xl font-bold dark:text-white">$24<span className="muted text-sm font-normal"> / user / month</span></p>
          <Button variant="outline" className="mt-5">Manage billing</Button>
        </Card>
        <Card>
          <CardHeader><CardTitle><PlugZap className="mr-2 inline size-5 text-primary" />Integrations</CardTitle></CardHeader>
          {["Slack", "Google Calendar", "GitHub"].map((service, index) => (
            <div key={service} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0 dark:border-slate-800">
              <span className="text-sm font-medium dark:text-white">{service}</span>
              <Button size="sm" variant={index < 2 ? "secondary" : "outline"}>{index < 2 ? "Connected" : "Connect"}</Button>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
