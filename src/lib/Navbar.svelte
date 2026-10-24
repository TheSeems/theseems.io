<script>
  import Container from "./ui/Container.svelte";
  import Button from "./ui/Button.svelte";
  import NavbarItem from "./NavbarItem.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import IconCv from "./icons/IconCv.svelte";
  import { activeSectionId } from "./activeSection.svelte.js";
  import { sections } from "./sections.js";
  import { trackEvent } from "./metrics.js";

  let menuOpen = $state(false);
  let pastHero = $derived(activeSectionId.value !== "home");

  function closeMenu() {
    menuOpen = false;
  }

  function trackBrandNav() {
    trackEvent("nav_click", { section: "home" });
  }

  /** @param {string} sectionId */
  function trackMobileNav(sectionId) {
    trackEvent("nav_click", { section: sectionId });
    closeMenu();
  }

  /** @param {string} placement */
  function trackCv(placement) {
    trackEvent("cv_click", { placement });
  }

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (e.key === "Escape") menuOpen = false;
  }
</script>

<svelte:window onkeydown={onKeydown} />

<header
  class="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/60 bg-zinc-50/75 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/75"
>
  <Container class="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
    <a
      href="#home"
      class="group flex min-w-0 shrink items-baseline gap-2 no-underline"
      onclick={() => {
        trackBrandNav();
        closeMenu();
      }}
    >
      <span class="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >Aleksei Akhundov</span
      >
    </a>

    <nav class="hidden items-center gap-2 md:flex" aria-label="Primary">
      {#each sections as s (s.id)}
        <NavbarItem href={`#${s.id}`}>{s.label}</NavbarItem>
      {/each}
      <ThemeToggle />
      <!-- Inert while collapsed, so keyboard focus can't land on the invisible button. -->
      <div
        class="grid transition-[grid-template-columns,opacity] duration-300 {pastHero
          ? 'grid-cols-[1fr] opacity-100'
          : 'grid-cols-[0fr] opacity-0'}"
        inert={!pastHero}
      >
        <div class="overflow-hidden">
          <Button
            href="https://theseems.io/cv"
            variant="nav"
            target="_blank"
            rel="noreferrer"
            onclick={() => trackCv("navbar_desktop")}
          >
            CV
            <IconCv class="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </nav>

    <div class="flex shrink-0 items-center gap-2 md:hidden">
      <a
        href="https://theseems.io/cv"
        target="_blank"
        rel="noreferrer"
        class="inline-flex h-10 items-center gap-1.5 rounded-full border border-zinc-200/80 bg-zinc-900 px-4 text-sm font-semibold text-white no-underline shadow-sm dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950"
        onclick={() => trackCv("navbar_mobile")}
      >
        CV
        <IconCv class="h-3.5 w-3.5" aria-hidden="true" />
      </a>
      <ThemeToggle />
      <button
        type="button"
        class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-900 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-50"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onclick={() => (menuOpen = !menuOpen)}
      >
        <span class="sr-only">Toggle menu</span>
        {#if menuOpen}
          <svg
            class="h-5 w-5"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg
            class="h-5 w-5"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        {/if}
      </button>
    </div>
  </Container>

  {#if menuOpen}
    <div
      id="mobile-menu"
      class="border-t border-zinc-200/60 bg-zinc-50/95 px-5 py-4 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/95 md:hidden"
    >
      <div class="flex flex-col gap-1">
        {#each sections as s (s.id)}
          <a
            href={`#${s.id}`}
            class="rounded-xl px-4 py-3 text-sm font-medium no-underline {activeSectionId.value ===
            s.id
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
              : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900'}"
            aria-current={activeSectionId.value === s.id ? "location" : undefined}
            onclick={() => trackMobileNav(s.id)}>{s.label}</a
          >
        {/each}
      </div>
    </div>
  {/if}
</header>

{#if menuOpen}
  <button
    type="button"
    class="fixed inset-0 z-40 cursor-default bg-zinc-950/40 backdrop-blur-[1px] md:hidden"
    onclick={closeMenu}
    aria-label="Close menu"
  ></button>
{/if}
