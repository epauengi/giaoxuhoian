/** Giờ lễ Giáo xứ Hội An — 106 Nguyễn Trường Tộ, Hội An, Đà Nẵng, Việt Nam */

interface GioLe {
  ngay: string;
  gio: string[];
  ghiChu?: string;
}

export const GIO_LE_THUONG_KY: GioLe[] = [
  {
    ngay: "Thứ Hai – Thứ Sáu",
    gio: ["05:00", "18:00"],
    ghiChu: "Lễ sáng 05:00 và chiều 18:00; Thứ Năm có Chầu Thánh Thể",
  },
  {
    ngay: "Thứ Bảy",
    gio: ["05:00", "17:30"],
    ghiChu: "Lễ 17:30 là lễ vọng Chúa nhật",
  },
  {
    ngay: "Chúa nhật",
    gio: ["05:30", "09:00", "16:00", "18:30"],
    ghiChu: "Thánh lễ 16:00 bằng tiếng Anh",
  },
];

export const GIO_LE_DAC_BIET = [
  { dip: "Lễ Giáng Sinh (24–25.12)", le: ["Lễ đêm 24.12: 21:00", "Lễ rạng đông & ban ngày 25.12: 05:00, 08:00, 17:00"] },
  { dip: "Tuần Thánh", le: ["Lễ Lá, Thứ Năm, Thứ Sáu, Vọng Phục Sinh: theo lịch hằng năm"] },
  { dip: "Lễ bổn mạng giáo xứ", le: ["Thánh lễ trọng thể — theo thông báo"] },
];

export const GIAI_TOI_CHAU_THANH = [
  { muc: "Giải tội", thoiGian: "30 phút trước mỗi Thánh lễ, hoặc hẹn qua văn phòng", diaDiem: "Tòa giải tội trong nhà thờ" },
  { muc: "Chầu Thánh Thể", thoiGian: "Thứ Năm hằng tuần, sau Thánh lễ chiều 18:00", diaDiem: "Nhà thờ" },
  { muc: "Lần hạt Mân Côi", thoiGian: "Trước lễ chiều 15 phút", diaDiem: "Nhà thờ" },
];

export const NGAY_CAP_NHAT_GIO_LE = "18.08.2026";
