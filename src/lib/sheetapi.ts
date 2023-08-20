export const sendTemp = async(date: Date, temp: number) => {
    const formatedDate = formatDate(date)

    // 送信処理を行う。
    const json = JSON.stringify({ "type": "temp", "data": [{ "date": formatedDate, "temp": temp }] })
    const res = await post(json)
    return res
}

export const sendPoo = async(date: Date, poo: string, blood: string, drainage: string, notes: string) => {
    const formatedDate = formatDate(date)

    // 送信処理を行う。
    const json = JSON.stringify({ "type": "poo", "data": [{ "date": formatedDate, "poo": poo, "blood": blood, "drainage": drainage, "notes": notes }] })
    const res = await post(json)
    return res
}

type getParamType = {
    "type": string,
    "page": number,
    "count": number
}
export const getPoo = async (page: number, count: number) => {
    const json: getParamType = { "type": "poo", "page": page, "count": count }
    const res = await sendGetRequest(json) as getPooResType
    return res
}

export const getTemp = async (page: number, count: number) => {
    const json: getParamType = { "type": "temp", "page": page, "count": count }
    const res = await sendGetRequest(json) as getTempResType
    return res
}

export const getPooCnt = async (page: number, count: number) => {
    const json: getParamType = { "type": "pooCnt", "page": page, "count": count }
    const res = await sendGetRequest(json) as getPooCntResType
    return res
}

const formatDate = (date: Date): string => {
    const YYYY = String(date.getFullYear())
    const MM = String(date.getMonth() + 1).padStart(2, '0')
    const DD = String(date.getDate()).padStart(2, '0')
    const HH = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')
    // YYYY-MM-DD HH:mm形式で返す
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}`
}

// getもpostもメッセージの出るタイミングがゴミだから修正したい。
const post = (json: string) => {
    const promise:Promise<getResType> = new Promise((resolve, reject) => {
        //データを送信
        const xhr = new XMLHttpRequest()       //インスタンス作成
        xhr.onload = function () {        //レスポンスを受け取った時の処理（非同期）
            const res = xhr.responseText
            if (res.length > 0) resolve(JSON.parse(res))
        }
        xhr.onerror = function () {       //エラーが起きた時の処理（非同期）
            console.log("error!")
        }
        xhr.open('post', import.meta.env.VITE_API_URL, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(json)    //送信実行
    })
    return promise
}

type pooResType = {
    "date": string,
    "poo": string,
    "blood": string,
    "drainage": string,
    "notes": string,
}

type tempResType = {
    "date": string,
    "temp": string
}

type pooCntResType = {
    "date": string,
    "count": string
}

export interface getResType {
    "page": string
    "count": string
    "allCount": string
    "data": pooResType[] | tempResType[] | pooCntResType[]
}

export interface getPooResType extends getResType {
    "data": pooResType[]
}
export interface getTempResType extends getResType {
    "data": tempResType[]
}
export interface getPooCntResType extends getResType {
    "data": pooCntResType[]
}

const sendGetRequest = (json: getParamType) => {
    const promise: Promise<getResType> = new Promise((resolve, reject) => {
        //データを送信
        const xhr = new XMLHttpRequest()       //インスタンス作成
        xhr.onload = function () {        //レスポンスを受け取った時の処理（非同期）
            const res = xhr.responseText
            if (res.length > 0) resolve(JSON.parse(res))
        }
        xhr.onerror = function () {       //エラーが起きた時の処理（非同期）
            console.log("error!")
        }
        xhr.open('get', `${import.meta.env.VITE_API_URL}?type=${json.type}&page=${json.page}&count=${json.count}`, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send()    //送信実行
    })
    return promise
}