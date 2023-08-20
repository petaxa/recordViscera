<script setup lang="ts">
defineProps<{
  page: number,
  maxPage: number,
}>()
defineEmits(['updateCurrentPage'])

// 現在のページかどうか
const isCurrentPage = (n: number, page: number) => {
    return n === page
}
</script>

<template>
    <!-- NOTE: ボタンの形、色を上手くいじりたい。ダークモード対応の部分を読み解かないと。 -->
    <div class="buttonArea">
        <button v-if="page !== 1" @click="$emit('updateCurrentPage', 1)">&lt;</button>
        <button v-for="n of maxPage" :key="n" @click="$emit('updateCurrentPage', n)" :class="{currentPage: isCurrentPage(n, page)}">{{ n }}</button>
        <button v-if="page !== maxPage" @click="$emit('updateCurrentPage', page + 1)">&gt;</button>
    </div>
</template>

<style scoped>
/* 現在ページのボタン */
.currentPage {
    background-color: hsla(160, 100%, 37%, 1);
}
</style>