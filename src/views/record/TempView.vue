<script setup lang="ts">
import RecordTemp from '@/components/record/recordTemp.vue'
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenInput } from '@/lib/links';

</script>

<template>
  <HeaderLink :links="linksWhenInput" />
  <main>
    <h1>体温を入力</h1>
    <RecordTemp />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
