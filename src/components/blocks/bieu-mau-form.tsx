"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";

const CHU_DE = [
  ["bi-tich", "Bí tích"],
  ["giao-ly", "Giáo lý"],
  ["xin-le", "Xin lễ"],
  ["tham-quan", "Tham quan nhà thờ"],
  ["truyen-thong", "Truyền thông"],
  ["khan-cap", "Khẩn cấp (xức dầu, báo tang)"],
  ["khac", "Khác"],
];

export function BieuMauForm({ defaultChuDe }: { defaultChuDe?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/gui-bieu-mau", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch {
      setStatus("error");
      setError("Không gửi được. Vui lòng thử lại hoặc liên hệ văn phòng.");
    }
  }

  if (status === "ok") {
    return (
      <div role="status" className="border-2 border-ink bg-neutral-100 p-6">
        <p className="font-serif text-2xl font-bold">Đã nhận được ✓</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">
          Cảm ơn bạn. Văn phòng giáo xứ sẽ phản hồi sớm nhất có thể. Trường hợp khẩn cấp, vui
          lòng gọi trực tiếp số điện thoại của giáo xứ.
        </p>
        <Button variant="secondary" className="mt-4" onClick={() => setStatus("idle")}>
          Gửi biểu mẫu khác
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      {/* Honeypot — ẩn với người dùng */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" required>
          <Input name="hoTen" required autoComplete="name" />
        </Field>
        <Field label="Điện thoại hoặc email">
          <Input name="lienHe" autoComplete="email" />
        </Field>
      </div>
      <Field label="Chủ đề" required>
        <Select name="chuDe" required defaultValue={defaultChuDe ?? ""}>
          <option value="" disabled>
            — Chọn chủ đề —
          </option>
          {CHU_DE.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Nội dung" required>
        <Textarea name="noiDung" required maxLength={5000} />
      </Field>
      <label className="flex items-start gap-2 font-body text-sm text-neutral-600">
        <input type="checkbox" name="riengTu" value="1" className="mt-1 h-4 w-4 accent-[#111111]" />
        Tôi hiểu nội dung gửi đi được giữ riêng tư và chỉ dùng để giáo xứ phản hồi.
      </label>

      {status === "error" && (
        <p role="alert" className="border border-accent bg-paper p-3 font-body text-sm text-accent">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Đang gửi…" : "Gửi biểu mẫu"}
      </Button>
    </form>
  );
}
