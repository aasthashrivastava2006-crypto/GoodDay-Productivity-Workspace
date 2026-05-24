import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-200",
      success: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300",
      warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
      muted: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
      danger: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    },
  },
  defaultVariants: { variant: "default" },
});

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
