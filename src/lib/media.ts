// Turns a YouTube or Google Drive link into an embeddable player URL; null if unsupported.
export function embedUrl(url: string): string | null {
  let u: URL;
  try { u = new URL(url); } catch { return null; }
  const host = u.hostname.replace(/^www\./, '');
  let id: string | null = null;
  if (host === 'youtu.be') id = u.pathname.slice(1);
  else if (host === 'youtube.com' && u.pathname === '/watch') id = u.searchParams.get('v');
  else if (host === 'youtube.com' && u.pathname.startsWith('/embed/')) id = u.pathname.slice(7);
  if (id) {
    const start = parseInt(u.searchParams.get('t') ?? u.searchParams.get('start') ?? '', 10);
    return `https://www.youtube-nocookie.com/embed/${id}${start > 0 ? `?start=${start}` : ''}`;
  }
  const drive = host === 'drive.google.com' && u.pathname.match(/^\/file\/d\/([^/]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
  return null;
}

// Local files ("/assets/...") have spaces, "#" and ":" in their names: encode each path segment.
export function fileUrl(path: string): string {
  return /^https?:/.test(path) ? path : path.split('/').map(encodeURIComponent).join('/');
}

export const isPdf = (path: string) => !/^https?:/.test(path) && path.toLowerCase().endsWith('.pdf');
