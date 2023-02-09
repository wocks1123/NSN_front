<template>
  <NavSideCard :value="value" @input="$emit('input', value)">
    <!-- Header -->
    <div class="p-4 border-b-2" id="nav-side">
      <div
        class="font-bold text-2xl mb-6"
      >
        검색
      </div>

      <SearchInputText v-model="resultUsers" />

    </div>

    <!-- Body -->
    <div>
      <!-- User Card -->
      <div
        v-if="resultUsers.length > 0"

        v-for="(user, i) in resultUsers"
        class="flex px-4 py-2 hover:bg-gray-200 cursor-pointer"
        :key="i"
        @click="clickUserCard(user.user_id)"
      >
        <div>
          <img
            class="w-11 h-11 rounded-full border-2 mr-2"
            :src="$axios.defaults.baseURL + '/media/' + user.profile_image_path"
          />
        </div>
        <div class="flex flex-col justify-center">
          <div class="text-sm font-bold">
            {{ user.user_id }}
          </div>
          <div class="text-sm text-gray-500">
            {{ user.user_name }}
          </div>
        </div>
      </div>
    </div>
  </NavSideCard>
</template>

<script>
export default {
  name: "SearchSide",
  props: ['value'],
  data: () => ({
    resultUsers: []
  }),
  mounted() {
  },
  methods: {
    clickUserCard(userId) {
      this.$emit('input', false)
      this.$router.push('/profile/' + userId)
    }
  }
}
</script>

<style scoped>
</style>
