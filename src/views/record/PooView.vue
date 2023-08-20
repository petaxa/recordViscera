<script setup lang="ts">
import RecordPoo from '@/components/record/recordPoo.vue'
import HeaderLink from '@/components/headerLink.vue'
import { linksWhenInput } from '@/lib/links';
</script>
<template>
  <HeaderLink :links="linksWhenInput"/>
  <main>
    <h1>お腹の調子を入力</h1>
    <RecordPoo />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
