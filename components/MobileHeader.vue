<template>
  <div
    class="
        fixed
        top-0
        md:hidden
        bg-white
        h-14
        w-full
        z-20
        flex justify-between items-center
        relative
      "
  >
    <div class="w-12 items-center justify-center flex">
      <b-icon scale="1.5" icon="instagram" />
    </div>
    <div class="flex-grow">
      <SearchInputText
        @focus="onFocus"
        @focusout="onFocusOut"
        v-model="searchResults"
      />
    </div>
    <div class="w-12 items-center justify-center flex">
      <button>
        <b-icon scale="1.5" icon="suit-heart" />
      </button>
    </div>


    <!-- Search Area-->
    <div
      v-if="showSearchArea"
      class="
        bg-white absolute -bottom-80 h-80 w-full sm:w-100 shadow-md rounded-md
        transform -translate-x-1/2 left-1/2 overflow-y-scroll
      "
    >
      <!-- User Card -->
      <div
        v-if="searchResults.length > 0"

        v-for="(user, i) in searchResults"
        class="flex px-4 py-2 hover:bg-gray-200 cursor-pointer"
        :key="i"
        @click="clickUserCard(user.userId)"
      >
        <div>
          <img
            class="w-11 h-11 rounded-full border-2 mr-2"
            :src="$axios.defaults.baseURL + '/media/' + user.profile_image_path"
          />
        </div>
        <div class="flex flex-col justify-center">
          <div class="text-sm font-bold">
            {{ user.userId }}
          </div>
          <div class="text-sm text-gray-500">
            {{ user.userName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileHeader",
  data: () => ({
    searchResults: [],
    showSearchArea: false,
  }),
  methods: {
    onFocus() {
      this.showSearchArea = true
    },
    onFocusOut() {
      this.showSearchArea = false
    },
    clickUserCard(userId) {
      this.$emit('input', false)
      this.$router.push('/profile/' + userId)
    }
  }
}
</script>

<style scoped>

</style>
