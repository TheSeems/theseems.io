<script>
  import { onMount } from "svelte";
  import ExternalLink from "./ui/ExternalLink.svelte";
  import { email } from "./contact.js";
  import { trackEvent } from "./metrics.js";

  /** @type {HTMLDialogElement | null} */
  let dialog = $state(null);
  /** @type {HTMLDivElement | null} */
  let panel = $state(null);
  /** True when an in-page link added `#privacy` to history, so closing should step back over it. */
  let openedByLink = false;

  /** @param {boolean} fromHashChange */
  function sync(fromHashChange) {
    if (!dialog) return;
    const wanted = location.hash === "#privacy";
    if (wanted && !dialog.open) {
      trackEvent("privacy_open");
      openedByLink = fromHashChange;
      // Native modal: traps focus, makes the page behind inert, closes on Esc.
      dialog.showModal();
      panel?.focus();
    } else if (!wanted && dialog.open) {
      dialog.close();
    }
  }

  // Every way out (close button, Esc, backdrop, browser Back) ends here. Drop the hash without
  // adding a history entry, so Back never reopens the dialog.
  function onClose() {
    if (location.hash !== "#privacy") return;
    if (openedByLink) history.back();
    else history.replaceState(null, "", location.pathname + location.search);
  }

  onMount(() => {
    sync(false);
    const onHashChange = () => sync(true);
    globalThis.addEventListener("hashchange", onHashChange);
    return () => globalThis.removeEventListener("hashchange", onHashChange);
  });
</script>

<!-- The dialog itself is the full-viewport scrim; a click that lands on it (not the panel) closes. -->
<dialog
  bind:this={dialog}
  onclose={onClose}
  onclick={(e) => {
    if (e.target === e.currentTarget) dialog?.close();
  }}
  aria-labelledby="privacy-heading"
  class="m-0 h-dvh max-h-none w-full max-w-none items-start justify-center overflow-y-auto border-0 bg-black/30 p-0 backdrop-blur-sm open:flex backdrop:bg-transparent dark:bg-black/50"
>
  <div
    bind:this={panel}
    tabindex="-1"
    class="relative mx-4 my-16 w-full max-w-xl rounded-[var(--radius-card)] border border-zinc-200/80 bg-white/80 p-7 shadow-[var(--shadow-soft)] outline-none backdrop-blur-xl sm:my-24 sm:p-8 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:shadow-[var(--shadow-soft-dark)]"
  >
    <button
      type="button"
      onclick={() => dialog?.close()}
      class="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
      aria-label="Close"
    >
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>

    <article aria-labelledby="privacy-heading">
      <h2
        id="privacy-heading"
        class="text-balance text-2xl font-[650] tracking-[-0.015em] text-zinc-900 font-stretch-expanded dark:text-zinc-50"
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
          class="font-mono font-medium text-sky-700 underline decoration-sky-700/30 underline-offset-[0.22em] transition-colors hover:text-sky-800 hover:decoration-sky-700/60 dark:text-sky-400 dark:decoration-sky-400/35 dark:hover:text-sky-300"
          href="mailto:{email}">{email}</a
        >.
      </p>

      <p class="mt-5 text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
        For transparency only, not legal advice.
      </p>
    </article>
  </div>
</dialog>
