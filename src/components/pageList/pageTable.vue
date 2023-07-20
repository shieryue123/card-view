<template>
  <router-view />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const token = ref(localStorage.getItem('token'))

const router = useRouter()
if (!token.value) {
  router.push({
    path: '/login'
  })
}
</script>

<style lang="scss">

</style>