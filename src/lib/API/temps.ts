import { sendHttpReq } from "."

const USER_TEMPS_URL = `${import.meta.env.VITE_API_URL_RECORD_VISCERA_API}/users/temps`

// フィールドを返却するかどうかを示す型
type TempWhereType = {
    id: boolean
    date: boolean
    temp: boolean
    createdAt: boolean
    updatedAt: boolean
}

/**
 * 体温のリストを取得した際、返ってくるレスポンスの型
 */
export type TempGetResType = {
    status: boolean,
    message: string,
    allCount: number,
    count: number,
    sort: string,
    fields: string,
    limit: string,
    offset: string,
    filter: {
        id: string,
        date: string,
        temp: string,
        createdAt: string,
        updatedAt: string
    },
    temps: {
        id: number,
        day: string,
        time: string,
        temp: number,
        userId: number,
        createdAt: string,
        updatedAt: string
    }[]
}

/**
 * 体温のリストを取得
 * pageとcountを貰い、データの取得範囲を計算
 * sort, fields, whereにも対応
 * @param page
 * @param count 1ページのデータ数
 * @param sort フィールド名を指定しソート。「-」でdesc
 * @param fields レスポンスに含めるフィールド
 * @param where フィールドの値で絞り込み。連想配列で記述
 * @returns
 */
export const readTemp = (page: number, count: number, sort?: string, fields?: string, where?: TempWhereType) => {
    const offset = count * (page - 1)

    // Paramsを作成
    let params = `limit=${count}&offset=${offset}${sort ? `&sort=${sort}` : ''}${fields ? `&fields=${fields}` : ''}`
    if (where) {
        params += `${where.id ? `&id=${where.id}` : ''}${where.date ? `&date=${where.date}` : ''}${where.temp ? `&temp=${where.temp}` : ''}${where.createdAt ? `&createdAt=${where.createdAt}` : ''}${where.updatedAt ? `&updatedAt=${where.updatedAt}` : ''}`
    }

    // HTTPリクエストを送信
    const url = `${USER_TEMPS_URL}?${params}`
    const temps: Promise<TempGetResType> = sendHttpReq(url, 'get', true)
    return temps
}

// 体温記録のbodyの型
type TempPostBodyType = {
    temp: number
    date: Date
}

// 体温記録を追加した際のレスポンスの型
type TempPostResType = {
    status: boolean
    message: string
    data: {
        id: number
        day: string
        time: string
        temp: number
        userId: number
        createdAt: string
        updatedAt: string
    }
}

/**
 * 体温記録の新規登録
 * @param date 計測日時
 * @param temp 体温
 * @returns
 */
export const registTemp = async (date: Date, temp: number) => {
    // tempに値が入っているかを確認
    if (!temp) {
        // TODO: エラー時の挙動を決める。
        const res = { 'message': 'temp is required' }
        return res
    }
    // tempが50以内かどうかの確認
    if (temp > 50) {
        const res = { 'message': 'temp must be under 50' }
        return res
    }

    // 送信処理を行う。
    const json: TempPostBodyType = {
        "temp": temp,
        "date": date
    }
    const response: Promise<TempPostResType> = sendHttpReq(USER_TEMPS_URL, 'post', true, JSON.stringify(json))
    return response
}