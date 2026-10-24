let outboundBound = false;

/** Domains this site is served from (see the canonical tag in index.html). */
const SITE_HOSTS = ["theseems.io"];

/** @param {string} hostname */
function canonicalHost(hostname) {
  return hostname.replace(/^www\./i, "");
}

/** @param {string} hostname */
function isOwnHost(hostname) {
  const host = canonicalHost(hostname);
  return host === canonicalHost(window.location.hostname) || SITE_HOSTS.includes(host);
}

/**
 * @param {HTMLAnchorElement} a
 */
function isOutbound(a) {
  if (a.getAttribute("data-umami-event")) return false;
  try {
    const u = new URL(a.href, window.location.href);
    if (u.protocol === "http:" || u.protocol === "https:") {
      return !isOwnHost(u.hostname);
    }
    if (u.protocol === "mailto:" || u.protocol === "tel:" || u.protocol === "sms:") {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Self-hosted Umami (production only). Set VITE_UMAMI_URL and VITE_UMAMI_WEBSITE_ID at build time.
 * @see https://umami.is/docs
 */
export function initMetrics() {
  if (!import.meta.env.PROD) return;

  const base = import.meta.env.VITE_UMAMI_URL?.replace(/\/$/, "");
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  if (!base || !websiteId) return;

  setupOutboundTracking();

  if (document.querySelector(`script[data-website-id="${websiteId}"]`)) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = `${base}/script.js`;
  script.dataset.websiteId = websiteId;
  script.dataset.domains = SITE_HOSTS.flatMap((h) => [h, `www.${h}`]).join(",");
  // Web Vitals (LCP, INP, CLS, FCP, TTFB) for the Performance tab; sent via the same collect endpoint
  script.dataset.performance = "true";
  document.head.appendChild(script);
}

function setupOutboundTracking() {
  if (!import.meta.env.PROD || outboundBound) return;
  outboundBound = true;

  document.addEventListener("click", (e) => {
    const t = e.target;
    const el = t instanceof Element ? t : t instanceof Node ? t.parentElement : null;
    const anchor = el?.closest("a[href]");
    if (!anchor || anchor.getAttribute("data-umami-event")) return;
    const a = /** @type {HTMLAnchorElement} */ (anchor);
    if (!isOutbound(a)) return;
    trackEvent("outbound-link-click", { url: a.href });
  });
}

/**
 * Custom Umami events (v2+). No-op if tracker not loaded or not production.
 * @see https://umami.is/docs/track-events
 * @param {string} name — max 50 characters
 * @param {Record<string, string | number | boolean>} [data]
 */
export function trackEvent(name, data) {
  if (!import.meta.env.PROD) return;
  const u = globalThis.umami;
  if (!u || typeof u.track !== "function") return;
  data !== undefined ? u.track(name, data) : u.track(name);
}
