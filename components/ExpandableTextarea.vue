<template>
  <textarea
    style="resize:none"
    @input="onTextarea"
    :value="value"
    ref="textarea"
    rows="1"
    class="
      w-full p-1.5 w-full text-sm text-gray-900
      rounded-lg focus:border-none border-none  focus:ring-0 focus:outline-none
    "
    placeholder="댓글 달기..."
  />
</template>

<script>
export default {
  name: "ExpandableTextarea",
  props: ['maxRow', 'value'],
  methods: {
    onTextarea() {
      let temp = this.$refs.textarea.rows
      this.$refs.textarea.rows = 1
      let val = Math.ceil(this.$refs.textarea.scrollHeight / this.$refs.textarea.clientHeight)
      this.$refs.textarea.rows = val < this.maxRow ? val : temp
      this.$emit('input', this.$refs.textarea.value)
    }
  }
}
</script>

<style scoped>

</style>
