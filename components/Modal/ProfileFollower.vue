<template>
  <ModalBase
    :value="value" @input="$emit('input', false)"
    @open="modalOpened"
    classVal="w-screen sm:w-96 h-screen sm:h-120 rounded-xl"
  >
    <!-- Wrapper -->
    <div class="w-full">
      <!-- Header -->
      <div class="border-b-2 h-10 items-center flex justify-center relative">

        <div class="font-bold">
          팔로워
        </div>

        <div
          class="absolute right-3"
        >
          <button
            @click="clickCloseButton"
          >
            <b-icon icon="x-lg" />
          </button>
        </div>
      </div>

      <!-- 비어있을 경우 -->
      <div
        v-if="followers.length === 0"
        class="transform top-1/2 fixed left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
      >
        <div class="flex items-center justify-center p-4">
          <div class="rounded-full border-2 border-black flex items-center justify-center h-16 w-16">
            <b-icon
              class=""
              icon="person-plus" scale="3"
            />
          </div>
        </div>
        <div class="font-bold text-2xl text-center pb-2">
          팔로워
        </div>
        <div class="text-gray-600 text-sm text-center">
          회원님을 팔로우하는 모든 사람이 여기에 표시됩니다.
        </div>
      </div>

      <!-- User List -->
      <div>

        <!-- User Card -->
        <div
          v-for="(user, i) in followers"
          :key="i"
          class="flex justify-between items-center px-4 py-2"
        >
          <div class="flex">
            <div>
              <img
                class="w-11 h-11 rounded-full border-2 mr-2"
                :src="$axios.defaults.baseURL + '/media/' + user.from_user.profile_image_path"
              />
            </div>
            <div class="flex flex-col justify-center">
              <div @click="redirectToUser(user.from_user_id)" class="text-sm font-bold cursor-pointer">
                {{ user.from_user_id }}
              </div>
              <div class="text-sm text-gray-500">
                {{ user.from_user.user_name }}
              </div>
            </div>
          </div>

          <div>
            <FollowButton
              :userId="user.from_user_id"
              :follow="user.followed"
            />
          </div>

        </div>

      </div>

    </div>
  </ModalBase>
</template>

<script>
export default {
  name: "ProfileFollower",
  props: ["value"],
  data: () => ({
    followers: []
  }),
  methods: {
    async modalOpened() {
      let { data } = await this.$axios.get(
        this.$axios.defaults.baseURL + "/follows/to",
        {
          params: {
            user_id: this.$route.params.id
          }
        }
      )
      this.followers = data
    },
    clickCloseButton() {
      this.$emit('input', false)
    },
    redirectToUser(userId) {
      this.$router.push('/profile/' + userId)
    }
  }
}
</script>

<style scoped>

</style>
