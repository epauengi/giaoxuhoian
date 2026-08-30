import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

type FooterLink = readonly [href: string, label: string];

type FooterColumn = {
  title: string;
  links: ReadonlyArray<FooterLink>;
};

type CinematicFooterProps = {
  eyebrow: string;
  title: string;
  description: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  columns: ReadonlyArray<FooterColumn>;
  emergency: FooterColumn;
  copyright: string;
  diocese: string;
};

/** Editorial closing section for the parish public website. */
export function CinematicFooter({
  eyebrow,
  title,
  description,
  contact,
  columns,
  emergency,
  copyright,
  diocese,
}: CinematicFooterProps) {
  const contactItems = [
    { href: "/lien-he", label: contact.address, icon: MapPin },
    { href: `tel:${contact.phone.replace(/\s/g, "")}`, label: `${contact.phone} (Văn phòng)`, icon: Phone },
    { href: `mailto:${contact.email}`, label: contact.email, icon: Mail },
  ];
  const sections = [...columns, emergency];

  return (
    <footer aria-label={`Thông tin ${title}`} className="relative overflow-x-hidden border-t-4 border-ink bg-ink text-paper">
      <div aria-hidden className="border-b border-neutral-700 px-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="footer-ledger-rule h-1 w-full bg-accent" />
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
        <section className="border-b border-neutral-700 px-4 py-10 sm:px-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-8 lg:py-12">
          <div aria-hidden className="relative mb-5 h-12 w-12 border border-paper">
            <span className="absolute left-1/2 top-2 h-8 w-0.5 -translate-x-1/2 bg-accent" />
            <span className="absolute left-3 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-accent" />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-400">{eyebrow}</p>
          <p className="mt-2 font-serif text-4xl font-black leading-none tracking-tight sm:text-5xl">{title}</p>
          <p className="mt-5 max-w-sm font-body text-base leading-relaxed text-neutral-400">{description}</p>

          <address className="mt-7 not-italic">
            <ul className="space-y-2">
              {contactItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  {href.startsWith("/") ? (
                    <Link href={href} className="group flex min-h-11 items-center gap-3 font-sans text-sm leading-snug text-paper underline-offset-4 hover:underline hover:decoration-accent hover:decoration-2">
                      <Icon aria-hidden className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                      <span>{label}</span>
                    </Link>
                  ) : (
                    <a href={href} className="group flex min-h-11 items-center gap-3 font-sans text-sm leading-snug text-paper underline-offset-4 hover:underline hover:decoration-accent hover:decoration-2">
                      <Icon aria-hidden className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                      <span className="break-all">{label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </address>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:col-span-8">
          {sections.map((section, index) => (
            <nav
              key={section.title}
              aria-labelledby={`footer-section-${index}`}
              className={`border-b border-r border-neutral-700 p-5 last:border-r-0 sm:p-6 lg:border-b-0 lg:last:border-r-0 ${index === sections.length - 1 ? "order-first col-span-2 border-t-2 border-t-accent sm:order-last sm:col-span-1 sm:border-t-0" : ""}`}
            >
              <p id={`footer-section-${index}`} className="min-h-10 border-b border-neutral-700 pb-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                {section.title}
              </p>
              <ul className="mt-3 space-y-1">
                {section.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="flex min-h-11 w-full items-center font-sans text-sm font-medium text-paper underline-offset-4 hover:underline hover:decoration-accent hover:decoration-2">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-700 px-4 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400">© {copyright}</p>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400">{diocese}</p>
          <a href="#main-content" className="inline-flex min-h-11 items-center gap-2 self-start font-sans text-xs font-semibold uppercase tracking-widest text-paper underline-offset-4 hover:underline hover:decoration-accent hover:decoration-2 sm:self-auto">
            Về nội dung chính <ArrowUp aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
