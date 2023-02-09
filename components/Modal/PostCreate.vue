<template>
  <ModalBase
    :value="value" @input="$emit('input', false)" @close="closeModel"
    classVal="w-screen sm:w-11/12 lg:w-240 md:h-2/3 rounded-lg"
  >
    <div class="overflow-y-auto w-full h-full bg-white flex flex-col rounded-lg">
      <!-- Header -->
      <div class="h-8 flex text-center  items-center border-b-2">
        <div class="absolute left-2 text-blue-600 cursor-pointer" @click="closeModel">
          이전
        </div>
        <div class="absolute  items-center left-1/2 transform -translate-x-1/2">
          새 게시물 만들기
        </div>
      </div>

      <!-- Body -->
      <div class=" flex flex-col md:flex-grow h-auto md:flex-row">
        <!-- Image Upload Area-->
        <div class="h-96 md:h-auto w-full grow border-r-2 md:border-b-0 border-b-2">
          <drag-drop-file-uploader v-model="files" />
        </div>
        <!-- Form Area -->
        <div class="md:w-96 p-2">
          <!-- Writer Info -->
          <div class="flex items-center p-1 justify-between">
            <div class="flex items-center">
              <div>
                <img
                  :src="$axios.defaults.baseURL + '/media/' + $auth.user.profile_image_path"
                  class="w-8 h-8 rounded-full"
                  alt="Profile"
                />
              </div>

              <div class="ml-2 text-sm font-bold">
                {{ $auth.user.user_id }}
              </div>
            </div>

            <div>
              <DropdownButton
                v-model="postScope"
              />
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
              class="p-1 mt-2 text-white rounded-md"
              :class="files.length > 0 ? ' bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-default'"
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
    postScope: "1",
    files: [],
  }),
  mounted() {
    this.content = ""
    this.files = []
  },
  methods: {
    async clickUploadButton() {
      let formData = new FormData();
      formData.append("author_id", this.$auth.user.user_id)
      formData.append("content", this.content)
      formData.append("post_scope", this.postScope)

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

      this.closeModel()
    },
    closeModel() {
      this.$emit('input', false)
      this.$emit('close', true)
      this.content = ""
      this.files = []
    }
  }

}
</script>

<style scoped>

</style>
