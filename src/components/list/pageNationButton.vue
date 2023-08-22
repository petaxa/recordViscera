<script setup lang="ts">
defineProps<{
    page: number,
    maxPage: number,
    isDataAvailable: boolean
}>()
defineEmits(['updateCurrentPage'])

// 現在のページかどうか
const isCurrentPage = (n: number, page: number) => {
    return n === page
}
</script>

<template>
    <div class="buttonArea">
        <button v-if="page !== 1 && isDataAvailable" :disabled="!isDataAvailable"
            @click="$emit('updateCurrentPage', 1)">&lt;</button>
        <div class="number-btn" v-if="isDataAvailable">
            <button v-for="n of maxPage" :key="n" :disabled="!isDataAvailable" @click="$emit('updateCurrentPage', n)"
                :class="{ currentPage: isCurrentPage(n, page) }">{{ n }}</button>
        </div>
        <button v-if="page !== maxPage && isDataAvailable" :disabled="!isDataAvailable"
            @click="$emit('updateCurrentPage', page + 1)">&gt;</button>
    </div>
</template>

<style scoped>
/* 現在ページのボタン */
.currentPage {
    color: var(--color-text);
}

.buttonArea {
    text-align: center;
}

/* 番号ボタンのwrapper */
.number-btn {
    display: inline;
}
</style>