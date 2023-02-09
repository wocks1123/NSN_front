<template>
  <!-- Wrapper -->
  <div class="flex h-screen bg-gray-100 justify-center items-center">

    <!-- Content Body -->
    <div
      class="
        sm:w-4/5
        p-4 sm:p-0 flex justify-center items-center flex-wrap g-6
      "
    >

      <!-- Picture Area -->
      <div class="w-full sm:w-8/12 md:w-6/12 mb-6 md:mb-0 ">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="w-full"
          alt="Phone image"
        />
      </div>

      <!-- Form Area-->
      <div class="w-full sm:w-8/12 md:w-5/12 md:ml-10">
        <div>
          <!-- Email input -->
          <div class="mb-6">
            <input
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              v-model="account"
            />
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <input
              @keyup="onKeyUp"
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              v-model="password"
            />
          </div>

<!--          <div class="flex justify-between items-center mb-6">-->
<!--            <div class="form-group form-check">-->
<!--              <input-->
<!--                type="checkbox"-->
<!--                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"-->
<!--                id="exampleCheck3"-->
<!--                checked-->
<!--              />-->
<!--              <label class="form-check-label inline-block text-gray-800" for="exampleCheck2"-->
<!--              >Remember me</label-->
<!--              >-->
<!--            </div>-->
<!--            <a-->
<!--              href="#!"-->
<!--              class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"-->
<!--            >Forgot password?</a-->
<!--            >-->
<!--          </div>-->

          <!-- Submit button -->
          <button
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            @click="clickLogin"
          >
            Sign in
          </button>

          <div class="text-sm text-center mt-4">
            아직 회원이 아니신가요? <span @click="$router.push('/register')" class="text-blue-500 cursor-pointer"> 회원가입 </span>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "EmptyLayout",
  //auth: "guest",

  data: () => ({
    account: "user01",
    password: "1234",
  }),
  methods: {
    async clickLogin() {
      // const formData = new FormData();
      // formData.append("username", this.account)
      // formData.append("password", this.password)

      await this.login()
    },

    async login() {
      try {
        await this.$auth.loginWith(
          "local",
          {
            data: {
              user_id: this.account,
              password: this.password
            }
          }
        )
        this.$router.push("/")

      } catch (err) {
        console.log(err)
      }
    },
    async onKeyUp(evt) {
      if (evt.keyCode === 13) {
        await this.login()
      }

    }
  }
}
</script>

<style scoped>

</style>
