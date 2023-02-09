<template>
  <div class="flex px-2">
    <div
      class="m-1 flex flex-shrink-0"
    >
      <img
        :src="$axios.defaults.baseURL + '/media/' + comment.author.profile_image_path"
        class="w-10 h-10 object-fill rounded-full"
        alt="Profile Image"
      />
    </div>

    <div class=" leading-5 ml-2 items-center flex-grow">
      <div>
        <span class="font-bold text-sm">
          {{ comment.author.user_id }}
        </span>
        <span class="text-sm ml-1 break-all">
          {{ comment.content }}
        </span>
      </div>
      <div>
        <span class="text-xs text-gray-400"> {{$elapsedTime(comment.created_at)}} </span>
        <span
          v-if="comment.liked_count > 0"
          class="text-xs font-bold text-gray-400"
        >
          좋아요 {{comment.liked_count}}개
        </span>
      </div>
    </div>


    <div class="m-2">
      <button
        @click="clickHeartButton"
        class="w-8 h-8"
      >
        <b-icon
          v-if="!comment.is_liked"
          icon="heart" class="svg-block w-5 h-5"
        />
        <b-icon
          v-if="comment.is_liked"
          icon="heart-fill" class="svg-block w-5 h-5 text-red-600"
        />
      </button>
    </div>

  </div>

</template>

<script>
export default {
  name: "CommentCard",
  props: ["comment"],
  methods: {
    async clickHeartButton() {
      // 좋아요 -> 취소
      if (this.comment.is_liked) {
        let res = await this.$axios.delete(
          "/likes/comment",
          {
            data: {
              comment_id: this.comment.id,
              user_id: this.$auth.user.user_id
            }
          }
        )
        this.comment.liked_count -= 1
      }
      else {
        let res = await this.$axios.post(
          "/likes/comment",
          {
            comment_id: this.comment.id,
            user_id: this.$auth.user.user_id
          }
        )
        this.comment.liked_count += 1
      }
      this.comment.is_liked = !this.comment.is_liked
    }
  }
}
</script>

<style scoped>

</style>
