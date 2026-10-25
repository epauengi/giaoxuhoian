import { CinematicFooter } from "@/components/ui/motion-footer";
import { GIAO_XU } from "@/lib/data/giao-xu";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/content";

export function Footer({ locale = "vi" }: { locale?: Locale } = {}) {
  const d = getDictionary(locale);

  return (
    <CinematicFooter
      locale={locale}
      eyebrow={d.masthead.official}
      title={d.masthead.parish}
      description={d.footer.description}
      contact={{ address: translate(locale, GIAO_XU.diaChi), email: GIAO_XU.email }}
      columns={[
        { title: d.footer.parish, links: [["/giao-xu", d.footer.overview], ["/giao-xu/lich-su", d.footer.history], ["/cong-doan", d.footer.organizations]] },
        { title: d.footer.ministry, links: [["/phung-vu", d.footer.mass], ["/bi-tich", d.footer.sacraments], ["/loi-chua", d.footer.word]] },
        { title: d.footer.information, links: [["/tin-tuc", d.footer.news], ["/thu-vien", d.footer.library], ["/dong-hanh", d.footer.support]] },
      ]}
      emergency={{ title: d.footer.emergency, links: [["/lien-he?khan-cap=xuc-dau", d.footer.anointing], ["/lien-he?khan-cap=tang-le", d.footer.funeral]] }}
      copyright={`2026 · ${d.masthead.parish}`}
      diocese={d.masthead.diocese}
    />
  );
}
