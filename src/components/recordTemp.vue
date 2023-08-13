<script setup lang="ts">
import { ref } from 'vue'
import { sendTemp } from '@/lib/sheetapi'

// 体温
const temp = ref()

const submit = () => {
    const today = new Date()
    // APIを実行
    sendTemp(today, temp.value)
}
</script>

<template>
    <div class="inputForm">
        <label for="temp">体温</label>
        <input type="number" name="temp" v-model="temp">
    </div>
    <button class="submitBtn" @click="submit">登録</button>
</template>

<style scoped>

</style>