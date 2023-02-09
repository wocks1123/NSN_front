<template>
  <ModalBase
    :value="value" @input="$emit('input', false)"
    classVal="w-full sm:w-96 px-5 py-5"
  >
    <div class="">

      <!-- Close Button Area -->
      <div class="flex justify-end">
        <button
          @click="$emit('input', false)"
          class="hover:bg-gray-100 rounded-full"
        >
          <b-icon icon="x" font-scale="2" />
        </button>
      </div>

      <div class="w-full md:-ml-4 mt-5 flex flex-col md:flex-row">
        <div
          class="mr-2 w-40 items-center flex md:justify-end text-right font-semibold px-1 mb-1 md:mb-0"
        >
          이전 비밀번호
        </div>
        <div
          class="flex flex-grow"
        >
          <input
            class="
                w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200
                  outline-none focus:border-indigo-500
              "
            placeholder=""
            v-model="prevPassword" type="password"
          >
        </div>
      </div>
      <div class="w-full md:-ml-4 mt-5 flex flex-col md:flex-row">
        <div
          class="mr-2 w-40 items-center flex md:justify-end text-right font-semibold px-1 mb-1 md:mb-0"
        >
          새 비밀번호
        </div>
        <div
          class="flex flex-grow"
        >
          <input
            class="
                w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200
                  outline-none focus:border-indigo-500
              "
            placeholder=""
            v-model="newPassword" type="password"
          >
        </div>
      </div>
      <div class="w-full md:-ml-4 mt-5 flex flex-col md:flex-row">
        <div
          class="mr-2 w-40 items-center flex md:justify-end text-right font-semibold px-1 mb-1 md:mb-0"
        >
          새 비밀번호 확인
        </div>
        <div
          class="flex flex-grow"
        >
          <input
            class="
                w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200
                  outline-none focus:border-indigo-500
              "
            placeholder=""
            v-model="newPassword" type="password"
          >
        </div>
      </div>


      <div class="w-full md:-ml-4 mt-5 flex flex-col sm:flex-row sm:justify-between items-center">
        <div class="text-sm ml-2">
          {{ message }}
        </div>
        <button class="p-2 bg-blue-500 text-white rounded-md sm:w-24">
          제출
        </button>
      </div>
    </div>
  </ModalBase>

</template>

<script>
export default {
  name: "PasswordEditModal",
  props: ['value'],

  data: () => ({
    modal: true,

    prevPassword: "",
    newPassword: "",
    newPasswordAgain: "",

    message: "새 비밀번호가 동일하지 않습니다.",
  }),
  methods: {
    async clickSubmitButton() {
      let res = await this.$axios.put(
        "/users/" + this.user.user_id + "/password",
        {
          password: this.prevPassword,
          new_password: this.newPassword,
          new_password_again: this.newPasswordAgain
        },

        this.$emit('input', false)
      )
    }
  }
}
</script>

<style scoped>

</style>
