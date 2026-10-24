<script>
  import Section from "../lib/ui/Section.svelte";
  import Container from "../lib/ui/Container.svelte";
  import Columns from "../lib/ui/Columns.svelte";
  import SocialLinks from "../lib/SocialLinks.svelte";
  import CopyEmail from "../lib/CopyEmail.svelte";
</script>

<Section id="contact">
  <Container>
    <Columns title="Contact">
      <!-- leading-normal keeps its capitals level with the heading's (relaxed sits ~2px low). -->
      <p
        class="text-pretty text-lg font-medium leading-normal text-zinc-600 sm:text-xl dark:text-zinc-400"
      >
        Open to collaborations, open-source, work.
      </p>

      <!-- The address is the section's primary action, so it carries the primary button weight. -->
      <div class="mt-6 flex flex-wrap items-center gap-5">
        <CopyEmail placement="contact" />
        <SocialLinks placement="contact" />
      </div>
    </Columns>
  </Container>
</Section>
