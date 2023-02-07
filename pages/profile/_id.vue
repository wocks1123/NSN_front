<template>
  <!-- Wrapper -->
  <div
    class="md:p-4 flex justify-center min-h-screen"
  >
    <div class="w-240">

    <ModalBase v-model="modal" classVal="rounded-xl">
      <div class="rounded-lg gap-2 text-center w-60 divide-y-2">
        <div
          v-for="(item, i) in modalItems"
          @click="clickModalItem(i)"
          class="p-2 cursor-pointer hover:bg-gray-100"
        >
          {{item.text}}
        </div>
      </div>
    </ModalBase>
    <ModalProfileEdit :user="user" v-model="profileEditModal" />
    <ModalPasswordEdit v-model="passwordEditModal" />
    <ModalProfileFollower v-model="profileFollowerModal"/>
    <ModalProfileFollowing v-model="profileFollowingModal"/>

      <!-- Profile Area -->
    <div class="flex p-4">

      <!-- Left -->
      <div class="mr-4 md:w-72 flex md:justify-center">
        <img
          :src="$axios.defaults.baseURL + '/media/' + user.profile_image_path"
          class="w-20 md:w-44 rounded-full"
          alt="profile image"
        />
      </div>

      <!-- Right -->
      <div>
        <!-- -->
        <div class="flex items-center">
          <div class="mr-4 text-xl font-bold">
            {{ user.user_id }}
          </div>
          <div
            v-if="$auth.user.user_id === user.user_id"
          >
            <button @click="modal=true">
              <b-icon icon="gear-wide" font-scale="1.5"/>
            </button>
          </div>
          <div
            class="hidden md:flex"
            v-if="$auth.user.user_id !== user.user_id"
          >
            <FollowButton
              :userId="user.user_id"
              :follow="user.followed"
            />

            <button class="items-center text-center">
              <b-icon class="text-2xl ml-2" icon="three-dots" />
            </button>

          </div>

        </div>

        <div class="hidden mt-6 md:flex">
          <div class="flex text-lg mr-6">
            <div class="mr-1">
              게시물
            </div>
            <div class="font-bold">
              {{ user.post_count }}
            </div>
          </div>
          <div
            @click="profileFollowerModal = true"
            class="flex text-lg mr-6 cursor-pointer"
          >
            <div class="mr-1">
              팔로워
            </div>
            <div class="font-bold">
              {{ user.follower_count }}
            </div>
          </div>
          <div
            @click="profileFollowingModal = true"
            class="flex text-lg cursor-pointer"
          >
            <div class="mr-1">
              팔로우
            </div>
            <div class="font-bold">
              {{ user.following_count }}
            </div>
          </div>
        </div>

        <div class="md:flex mt-6">
          {{ user.profile_message }}
        </div>

      </div>

    </div>

    <div class="border-t-2 border-color-gray-200 md:border-hidden grid grid-cols-3 justify-items-center block md:hidden p-2">
      <div class="text-center cursor-pointer">
        <div>
          게시물
        </div>
        <div>
          {{ user.post_count }}
        </div>
      </div>

      <div
        @click="profileFollowerModal = true"
        class="text-center cursor-pointer"
      >
        <div>
          팔로워
        </div>
        <div>
          {{ user.follower_count }}
        </div>
      </div>
      <div
        @click="profileFollowingModal = true"
        class="text-center cursor-pointer"
      >
        <div>
          팔로우
        </div>
        <div>
          {{ user.following_count }}
        </div>
      </div>
    </div>

    <!-- Tab Area -->
    <div class="w-full">
      <Tab />
    </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "id",
  auth: true,
  async asyncData ({ $axios, route, $auth }) {
    let { data } = await $axios.get(
      "/users/" + route.params.id,
      {
        params: {
          reader: $auth.user.user_id
        }
      }
    )
    return { user: data }
  },
  data: () => ({
    modal: false,
    profileEditModal: false,
    profileFollowerModal: false,
    profileFollowingModal: false,
    passwordEditModal: false,
    modalItems: [
      {
        'text': '프로필 편집'
      },
      {
        'text': '비밀번호 변경'
      },
      {
        'text': '로그아웃'
      },
      {
        'text': '취소'
      },
    ]
  }),
  methods: {
    closeModal() {
      this.modal = false
    },
    clickModalItem(i) {
      if (i === 0) {
        this.modal = false
        this.profileEditModal = true
      }
      else if (i === 1) {
        this.modal = false
        this.passwordEditModal = true
      }
      else if (i === 2) {
        this.$auth.logout()
      }
      else if (i === 3) {
        this.modal = false
      }
    },
    async clickFollowButton() {
      let res = await this.$axios.post(
        "/follows/",
        {
          from_user: this.$auth.user.user_id,
          to_user: this.$route.params.id,
          follow_type: "ACCEPT",
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
