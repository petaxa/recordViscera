<script setup lang="ts">
import { ref } from 'vue'
// import type { Ref } from 'vue'
import { sendTemp } from '@/lib/sheetapi'

// 体温
// NOTE: ここの型、要検討。Ref<number>だと初期値が必要、それ以外は整合性がぱっとみ取れなさそう。
const temp = ref()

// ボタンが活性化しているかどうか
const isEnabled = ref(true)

const submit = async () => {
    // 連打防止のためにボタンを非活性
    isEnabled.value = false

    // APIを実行
    const today = new Date()
    const res = await sendTemp(today, temp.value)

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
            <label for="temp">体温</label>
            <input type="number" name="temp" v-model="temp" required />
        </div>
        <input type="submit" class="submitBtn" :disabled="!isEnabled" value="登録" />
    </form>
</template>

<style src="@/assets/list.css" scoped></style>