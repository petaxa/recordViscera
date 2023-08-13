<script setup lang="ts">
import { ref } from 'vue'
import { sendPoo } from '@/lib/sheetapi'

// 便の状態
const poo = ref('')
// 血の有無
const blood = ref('')
// 粘液の有無
const drainage = ref('')
// 備考
const notes = ref('')

const submit = () => {
    const today = new Date()
    // APIを実行
    sendPoo(today, poo.value, blood.value, drainage.value, notes.value)
}
</script>

<template>
    <div class="inputForm">
        <label for="poo">便の状態</label>
        <input type="text" name="poo" v-model="poo">
    </div>
    <div class="inputForm">
        <label for="blood">血の有無</label>
        <input type="text" name="blood" v-model="blood">
    </div>
    <div class="inputForm">
        <label for="drainage">粘液の有無</label>
        <input type="text" name="drainage" v-model="drainage">
    </div>
    <div class="inputForm">
        <label for="notes">備考</label>
        <input type="text" name="notes" v-model="notes">
    </div>
    <button class="submitBtn" @click="submit">登録</button>
</template>