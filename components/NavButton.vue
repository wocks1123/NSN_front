<template>
  <div
    class="
      bg-gray-100
      p-2
    "
  >
    <!-- Inner -->
    <div
      class="
        flex
        items-center
        bg-red-100
        hover:bg-white
        transition-colors
        rounded-full
        h-12
        p-2
        cursor-pointer
      "
      @click="$emit('click', $event)"
    >
      <div class="ml-1 inline-block">
        <b-icon class="svg-block" :icon="computedIcon" font-scale="1.5" />
      </div>
      <div
        v-if="!shorten"
        class="
          ml-2
          hidden
          xl:block
        "
        :class="[selected ? 'font-bold' : 'font-normal']"
      >
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavButton",
  props: ["icon", "text", "shorten", "selected"],
  methods: {
    clickButton(evt) {
      this.$emit('click', evt)
    }
  },
  computed: {
    computedIcon: function () {
      return this.selected ? this.icon + '-fill' : this.icon
    }
  }
}
</script>

<style scoped>
.svg-block {
  display: block;
}
</style>
