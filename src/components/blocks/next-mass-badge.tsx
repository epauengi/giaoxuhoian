"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
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
    <div className="mb-4 border border-ink bg-ink p-3 text-paper">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          LỄ KẾ TIẾP
        </span>
        <span className="font-mono text-[11px] text-accent">
          {formatCountdown(current.diffMinutes)}
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline justify-between">
        <span className="font-mono text-2xl font-bold tracking-tight text-paper">
          {current.time}
        </span>
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {current.dayLabel}
        </span>
      </div>
      {current.note && (
        <p className="mt-1 font-body text-xs italic text-neutral-400">
          {current.note}
        </p>
      )}
    </div>
  );
}
