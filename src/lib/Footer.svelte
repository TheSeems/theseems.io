<script>
  import Container from "./ui/Container.svelte";
  import Columns from "./ui/Columns.svelte";
  import PrivacyModal from "./PrivacyModal.svelte";

  /** From the first publication (the repo's first commit, 2024) to the year of this build. */
  const years = `2024–${__BUILD_YEAR__}`;

  const sourceHref = "https://github.com/TheSeems/theseems.io";

  /** The commit this page was built from, checkable on GitHub. Hidden in local builds. */
  const sha = /^[0-9a-f]{40}$/.test(__BUILD_SHA__) ? __BUILD_SHA__ : null;

  const linkClass =
    "underline decoration-zinc-400/50 underline-offset-2 transition hover:text-zinc-900 hover:decoration-zinc-600 dark:decoration-zinc-600/50 dark:hover:text-zinc-200";

  const separatorClass = "mx-1.5 select-none";
</script>

<!-- On the main column's edge, like every section above it. -->
<footer class="mb-4 py-6 text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
  <Container>
    <Columns>
      <p>
        © {years} Aleksei Akhundov<span class={separatorClass} aria-hidden="true">·</span><a
          href="#privacy"
          class={linkClass}>Privacy</a
        ><span class={separatorClass} aria-hidden="true">·</span><a
          href={sourceHref}
          target="_blank"
          rel="noreferrer noopener"
          class={linkClass}>Source</a
        >{#if sha}<span class={separatorClass} aria-hidden="true">·</span><span
            class="whitespace-nowrap"
            >Self-hosted, build <a
              href="{sourceHref}/commit/{sha}"
              target="_blank"
              rel="noreferrer noopener"
              class="{linkClass} font-mono">{sha.slice(0, 7)}</a
            ></span
          >{/if}
      </p>
    </Columns>
  </Container>
</footer>

<PrivacyModal />
