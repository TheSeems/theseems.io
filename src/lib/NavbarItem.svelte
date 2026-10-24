<script>
  import { activeSectionId } from "./activeSection.svelte.js";
  import { trackEvent } from "./metrics.js";

  /**
   * @typedef {Object} NavbarItemProps
   * @property {string} href
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {NavbarItemProps} */
  let { href, children } = $props();

  let sectionId = $derived(href.startsWith("#") ? href.slice(1) : "");
  let active = $derived(sectionId !== "" && activeSectionId.value === sectionId);

  function onNavigate() {
    if (sectionId) trackEvent("nav_click", { section: sectionId });
  }
</script>

<a
  {href}
  onclick={onNavigate}
  class="inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium tracking-tight transition-colors {active
    ? 'bg-zinc-900/5 text-zinc-900 dark:bg-white/10 dark:text-white'
    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'}"
  aria-current={active ? "location" : undefined}
>
  {@render children?.()}
</a>
