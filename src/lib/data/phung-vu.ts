/** Lịch phụng vụ "hôm nay" — bảng tĩnh theo ngày trong tuần (DỮ LIỆU MẪU) */

interface NgayPhungVu {
  tenLe: string;
  mauPhungVu: string;
  mauHex: string;
  tinMung: string;
}

const THEO_THU: Record<number, NgayPhungVu> = {
  0: {
    tenLe: "Chúa nhật XX Thường niên",
    mauPhungVu: "Xanh",
    mauHex: "#1a7a3c",
    tinMung: "Lc 12,49–53",
  },
  1: {
    tenLe: "Thứ Hai tuần XX Thường niên",
    mauPhungVu: "Xanh",
    mauHex: "#1a7a3c",
    tinMung: "Mt 19,16–22",
  },
  2: {
    tenLe: "Thứ Ba tuần XX Thường niên",
    mauPhungVu: "Xanh",
    mauHex: "#1a7a3c",
    tinMung: "Mt 19,23–30",
  },
  3: {
    tenLe: "Thứ Tư tuần XX Thường niên",
    mauPhungVu: "Xanh",
    mauHex: "#1a7a3c",
    tinMung: "Mt 20,1–16",
  },
  4: {
    tenLe: "Thứ Năm tuần XX Thường niên",
    mauPhungVu: "Xanh",
    mauHex: "#1a7a3c",
    tinMung: "Mt 22,1–14",
  },
  5: {
    tenLe: "Thứ Sáu tuần XX Thường niên",
    mauPhungVu: "Xanh",
    mauHex: "#1a7a3c",
    tinMung: "Mt 22,34–40",
  },
  6: {
    tenLe: "Thứ Bảy tuần XX Thường niên",
    mauPhungVu: "Xanh",
    mauHex: "#1a7a3c",
    tinMung: "Mt 23,1–12",
  },
};

export function phungVuHomNay(date: Date): NgayPhungVu {
  return THEO_THU[date.getDay()];
}
