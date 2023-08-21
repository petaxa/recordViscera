// リンク指定の型
export type LinksType = {
    path: string,
    text: string
}

/**
 * 入力時のヘッダーリンク情報
 */
export const linksWhenInput: LinksType[] = [
    {
        path: '/',
        text: '体温'
    },
    {
        path: '/poo',
        text: 'お腹の調子'
    },
    {
        path: '/listPoo',
        text: '記録→'
    }
]

/**
 * LIST時のヘッダーリンク情報
 */
export const linksWhenList: LinksType[] = [
    {
        path: '/',
        text: '←入力'
    },
    {
        path: '/listPoo',
        text: '排便記録'
    },
    {
        path: '/listTemp',
        text: '体温'
    },
    {
        path: '/listPooCnt',
        text: '排便回数'
    },
]