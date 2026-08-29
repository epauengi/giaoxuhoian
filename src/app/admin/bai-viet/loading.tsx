function Skeleton({ className }: { className: string }) {
  return <div aria-hidden className={`animate-pulse bg-muted ${className}`} />;
}

export default function ArticlesLoading() {
  return (
    <main aria-busy="true" aria-label="Đang tải danh sách bài viết" className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="border-b-2 border-ink pb-7"><Skeleton className="h-3 w-24" /><Skeleton className="mt-5 h-4 w-32" /><Skeleton className="mt-2 h-12 w-56" /><Skeleton className="mt-3 h-5 w-full max-w-xl" /></div>
      <div className="grid grid-cols-3 divide-x divide-ink border-b-2 border-ink bg-neutral-100"><Skeleton className="m-5 h-12" /><Skeleton className="m-5 h-12" /><Skeleton className="m-5 h-12" /></div>
      <div className="mt-8 border-2 border-ink p-5"><Skeleton className="h-4 w-36" /><div className="mt-4 grid gap-3 md:grid-cols-4"><Skeleton className="h-11" /><Skeleton className="h-11" /><Skeleton className="h-11" /><Skeleton className="h-11" /></div></div>
      <div className="mt-5 hidden border-2 border-ink lg:block"><Skeleton className="h-14" /><div className="space-y-px p-4"><Skeleton className="h-20" /><Skeleton className="h-20" /><Skeleton className="h-20" /></div></div>
      <div className="mt-5 space-y-3 lg:hidden"><Skeleton className="h-44" /><Skeleton className="h-44" /></div>
    </main>
  );
}
