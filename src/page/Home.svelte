<script>
  import Section from "../lib/ui/Section.svelte";
  import Container from "../lib/ui/Container.svelte";
  import Columns from "../lib/ui/Columns.svelte";
  import ExternalLink from "../lib/ui/ExternalLink.svelte";
  import Button from "../lib/ui/Button.svelte";
  import IconCv from "../lib/icons/IconCv.svelte";
  import mePhoto from "../assets/me.png";
  import SocialLinks from "../lib/SocialLinks.svelte";
  import { trackEvent } from "../lib/metrics.js";
</script>

<!-- Shorter bottom than other bands: the portrait already runs below the copy, so a full band gap
     reads as a hole before Work. -->
<Section id="home" class="!pb-6 !pt-1 sm:!pb-8 sm:!pt-6 md:!pt-16">
  <Container>
    <Columns class="gap-y-7">
      {#snippet aside()}
        <!-- Fixed ratio: the portrait's shape shouldn't depend on how long the copy is.
             It fills the label column from md, which sets the edge everything below starts on. -->
        <img
          src={mePhoto}
          alt="Portrait of Aleksei Akhundov"
          width="280"
          height="350"
          class="aspect-4/5 w-40 rounded-2xl object-cover object-[center_10%] shadow-[var(--shadow-faint)] ring-1 ring-zinc-200/80 sm:w-48 md:w-full dark:shadow-[var(--shadow-soft-dark)] dark:ring-zinc-700/80"
        />
      {/snippet}

      <!-- trim-cap: the name's capitals start exactly at the portrait's top edge. -->
      <h1
        class="text-balance text-4xl font-bold tracking-[-0.02em] text-zinc-900 font-stretch-expanded sm:text-5xl md:trim-cap lg:text-6xl dark:text-zinc-50"
      >
        Aleksei Akhundov
      </h1>
      <p
        class="mt-3 text-balance text-lg font-medium leading-snug text-zinc-600 sm:text-xl dark:text-zinc-400"
      >
        Software Engineer · Data Systems · Backend
      </p>
      <!-- Place and handle share one quiet line; the mono voice marks the handle as identity. -->
      <p
        class="mt-1.5 flex flex-wrap items-baseline gap-x-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400"
      >
        <span>Belgrade, Serbia</span>
        <span class="font-mono">@theseems</span>
      </p>
      <!-- Work and study run as one paragraph; life outside work gets its own. -->
      <div
        class="mt-5 max-w-xl space-y-2 text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300"
      >
        <p>
          I'm on the indexing team at <ExternalLink
            href="https://www.databricks.com/company/about-us">Databricks</ExternalLink
          >, making queries fast. Before that: data platforms and backend systems. Graduated from
          <ExternalLink href="https://cs.hse.ru/en">HSE</ExternalLink>.
        </p>
        <p>Outside work: open source, homelabs, and distributed systems.</p>
      </div>
      <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
        <Button
          href="https://theseems.io/cv"
          variant="nav"
          target="_blank"
          rel="noreferrer"
          class="h-12 px-7 text-base"
          onclick={() => trackEvent("cv_click", { placement: "hero" })}
        >
          View CV
          <IconCv class="h-4 w-4" aria-hidden="true" />
        </Button>
        <SocialLinks placement="hero" />
      </div>
    </Columns>
  </Container>
</Section>
