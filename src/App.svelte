<script>
  import Navbar from "./lib/Navbar.svelte";
  import ScrollSpy from "./lib/ScrollSpy.svelte";
  import Home from "./page/Home.svelte";
  import Work from "./page/Work.svelte";
  import Projects from "./page/Projects.svelte";
  import Contact from "./page/Contact.svelte";
  import Footer from "./lib/Footer.svelte";
</script>

<div class="relative min-h-dvh">
  <ScrollSpy />

  <a
    href="#main-content"
    class="fixed left-4 top-4 z-[100] -translate-y-[150%] rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white no-underline opacity-0 shadow-lg transition-[transform,opacity] duration-150 focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 dark:bg-zinc-100 dark:text-zinc-950"
  >
    Skip to content
  </a>

  <div
    class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(14_165_233/0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(56_189_248/0.08),transparent)]"
    aria-hidden="true"
  ></div>

  <Navbar />

  <main id="main-content" class="pb-4 pt-28 sm:pb-6 sm:pt-32">
    <Home />
    <Work />
    <Projects />
    <Contact />
  </main>

  <Footer />
</div>
