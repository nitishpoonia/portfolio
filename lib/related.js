// "Keep reading": posts sharing the most tags first, then the newest. Pure.
export function relatedPosts(post, all, n = 3) {
  const tags = new Set(post.tags || []);
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, shared: (p.tags || []).filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.shared - a.shared || String(b.p.date).localeCompare(String(a.p.date)))
    .slice(0, n)
    .map(({ p }) => p);
}

// "More work": the projects after this one in display order, wrapping around.
export function moreProjects(project, all, n = 2) {
  const i = all.findIndex((p) => p.slug === project.slug);
  if (i < 0) return all.slice(0, n);
  const rest = [...all.slice(i + 1), ...all.slice(0, i)];
  return rest.slice(0, n);
}
