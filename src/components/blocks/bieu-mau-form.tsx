"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function BieuMauForm({ defaultChuDe, locale: _locale = "vi" }: { defaultChuDe?: string; locale?: Locale }) {
  const d = getDictionary().form;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending"); setError(""); const form = e.currentTarget;
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/gui-bieu-mau", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (json.ok) { setStatus("ok"); form.reset(); } else { setStatus("error"); setError(json.error ?? d.error); }
    } catch { setStatus("error"); setError(d.networkError); }
  }
  if (status === "ok") return <div role="status" className="border-2 border-ink bg-neutral-100 p-6"><p className="font-serif text-2xl font-bold">{d.received}</p><p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">{d.thanks}</p><Button variant="secondary" className="mt-4" onClick={() => setStatus("idle")}>{d.another}</Button></div>;
  return <form onSubmit={onSubmit} className="relative space-y-5">
    <div aria-hidden className="absolute left-[-9999px]"><label>{d.honeypot}<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><Field label={d.name} required><Input name="hoTen" required autoComplete="name" /></Field><Field label={d.contact}><Input name="lienHe" autoComplete="email" /></Field></div>
    <Field label={d.topic} required><Select name="chuDe" required defaultValue={defaultChuDe ?? ""}><option value="" disabled>{d.choose}</option>{d.topics.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</Select></Field>
    <Field label={d.content} required><Textarea name="noiDung" required maxLength={5000} /></Field>
    <label className="flex items-start gap-2 font-body text-sm text-neutral-600"><input type="checkbox" name="riengTu" value="1" className="mt-1 h-4 w-4 accent-[#111111]" />{d.privacy}</label>
    {status === "error" && <p role="alert" className="border border-accent bg-paper p-3 font-body text-sm text-accent">{error}</p>}
    <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">{status === "sending" ? d.sending : d.send}</Button>
  </form>;
}
