<template>
  <ModalBase
    :value="value" @input="$emit('input', false)" @close="$emit('close', true)"
    classVal="w-screen h-screen sm:w-2/3 md:h-2/3 rounded-lg"
  >
    <div class="overflow-y-auto w-full h-full bg-red-100 flex flex-col rounded-lg">
      <!-- Header -->
      <div class="h-8 flex text-center  items-center">
        <div class="absolute left-2 text-blue-600">
          이전
        </div>
        <div class="absolute  items-center left-1/2 transform -translate-x-1/2">
          새 게시물 만들기
        </div>
      </div>

      <!-- Body -->
      <div class=" flex flex-col md:flex-grow h-auto md:flex-row">
        <!-- Image Upload Area-->
        <div class="h-96 md:h-auto w-full grow">
          <drag-drop-file-uploader v-model="files"></drag-drop-file-uploader>
        </div>
        <!-- Form Area -->
        <div class="w-96 w-full p-2">
          <!-- Writer Info -->
          <div class="flex items-center p-1">
            <div>
              <img
                :src="$axios.defaults.baseURL + '/images/' + $auth.user.profileImagePath"
                class="w-8 h-8 rounded-full"
                alt="Profile"
              />
            </div>

            <div class="ml-1 text-xs">
              {{ $auth.user.userId }}
            </div>
          </div>

          <!-- Content Input -->
          <div>
            <textarea
              v-model="content"
              style="resize:none"
              rows="4"
              class="
                block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              placeholder="Your message..."
            />
          </div>

          <div
            class="flex justify-end"
          >
            <button
              @click="clickUploadButton"
              class="p-1 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              업로드
            </button>
          </div>

        </div>

      </div>
    </div>

  </ModalBase>

</template>

<script>
export default {
  name: "PostModal",
  props: ['value'],
  data: () => ({
    content: "",
    files: [],
  }),
  mounted() {
    this.content = ""
    this.files = []
  },
  methods: {
    async clickUploadButton() {
      let formData = new FormData();
      formData.append("content", this.content)
      for (const file of this.files) {
        formData.append("in_files", file)
      }

      await this.$axios.post(
        "/posts",
        formData,
        {
          header: { 'Content-Type': 'multipart/form-data' }
        }
      )
      this.$emit('input', false)
      this.$emit('close', true)
    }
  }

}
</script>

<style scoped>

</style>
