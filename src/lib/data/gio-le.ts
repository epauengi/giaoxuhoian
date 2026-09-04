/** Giờ lễ Giáo xứ Hội An — 106 Nguyễn Trường Tộ, Hội An, Đà Nẵng, Việt Nam */

export interface GioLe {
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

export interface NextMassResult {
  time: string;
  dayLabel: string;
  isToday: boolean;
  isTomorrow: boolean;
  note?: string;
  diffMinutes: number;
}

interface MassSlot {
  dayOfWeek: number; // 0: CN, 1: T2, ..., 6: T7
  time: string; // "05:00"
  minutes: number; // minutes from 00:00
  note?: string;
  dayLabel: string;
}

function parseTimeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

const ALL_WEEKLY_MASSES: MassSlot[] = [
  // Thứ 2 đến Thứ 6
  ...[1, 2, 3, 4, 5].flatMap((d) => {
    const names = ["", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];
    return [
      { dayOfWeek: d, time: "05:00", minutes: 5 * 60, note: "Lễ sáng", dayLabel: names[d] },
      {
        dayOfWeek: d,
        time: "18:00",
        minutes: 18 * 60,
        note: d === 4 ? "Lễ chiều (có Chầu)" : "Lễ chiều",
        dayLabel: names[d],
      },
    ];
  }),
  // Thứ Bảy
  { dayOfWeek: 6, time: "05:00", minutes: 5 * 60, note: "Lễ sáng", dayLabel: "Thứ Bảy" },
  { dayOfWeek: 6, time: "17:30", minutes: 17 * 60 + 30, note: "Lễ vọng Chúa nhật", dayLabel: "Thứ Bảy" },
  // Chúa nhật
  { dayOfWeek: 0, time: "05:30", minutes: 5 * 60 + 30, note: "Lễ sáng sớm", dayLabel: "Chúa nhật" },
  { dayOfWeek: 0, time: "09:00", minutes: 9 * 60, note: "Lễ thiếu nhi & cộng đoàn", dayLabel: "Chúa nhật" },
  { dayOfWeek: 0, time: "16:00", minutes: 16 * 60, note: "English Mass (Tiếng Anh)", dayLabel: "Chúa nhật" },
  { dayOfWeek: 0, time: "18:30", minutes: 18 * 60 + 30, note: "Lễ chiều tối", dayLabel: "Chúa nhật" },
];

/**
 * Tìm Thánh lễ tiếp theo dựa trên thời điểm cho trước
 */
export function getNextMass(date: Date = new Date()): NextMassResult {
  const currentDay = date.getDay();
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  // Tìm trong tuần, tính khoảng cách phút từ thời điểm hiện tại
  let bestSlot: MassSlot | null = null;
  let minDiff = Infinity;
  let isToday = false;
  let isTomorrow = false;

  for (const slot of ALL_WEEKLY_MASSES) {
    let dayDiff = slot.dayOfWeek - currentDay;
    let minuteDiff = dayDiff * 24 * 60 + (slot.minutes - currentMinutes);

    if (minuteDiff <= 0) {
      // Đã qua trong tuần này, xét cho tuần kế tiếp (+ 7 ngày)
      minuteDiff += 7 * 24 * 60;
    }

    if (minuteDiff < minDiff) {
      minDiff = minuteDiff;
      bestSlot = slot;
    }
  }

  if (bestSlot) {
    // Xác định xem có phải hôm nay hay ngày mai
    const massDate = new Date(date.getTime() + minDiff * 60 * 1000);
    isToday = massDate.getDate() === date.getDate();
    const tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    isTomorrow = massDate.getDate() === tomorrow.getDate();

    return {
      time: bestSlot.time,
      dayLabel: isToday ? "Hôm nay" : isTomorrow ? "Ngày mai" : bestSlot.dayLabel,
      isToday,
      isTomorrow,
      note: bestSlot.note,
      diffMinutes: minDiff,
    };
  }

  return {
    time: "05:00",
    dayLabel: "Hôm nay",
    isToday: true,
    isTomorrow: false,
    diffMinutes: 0,
  };
}
