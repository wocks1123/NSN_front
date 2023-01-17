<template>
  <!-- Wrapper -->
  <div
    class="h-screen"
  >

    <!-- Header(mobile only) -->
    <div
      class="
        fixed
        top-0
        md:hidden
        bg-red-300
        h-14
        w-full
        z-20
      "
    >
      Header
    </div>

    <!-- Body -->
    <div
      class=" "
    >

      <!-- Nav -->
      <Navbar />

      <!-- Content -->
      <div
        class="
          pt-14
          md:pt-0

          pb-12
          md:pb-0

          md:mb-0

          md:ml-16
          xl:ml-56
          h-full
        "
      >
        <Nuxt />
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
}
</script>

<style scoped>

</style>
