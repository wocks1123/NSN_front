<template>
  <div class="relative">
    <!-- Carousel Wrapper -->
    <div
      class="relative w-full h-120 overflow-hidden"
    >
      <button
        @click="clickLeft"
        v-if="currIdx !== 0"
        class="
          rounded-full w-8 h-8 flex items-center justify-center
          absolute z-30 bottom-1/2 left-1
          bg-gray-200 hover:bg-gray-300
        "
      >
        <b-icon icon="caret-left-fill" class="font-bold"/>
      </button>
      <button
        @click="clickRight"
        v-if="currIdx !== classList.length - 1"
        class="
          rounded-full w-8 h-8 flex items-center justify-center
          absolute z-30 bottom-1/2 right-1
          bg-gray-200 hover:bg-gray-300
        "
      >
        <b-icon icon="caret-right-fill"/>
      </button>

      <!-- Indicators -->
      <div
        class="z-40 absolute transform -translate-x-1/2 left-1/2 bottom-4 flex justify-center items-center gap-1"
      >
        <div
          v-if="classList > 1"
          v-for="(item, i) in classList"
          class="w-1.5 h-1.5 border rounded-full"
          :class="currIdx === i ?
                    'bg-blue-700 border-blue-700' : 'bg-gray-100 border-gray-500'"
        />
      </div>

      <div
        v-for="(src, i) in sources"
        :key="i"
        class="
          flex items-center
          absolute
          duration-700 ease-in-out w-full h-full
          transition-all transform
        "
        :class="classList[i]"
      >
        <img
          class="w-full object-fit"
          :src="$axios.defaults.baseURL + '/images/' + src"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: ["sources"],
  data: () => ({
    classList: [],
    currIdx: 0,
  }),
  created() {

  },
  mounted() {
    for (let i = 0; i < this.sources.length; i++) {
      this.classList.push({
        'translate-x-0': false,
        'translate-x-full': true,
        '-translate-x-full': false,
        'z-10': false,
        'z-20': false,
      })
    }
    this.classList[0]['translate-x-0'] = true
    this.classList[0]['translate-x-full'] = false
    this.classList[0]['z-10'] = false
    this.classList[0]['z-20'] = false

    this.currIdx = 0
  },
  methods: {
    clickRight() {
      if (this.currIdx === this.classList.length - 1) return

      //현재 앞에있는걸 왼쪽으로
      this.classList[this.currIdx]['translate-x-0'] = false
      this.classList[this.currIdx]['translate-x-full'] = false
      this.classList[this.currIdx]['-translate-x-full'] = true
      this.classList[this.currIdx]['z-10'] = false
      // this.classList[this.currIdx]['z-20'] = true

      // 오른쪽 있는걸 앞으로
      let rightIdx = this.currIdx + 1 === this.classList.length ? 0 : this.currIdx + 1
      this.classList[rightIdx]['translate-x-0'] = true
      this.classList[rightIdx]['translate-x-full'] = false
      this.classList[rightIdx]['-translate-x-full'] = false
      this.classList[rightIdx]['z-10'] = false
      // this.classList[rightIdx]['z-20'] = true

      this.currIdx = rightIdx
    },
    clickLeft() {
      if (this.currIdx === 0) return

      //현재 앞에있는걸 오른쪽으로
      this.classList[this.currIdx]['translate-x-0'] = false
      this.classList[this.currIdx]['translate-x-full'] = true
      this.classList[this.currIdx]['-translate-x-full'] = false
      this.classList[this.currIdx]['z-10'] = false
      // this.classList[this.currIdx]['z-20'] = true

      // 왼쪽 있는걸 앞으로
      let leftIdx = this.currIdx - 1 >= 0 ? this.currIdx - 1 : this.classList.length - 1
      this.classList[leftIdx]['translate-x-0'] = true
      this.classList[leftIdx]['translate-x-full'] = false
      this.classList[leftIdx]['-translate-x-full'] = false
      this.classList[leftIdx]['z-10'] = false
      // this.classList[leftIdx]['z-20'] = true

      this.currIdx = leftIdx
    },
  }
}
</script>

<style scoped>

</style>

