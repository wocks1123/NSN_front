<template>
  <!-- Wrapper -->
  <div class="flex justify-center items-center bg-gray-200 p-5 min-h-screen">
    <!-- Form -->
    <div class="w-85"
    >
      <div
        class="py-10 px-5 md:px-10 bg-white border-2 border-gray-300"
      >
        <div class="text-center mb-10">
          <h1 class="font-bold text-3xl mb-4 text-gray-900">REGISTER</h1>
          <div class="text-gray-400 text-md font-bold">친구들의 사진과 동영상을 보려면 </div>
          <div class="text-gray-400 text-md font-bold">가입하세요.</div>
        </div>

        <div class="flex -mx-3">
          <div class="w-full px-3 mb-2">
            <div class="flex">
              <div
                class="
                  w-10 z-10 pl-1 text-center pointer-events-none
                  flex items-center justify-center
                "
              >
              </div>
              <input
                v-model="userId"
                type="text"
                class="
                  w-full -ml-10 pl-4 pr-3 py-2 rounded-md border-2
                  border-gray-200 outline-none focus:border-gray-300
                "
                placeholder="계정"
              >
            </div>
          </div>
        </div>

        <div class="flex -mx-3">
          <div class="w-full px-3 mb-2">
          <div class="flex">
            <div
              class="
                  w-10 z-10 pl-1 text-center pointer-events-none
                  flex items-center justify-center
                "
            >
            </div>
            <input
              v-model="userName"
              type="text"
              class="
                  w-full -ml-10 pl-4 pr-3 py-2 rounded-md border-2
                  border-gray-200 outline-none focus:border-gray-300
                "
              placeholder="사용자 이름"
            >
          </div>
        </div>
        </div>

        <div class="flex -mx-3">
          <div class="w-full px-3 mb-2">
          <div class="flex">
            <div
              class="
                  w-10 z-10 pl-1 text-center pointer-events-none
                  flex items-center justify-center
                "
            >
            </div>
            <input
              v-model="email"
              type="email"
              class="
                  w-full -ml-10 pl-4 pr-3 py-2 rounded-md border-2
                  border-gray-200 outline-none focus:border-gray-300
                "
              placeholder="이메일"
            >
          </div>
        </div>
        </div>

        <div class="flex -mx-3">
          <div class="w-full px-3 mb-2">
            <div class="flex">
              <div
                class="
                  w-10 z-10 pl-1 text-center pointer-events-none
                  flex items-center justify-center
                "
              >
              </div>
              <input
                v-model="password"
                type="password"
                class="
                  w-full -ml-10 pl-4 pr-3 py-2 rounded-md border-2
                  border-gray-200 outline-none focus:border-gray-300
                "
                placeholder="비밀번호"
              >
            </div>
          </div>
        </div>

        <div class="flex -mx-3">
          <div class="w-full px-3 mb-2">
            <div class="flex">
            <div
              class="
                  w-10 z-10 pl-1 text-center pointer-events-none
                  flex items-center justify-center
                "
            >
            </div>
            <input
              v-model="passwordConfirm"
              type="password"
              class="
                  w-full -ml-10 pl-4 pr-3 py-2 rounded-md border-2
                  border-gray-200 outline-none focus:border-gray-300
                "
              placeholder="비밀번호 확인"
            >
          </div>
          </div>
        </div>

        <div class="flex -mx-3">
            <div class="w-full px-3 mb-5">
            <label for="" class="text-xs font-semibold px-1">Profile Image</label>
            <div class="flex">
              <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
              <input
                ref="file"
                class="form-control
                w-full
                -ml-10
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
              >
            </div>
          </div>
          </div>

        <div class="flex -mx-3">
        <div class="w-full px-3 mb-0">
          <button
            @click="clickRegister"
            class="
              block w-full max-w-xs mx-auto bg-blue-500 hover:bg-blue-700 focus:bg-blue-700
               text-white rounded-lg px-3 py-3 font-semibold
            "
          >
            REGISTER NOW
          </button>
        </div>
      </div>
      </div>
      <div
        class="
          mt-5 py-5 px-5 md:px-10 bg-white border-2 border-gray-300
          text-center text-sm
        "
      >
        계정이 있으신가요? <span class="text-blue-500 cursor-pointer" @click="$router.push('/login')">로그인</span>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "register",
  auth: false,
  layout: "EmptyLayout",
  data: () => ({
    userId: "test01",
    userName: "testName01",
    email: "test01@naver.com",
    password: "1234",
    passwordConfirm: "1234"
  }),
  methods: {
    async clickRegister() {
      let form = new FormData();
      form.append("user_id", this.userId)
      form.append("user_name", this.userName)
      form.append("email", this.email)
      form.append("password", this.password)
      let profile_image = ""
      if (this.$refs.file.files[0])
        profile_image = this.$refs.file.files[0]
      form.append("profile_image", profile_image)

      let res = await this.$axios.post(
        // "/users",
        "/register",
        form,
        {
          header: { 'Content-Type': 'multipart/form-data' }
        }
      )

      const formData = new FormData();
      // formData.append("username", res.data.userId)
      // formData.append("password", res.data.password)
      formData.append("username", this.userId)
      formData.append("password", this.password)

      // this.$auth.loginWith("local",
      //
      // )
      await this.$auth.loginWith(
        "local",
        {
          data: {
            user_id: this.userId,
            password: this.password
          }
        }
      )

      this.$router.push("/")

    },
    onKeyUp(evt) {
      console.log("evt", evt.keyCode)
    }
  }
}
</script>

<style scoped>

</style>
