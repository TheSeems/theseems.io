<script>
  import Section from "../lib/ui/Section.svelte";
  import Container from "../lib/ui/Container.svelte";
  import SocialLinks from "../lib/SocialLinks.svelte";
  import Button from "../lib/ui/Button.svelte";
  import { trackEvent } from "../lib/metrics.js";

  const email = "me@theseems.io";
  /** idle | copied | failed — `navigator.clipboard` is absent on http: and can reject. */
  let status = $state("idle");
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timeout;

  async function copyEmail() {
    clearTimeout(timeout);
    try {
      await navigator.clipboard.writeText(email);
      trackEvent("email_copy", { placement: "contact" });
      status = "copied";
    } catch {
      status = "failed";
    }
    timeout = setTimeout(() => (status = "idle"), 2500);
  }
</script>

<Section id="contact">
  <Container class="flex flex-col items-center">
    <div class="w-full max-w-3xl text-center">
      <h2
        class="mt-4 text-balance text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50"
      >
        Contact
      </h2>
      <p
        class="mt-5 text-pretty text-xl font-medium leading-relaxed text-zinc-600 sm:text-2xl dark:text-zinc-400"
      >
        Open to collaborations, open-source, work.
      </p>

      <!-- The address is the section's primary action, so it carries the primary button weight. -->
      <div class="mt-7 inline-flex flex-wrap gap-5 items-center justify-center md:justify-start">
      <Button variant="nav" onclick={copyEmail} class="h-12 gap-3 px-5">
        <span
          class="font-mono text-base tracking-tight sm:text-lg {status === 'failed'
            ? 'select-all'
            : ''}">{email}</span
        >
        <span class="flex items-center gap-1.5 text-sm opacity-70">
          {#if status === "copied"}
            <svg
              class="h-4 w-4 text-emerald-400 dark:text-emerald-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Copied
          {:else if status === "failed"}
            Select to copy
          {:else}
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
              <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
            </svg>
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
      <SocialLinks placement="contact" />
    </div>
    </div>
  </Container>
</Section>
