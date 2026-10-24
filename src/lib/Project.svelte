<script>
  import ExternalLink from "./ui/ExternalLink.svelte";
  import StackTags from "./ui/StackTags.svelte";
  import IconGithub from "./icons/IconGithub.svelte";
  import { trackEvent } from "./metrics.js";

  let {
    title,
    url = null,
    year = null,
    tags = [],
    icon = null,
    iconMono = false,
    children,
  } = $props();
</script>

<!-- One side project. From md the mark hangs in the gutter, so titles keep the main column's edge.
     The title's link is stretched over the whole entry, so the entry clicks as one. -->
<li
  class="group/entry relative max-w-xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-sky-500/80"
>
  <!-- Title and year share a baseline; the mark centers on the title's capitals. -->
  <div class="flex items-baseline gap-3">
    {#if icon}
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        class="pointer-events-none size-7 shrink-0 select-none self-center object-contain md:absolute md:right-full md:top-0.5 md:mr-3 lg:top-0 lg:size-8 lg:mr-5 {iconMono
          ? 'dark:invert'
          : ''}"
      />
    {/if}
    <h3
      class="min-w-0 text-xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50"
    >
      {#if url}
        <ExternalLink
          href={url}
          variant="card"
          icon={IconGithub}
          class="after:absolute after:inset-0 focus-visible:outline-none"
          data-umami-event="project_click"
          onclick={() => trackEvent("project_click", { title })}
          ><span
            class="decoration-zinc-400 decoration-1 underline-offset-[0.2em] group-hover/entry:underline dark:decoration-zinc-500"
            >{title}</span
          ></ExternalLink
        >
      {:else}
        {title}
      {/if}
    </h3>
    {#if year != null}
      <span
        class="ml-auto shrink-0 font-mono text-sm tabular-nums lining-nums text-zinc-600 dark:text-zinc-400"
        >{year}</span
      >
    {/if}
  </div>
  <p class="mt-2 text-pretty text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
    {@render children?.()}
  </p>
  <StackTags {tags} class="mt-3" />
</li>
