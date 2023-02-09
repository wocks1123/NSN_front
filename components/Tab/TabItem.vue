<template>
  <div
    class="

      md:px-4
      md:py-3

      md:mx-1.5

      cursor-pointer
      text-sm
      border-gray-700
    "
    :class="[selected ? 'border-t-2 font-bold' : '']"
    @click="$emit('click', $event)"
  >
    <div class="hidden md:block">
      <span> <b-icon :icon="icon" :class="mdColor" /> </span>
      <span class="" :class="mdColor"> {{ text }} </span>
    </div>

    <!-- Mobile -->
    <div class="flex text-center md:hidden justify-center items-center h-11">
      <b-icon :icon="icon" font-scale="1.5" :class="mobileColor"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabItem",
  props: ['icon', 'text', 'selected'],
  computed: {
    mdColor: function () {
      return this.selected ? "text-black" : "text-gray-500"
    },
    mobileColor: function () {
      return this.selected ? "text-blue-500" : "text-gray-500"
    },

  },
}
</script>

<style scoped>

</style>
