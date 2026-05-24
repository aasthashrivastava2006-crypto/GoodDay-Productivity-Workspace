import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  color?: string;
  className?: string;
}

export function Avatar({ initials, color = "bg-primary", className }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn("relative inline-flex size-10 shrink-0 overflow-hidden rounded-full", className)}>
      <AvatarPrimitive.Fallback className={cn("flex size-full items-center justify-center text-xs font-semibold text-white", color)}>
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
