<script>
  import { onMount } from "svelte";
  import { activeSectionId } from "./activeSection.svelte.js";
  import { sectionIds } from "./sections.js";
  import { trackEvent } from "./metrics.js";

  /** @type {Set<string>} */
  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- bookkeeping for analytics, never rendered
  const viewedSections = new Set();

  function getHeaderOffset() {
    const el = document.querySelector("header");
    if (!el) return 112;
    return Math.round(el.getBoundingClientRect().height) + 16;
  }

  function updateActive() {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);
    if (sections.length === 0) return;

    const atPageBottom =
      globalThis.scrollY + globalThis.innerHeight >=
      document.documentElement.scrollHeight - 4;

    const offset = getHeaderOffset();
    let currentId = sectionIds[0];
    if (atPageBottom) {
      currentId = sectionIds[sectionIds.length - 1];
    } else {
      for (const el of sections) {
        const top = el.getBoundingClientRect().top;
        if (top <= offset) currentId = el.id;
      }
    }
    if (activeSectionId.value !== currentId) activeSectionId.value = currentId;
    if (!viewedSections.has(currentId)) {
      viewedSections.add(currentId);
      trackEvent("section_view", { section: currentId });
    }
  }

  onMount(() => {
    updateActive();
    const onScroll = () => updateActive();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll, { passive: true });
    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
    };
  });
</script>
