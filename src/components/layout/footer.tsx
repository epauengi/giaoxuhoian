import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { GIAO_XU } from "@/lib/data/giao-xu";

export function Footer() {
  const d = getDictionary();
  const cols = [
    { title: d.footer.parish, links: [["/giao-xu", d.footer.overview], ["/giao-xu/lich-su", d.footer.history], ["/cong-doan", d.footer.organizations]] },
    { title: d.footer.ministry, links: [["/phung-vu", d.footer.mass], ["/bi-tich", d.footer.sacraments], ["/loi-chua", d.footer.word]] },
    { title: d.footer.information, links: [["/tin-tuc", d.footer.news], ["/thu-vien", d.footer.library], ["/dong-hanh", d.footer.support]] },
  ] as const;
  const phoneHref = `tel:${GIAO_XU.dienThoai.replace(/\s/g, "")}`;
  return (
    <footer className="border-t-4 border-ink bg-ink pb-[calc(4rem+env(safe-area-inset-bottom))] text-paper lg:pb-0">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <p className="font-serif text-3xl font-black">{d.masthead.parish}</p>
          <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-neutral-400">{d.footer.description}</p>
          <address className="mt-4 not-italic">
            <ul className="space-y-3 font-mono text-xs text-neutral-400">
              <li><Link href="/lien-he" className="flex min-h-11 items-center gap-2 underline-offset-4 hover:text-paper hover:underline"><MapPin aria-hidden className="h-4 w-4 shrink-0" strokeWidth={1.5} /><span>{GIAO_XU.diaChi}</span></Link></li>
              <li><a href={phoneHref} className="flex min-h-11 items-center gap-2 underline-offset-4 hover:text-paper hover:underline"><Phone aria-hidden className="h-4 w-4 shrink-0" strokeWidth={1.5} /><span>{GIAO_XU.dienThoai} (Văn phòng)</span></a></li>
              <li><a href={`mailto:${GIAO_XU.email}`} className="flex min-h-11 items-center gap-2 break-all underline-offset-4 hover:text-paper hover:underline"><Mail aria-hidden className="h-4 w-4 shrink-0" strokeWidth={1.5} /><span>{GIAO_XU.email}</span></a></li>
            </ul>
          </address>
        </div>
        {cols.map((col) => <nav key={col.title} aria-label={col.title} className="md:col-span-2 lg:col-span-2"><p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">{col.title}</p><ul className="space-y-1">{col.links.map(([href, label]) => <li key={href}><Link href={href} className="inline-flex min-h-11 items-center font-sans text-sm text-paper underline-offset-4 decoration-2 decoration-accent hover:underline">{label}</Link></li>)}</ul></nav>)}
        <nav aria-label={d.footer.emergency} className="md:col-span-1 lg:col-span-2">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">{d.footer.emergency}</p>
          <ul className="space-y-1 font-sans text-sm"><li><Link href="/lien-he?khan-cap=xuc-dau" className="inline-flex min-h-11 items-center decoration-accent underline-offset-4 hover:underline">{d.footer.anointing}</Link></li><li><Link href="/lien-he?khan-cap=tang-le" className="inline-flex min-h-11 items-center decoration-accent underline-offset-4 hover:underline">{d.footer.funeral}</Link></li></ul>
        </nav>
      </div>
      <div className="border-t border-neutral-700"><div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-2 px-4 py-4 font-mono text-xs uppercase tracking-widest text-neutral-400 sm:flex-row"><span>© 2026 · {d.masthead.parish}</span></div></div>
    </footer>
  );
}
