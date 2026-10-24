<script>
  import Section from "../lib/ui/Section.svelte";
  import Container from "../lib/ui/Container.svelte";
  import Columns from "../lib/ui/Columns.svelte";
  import ExternalLink from "../lib/ui/ExternalLink.svelte";
  import IconGithub from "../lib/icons/IconGithub.svelte";
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

  /** A few picks, not the whole record: the pinned projects, in listed order. The rest are on GitHub. */
  const picks = projects.filter((p) => p.pinned === true);
</script>

<Section id="projects">
  <Container>
    <Columns title="Side projects">
      <ul class="space-y-10">
        {#each picks as p (p.title)}
          <Project
            url={p.url}
            title={p.title}
            tags={p.tags}
            year={p.year}
            icon={iconUrl(p.icon)}
            iconMono={p.iconMono === true}
          >
            {p.description}
          </Project>
        {/each}
      </ul>
      <p class="mt-10 text-base sm:text-lg">
        <ExternalLink
          href="https://github.com/theseems"
          icon={IconGithub}
          data-umami-event="social_click"
          onclick={() => trackEvent("social_click", { platform: "github", placement: "projects" })}
          >More projects on GitHub</ExternalLink
        >
      </p>
    </Columns>
  </Container>
</Section>
