<template>
  <NavSideCard :value="value" @input="$emit('input', value)">
    <div class="bg-red-900">
      Alert side
    </div>
  </NavSideCard>
</template>

<script>
export default {
  name: "AlertSide",
  props: ['value'],

}
</script>

<style scoped>

</style>
