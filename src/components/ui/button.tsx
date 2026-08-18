import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-[44px] items-center justify-center gap-2 px-6 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-paper border border-transparent hover:bg-paper hover:text-ink hover:border-ink",
        secondary: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        link: "px-0 text-ink underline-offset-4 decoration-2 decoration-accent hover:underline",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export function Button({
  className,
  variant,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <a className={cn(buttonVariants({ variant }), className)} {...props} />;
}
