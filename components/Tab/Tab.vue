<template>
  <div>
    <div
      class="
        grid grid-cols-3
        md:flex md:flex-row justify-center align-center
        border-gray-200 border-t-2
      "
    >

      <TabItem
        v-for="(item, i) in items"
        :key="i"
        :icon="item.icon"
        :text="item.text"
        :selected="item.selected"
        @click="itemClick(i)"
      />
  <!--    <BaseIcon class="fill-blue-500" name="solid-home" />-->
  <!--    <b-icon icon="search" color="red" class=""></b-icon>-->
    </div>
    <div>
      <nuxt-child />
    </div>

  </div>
</template>

<script>
export default {
  name: "Tab",
  data: () => ({
    selectedIdx: 0,
    items: [
      {
        text: "게시물",
        icon: 'grid-3x3',
        selected: true,
        to: '/profile/tagged'
      },
      {
        text: "저장됨",
        icon: 'bookmark',
        selected: false,
      },
      {
        text: "좋아요",
        icon: 'hand-thumbs-up',
        selected: false,
      },
    ]
  }),
  methods: {
    itemClick(i) {
      this.items[this.selectedIdx].selected = false
      this.selectedIdx = i
      this.items[this.selectedIdx].selected = true

      if (i === 0) {
        this.$router.push('/profile/' + this.$route.params.id + '')
      }
      else if (i === 1) {
        this.$router.push('/profile/' + this.$route.params.id + '/scrapped')
      }
      else if (i === 2) {
        this.$router.push('/profile/' + this.$route.params.id + '/liked')
      }
    },
  }
}
</script>

<style scoped>

</style>
