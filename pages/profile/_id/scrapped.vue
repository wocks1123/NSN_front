<template>
  <div
    v-scroll-bottom="onBottomScroll"
    class="grid grid-cols-3 gap-1 md:gap-6 w-full "
  >
    <ProfilePostCard
      v-for="(post, i) in posts"
      :key="i"
      :post="post"
    />
  </div>
</template>

<script>
export default {
  name: "scrapped",
  data: () => ({
    lastUpdated: false,
    loading: false,
  }),
  async asyncData ({ $axios, route }) {
    let { data } = await $axios.get(
      "/posts/scraps",
      {
        params: {
          user_id: route.params.id
        }
      }
    )
    let cursor = 0
    if (data.length) {
      cursor = data[data.length - 1].id
    }

    return { posts: data, cursor: cursor }
  },
  methods: {
    onBottomScroll(e) {
      if (this.lastUpdated) return
      if (this.loading) return

      this.loading = true
      this.$axios.$get(
        "/posts/users/" + this.$route.params.id,
        {
          params: {
            cursor: this.cursor
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
        }).then(
        this.loading = false
      )
    }
  }
}
</script>

<style scoped>

</style>
