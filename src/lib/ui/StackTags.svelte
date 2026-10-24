<script>
  /** A project's stack as chips: the same data voice in Selected work and the index. */
  let { tags = [], class: className = "" } = $props();
</script>

<ul class="flex flex-wrap gap-1.5 {className}" aria-label="Stack">
  {#each tags as tag (tag)}
    <li
      class="rounded-md border border-zinc-200/90 bg-zinc-100/60 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:border-zinc-700/70 dark:bg-zinc-800/40 dark:text-zinc-300"
    >
      {tag}
    </li>
  {/each}
</ul>
