import Image from "next/image";
import { cn } from "@/lib/utils";

export function EditorialPlate({
  title,
  label,
  marker,
  caption,
  logo = false,
  invert = false,
  className,
}: {
  title: string;
  label?: string;
  marker?: string;
  caption?: string;
  logo?: boolean;
  invert?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden border border-ink", invert ? "bg-ink text-paper" : "bg-muted text-ink", className)}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-2 bg-accent" />
      <div className="flex h-full min-h-48 flex-col justify-between gap-8 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          {label ? <p className="font-mono text-xs uppercase tracking-widest opacity-70">{label}</p> : <span />}
          {logo ? <Image src="/logo.png" alt="" width={72} height={72} className="h-14 w-14 object-contain sm:h-16 sm:w-16" /> : null}
        </div>
        <div className="flex items-end justify-between gap-5">
          <p className="max-w-[15ch] font-serif text-3xl font-black leading-[0.95] tracking-tight sm:text-4xl">{title}</p>
          {marker ? <p className="shrink-0 font-mono text-3xl font-medium text-accent sm:text-5xl">{marker}</p> : null}
        </div>
      </div>
      {caption ? <figcaption className={cn("border-t px-5 py-2 font-mono text-xs uppercase tracking-widest", invert ? "border-neutral-700 text-neutral-400" : "border-ink text-neutral-600")}>{caption}</figcaption> : null}
    </figure>
  );
}
