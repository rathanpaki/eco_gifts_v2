const DIRECT_IMAGE_HOSTS = new Set([
  "firebasestorage.googleapis.com",
  "storage.googleapis.com",
]);
const API_IMAGE_ORIGIN = new URL(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
).origin;

export function shouldBypassImageOptimization(source: string): boolean {
  if (source.startsWith("blob:") || source.startsWith("data:")) return true;

  try {
    const url = new URL(source);
    return (
      url.origin === API_IMAGE_ORIGIN ||
      (url.protocol === "https:" && DIRECT_IMAGE_HOSTS.has(url.hostname))
    );
  } catch {
    return false;
  }
}
