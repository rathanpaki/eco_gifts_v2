const DIRECT_IMAGE_HOSTS = new Set([
  "firebasestorage.googleapis.com",
  "storage.googleapis.com",
]);

export function shouldBypassImageOptimization(source: string): boolean {
  if (source.startsWith("blob:") || source.startsWith("data:")) return true;

  try {
    const url = new URL(source);
    return url.protocol === "https:" && DIRECT_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}
