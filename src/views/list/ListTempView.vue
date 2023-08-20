<script setup lang="ts">
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenList } from '@/lib/links';
import ListTemp from '@/components/list/listTemp.vue'
</script>
<template>
  <HeaderLink :links="linksWhenList" />
  <main>
    <ListTemp/>
  </main>
</template>

<style scoped>

</style>