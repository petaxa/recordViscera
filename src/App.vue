<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
input {
  font-size: 16px;
}

/* 共通のCSS */
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
  /* border-color: white; */
  background-color: transparent;
  border-radius: 5px;
  /* color:white; */
  font-size: 20px;
  margin-top: 30px;
}
</style>
