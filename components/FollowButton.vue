<template>
  <button
    @click="clickButton"
    class="w-20 h-8 rounded-md flex justify-center items-center text-sm font-bold"
    :class="[mode === 'following' ? 'bg-gray-200 hover:bg-gray-300 text-black' : 'bg-blue-500 hover:bg-blue-600 text-white']"
  >
    <div v-if="mode === 'following'">
      팔로잉
    </div>
    <div v-else-if="mode === 'none'">
      팔로우
    </div>
    <div v-else>
      <IconSpinner />
    </div>
  </button>
</template>

<script>
export default {
  name: "FollowButton",
  props: {
    userId: {
      type: String
    },
    follow: {
      type: Boolean
    }
  },
  mounted() {
    this.mode = this.follow ? "following" : "none"
  },
  data: () => ({
    loading: false,
    mode: "following"
  }),
  methods: {
    async clickButton() {
      if (this.mode === "following") {
        // 팔로우 취소
        this.mode = "loading"
        let { data } = await this.$axios.delete(
          "/follows",
          {
            data: {
              from_user_id: this.$auth.user.user_id,
              to_user_id: this.userId,
            }
          }
        )
        this.mode = "none"
      }
      else if (this.mode === "none") {
        // 팔로우 신청
        this.mode = "loading"
        let { data } = await this.$axios.post(
          "/follows/",
          {
            from_user_id: this.$auth.user.user_id,
            to_user_id: this.userId,
            follow_type: "ACCEPT"
          }
        )
        this.mode = "following"
      }
      else {

      }
    }
  }

}
</script>

<style scoped>

</style>
