import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "outline",
  ...props
}: React.ComponentProps<"span"> & { variant?: "outline" | "solid" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-widest",
        variant === "outline" && "border-ink text-ink",
        variant === "solid" && "border-ink bg-ink text-paper",
        variant === "accent" && "border-accent bg-accent text-paper",
        className
      )}
      {...props}
    />
  );
}
