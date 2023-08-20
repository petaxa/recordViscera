<script setup lang="ts">
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenList } from '@/lib/links';
import ListPoo from '@/components/list/listPoo.vue'
</script>
<template>
  <HeaderLink :links="linksWhenList" />
  <main>
    <ListPoo />
  </main>
</template>

<style scoped>

</style>