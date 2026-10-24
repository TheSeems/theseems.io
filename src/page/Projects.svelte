<script>
  import Section from "../lib/ui/Section.svelte";
  import Container from "../lib/ui/Container.svelte";
  import Columns from "../lib/ui/Columns.svelte";
  import ExternalLink from "../lib/ui/ExternalLink.svelte";
  import IconChevronDown from "../lib/icons/IconChevronDown.svelte";
  import Project from "../lib/Project.svelte";
  import projects from "../data/projects.json";
  import { trackEvent } from "../lib/metrics.js";

  /** Year = GitHub repo creation of the linked project. */

  /** Bundled + hashed at build time; keys are file names as written in projects.json. */
  const iconUrls = import.meta.glob("../assets/projects/*.png", {
    eager: true,
    query: "?url",
    import: "default",
  });

  /** @param {string | undefined} name */
  const iconUrl = (name) =>
    name ? (iconUrls[`../assets/projects/${name}`] ?? null) : null;

  /** A few picks, not the whole record: the pinned projects, in listed order. */
  const picks = projects.filter((p) => p.pinned === true);

  /** The Flink work leads, framed; the other picks follow as plain entries. */
  const featured = picks.filter((p) => p.featured === true);
  const others = picks.filter((p) => p.featured !== true);

  /** Everything else, newest first, collapsed behind "Show more" so the picks stay the page. */
  const archive = projects.filter((p) => p.pinned !== true).sort((a, b) => b.year - a.year);

  /** @param {Event} e */
  function onArchiveToggle(e) {
    const open = /** @type {HTMLDetailsElement} */ (e.currentTarget).open;
    if (open) trackEvent("projects_expand", { count: archive.length });
  }
</script>

{#snippet entries(/** @type {typeof projects} */ list, variant = "plain")}
  {#each list as p (p.title)}
    <Project
      url={p.url}
      title={p.title}
      tags={p.tags}
      year={p.year}
      icon={iconUrl(p.icon)}
      iconMono={p.iconMono}
      {variant}
      accent={p.accent}
    >
      {p.description}
    </Project>
  {/each}
{/snippet}

<Section id="projects">
  <Container>
    <!-- The lead card comes first, so the heading's capitals start at its top edge. -->
    <Columns title="Side projects" alignTitleToBox>
      <ul class="space-y-4 sm:space-y-5">
        {@render entries(featured, "featured")}
      </ul>
      <ul class="mt-12 space-y-10">
        {@render entries(others)}
      </ul>

      <!-- A quiet text disclosure, not a button: it mustn't compete with the hero's View CV.
           Native <details> keeps it keyboard- and screen-reader-ready, and find-in-page opens it. -->
      <details class="group/more mt-10" ontoggle={onArchiveToggle}>
        <summary
          class="inline-flex cursor-pointer list-none items-center gap-1.5 text-base font-medium text-zinc-700 transition-colors hover:text-zinc-950 sm:text-lg dark:text-zinc-300 dark:hover:text-white [&::-webkit-details-marker]:hidden"
        >
          <span class="group-open/more:hidden">Show {archive.length} more projects</span>
          <span class="hidden group-open/more:inline">Hide {archive.length} more projects</span>
          <IconChevronDown
            class="size-4 transition-transform duration-200 group-open/more:rotate-180 motion-reduce:transition-none"
          />
        </summary>
        <ul class="mt-8 space-y-7">
          {@render entries(archive, "compact")}
        </ul>
        <p class="mt-10 text-base sm:text-lg">
          <ExternalLink
            href="https://github.com/theseems"
            variant="quiet"
            data-umami-event="social_click"
            onclick={() =>
              trackEvent("social_click", { platform: "github", placement: "projects" })}
            >More projects on GitHub</ExternalLink
          >
        </p>
      </details>
    </Columns>
  </Container>
</Section>
