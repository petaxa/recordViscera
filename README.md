# recordviscera

クローン病向け健康管理アプリ
recordVisceraAPIを利用し、体調等を記録する

## 機能

### 記録項目

- 体温
- 便の状態
- 通院記録
- 服薬記録

## プロトタイプ
GASでAPIを作っている

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
