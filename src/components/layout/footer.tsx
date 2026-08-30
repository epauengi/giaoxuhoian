import { CinematicFooter } from "@/components/ui/motion-footer";
import { GIAO_XU } from "@/lib/data/giao-xu";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Footer() {
  const d = getDictionary();

  return (
    <CinematicFooter
      eyebrow={d.masthead.official}
      title={d.masthead.parish}
      description={d.footer.description}
      contact={{ address: GIAO_XU.diaChi, phone: GIAO_XU.dienThoai, email: GIAO_XU.email }}
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
