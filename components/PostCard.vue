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
            :src="$axios.defaults.baseURL + '/images/' + post.author.profileImagePath"
            class="w-8 rounded-full"
            alt="Profile Image"
          />
        </div>

        <div>
          <div class="font-bold text-sm">
            {{ post.author.userName }}
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
        <Carousel :sources="post.images.map(({path}) => path)"/>
      </div>

      <!-- Post Info -->
      <div class="">
        <!-- Buttons -->
        <div class="px-2">
          <div class="flex justify-between">
            <div class="flex">
              <div>
                <button
                  class="w-8 h-8"
                >
                  <b-icon icon="heart" class="svg-block w-5 h-5" />
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
              <button
                class="w-8 h-8"
              >
                <b-icon icon="bookmark" class="svg-block w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="post.goodCount > 0"
          class="px-2 font-bold text-sm"
        >
          좋아요 {{post.goodCount}}개
        </div>
      </div>

      <div class="px-2 py-1 break-all">
        <span class="font-bold text-sm">{{ post.author.userName }}</span>
        <span class="text-sm">{{ post.content }}</span>
      </div>

      <!-- Comments -->
      <div
        v-if="post.commentCount > 0"
        class="px-2 text-sm text-gray-400 cursor-pointer"
      >
        댓글 {{post.commentCount}}개 모두 보기
      </div>

    </div>

    <!-- Comments -->
    <div class="p-2">
      <div
        class="text-xs text-gray-400"
      >
        {{elapsedTime}}
      </div>
    </div>

    <!-- Add Comment -->
    <div class="border-t-2 p-2">
      <CommentInput
        :postId="post.id"
        :userId="post.author_id"
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

  },
  computed: {
    elapsedTime() {
      const start = new Date(this.post.created_at);
      const end = new Date();

      const diff = (end - start) / 1000;

      const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
      ];

      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0) {
          return `${betweenTime}${value.name} 전`;
        }
      }
      return '방금 전';
    }
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
    }
  },
  async clickGood() {
    await this.$axios.post(
      "/goods/post",
      {
        postId: this.post.id,
        userId: this.$auth.user.userId
      }
    )
  }
}
</script>

<style scoped>

</style>
