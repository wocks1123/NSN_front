<template>
  <button
    @click="clickButton"
    class="w-8 h-8"
  >
    <b-icon
      v-if="!scrapped"
      icon="bookmark" class="svg-block w-5 h-5"
    />
    <b-icon
      v-if="scrapped"
      icon="bookmark-fill" class="svg-block w-5 h-5"
    />
  </button>
</template>

<script>
export default {
  name: "BookmarkButton",
  props: {
    value: {
      type: Boolean
    },
    postId: {
      type: Number
    },
    userId: {
      type: String
    }
  },
  data: () => ({
    scrapped: false
  }),
  mounted() {
    this.scrapped = this.value
  },
  methods: {
    async clickButton() {
      // 스크랩 -> 취소
      if (this.scrapped) {
        let res = await this.$axios.delete(
          "/scraps",
          {
            data: {
              post_id: this.postId,
              user_id: this.$auth.user.user_id
            }
          }
        )
      }
      else {
        let res = await this.$axios.post(
          "/scraps",
          {
            post_id: this.postId,
            user_id: this.$auth.user.user_id
          }
        )
      }
      this.scrapped = !this.scrapped
    }
  }

}
</script>
