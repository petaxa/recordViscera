<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<template>
  <RouterView />
</template>
<style>
/* 共通のCSS */
/* NOTE: どうにかしてrecordPoo, recordTempだけでしか使えないようにしたい。二回書くのは論外。うーん。 */
.inputForm {
  margin: 10px 0;
  width: 100%;
}

.inputForm label {
  margin-right: 5px;
}

.submitBtn {
  width: 100%;
  height: 40px;
  font-size: 20px;
  margin-top: 30px;
}
</style>
