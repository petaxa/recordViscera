<script setup lang="ts">
import { getPoo } from '@/lib/sheetapi'
import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { getPooResType } from '@/lib/sheetapi'
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
        "poo": "",
        "blood": "",
        "drainage": "",
        "notes": "",
    }]
}

// 返ってきたデータ
const res: Ref<getPooResType> = ref(defaultData)
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
const getPooWork = async () => {
    // 更新前にデータを一度空にする
    res.value = defaultData
    // データをなしに変更
    isDataAvailable.value = false

    // APIを実行
    const r = await getPoo(page.value, COUNT)
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
    await getPooWork()

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
    await getPooWork()
})
</script>
<template>
    <table>
        <thead>
            <tr>
                <th id="date">日付</th>
                <th id="poo">形状</th>
                <th id="blood">血</th>
                <th id="drainage">粘液</th>
                <th id="notes">備考</th>
            </tr>
        </thead>
        <Transition name="fade">
            <tbody v-if="isDataAvailable">
                <tr v-for="d in res?.data" :key="d.date">
                    <td>{{ d.date }}</td>
                    <td>{{ d.poo }}</td>
                    <td>{{ d.blood }}</td>
                    <td>{{ d.drainage }}</td>
                    <td>{{ d.notes }}</td>
                </tr>
            </tbody>
        </Transition>
    </table>

    <PageNationButton :page="page" :max-page="maxPage" :isDataAvailable="isDataAvailable"
        @updateCurrentPage="(newPage) => { updateCurrentPage(newPage) }" />
</template>

<style scoped>
table {
    width: 100%;
    /* text-align: center; */
    font-size: 0.6em;
}

/* セルの個別設定 */
#date {
    width: 30%;
}

#poo {
    width: 20%;
}

#blood {
    width: 10%;
}

#drainage {
    width: 10%;
}

#notes {
    width: 20%;
}
</style>

<!-- TransitionのCSSを読み込み -->
<style src="@/assets/v-transition.css" scoped></style>