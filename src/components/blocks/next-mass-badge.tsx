"use client";

import { useEffect, useState } from "react";
import { getNextMass, NextMassResult } from "@/lib/data/gio-le";

export function NextMassBadge({ fallbackDate }: { fallbackDate?: string }) {
  const [nextMass, setNextMass] = useState<NextMassResult | null>(null);

  useEffect(() => {
    // Cập nhật Thánh lễ kế tiếp theo thời gian máy client
    const update = () => {
      setNextMass(getNextMass(new Date()));
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  // Server render hoặc lúc chưa mount dùng fallbackDate
  const current = nextMass || getNextMass(fallbackDate ? new Date(fallbackDate) : new Date());

  const formatCountdown = (diff: number) => {
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    if (hours === 0) return `${mins} phút nữa`;
    if (mins === 0) return `${hours} giờ nữa`;
    return `${hours}h ${mins}p nữa`;
  };

  return (
    <div className="mb-4 border border-ink bg-ink p-3.5 text-paper">
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          LỄ KẾ TIẾP
        </span>
        <span className="font-mono text-sm font-medium text-paper">
          {formatCountdown(current.diffMinutes)}
        </span>
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-paper">
          {current.time}
        </span>
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {current.dayLabel}
        </span>
      </div>
      {current.note && (
        <p className="mt-1.5 font-body text-xs italic text-neutral-300">
          {current.note}
        </p>
      )}
    </div>
  );
}
