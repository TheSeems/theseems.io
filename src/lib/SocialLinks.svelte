<script>
  import IconGithub from "./icons/IconGithub.svelte";
  import IconLinkedin from "./icons/IconLinkedin.svelte";
  import IconTelegram from "./icons/IconTelegram.svelte";
  import IconMail from "./icons/IconMail.svelte";
  import { email } from "./contact.js";
  import { trackEvent } from "./metrics.js";

  let { class: className = "", placement = "unknown" } = $props();

  /** Secondary to the solid button beside them (View CV, the email): smaller, quieter, no shadow. */
  const linkClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/60 text-zinc-600 backdrop-blur transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white";

  /** @param {string} platform */
  function socialClick(platform) {
    trackEvent("social_click", { platform, placement });
  }
</script>

<nav class="{className} flex items-center justify-center gap-4" aria-label="Social links">
  <a
    class={linkClass}
    href="https://github.com/theseems"
    target="_blank"
    rel="noreferrer noopener"
    aria-label="GitHub"
    data-umami-event="social_click"
    onclick={() => socialClick("github")}
  >
    <IconGithub class="h-5 w-5" aria-hidden="true" />
  </a>
  <a
    class={linkClass}
    href="https://www.linkedin.com/in/theseems"
    target="_blank"
    rel="noreferrer noopener"
    aria-label="LinkedIn"
    data-umami-event="social_click"
    onclick={() => socialClick("linkedin")}
  >
    <IconLinkedin class="h-5 w-5" aria-hidden="true" />
  </a>
  <a
    class={linkClass}
    href="https://t.me/theseems"
    target="_blank"
    rel="noreferrer noopener"
    aria-label="Telegram"
    data-umami-event="social_click"
    onclick={() => socialClick("telegram")}
  >
    <IconTelegram class="h-5 w-5" aria-hidden="true" />
  </a>
  {#if placement === "hero"}
      <a
        class={linkClass}
        href="mailto:{email}"
        aria-label="Email"
        data-umami-event="social_click"
        onclick={() => socialClick("email")}
      >
        <IconMail class="h-5 w-5" aria-hidden="true" />
      </a>
  {/if}
</nav>
