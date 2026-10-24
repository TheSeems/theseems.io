<script>
  let { class: className = "", ...rest } = $props();
</script>

<svg
  width="16"
  height="16"
  class={className}
  viewBox="0 0 16 16"
  fill="none"
  stroke="currentColor"
  stroke-width="1.75"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  {...rest}
>
  <path d="m4 6 4 4 4-4" />
</svg>
