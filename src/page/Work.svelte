<script>
  import Section from "../lib/ui/Section.svelte";
  import Container from "../lib/ui/Container.svelte";
  import Columns from "../lib/ui/Columns.svelte";

  const lead = "font-semibold text-zinc-900 dark:text-zinc-50";
</script>

<!-- What kind of engineer, not where and when: employment history and details live in the CV.
     Present tense only for what's true of the current job; earlier work stays in the past tense. -->
<Section id="work">
  <Container>
    <Columns title="Work">
      <div
        class="max-w-xl space-y-5 text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300"
      >
        <p>
          <strong class={lead}>Data systems, end to end.</strong>
          I like owning a system the whole way: design, implementation, CI/CD, observability, and being
          on call for it.
        </p>
        <p>
          <strong class={lead}>Making things faster.</strong>
          Much of my work has been about speed: how fast jobs start, tests run, releases ship and queries
          come back.
        </p>
        <p>
          <strong class={lead}>Tools for other engineers.</strong>
          I've built tools my teammates used every day, from CI/CD pipelines to an IntelliJ plugin for data
          engineers.
        </p>
      </div>
    </Columns>
  </Container>
</Section>
