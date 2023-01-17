<template>
  <!-- Wrapper -->
  <div
    v-if="value"
    @click.stop="clickBackground"
    class="
      fixed top-0 left-0 bg-opacity-70
      w-full h-full bg-black z-50
    "
  >
    <div
      class="
        flex
        fixed transform top-1/2 -translate-y-1/2
        left-1/2 -translate-x-1/2
        bg-white
      "
      @click.stop=""
      :class="classVal"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Base",
  props: ['value', 'classVal'],
  methods: {
    clickBackground(evt) {
      this.$emit('input', false)
      this.$emit('close', true)
    }
  }
}
</script>

<style scoped>

</style>
