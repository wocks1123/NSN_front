<template>
  <div
    @mouseover="mouseOver = true"
    @mouseleave="mouseOver = false"
    @click="$emit('click')"
    class="w-full h-full square relative"
  >
    <img
      class="object-cover max-w-full h-full aspect-square"
      :src="$axios.defaults.baseURL + '/media/' + post.media[0].identifier"
      alt="Post"
    />

    <div
      v-if="post.media.length > 1"
      class="absolute top-2 right-2 bg-gray-600 p-1 rounded-md inline-block"
    >
      <b-icon icon="images" class="text-2xl text-white block"/>
    </div>

    <!-- Hover Background -->
    <div
      v-if="mouseOver"
      class="absolute  bottom-0 cursor-pointer h-full w-full bg-gray-700 bg-opacity-40"
    >
      <!-- Hover Info-->
      <div
        class="absolute items-center text-white bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2"
      >
        <div class="flex items-center justify-center w-full">
          <div
            v-if="post.liked_count > 0"
          >
            <b-icon icon="heart-fill" font-scale="1.5"/> {{post.liked_count}}
          </div>
          <div class="ml-5">
            <b-icon icon="chat-fill" font-scale="1.5"/> {{post.comment_count}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
  data: () => ({
    mouseOver: false,
  }),
  methods: {
    clickCard() {
      this.$router.push("/post/" + this.post.id)
    }
  }
}
</script>

<style scoped>

</style>
