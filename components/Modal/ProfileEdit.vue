<template>
  <ModalBase
    :value="value" @input="$emit('input', false)"
    classVal="w-full sm:w-96 px-5 py-5"
  >
    <div class="flex-col w-full">
      <div class="flex justify-end">
        <button
          @click="$emit('input', false)"
          class="hover:bg-gray-100 rounded-full"
        >
          <b-icon icon="x" font-scale="2" />
        </button>
      </div>

      <div class="w-full flex flex-row">
        <div
          class="mr-2 w-20 items-center flex justify-end text-right font-semibold px-1 "
        >
          <img
            :src="$axios.defaults.baseURL + '/media/' + user.profile_image_path"
            class="w-12 h-12 rounded-full"
            alt="Phone image"
          />
        </div>
        <div>
          <div class="">
            fe_su_park
          </div>
          <div class="font-semibold text-blue-500 hover:text-black cursor-pointer">
            프로필 사진 바꾸기
          </div>
        </div>

      </div>

      <div class="w-full md:-ml-4 mt-5 flex flex-col md:flex-row">
        <div
          class="mr-2 w-20 items-center flex md:justify-end text-right font-semibold px-1 mb-1 md:mb-0"
        >
          이름
        </div>
        <div
          class="flex flex-grow"
        >
          <input
            class="
                w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200
                  outline-none focus:border-indigo-500
              "
            placeholder="이름"
            v-model="user.user_name" type="text"
          >
        </div>
      </div>
      <div class="w-full md:-ml-4 mt-5 flex flex-col md:flex-row">
        <div
          class="mr-2 w-20 items-center flex md:justify-end text-right font-semibold px-1 mb-1 md:mb-0"
        >
          이메일
        </div>
        <div
          class="flex flex-grow"
        >
          <input
            class="
                w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200
                  outline-none focus:border-indigo-500
              "
            placeholder="이메일"
            v-model="user.email" type="email"
          >
        </div>
      </div>
      <div class="w-full md:-ml-4 mt-5 flex flex-col md:flex-row">
        <div
          class="mr-2 w-20 items-center flex md:justify-end text-right font-semibold px-1 mb-1 md:mb-0"
        >
          소개
        </div>
        <div
          class="flex flex-grow"
        >
            <textarea
              rows="4"
              class="
                block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              v-model="user.profile_message"
            >
            </textarea>
        </div>
      </div>

      <div class="w-full md:-ml-4 mt-5 flex flex-col sm:flex-row sm:justify-end">
        <button
          @click="clickSubmitButton"
          class="p-2 bg-blue-500 text-white rounded-md sm:w-24"
        >
          제출
        </button>
      </div>
    </div>
  </ModalBase>
</template>

<script>
export default {
  name: "ProfileEditModal",
  props: ['value', 'user'],

  data: () => ({
    modal: true,

    userName: "",
    email: "",
    profile: "",
  }),
  methods: {
    async clickSubmitButton() {
      let res = await this.$axios.put(
        "/users/" + this.user.user_id,
        {
          user_name: this.user.user_name,
          email: this.user.email,
          profile_message: this.user.profile_message
        },


        this.$emit('input', false)
      )
    }
  }

}
</script>

<style scoped>

</style>
