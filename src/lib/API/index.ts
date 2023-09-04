/**
 * HTTPリクエストを投げる
 * @param url BaseURLまで全部。
 * @param method HTTPメソッド
 * @returns
 */
export const sendHttpReq = (url: string, method: string, isUsedToken: boolean, body?: any) => {
    // NOTE: rejectをどう使うかよく調べないといけない。
    const promise: Promise<any> = new Promise((resolve, reject) => {
        //データを送信
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            const res = xhr.responseText
            if (res.length > 0) resolve(JSON.parse(res))
        }
        xhr.onerror = function () {
            console.log("error!")
        }

        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        if (isUsedToken) xhr.setRequestHeader('x-auth-token', localStorage.getItem('token') ?? '')
        xhr.send(body)
    })
    return promise
}

/**
 * 記録データ関係は記録日時をdayとtimeに分けているのでフォーマットする。
 * yyyy-MM-dd HH:mm:ss
 * @param day ISO 8601形式の文字列
 * @param time ISO 8601形式の文字列
 * @param isDate Date型で返してほしいときはtrueにする
 * @returns
 */
export const formatDateStrFromDayTime = (day: string, time: string, isDate: boolean = false) => {
    // TODO: ISO 8601形式じゃない場合は弾きたい。いつかやる。

    // 年月日: 0文字目から10文字目でslice
    const yyyyMMdd = day.slice(0, 10)
    // 時間ミリ秒: 11文字目から-1文字目までslice
    const HHmmss = time.slice(11, 19)
    const yyyyMMddHHmmss = `${yyyyMMdd} ${HHmmss}`
    if (isDate) {
        return new Date(yyyyMMddHHmmss)
    }
    return yyyyMMddHHmmss
}