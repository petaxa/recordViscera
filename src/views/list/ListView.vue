<script setup lang="ts">
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenList } from '@/lib/links';
</script>
<template>
  <HeaderLink :links="linksWhenList" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>