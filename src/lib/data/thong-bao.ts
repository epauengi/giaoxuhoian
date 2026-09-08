/** DỮ LIỆU MẪU — cần giáo xứ xác nhận trước khi xuất bản (PRODUCT.md §19) */

interface ThongBao {
  id: string;
  tieuDe: string;
  noiDung: string;
  ngayDang: string; // ISO
  ngayHetHan: string; // ISO — sau ngày này không còn nổi bật
  uuTien: "khan" | "thuong";
}

export const THONG_BAO: ThongBao[] = [
  {
    id: "tb-001",
    tieuDe: "Thay đổi giờ lễ Chúa nhật tuần này",
    noiDung:
      "Chúa nhật 13.09.2026, lễ 17:00 dời sang 18:00 do trùng giờ rước kiệu Đức Mẹ. Xin cộng đoàn lưu ý.",
    ngayDang: "2026-09-01",
    ngayHetHan: "2026-09-14",
    uuTien: "khan",
  },
  {
    id: "tb-002",
    tieuDe: "Khai giảng năm học giáo lý 2026–2027",
    noiDung:
      "Đăng ký giáo lý thiếu nhi tại văn phòng giáo xứ. Khai giảng Chúa nhật 20.09.2026.",
    ngayDang: "2026-09-01",
    ngayHetHan: "2026-09-30",
    uuTien: "thuong",
  },
  {
    id: "tb-003",
    tieuDe: "Rửa tội trẻ em tháng 9",
    noiDung:
      "Phụ huynh có con lãnh nhận Bí tích Rửa tội ngày 27.09.2026 vui lòng nộp hồ sơ trước 20.09.",
    ngayDang: "2026-09-01",
    ngayHetHan: "2026-09-28",
    uuTien: "thuong",
  },
];

/** Chỉ trả thông báo còn hiệu lực, fallback về thông báo gần nhất nếu hết hạn */
export function thongBaoHieuLuc(homNay: Date = new Date()): ThongBao[] {
  const active = THONG_BAO.filter((tb) => new Date(tb.ngayHetHan) >= homNay);
  return active.length > 0 ? active : THONG_BAO;
}
