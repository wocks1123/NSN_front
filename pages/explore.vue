<template>
  <div
    v-scroll-bottom="onBottomScroll"
    ref="wrapper"
    class="flex flex-col justify-center w-screen sm:w-full p-2 min-h-screen"
  >
    <div
      ref="wrapperInner"
      class="flex flex-col items-center"
    >
      <PostCard
        v-for="(post, i) in posts"
        :key="i"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';


export default {
  name: "explore",
  data: () => ({
    lastUpdated: false,
    socket: null
  }),
  async asyncData ({ $axios, $auth }) {
    let { data } = await $axios.get(
      "/posts/explore",
      {
        params: {
          reader: $auth.user.user_id
        }
      }
    )
    let cursor = 0
    if (data.length) {
      cursor = data[data.length - 1].id
    }

    return { posts: data, cursor: cursor }
  },
  mounted() {
    // this.socket = io('ws://localhost:8000/ws/1')

  },
  methods: {
    onBottomScroll(e) {
      if (this.lastUpdated) return

      this.$axios.$get(
        this.$axios.defaults.baseURL + "/posts/",
        {
          params: {
            cursor: this.cursor,
            reader: this.$auth.user.user_id
          }
        }
      ).then((res) => {
        if (res.length === 0) {
          this.lastUpdated = true
          return
        }
        this.posts.push(...res)
        let lastPost = this.posts.slice(-1)
        this.cursor = lastPost[0].id
      })
        .catch((err) => {
          // console.log("err", err)
        })
    },
  }
}
</script>

<style scoped>

</style>
