export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function tagUrl(tag: string): string {
  return `/blog/tags/${slugifyTag(tag)}`;
}
