<script module>
  /**
   * `default`: body links (sky, underline), no trailing glyph: color and underline already mark them.
   * `card`: heading-style link (inherits text); the caller adds any trailing mark (e.g. GitHub).
   * `quiet`: a standalone link in heading ink with a faint underline, turning link-blue on hover.
   * @type {Record<string, string>}
   */
  const variants = {
    default:
      "font-medium text-sky-700 underline decoration-sky-700/30 decoration-1 underline-offset-[0.22em] transition-colors hover:text-sky-800 hover:decoration-sky-700/60 dark:text-sky-400 dark:decoration-sky-400/35 dark:hover:text-sky-300",
    card: "text-inherit no-underline decoration-transparent transition-colors hover:text-zinc-950 dark:hover:text-zinc-100",
    quiet:
      "font-medium text-zinc-900 underline decoration-zinc-900/20 decoration-1 underline-offset-[0.22em] transition-colors hover:text-sky-700 hover:decoration-sky-700/40 dark:text-zinc-50 dark:decoration-zinc-50/20 dark:hover:text-sky-400 dark:hover:decoration-sky-400/40",
  };
</script>

<script>
  let { href, variant = "default", class: className = "", children, ...rest } = $props();
</script>

<a
  {href}
  target="_blank"
  rel="noreferrer noopener"
  {...rest}
  class="group {variants[variant] ?? variants.default} {className}"
  >{@render children?.()}<span class="sr-only"> (opens in a new tab)</span></a
>
