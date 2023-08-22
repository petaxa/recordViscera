<script setup lang="ts">
import { getTemp } from '@/lib/sheetapi'
import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { getTempResType } from '@/lib/sheetapi'
import PageNationButton from './pageNationButton.vue'

// 1ページのデータ表示数
const COUNT = 20;
// 現在のページ
const page = ref(1)

/**
 * ページを更新
 */
const updateCurrentPage = (newPage: number) => {
    page.value = newPage
}

// default data
const defaultData = {
    "page": "",
    "count": "",
    "allCount": "",
    "data": [{
        "date": "",
        "temp": ""
    }]
}

// 返ってきたデータ
const res: Ref<getTempResType> = ref(defaultData)
// resの中に(defaultデータではない)正常な値が入っているか
const isDataAvailable = ref(false)

// 最大ページ
const maxPage = ref(0)

/**
 * スプレッドシートからのデータ取得、resに格納、フラグ, ページの更新 を行う
 * pageを監視しているwatch内で使う
 * resの中身をデフォルトに → データ有無フラグ変更 → API実行, resに格納 → 最大ページ, データ有無フラグを変更
 * NOTE: ちょっとさすがに関数名を改善したい
 */
 const getTempWork = async () => {
    // 更新前にデータを一度空にする
    res.value = defaultData
    // データをなしに変更
    isDataAvailable.value = false

    // APIを実行
    const r = await getTemp(page.value, COUNT)
    // resに格納
    res.value = r;

    // NOTE: これも共通処理だよね。
    // 最大ページを更新
    maxPage.value = Math.ceil(Number(res.value.allCount) / Number(res.value.count))

    // データをありに変更
    isDataAvailable.value = true
}

/**
 * 最初にロードされたときの処理
 */
onMounted(async () => {
    // データを更新
    await getTempWork()

    // 現在ページを最大ページに変更
    page.value = maxPage.value
})

/**
 * pageを監視してデータを取得
 * NOTE: ページ遷移のたびに同じの読み込むのやだなぁ。どうにかできないかなあ。最悪localhostかなぁ。
 * NOTE: そもそも、ページ遷移のたびに表示する要素を読み込むという思想自体がダメなのでは。API側で機能追加して、新しく追加されたかだけを返してくれるようなものを作るべきでは。その時だけ受信のAPIを投げる。
 */
watch(page, async () => {
    // データを更新
    await getTempWork()
})
</script>
<template>
    <table>
        <thead>
            <tr>
                <th id="date">日付</th>
                <th id="temp">体温</th>
            </tr>
        </thead>
        <Transition name="fade">
            <tbody v-if="isDataAvailable">
                <tr v-for="d in res?.data" :key="d.date">
                    <td>{{ d.date }}</td>
                    <td>{{ d.temp }}</td>
                </tr>
            </tbody>
        </Transition>
    </table>

    <PageNationButton :page="page" :max-page="maxPage" :isDataAvailable="isDataAvailable" @updateCurrentPage="(newPage) => { updateCurrentPage(newPage) }" />
</template>

<style scoped>
table {
    width: 100%;
    text-align: center;
    font-size: 0.6em;
}

table tr {
    height: 2.5em;
}

/* セルの個別設定 */
#date {
    width: 30%;
}
</style>

<!-- TransitionのCSSを読み込み -->
<style src="@/assets/v-transition.css" scoped></style>