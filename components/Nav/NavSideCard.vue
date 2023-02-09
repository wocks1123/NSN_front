<template>
  <div
    id="nav-side"
    :class="value ? 'nav-side-open z-20' : 'nav-side-close z-10'"
    class="
      nav-side-transition
      bg-white
      absolute top-0 left-16 w-96 h-screen
      border-r-2
    "
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "NavSideCard",
  props: ['value'],
  methods: {
  }
}
</script>

<style scoped>

</style>
