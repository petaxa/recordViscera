<script setup lang="ts">
import Register from '@/components/user/register.vue'
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenInput } from '@/lib/links';
</script>
<template>
  <HeaderLink :links="linksWhenInput"/>
  <main>
    <h1>アカウント登録</h1>
    <Register />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
