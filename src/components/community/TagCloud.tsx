const tags = ["텃밭", "분리수거", "제로웨이스트", "자전거", "플리마켓"];

export function TagCloud() {
  return (
    <section aria-labelledby="tag-cloud-title">
      <h2 id="tag-cloud-title" className="text-xs font-medium text-fg-muted">인기 태그</h2>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <button key={tag} type="button" className="rounded border border-border px-2 py-0.5 text-xs text-fg-secondary transition-colors duration-150 hover:bg-surface-muted">
            #{tag}
          </button>
        ))}
      </div>
    </section>
  );
}
