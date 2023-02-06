<template>
  <!-- Wrapper -->
  <div
    class="flex justify-center"
  >
  <div
    class="w-240"
  >
    <div
      class="flex justify-center md:pt-8 pb-16"
    >
      <!-- Modal -->
      <ModalBase v-model="modal" classVal="">
        <div class=" gap-2 text-center w-40 divide-y-2">
          <div
            v-for="(item, i) in modalItems"
            @click="clickModalItem(i)"
            class="p-2 cursor-pointer hover:bg-gray-100"
            :class="item.classVal"
          >
            {{item.text}}
          </div>
        </div>
      </ModalBase>

      <!-- Post Card-->
      <div
        class="
          bg-white
          border-2
          flex
          flex-col
          md:flex-row
          shadow-md
          w-full
        "
      >
        <!-- Mobile Header -->
        <div
          class=" md:hidden flex justify-between items-center h-16 p-4 border-b-2"
        >
          <div class="flex items-center">
            <img
              :src="$axios.defaults.baseURL + '/media/' + post.author.profile_image_path"
              class="w-10 rounded-full"
              alt="Profile Image"
            />
            <div class="ml-4 text-xs font-bold">
              {{post.author.user_id}}
            </div>
          </div>

          <div>
            <button
              @click="modal = true"
              class="cursor-pointer"
            >
              <b-icon icon="three-dots" />
            </button>
          </div>

        </div>


        <!-- Picture Area-->
        <div
          class="bg-black flex-grow"
        >
          <Carousel :sources="post.media.map(({identifier}) => identifier)"/>
        </div>

        <!-- Comment Area -->
        <div
          class="border-l-2 w-full md:w-80 flex flex-col"
        >

          <!-- Author Area -->
          <div class="hidden md:flex justify-between items-center h-16 p-4 border-b-2">
            <div class="flex items-center">
              <img
                :src="$axios.defaults.baseURL + '/media/' + post.author.profile_image_path"
                class="w-10 rounded-full"
                alt="Profile Image"
              />
              <div class="ml-4 text-xs font-bold">
                {{post.author.user_id}}
              </div>
            </div>

            <div>
              <button
                @click="modal = true"
                class="cursor-pointer"
              >
                <b-icon icon="three-dots" />
              </button>
            </div>

          </div>

          <!-- Comment Area-->
          <div
            class="flex-grow h-60 overflow-y-scroll no-scrollbar pb-2"
          >
            <!-- Author content -->
            <div class="flex p-2">
              <div
                class="m-1 flex flex-shrink-0"
              >
                <img
                  :src="$axios.defaults.baseURL + '/media/' + post.author.profile_image_path"
                  class="w-10 h-10 object-fill rounded-full"
                  alt="Profile Image"
                />
              </div>

              <div class=" leading-5 ml-2 items-center flex-grow pr-1">
                <div>
                  <span class="font-bold text-sm">
                    {{post.author.user_id}}
                  </span>
                  <span class="text-sm ml-1 break-all">
                    {{post.content}}
                  </span>
                </div>
                <div>
                  <span
                    class="text-xs text-gray-400"
                  >
                    {{ $elapsedTime(post.created_at) }}
                  </span>
                  <span
                    v-if="post.liked_count > 0"
                    class="text-xs font-bold text-gray-400"
                  >
                    좋아요 {{ post.liked_count }}개
                  </span>
                </div>
              </div>

            </div>

            <!-- Comment Card -->
            <div class="gap-2 flex flex-col">
              <PostCommentCard
                v-for="(comment, i) in post.comments"
                :key="i"
                :comment="comment"
              />
            </div>


          </div>

          <!-- Info Area -->
          <div
            class="flex-none border-t-2 "
          >
            <div class="p-2">
              <!-- Buttons -->
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
                      class="w-8 h-8 hover:text-gray-500"
                    >
                      <b-icon icon="chat" class="svg-block w-5 h-5"/>
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    class="w-8 h-8 hover:text-gray-500"
                  >
                  <b-icon icon="bookmark" class="svg-block w-5 h-5"/>
                  </button>
                </div>
              </div>

              <!-- Info Area -->
              <div class="">
                <div
                  v-if="post.liked_count > 0"
                  class="text-sm font-bold"
                >
                  좋아요 {{post.liked_count}}개
                </div>
                <div  class="text-xs">
                  {{$elapsedTime(post.created_at)}}
                </div>
              </div>
            </div>

            <!-- Comment Writing -->
            <div
              class="border-t-2 p-2"
            >
              <CommentInput :postId="post.id" :userId="$auth.user.user_id" />
            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- More Post Area -->
    <div
      class="pt-8 border-t-2"
    >
      <div class="text-sm py-2">
        <span
          @click="$router.push('/profile/' + post.author.user_id)"
          class="font-bold cursor-pointer"
        >
          {{post.author.user_id}}
        </span>
        님의 게시물 더 보기
      </div>

      <!-- Post Grid -->
      <div
        class="grid grid-cols-3 gap-1 md:gap-6 w-full "
      >
        <ProfilePostCard
          v-for="(post, i) in posts"
          :key="i"
          :post="post"
        />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "id",

  data: () => ({
    modal: false,
    modalItems: [
      { text: "신고", classVal: 'text-red-500' },
      { text: "취소", classVal: '' },
    ]
  }),
  async asyncData ({ $axios, route, $auth }) {
    let postResponse = await $axios.get(
      "/posts/" + route.params.id,
      {
        params: {
          reader: $auth.user.user_id
        }
      }
    )

    let { data } = await $axios.get(
      "/posts/users/" + postResponse.data.author.user_id,
    )

    return { post: postResponse.data, posts: data}
  },
  mounted() {

  },
  methods: {
    clickModalItem(i) {
      if (i === 0) {

      } else if (i === 1) {
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
    },

  }
}
</script>

<style scoped>

</style>



