<script>
  import Button from "./ui/Button.svelte";
  import IconCopy from "./icons/IconCopy.svelte";
  import IconCheck from "./icons/IconCheck.svelte";
  import { email } from "./contact.js";
  import { trackEvent } from "./metrics.js";

  let { placement = "unknown" } = $props();

  /** idle | copied | failed — `navigator.clipboard` is absent on http: and can reject. */
  let status = $state("idle");
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timeout;

  async function copyEmail() {
    clearTimeout(timeout);
    try {
      await navigator.clipboard.writeText(email);
      trackEvent("email_copy", { placement });
      status = "copied";
    } catch {
      status = "failed";
    }
    timeout = setTimeout(() => (status = "idle"), 2500);
  }
</script>

<Button variant="nav" onclick={copyEmail} class="h-12 gap-3 px-5">
  <span
    class="font-mono text-base tracking-tight sm:text-lg {status === 'failed'
      ? 'select-all'
      : ''}">{email}</span
  >
  <span class="flex items-center gap-1.5 text-sm opacity-70">
    {#if status === "copied"}
      <IconCheck class="h-4 w-4 text-emerald-400 dark:text-emerald-600" aria-hidden="true" />
      Copied
    {:else if status === "failed"}
      Select to copy
    {:else}
      <IconCopy class="h-4 w-4" aria-hidden="true" />
      Copy
    {/if}
  </span>
</Button>
<p class="sr-only" aria-live="polite">
  {status === "copied"
    ? "Email address copied"
    : status === "failed"
      ? "Could not copy. Select the address to copy it manually."
      : ""}
</p>
