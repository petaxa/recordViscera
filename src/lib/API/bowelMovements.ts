import { sendHttpReq } from "."

const USER_BOWEL_MOVEMENTS_URL = `${import.meta.env.VITE_API_URL_RECORD_VISCERA_API}/users/bowel-movements`

// フィールドを返却するかどうかを示す型
type BowelMovementWhereType = {
    id: boolean
    date: boolean
    blood: boolean
    drainage: boolean
    note: boolean
    scaleId: boolean
    createdAt: boolean
    updatedAt: boolean
}

/**
 * 排便記録のリストを取得した際に返ってくるレスポンスの型
 */
export type BowelMovementGetResType = {
    status: boolean
    message: string
    allCount: number
    count: number
    sort: string
    fields: string
    limit: string
    offset: string
    filter: {
        id: string
        date: string
        blood: string
        drainage: string
        note: string
        scaleId: string
        createdAt: string
        updatedAt: string
    }
    bowelMovements: {
        id: number
        day: string
        time: string
        blood: number
        drainage: number
        note: string
        userId: number
        scaleId: number
        createdAt: string
        updatedAt: string
    }[]
}

/**
 * 排便記録のリストを取得
 * pageとcountを貰い、データの取得範囲を計算
 * sort, fields, whereにも対応
 * @param page
 * @param count 1ページのデータ数
 * @param sort フィールド名を指定しソート。「-」でdesc
 * @param fields レスポンスに含めるフィールド
 * @param where フィールドの値で絞り込み。連想配列で記述
 * @returns
 */
export const readBowelMovement = (page: number, count: number, sort?: string, fields?: string, where?: BowelMovementWhereType) => {
    const offset = count * (page - 1)
    console.log(offset, count, page)

    // Paramsを作成
    let params = `limit=${count}&offset=${offset}${sort ? `&sort=${sort}` : ''}${fields ? `&fields=${fields}` : ''}`
    if (where) {
        params += `${where.id ? `&id=${where.id}` : ''}${where.date ? `&date=${where.date}` : ''}${where.blood ? `&blood=${where.blood}` : ''}}${where.drainage ? `&drainage=${where.drainage}` : ''}}${where.note ? `&note=${where.note}` : ''}}${where.scaleId ? `&scaleId=${where.scaleId}` : ''}${where.createdAt ? `&createdAt=${where.createdAt}` : ''}${where.updatedAt ? `&updatedAt=${where.updatedAt}` : ''}`
    }

    // HTTPリクエストを送信
    const url = `${USER_BOWEL_MOVEMENTS_URL}?${params}`
    const bowelMovements: Promise<BowelMovementGetResType> = sendHttpReq(url, 'get', true)
    return bowelMovements
}

// 排便記録のbodyの型
type BowelMovementPostBodyType = {
    scaleId: number
    blood: number
    drainage: number
    note: string
    date: Date
}

// 排便記録を追加した際のレスポンスの型
type BowelMovementPostResType = {
    status: boolean
    message: string
    data: {
        id: number
        day: string
        time: string
        blood: number
        drainage: number
        note: string
        userId: number
        scaleId: number
        createdAt: string
        updatedAt: string
    }
}

/**
 * 排便記録の新規登録
 * @param date 計測日時
 * @param scaleId ブリストルスケール 1から7
 * @param blood 血の有無 あり: 1, なし: 0
 * @param drainage 粘液の有無  あり: 1, なし: 0
 * @param note 備考
 * @returns
 */
export const registBowelMovement = async (date: Date, scaleId: number, blood: number, drainage: number, note: string) => {
    // tempに値が入っているかを確認
    if (!scaleId) {
        // TODO: エラー時の挙動を決める。
        const res = { 'message': 'scaleId is required' }
        return res
    }

    // 送信処理を行う。
    const json: BowelMovementPostBodyType = {
        scaleId,
        blood,
        drainage,
        note,
        date
    }
    const response: Promise<BowelMovementPostResType> = sendHttpReq(USER_BOWEL_MOVEMENTS_URL, 'post', true, JSON.stringify(json))
    return response
}

// 排便回数を取得した際のレスポンスの型
export type BowelMovementCountGetResType = {
    status: boolean
    message: string
    allCount: number
    count: number
    data: {
        _count: {
            _all: number
        }
        day: string
    }[]
}

/**
 * 排便回数を取得する
 * @returns
 */
export const countBowelMovementsPerDay = (page: number, count: number) => {
    // paramsを作成
    const offset = count * (page - 1)
    const params = `limit=${count}&offset=${offset}`

    // HTTPリクエストを送信
    const url = `${USER_BOWEL_MOVEMENTS_URL}/count?${params}`
    const bowelMovementCount: Promise<BowelMovementCountGetResType> = sendHttpReq(url, 'get', true)
    return bowelMovementCount
}