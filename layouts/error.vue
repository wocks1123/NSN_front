<template>
  <div>
    <h2 v-if="error.statusCode === 404">Page not found</h2>
    <h2 v-else>An error occurred</h2>
  </div>
</template>

<script>
export default {
  name: "error",
  props: ['error']
}
</script>

<style scoped>

</style>
