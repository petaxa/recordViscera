<script setup lang="ts">
import Login from '@/components/user/login.vue'
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenInput } from '@/lib/links';
</script>
<template>
  <HeaderLink :links="linksWhenInput"/>
  <main>
    <h1>ログイン</h1>
    <Login />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
