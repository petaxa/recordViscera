# recordviscera

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## GASでAPI作った

### 方針のメモ

JSONで、
・体温(temp)か便(poo)か
・それらの入力内容
を貰う(もらえなかったらエラー返すのを忘れずに。)
同タイプなら一気にinsert可能。(insert関数がちゃんと日付通りに入力されるようにしないと。)
JSON
{"type":"temp","data":[{"date":"2022-07-27 22:05","temp":"36.5"}]}

プロジェクトはIDで開く
シートはJSONの体温か便かで決定

末尾にデータを追加

#### 体温

現在日時(date)をA列に、体温(temp)をB列に追加
現在日時はAPI実行時にDateから作成
体温は文字列でJSONから受け取る
JSON
{"date":"2022-07-27 22:05","temp":"36.5"}

#### 便

現在日時(date)をA列に、便の状態(poo)をB列に、血の有無(blood)をC列に、粘液の有無(drainage)をD列に、備考(notes)をE列に追加
現在日時はAPI実行時にDateから作成
その他はJSONから受け取る
便の状態、血の有無、粘液の有無、備考はフリーテキスト
血の有無、粘液の有無に関して、内容はフロント側で制限をかけてもらい、こっちでは感知しない。
ただ、送られてきたものを記録するのみ。
JSON
{"date":"2022-07-27 22:05","poo":"泥状", "blood":"あり", "drainage":"あり", "notes":"赤い"}

データの更新があった場合、グラフを更新する。
