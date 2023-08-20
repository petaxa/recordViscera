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

// ボタンが活性化しているかどうか
const isEnabled = ref(true)

const submit = async() => {
    // 連打防止のためにボタンを非活性
    isEnabled.value = false

    // APIを実行
    const today = new Date()
    const res  = await sendPoo(today, poo.value, blood.value, drainage.value, notes.value)

    // 結果をアラート
    // ※もうちょいどうにかしたいけど、iOS版Chromeのアラートの質に勝てないならこのままが丸そう。
    alert(JSON.stringify(res))
    // ボタンを活性化
    isEnabled.value = true

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
    <button class="submitBtn" @click="submit" :disabled="!isEnabled">登録</button>
</template>