<template>
  <div>
    <button
      @click="clickButton"
      class="p-1 text-white bg-blue-600 rounded-md text-sm w-20"
    >
      {{ menu[selectedItem].name }}
    </button>
    <div
      v-if="show"
      class="bg-white border-2 absolute w-20 text-sm"
    >
      <div
        @click="clickItem(v, i)"
        v-for="(v, i) in menu"
        :key="i"
        class="w-full text-center hover:bg-gray-200 cursor-pointer"
      >
        {{ v.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownButton",
  props: ['value'],
  data: () => ({
    selectedItem: 0,
    show: false,
    menu: [
      {
        name: "전체 공개",
        value: "ALL"
      },
      {
        name: "친구 공개",
        value: "FOLLOW"
      },
      {
        name: "나만보기",
        value: "ME"
      },
    ]
  }),
  methods: {
    clickButton() {
      this.show = !this.show
    },
    clickItem(v, i) {
      this.selectedItem = i
      this.$emit('input', v.value)
      this.show = false
    }
  }
}
</script>

<style scoped>

</style>
