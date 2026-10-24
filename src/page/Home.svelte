<script>
  import Section from "../lib/ui/Section.svelte";
  import Container from "../lib/ui/Container.svelte";
  import ExternalLink from "../lib/ui/ExternalLink.svelte";
  import Button from "../lib/ui/Button.svelte";
  import IconCv from "../lib/icons/IconCv.svelte";
  import mePhoto from "../assets/me.png";
  import SocialLinks from "../lib/SocialLinks.svelte";
  import { trackEvent } from "../lib/metrics.js";
</script>

<Section id="home" class="!pt-1 sm:!pt-6 md:!pt-16">
  <Container>
    <div
      class="flex w-full flex-col items-center gap-8 md:flex-row md:items-center md:gap-14"
    >
      <div class="w-full max-w-56 shrink-0 md:w-64 md:max-w-none lg:w-72">
        <!-- Fixed ratio: the portrait's shape shouldn't depend on how long the copy is. -->
        <img
          src={mePhoto}
          alt="Portrait of Alexey Akhundov"
          width="280"
          height="350"
          class="aspect-4/5 w-full rounded-2xl object-cover object-[center_10%] shadow-[var(--shadow-soft)] ring-1 ring-zinc-200/80 dark:shadow-[var(--shadow-soft-dark)] dark:ring-zinc-700/80"
        />
      </div>

      <div class="min-w-0 flex-1 text-center md:text-left">
        <h1
          class="mt-0 text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-zinc-50"
        >
          Alexey Akhundov
        </h1>
        <!-- Handle + role read as one line: the mono voice marks it as identity, not prose. -->
        <p
          class="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-lg font-medium leading-snug text-zinc-600 sm:text-xl md:justify-start dark:text-zinc-400"
        >
          <span class="font-mono text-base font-normal tracking-tight text-zinc-400 sm:text-lg dark:text-zinc-500"
            >@theseems</span
          >
          <span
            class="hidden h-4 w-px shrink-0 bg-zinc-300 sm:inline-block dark:bg-zinc-700"
            aria-hidden="true"
          ></span>
          <span class="text-balance">Software Engineer · Data Platform · Backend</span>
        </p>
        <p
          class="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg md:mx-0 dark:text-zinc-300"
        >
          I work at
          <ExternalLink href="https://www.databricks.com/company/about-us">Databricks</ExternalLink>
          and graduated from
          <!-- Keeps the sentence-ending period from wrapping away from the link's icon. -->
          <span class="whitespace-nowrap"
            ><ExternalLink href="https://cs.hse.ru/en">HSE</ExternalLink>.</span
          > Outside work: open source, homelabs, and distributed systems.
        </p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-y-4 md:justify-start">
          <Button
            href="https://theseems.io/cv"
            variant="nav"
            target="_blank"
            rel="noreferrer"
            class="h-12 px-6 text-base"
            onclick={() => trackEvent("cv_click", { placement: "hero" })}
          >
            View CV
            <IconCv class="h-4 w-4" aria-hidden="true" />
          </Button>
          <SocialLinks class="ml-5" placement="hero" />
        </div>
      </div>
    </div>
  </Container>
</Section>
