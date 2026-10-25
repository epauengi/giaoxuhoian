import type { Locale } from "./config";
import community from "./community.en";
import sacraments from "./sacraments.en";
import history from "./history.en";

const english: Record<string, string> = {
  ...community,
  ...sacraments,
  ...history,
  "cáo phó": "obituary",
  "bác ái": "charity",
  "thăm viếng": "visits",
  "giáo lý": "catechism",
  "thiếu nhi": "children",
  "khai giảng": "new school year",
  "Thánh lễ": "Mass",
  "rao hôn phối": "marriage banns",
  "giới trẻ": "youth",
  "sinh hoạt": "activities",
  "hè": "summer",
  "suy niệm": "reflection",
  "Đức Mẹ": "Our Lady",
  "lễ trọng": "solemnity",
  "hằng ngày": "daily",
  "Dữ liệu không hợp lệ.": "Invalid form data.",
  "Vui lòng điền họ tên, chủ đề và nội dung.": "Please enter your full name, topic and message.",
  "Nội dung quá dài (tối đa 5000 ký tự).": "Your message is too long (maximum 5,000 characters).",
  "Thứ Hai – Thứ Sáu": "Monday – Friday",
  "Thứ Hai": "Monday",
  "Thứ Ba": "Tuesday",
  "Thứ Tư": "Wednesday",
  "Thứ Năm": "Thursday",
  "Thứ Sáu": "Friday",
  "Thứ Bảy": "Saturday",
  "Chúa nhật": "Sunday",
  "Hôm nay": "Today",
  "Ngày mai": "Tomorrow",
  "Lễ sáng": "Morning Mass",
  "Lễ chiều": "Evening Mass",
  "Lễ chiều tối": "Evening Mass",
  "Lễ chiều (có Chầu)": "Evening Mass (with Adoration)",
  "Lễ sáng sớm": "Early morning Mass",
  "Lễ thiếu nhi & cộng đoàn": "Children's and community Mass",
  "Lễ vọng Chúa nhật": "Sunday Vigil Mass",
  "Lễ Chúa nhật vọng": "Sunday Vigil Mass",
  "English Mass (Tiếng Anh)": "English Mass",
  "Lễ sáng 05:00 và chiều 18:00; Thứ Năm có Chầu Thánh Thể": "Morning Mass at 05:00 and evening Mass at 18:00; Eucharistic Adoration on Thursdays",
  "Giờ lễ theo danh bạ Giáo phận Đà Nẵng.": "Mass times according to the Diocese of Da Nang directory.",
  "Lễ Giáng Sinh (24–25.12)": "Christmas (24–25 December)",
  "Lễ đêm 24.12: 21:00": "Christmas Night Mass, 24 December: 21:00",
  "Lễ rạng đông & ban ngày 25.12: 05:00, 08:00, 17:00": "Christmas Dawn and Day Masses, 25 December: 05:00, 08:00, 17:00",
  "Tuần Thánh": "Holy Week",
  "Lễ Lá, Thứ Năm, Thứ Sáu, Vọng Phục Sinh: theo lịch hằng năm": "Palm Sunday, Holy Thursday, Good Friday and the Easter Vigil: see the annual schedule",
  "Lễ bổn mạng giáo xứ": "Parish patronal feast",
  "Thánh lễ trọng thể — theo thông báo": "Solemn Mass — as announced",
  "Giải tội": "Confession",
  "30 phút trước mỗi Thánh lễ, hoặc hẹn qua văn phòng": "30 minutes before each Mass, or by appointment through the parish office",
  "Tòa giải tội trong nhà thờ": "Confessional inside the church",
  "Chầu Thánh Thể": "Eucharistic Adoration",
  "Thứ Năm hằng tuần, sau Thánh lễ chiều 18:00": "Every Thursday after the 18:00 evening Mass",
  "Nhà thờ": "Church",
  "Lần hạt Mân Côi": "Rosary",
  "Trước lễ chiều 15 phút": "15 minutes before evening Mass",
  "Mùa Thường niên": "Ordinary Time",
  "Tin tức & Sự kiện": "News & Events",
  "Tin giáo xứ": "Parish News",
  "Thánh lễ Thêm sức 2026": "Confirmation Mass 2026",
  "Trại hè giới trẻ 'Ánh Sáng Muối Men'": "Youth Summer Camp ‘Light, Salt and Leaven’",
  "Kiệu Đức Mẹ — Tháng Hoa": "Marian Procession — Month of Mary",
  "Tuần Thánh & Phục Sinh 2026": "Holy Week & Easter 2026",
  "Thánh lễ bổn mạng giáo xứ 2026": "Parish Patronal Feast Mass 2026",
  "Phóng sự: Nhà thờ Hội An giữa lòng phố cổ": "Feature: Hoi An Church in the Heart of the Ancient Town",
  "Bài giảng Chúa nhật XX Thường niên": "Homily for the 20th Sunday in Ordinary Time",
  "Đơn xin Rửa tội": "Baptism Application",
  "Đơn xin chứng nhận Bí tích": "Sacrament Certificate Request",
  "Mẫu đăng ký giáo lý thiếu nhi": "Children's Catechism Registration Form",
  "Nội quy tham quan nhà thờ": "Church Visitor Guidelines",
  "Kinh Lạy Cha": "Our Father",
  "Kinh Kính Mừng": "Hail Mary",
  "Kinh Sáng Danh": "Glory Be",
  "Kinh Tin Kính": "Creed",
  "Kinh Ăn Năn Tội": "Act of Contrition",
  "Kinh Vực Sâu": "De Profundis",
  "Kinh Mân Côi — Năm sự Vui": "Rosary — Joyful Mysteries",
  "Kinh Mân Côi — Năm sự Sáng": "Rosary — Luminous Mysteries",
  "Kinh Mân Côi — Năm sự Thương": "Rosary — Sorrowful Mysteries",
  "Kinh Mân Côi — Năm sự Mừng": "Rosary — Glorious Mysteries",
  "Kinh Tối Gia Đình": "Family Evening Prayer",
  "Kinh Sáng Gia Đình": "Family Morning Prayer",
  "Kinh thông dụng": "Common Prayers",
  "Chuẩn bị xưng tội": "Preparation for Confession",
  "Cầu cho các linh hồn": "Prayers for the Faithful Departed",
  "Theo mùa": "Seasonal Prayers",
  "Cầu nguyện gia đình": "Family Prayers",
};

export function translate(locale: Locale, text: string): string {
  return locale === "en" && Object.hasOwn(english, text) ? english[text] : text;
}

export function localize<T>(locale: Locale, value: T): T {
  if (locale !== "en") return value;
  if (typeof value === "string") return translate(locale, value) as T;
  if (Array.isArray(value)) return value.map((item) => localize(locale, item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(locale, item)])) as T;
  }
  return value;
}
