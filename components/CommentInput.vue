<template>
  <div class="flex">
    <div class="items-center flex">
      <button class="">
        <b-icon class="svg-block" icon="emoji-smile" font-scale="1.5" />
      </button>
    </div>
    <div class="flex-grow items-center flex">
      <ExpandableTextarea
        v-model="content"
        :maxRow="5"
      />
    </div>
    <div class="items-center flex">
      <button
        :disabled="content.length === 0"
        :class="[
          content.length === 0 ?
            'text-blue-200' : 'text-blue-400'
        ]"
        @click="clickPost"
        class="font-bold "
      >
        게시
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentInput",
  props: ["postId", "userId"],
  data: () => ({
    content: ""
  }),
  methods: {
    async clickPost() {
      console.log("userId", this.userId)
      console.log("postId", this.postId)
      console.log("content", this.content)

      await this.$axios.post(
        "/comments/",
        {
          post_id: parseInt(this.postId),
          author_id: this.userId,
          content: this.content
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
