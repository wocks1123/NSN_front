<template>
  <div>
    <div
      v-if="posts.length > 0"
      v-scroll-bottom="onBottomScroll"
      class="grid grid-cols-3 gap-1 md:gap-6 w-full "
    >
      <ProfilePostCard
        @click="clickPostCard(post)"
        v-for="(post, i) in posts"
        :key="i"
        :post="post"
      />
    </div>
    <div
      v-if="$auth.user.user_id === $route.params.id & posts.length === 0"
      class="flex flex-col justify-center items-center"
    >
      <div
        class="
          flex items-center justify-center
          w-16 h-16 rounded-full border-2 border-black
          mb-4 mt-8
        "
      >
        <b-icon icon="camera" scale="2.25"/>
      </div>
      <div
        class="text-2xl font-bold mb-2"
      >
        사진 공유
      </div>
      <div
        class="text-sm mb-4"
      >
        사진을 공유하면 회원님의 프로필에 표시됩니다.
      </div>
      <div
        @click="postCreateModal = true"
        class="text-sm cursor-pointer text-blue-500 font-bold"
      >
        첫 사진 공유하기
      </div>

      <ModalPostCreate v-if="$auth.user" v-model="postCreateModal"/>
    </div>
    <div
      v-if="$auth.user.user_id !== $route.params.id & posts.length === 0"
      class="flex flex-col justify-center items-center"
    >
      <div>
        <div
          class="
          flex items-center justify-center
          w-16 h-16 rounded-full border-2 border-black
          mb-4 mt-8
        "
        >
          <b-icon icon="camera" scale="2.25"/>
        </div>
        <div
          class="text-2xl font-bold mb-2"
        >
          게시물 없음
        </div>


      </div>
    </div>


<!--    <ModalPostRead v-model="postReadModal" :postId="showPost"/>-->
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    lastUpdated: false,
    loading: false,

    postCreateModal: false,
    // postReadModal: false,
    // showPost: null,
  }),
  async asyncData ({ $axios, route }) {
    let { data } = await $axios.get(
      "/posts/users/" + route.params.id,
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
    },
    clickPostCard(post) {
      this.$router.push("/post/" + post.id)
    //   this.postReadModal = true
    //   this.showPost = post.id
    }
  },
}
</script>

<style scoped>

</style>
