<template>
  <div
    class="relative"
  >
    <div
      v-if="!inputFocus && inputText.length === 0"
      class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
    >
      <b-icon
        icon="search"
      />
    </div>

    <input
      v-model="inputText"
      @focus="onFocus"
      @focusout="onFocusOut"
      @input="onInput"
      :class="[inputFocus || inputText.length !== 0 ? 'pl-3' : 'pl-9']"
      class="bg-gray-100 rounded-md w-full h-10"
      placeholder="검색"
      type="text"
    />
    <div
      v-if="this.searchingNow"
      class="absolute inset-y-0 right-0 flex items-center pl-3 text-gray-400"
    >
      <b-icon
        class="mr-2"
        icon="hourglass-split"
        animation="fade"
      />
    </div>
    <div
      v-if="this.inputText.length > 0"
      class="absolute inset-y-0 right-0 flex items-center pl-3 text-gray-400"
    >
      <button
        @click="clickXButton"
      >
        <b-icon
          class="mr-2"
          icon="x-circle-fill"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: ["value"],
  data: () => ({
    inputFocus: false,
    inputText: "",
    searchingNow: false,
    resultUsers: []
  }),
  methods: {
    async onInput() {
      if (!this.searchingNow && this.inputText.length > 0) {
        console.log("searchingNow", )
        this.searchingNow = true
        let res = await this.$axios.get(
          "/users/search",
          {
            params: {
              keyword: this.inputText
            }
          }
        )
        this.searchingNow = false
        this.resultUsers = res.data
        this.$emit('input', res.data)
      }
    },
    clickXButton() {
      this.$emit('input', [])
      this.inputText = ""
    },
    onFocus() {
      this.$emit('focus', true)
      this.inputFocus = true
    },
    onFocusOut() {
      this.$emit('focusout', true)
      this.inputFocus = false
    }
  }
}
</script>

<style scoped>

</style>
