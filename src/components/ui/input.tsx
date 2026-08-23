import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full border-b-2 border-ink bg-transparent px-3 py-2 font-mono text-sm transition-colors duration-200 focus-visible:bg-neutral-100 disabled:bg-muted";

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-xs font-semibold uppercase tracking-widest text-neutral-600">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldClasses, "min-h-28", className)} {...props} />;
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(fieldClasses, className)} {...props} />;
}
