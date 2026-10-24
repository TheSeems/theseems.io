<script>
  import ExternalLink from "./ui/ExternalLink.svelte";
  import StackTags from "./ui/StackTags.svelte";
  import IconGithub from "./icons/IconGithub.svelte";
  import { trackEvent } from "./metrics.js";

  /**
   * `plain`: a pinned project; from md its mark hangs in the gutter.
   * `featured`: a lead project, framed and tinted by `accent` (its logo's colour).
   * `compact`: an archive row behind "Show more": a size down and without its mark.
   */
  let {
    title,
    url = null,
    year = null,
    tags = [],
    icon = null,
    iconMono = false,
    variant = "plain",
    accent = null,
    children,
  } = $props();

  const compact = $derived(variant === "compact");
</script>

<!-- The title's link is stretched over the whole entry by its ::after, so the entry clicks as one. -->
{#snippet heading(/** @type {string} */ size)}
  <h3
    class="min-w-0 font-[650] leading-snug tracking-[-0.01em] text-zinc-900 font-stretch-[108%] dark:text-zinc-50 {size}"
  >
    {#if url}
      <ExternalLink
        href={url}
        variant="card"
        class="after:absolute after:inset-0 focus-visible:outline-none"
        data-umami-event="project_click"
        onclick={() => trackEvent("project_click", { title })}
        ><span
          class="decoration-zinc-400 decoration-1 underline-offset-[0.2em] group-hover/entry:underline dark:decoration-zinc-500"
          >{title}</span
        ><IconGithub
          class="ml-1.5 inline-block h-[0.82em] w-[0.82em] align-[-0.1em] text-zinc-500 opacity-70 transition-[opacity,color] group-hover:text-zinc-900 group-hover:opacity-100 dark:text-zinc-400 dark:group-hover:text-zinc-100"
          aria-hidden="true"
        /></ExternalLink
      >
    {:else}
      {title}
    {/if}
  </h3>
{/snippet}

{#snippet mark(/** @type {string} */ placement)}
  <img
    src={icon}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    class="pointer-events-none shrink-0 select-none object-contain {iconMono
      ? 'dark:invert'
      : ''} {placement}"
  />
{/snippet}

{#snippet yearLabel()}
  {#if year != null}
    <span
      class="ml-auto shrink-0 font-mono text-sm tabular-nums lining-nums text-zinc-600 dark:text-zinc-300"
      >{year}</span
    >
  {/if}
{/snippet}

{#if variant === "featured"}
  <!-- Framed like the portrait. From md the mark sits in the frame's wide left padding, which hangs
       into the gutter, so the mark ends where the plain entries' marks end and the title and text keep
       the main column's edge. max-w is the plain entries' 36rem plus that left padding and the 1.5rem
       right one, so the years line up too. The edge is a ring, not a border, so it takes no space.
       No positioned element sits between the entry and the title link, so the link's stretched
       ::after still covers the whole frame. -->
  <li
    class="group/entry relative isolate max-w-xl overflow-hidden rounded-[var(--radius-card)] bg-white/50 p-5 shadow-[var(--shadow-faint)] ring-1 ring-zinc-200/70 transition-shadow duration-200 hover:ring-[color-mix(in_oklab,var(--accent)_33%,var(--color-zinc-200))] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-sky-500/80 sm:p-6 md:-ml-16 md:max-w-[41.5rem] md:pl-16 lg:-ml-20 lg:max-w-[42.5rem] lg:pl-20 dark:bg-zinc-900/25 dark:shadow-none dark:ring-zinc-800/70 dark:hover:ring-[color-mix(in_oklab,var(--accent)_29%,var(--color-zinc-800))]"
    style:--accent={accent ?? "var(--color-zinc-400)"}
  >
    <!-- Near-neutral at rest, so the card never outshouts the hero's View CV; the tint comes up
         on hover or keyboard focus. At rest most of the colour is in the mark's tile. -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_90%_at_0%_0%,color-mix(in_oklab,var(--accent)_12%,transparent),transparent)] opacity-[0.42] transition-opacity duration-300 group-hover/entry:opacity-100 group-has-[a:focus-visible]/entry:opacity-100 motion-reduce:transition-none dark:bg-[radial-gradient(ellipse_70%_90%_at_0%_0%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent)]"
      aria-hidden="true"
    ></div>

    <!-- The tile's negative margin is its own width plus the gap, matching the plain entries'. -->
    <div class="flex items-center gap-4 md:gap-3 lg:gap-5">
      {#if icon}
        <span
          class="grid size-12 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_10%,white)] ring-1 ring-[color-mix(in_oklab,var(--accent)_22%,transparent)] md:-ml-12 md:size-9 lg:-ml-15 lg:size-10 dark:bg-[color-mix(in_oklab,var(--accent)_11%,var(--color-zinc-900))] dark:ring-[color-mix(in_oklab,var(--accent)_26%,transparent)]"
          aria-hidden="true"
        >
          {@render mark("size-8 md:size-6 lg:size-7")}
        </span>
      {/if}
      <!-- The tile centers on the row; title and year share a baseline, as in the plain entries. -->
      <div class="flex min-w-0 flex-1 items-baseline gap-3">
        {@render heading("text-xl sm:text-2xl")}
        {@render yearLabel()}
      </div>
    </div>
    <p class="mt-4 text-pretty text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
      {@render children?.()}
    </p>
    <StackTags {tags} class="mt-4" />
  </li>
{:else}
  <li
    class="group/entry relative max-w-xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-sky-500/80"
  >
    <!-- Title and year share a baseline; the mark centers on the title's capitals. -->
    <div class="flex items-baseline gap-3">
      {#if icon && !compact}
        {@render mark(
          "size-7 self-center md:absolute md:right-full md:top-0.5 md:mr-3 lg:top-0 lg:size-8 lg:mr-5",
        )}
      {/if}
      {@render heading(compact ? "text-lg" : "text-xl sm:text-2xl")}
      {@render yearLabel()}
    </div>
    <p
      class="text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300 {compact
        ? 'mt-1 text-[0.9375rem]'
        : 'mt-2 text-base'}"
    >
      {@render children?.()}
    </p>
    <StackTags {tags} class={compact ? "mt-2" : "mt-3"} />
  </li>
{/if}
