export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Đang tải nội dung" className="animate-pulse motion-reduce:animate-none">
      <div className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <div className="h-3 w-28 bg-neutral-400" />
          <div className="mt-4 h-12 w-full max-w-xl bg-ink" />
          <div className="mt-4 h-1 w-24 bg-accent" />
          <div className="mt-8 h-4 w-full max-w-2xl bg-muted" />
          <div className="mt-2 h-4 w-4/5 max-w-xl bg-muted" />
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-12 md:grid-cols-3">
        {[0, 1, 2].map((item) => <div key={item} className="h-44 border border-ink bg-neutral-100" />)}
      </div>
    </div>
  );
}
