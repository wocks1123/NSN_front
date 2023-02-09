<template>
  <div
    class="flex justify-between items-center px-4 py-2"
  >
    <div class="flex">
      <div>
        <img
          class="w-11 h-11 rounded-full border-2 mr-2"
          :src="$axios.defaults.baseURL + '/media/' + user.profile_image_path"
        />
      </div>
      <div class="flex flex-col justify-center">
        <div @click="redirectToUser(user.user_id)" class="text-sm font-bold cursor-pointer">
          {{ user.user_id }}
        </div>
        <div class="text-sm text-gray-500">
          {{ user.user_name }}
        </div>
      </div>
    </div>

    <div>
      <FollowButton
        :userId="user.user_id"
        :follow="user.followed"
      />
    </div>


  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: ['user'],
  mounted() {
  },
  methods: {
    redirectToUser(userId) {
      this.$router.push('/profile/' + userId)
    }
  }
}
</script>

<style scoped>

</style>
