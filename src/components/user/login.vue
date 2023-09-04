<script setup lang="ts">
import { login } from '@/lib/API/users';
import router from '@/router';
import { ref } from 'vue';

const email = ref('')
const password = ref('')

// ボタンが活性化しているかどうか
const isEnabled = ref(true)

const submit = async() => {
    // 連打防止のためにボタンを非活性
    isEnabled.value = false

    // APIを実行
    const res = await login(email.value, password.value)

    // 成功したら体温記録ページへリダイレクト
    if(res.status) {
        localStorage.setItem('token', res.token)
        router.push('/temp')
    }else {
        alert(res.message)
    }

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
            <label for="password">password</label>
            <input type="text" name="password" v-model="password">
        </div>
        <input type="submit" class="submitBtn" :disabled="!isEnabled" value="ログイン" />
    </form>
</template>

<style scoped></style>
