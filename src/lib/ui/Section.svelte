<script>
  let { class: className = "", id = undefined, children } = $props();
</script>

<section
  {id}
  class="scroll-mt-28 py-10 sm:scroll-mt-32 sm:py-14 lg:py-16 {className}"
>
  {@render children?.()}
</section>
