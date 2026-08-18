import { cn } from "@/lib/utils";

/** Editorial section header: mono kicker label + serif title + heavy rule */
export function SectionHeader({
  label,
  title,
  className,
  invert = false,
}: {
  label: string;
  title: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <header className={cn("mb-8", className)}>
      <p
        className={cn(
          "mb-2 font-mono text-xs uppercase tracking-widest",
          invert ? "text-neutral-400" : "text-neutral-500"
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "font-serif text-4xl font-black tracking-tight lg:text-5xl",
          invert ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      <div className={cn("mt-4 h-1 w-24", invert ? "bg-paper" : "bg-ink")} />
    </header>
  );
}
