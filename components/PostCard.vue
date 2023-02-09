<template>
  <div
    class="w-full sm:w-120 m-0 sm:m-2 border-2 bg-white rounded-lg shadow-lg"
  >

    <!-- Header -->
    <div class="p-2 flex justify-between items-center">
      <div class="flex items-center">
        <div
          class="mr-2"
        >
          <img
            :src="$axios.defaults.baseURL + '/media/' + post.author.profile_image_path"
            class="w-8 rounded-full"
            alt="Profile Image"
          />
        </div>

        <div>
          <div class="font-bold text-sm">
            {{ post.author.user_name }}
          </div>
          <div class="text-gray-500 text-xs">
            @{{ post.author.email }}
          </div>
        </div>
      </div>

      <div>
        <button
          @click="modal = true"
          class="hover:text-gray-500"
        >
          <b-icon icon="three-dots" />
        </button>
      </div>
    </div>

    <!-- Post -->
    <div>

      <!-- Pic -->
      <div
        class="bg-black"
      >
        <Carousel :sources="post.media.map(({identifier}) => identifier)"/>
      </div>

      <!-- Post Info -->
      <div class="">
        <!-- Buttons -->
        <div class="px-2">
          <div class="flex justify-between">
            <div class="flex">
              <div>
                <button
                  @click="clickHeartButton"
                  class="w-8 h-8"
                >
                  <b-icon
                    v-if="!post.is_liked"
                    icon="heart" class="svg-block w-5 h-5"
                  />
                  <b-icon
                    v-if="post.is_liked"
                    icon="heart-fill" class="svg-block w-5 h-5 text-red-600"
                  />
                </button>
              </div>
              <div>
                <button
                  class="w-8 h-8"
                >
                  <b-icon icon="chat" class="w-5 h-5"/>
                </button>
              </div>
            </div>

            <div>
              <BookmarkButton
                v-model="post.scrapped"
                :postId="post.id"
                :userId="$auth.user.user_id"
              />
            </div>
          </div>
        </div>

        <div
          v-if="post.liked_count > 0"
          class="px-2 font-bold text-sm"
        >
          좋아요 {{post.liked_count}}개
        </div>
      </div>

      <div class="px-2 py-1 break-all">
        <span class="font-bold text-sm">{{ post.author.user_name }}</span>
        <span class="text-sm">{{ post.content }}</span>
      </div>

      <!-- Comments -->
      <div
        v-if="post.comment_count > 0"
        class="px-2 text-sm text-gray-400 cursor-pointer"
      >
        댓글 {{post.comment_count}}개 모두 보기
      </div>

    </div>

    <!-- Comments -->
    <div class="p-2">
      <div
        class="text-xs text-gray-400"
      >
        {{$elapsedTime(post.created_at)}}
      </div>
    </div>

    <!-- Add Comment -->
    <div class="border-t-2 p-2">
      <CommentInput
        :postId="post.id"
        :userId="post.author.user_id"
      />
    </div>

    <!-- Modal -->
    <ModalBase v-model="modal" classVal="rounded-xl">
      <div class="rounded-lg gap-2 text-center w-60 divide-y-2">
        <div
          v-for="(item, i) in modalItems"
          @click="clickModalItem(i)"
          class="cursor-pointer p-2"
          :class="item.classVal"
        >
          {{item.text}}
        </div>
      </div>
    </ModalBase>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: [ 'post' ],
  data: () => ({
    modal: false,
    modalItems: [
      {
        'text': '신고',
        'classVal': 'text-red-500'
      },
      {
        'text': '게시물로 이동',
        'classVal': ''
      },
      {
        'text': '취소',
        'classVal': ''
      },
    ]
  }),
  mounted() {
    console.log("post in PostCard", this.post)
  },
  methods: {
    clickModalItem(i) {
      if (i === 0) {
        this.modal = false
      }
      else if (i === 1) {
        this.modal = false
        this.$router.push("/post/" + this.post.id)
      }
      else if (i === 2) {
        this.modal = false
      }
    },
    async clickHeartButton() {
      // 좋아요 -> 취소
      if (this.post.is_liked) {
        let res = await this.$axios.delete(
          "/likes/post",
          {
            data: {
              post_id: this.post.id,
              user_id: this.$auth.user.user_id
            }
          }
        )
        this.post.liked_count -= 1
      }
      else {
        let res = await this.$axios.post(
          "/likes/post",
          {
            post_id: this.post.id,
            user_id: this.$auth.user.user_id
          }
        )
        this.post.liked_count += 1
      }
      this.post.is_liked = !this.post.is_liked
    }
  },

}
</script>

<style scoped>

</style>
