<script setup lang="ts">
import { register } from '@/lib/API/users';
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const name = ref('')

// ボタンが活性化しているかどうか
const isEnabled = ref(true)

const submit = async() => {
    // 連打防止のためにボタンを非活性
    isEnabled.value = false

    // APIを実行
    const res = await register(email.value, password.value, name.value)

    // 結果をアラート
    // NOTE: もうちょいどうにかしたいけど、iOS版Chromeのアラートの質に勝てないならこのままが丸そう。
    alert(JSON.stringify(res.message))
    // ボタンを活性化
    isEnabled.value = true
}

</script>
<template>
    <form @submit.prevent="submit">
        <div class="inputForm">
            <label for="email">Email</label>
            <input type="text" name="email" v-model="email">
        </div>
        <div class="inputForm">
            <label for="name">name</label>
            <input type="text" name="name" v-model="name">
        </div>
        <div class="inputForm">
            <label for="password">password</label>
            <input type="text" name="password" v-model="password">
        </div>
        <input type="submit" class="submitBtn" :disabled="!isEnabled" value="登録" />
    </form>
</template>

<style scoped></style>
