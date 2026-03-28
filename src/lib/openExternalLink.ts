export const openExternalLink = (url: string) => {
  if (typeof window === "undefined") return;

  const resolvedUrl = new URL(url, window.location.origin).toString();
  const openedTab = window.open(resolvedUrl, "_blank", "noopener,noreferrer");

  if (openedTab) {
    openedTab.opener = null;
    return;
  }

  try {
    if (window.top && window.top !== window.self) {
      window.top.location.href = resolvedUrl;
      return;
    }
  } catch {
    // Ignore cross-origin access errors and use current window fallback.
  }

  window.location.href = resolvedUrl;
};