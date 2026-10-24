<script>
  /**
   * The page grid. From md: a label column as wide as the hero portrait, then the main column, so
   * the hero text, every section and the footer start on the same edge. Below md they stack.
   * `title` renders the section heading in the label column; `aside` replaces it (the portrait).
   * Columns are top-aligned: with Inter, a heading's capitals then sit within about a pixel of the
   * first line beside it. When a framed box comes first instead, set `alignTitleToBox` so the
   * capitals start at the box's top edge, as the hero name does at the portrait's.
   */
  let {
    title = null,
    alignTitleToBox = false,
    aside = null,
    class: className = "",
    children,
  } = $props();
</script>

<div
  class="grid gap-y-5 md:grid-cols-[12rem_minmax(0,1fr)] md:items-start md:gap-x-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-x-14 {className}"
>
  <div class="min-w-0">
    {#if aside}
      {@render aside()}
    {:else if title}
      <h2
        class="text-balance text-2xl font-semibold tracking-tight text-zinc-900 lg:text-3xl dark:text-zinc-50 {alignTitleToBox
          ? 'md:trim-cap'
          : ''}"
      >
        {title}
      </h2>
    {/if}
  </div>
  <div class="min-w-0">
    {@render children?.()}
  </div>
</div>
