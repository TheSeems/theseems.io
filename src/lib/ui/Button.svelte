<script>
  let {
    href = null,
    variant = "primary",
    class: className = "",
    children,
    ...rest
  } = $props();

  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-[transform,box-shadow,background-color,color,border-color] duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500/80";

  /** @type {Record<string, string>} */
  const variants = {
    primary:
      "border border-zinc-200/80 bg-white/70 text-zinc-900 shadow-[var(--shadow-soft)] backdrop-blur-md hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:shadow-[var(--shadow-soft-dark)] dark:hover:bg-zinc-900/80",
    ghost:
      "border border-transparent bg-transparent text-zinc-600 hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:bg-zinc-900/60",
    nav: "border border-zinc-200/70 bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white",
  };

  let classes = $derived(`${base} ${variants[variant] ?? variants.primary} ${className}`);
</script>

{#if href}
  <a class={classes} {href} {...rest}>{@render children?.()}</a>
{:else}
  <button type="button" class={classes} {...rest}>{@render children?.()}</button>
{/if}
