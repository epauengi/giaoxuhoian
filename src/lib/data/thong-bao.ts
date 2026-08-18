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
      "Chúa nhật 23.08.2026, lễ 17:00 dời sang 18:00 do trùng giờ rước kiệu Đức Mẹ. Xin cộng đoàn lưu ý.",
    ngayDang: "2026-08-15",
    ngayHetHan: "2026-08-24",
    uuTien: "khan",
  },
  {
    id: "tb-002",
    tieuDe: "Khai giảng năm học giáo lý 2026–2027",
    noiDung:
      "Đăng ký giáo lý thiếu nhi từ 18.08 đến 31.08 tại văn phòng giáo xứ. Khai giảng Chúa nhật 06.09.2026.",
    ngayDang: "2026-08-14",
    ngayHetHan: "2026-09-06",
    uuTien: "thuong",
  },
  {
    id: "tb-003",
    tieuDe: "Rửa tội trẻ em tháng 9",
    noiDung:
      "Phụ huynh có con lãnh nhận Bí tích Rửa tội ngày 13.09.2026 vui lòng nộp hồ sơ trước 30.08.",
    ngayDang: "2026-08-10",
    ngayHetHan: "2026-08-31",
    uuTien: "thuong",
  },
];

/** Chỉ trả thông báo còn hiệu lực */
export function thongBaoHieuLuc(homNay: Date): ThongBao[] {
  return THONG_BAO.filter((tb) => new Date(tb.ngayHetHan) >= homNay);
}
