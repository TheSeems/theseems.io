<script>
  import { onMount } from "svelte";
  import ExternalLink from "./ui/ExternalLink.svelte";
  import { trackEvent } from "./metrics.js";

  let open = $state(false);
  /** @type {HTMLDivElement | null} */
  let panel = $state(null);

  function sync() {
    const next = location.hash === "#privacy";
    if (next && !open) trackEvent("privacy_open");
    open = next;
    if (open) requestAnimationFrame(() => panel?.focus());
  }

  function close() {
    if (open) history.pushState(null, "", location.pathname);
    open = false;
  }

  onMount(() => {
    sync();
    globalThis.addEventListener("hashchange", sync);
    return () => globalThis.removeEventListener("hashchange", sync);
  });
</script>

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 backdrop-blur-sm dark:bg-black/50"
    onclick={(e) => { if (e.target === e.currentTarget) close(); }}
    onkeydown={(e) => { if (e.key === "Escape") close(); }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="privacy-heading"
    tabindex="-1"
  >
    <div
      bind:this={panel}
      tabindex="-1"
      class="relative mx-4 my-16 w-full max-w-xl rounded-[var(--radius-card)] border border-zinc-200/80 bg-white/80 p-7 shadow-[var(--shadow-soft)] outline-none backdrop-blur-xl sm:my-24 sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:shadow-[var(--shadow-soft-dark)]"
    >
      <button
        type="button"
        onclick={close}
        class="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        aria-label="Close"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>

      <article aria-labelledby="privacy-heading">
        <h2
          id="privacy-heading"
          class="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Privacy
        </h2>

        <p class="mt-6 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          This website uses self-hosted analytics system <ExternalLink href="https://umami.is/">Umami</ExternalLink>
          to collect anonymous usage data such as page views, button clicks, referrers, and page load performance.
          No cookies. No cross-site tracking. No advertising profiling or third-party marketing trackers.
        </p>

        <p class="mt-4 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Analytics data is processed on infrastructure in the EU,
          operated by the site owner. Questions? Reach out at
          <a
            class="font-mono font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-[0.22em] transition-colors hover:text-sky-700 hover:decoration-sky-600/60 dark:text-sky-400 dark:decoration-sky-400/35 dark:hover:text-sky-300"
            href="mailto:me@theseems.io">me@theseems.io</a
          >.
        </p>

        <p class="mt-5 text-pretty leading-relaxed text-zinc-500 dark:text-zinc-500">
          For transparency only, not legal advice.
        </p>
      </article>
    </div>
  </div>
{/if}
