export const openExternalLink = (url: string) => {
  if (typeof window === "undefined") return;

  const openedTab = window.open(url, "_blank", "noopener,noreferrer");
  if (openedTab) {
    openedTab.opener = null;
    return;
  }

  try {
    if (window.top && window.top !== window.self) {
      window.top.location.href = url;
      return;
    }
  } catch {
    // Ignore cross-origin access errors and use current window fallback.
  }

  window.location.href = url;
};