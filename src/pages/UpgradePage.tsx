import { CheckCircle2, Star, Zap, Building2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    description: "Perfect for individuals starting out.",
    price: "$0",
    interval: "/month",
    features: [
      "Up to 3 projects",
      "Basic task management",
      "Community support",
      "7-day activity history",
    ],
    buttonText: "Current Plan",
    icon: Zap,
    highlighted: false,
    color: "text-slate-500",
  },
  {
    name: "Pro",
    description: "Ideal for growing teams needing more power.",
    price: "$12",
    interval: "/month per user",
    features: [
      "Unlimited projects",
      "Advanced AI automation",
      "Priority email support",
      "Unlimited activity history",
      "Custom workflows",
    ],
    buttonText: "Upgrade to Pro",
    icon: Star,
    highlighted: true,
    color: "text-primary",
  },
  {
    name: "Business",
    description: "Advanced controls for enterprise organizations.",
    price: "$39",
    interval: "/month per user",
    features: [
      "Everything in Pro",
      "Dedicated success manager",
      "SAML SSO & Advanced Security",
      "Custom billing",
      "Admin roles & permissions",
    ],
    buttonText: "Contact Sales",
    icon: Building2,
    highlighted: false,
    color: "text-amber-500",
  },
];

export function UpgradePage() {
  return (
    <>
      <PageHeader 
        title="Upgrade your plan" 
        description="Choose the right plan for your team's needs. Scale seamlessly as you grow." 
      />
      <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative flex flex-col transition-all hover:-translate-y-1 ${
              plan.highlighted 
                ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary" 
                : "hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center">
              <div className={`mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/50 ${plan.color}`}>
                <plan.icon className="size-6" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <p className="muted mt-2 text-sm">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold dark:text-white">{plan.price}</span>
                <span className="muted text-sm">{plan.interval}</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${plan.highlighted ? "text-primary" : "text-slate-400"}`} />
                    <span className="dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.highlighted ? "default" : "outline"} 
                className="w-full"
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
