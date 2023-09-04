<script setup lang="ts">
import { ref } from 'vue'
import { registBowelMovement } from '@/lib/API/bowelMovements'

// 便の状態
const poo = ref()
// 血の有無
const blood = ref()
// 粘液の有無
const drainage = ref()
// 備考
const notes = ref('')

// ボタンが活性化しているかどうか
const isEnabled = ref(true)

const submit = async () => {
    // 連打防止のためにボタンを非活性
    isEnabled.value = false

    // APIを実行
    const today = new Date()
    const res = await registBowelMovement(today, Number(poo.value), Number(blood.value), Number(drainage.value), notes.value)

    // 結果をアラート
    // NOTE: もうちょいどうにかしたいけど、iOS版Chromeのアラートの質に勝てないならこのままが丸そう。
    alert(JSON.stringify(res))
    // ボタンを活性化
    isEnabled.value = true

}
</script>

<template>
    <form @submit.prevent="submit">
        <div class="inputForm">
            <label for="poo">便の状態</label>
            <select class="inputForm" name="poo" v-model="poo">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
        </div>
        <!-- NOTE: ラジオボタンのがいいかも。デザインリファクタリングの時に見直す。 -->
        <div class="inputForm">
            <label for="blood">血の有無</label>
            <select class="inputForm" name="blood" v-model="blood">
                <option value="1">あり</option>
                <option value="0">なし</option>
            </select>
        </div>
        <div class="inputForm">
            <label for="drainage">粘液の有無</label>
            <select class="inputForm" name="drainage" v-model="drainage">
                <option value="1">あり</option>
                <option value="0">なし</option>
            </select>
        </div>
        <div class="inputForm">
            <label for="notes">備考</label>
            <input type="text" name="notes" v-model="notes" />
        </div>
        <input type="submit" class="submitBtn" :disabled="!isEnabled" value="登録" />
    </form>
</template>

<style src="@/assets/list.css" scoped></style>