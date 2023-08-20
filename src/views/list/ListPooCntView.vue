<script setup lang="ts">
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenList } from '@/lib/links';
import ListPooCnt from '@/components/list/listPooCnt.vue'
</script>
<template>
  <HeaderLink :links="linksWhenList" />
  <ListPooCnt/>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>