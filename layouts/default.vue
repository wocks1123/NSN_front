<template>
  <!-- Wrapper -->
  <div
    class="bg-gray-100"
  >

    <!-- Header(mobile only) -->
    <MobileHeader />

    <!-- Body -->
    <div
      class=" "
    >

      <!-- Nav -->
      <Navbar />

      <!-- Content -->
      <div
        class="
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
