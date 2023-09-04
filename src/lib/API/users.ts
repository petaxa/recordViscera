import { sendHttpReq } from "."

type LoginPostBodyType = {
    email: string
    password: string
}

type LoginPostResType = {
    status: boolean
    token: string
    message: string
}

/**
 * ログインを行う
 * @param email
 * @param password
 * @returns
 */
export const login = async (email: string, password: string) => {
    // どちらかでも値が入ってなかったらエラー
    if (!email || !password) {
        // TODO: エラー時の挙動を決める。
        const res: LoginPostResType = {
            status: false,
            message: 'It is required both of email and password',
            token: ''
        }
        return res
    }

    // 送信処理を行う。
    const json: LoginPostBodyType = {
        email,
        password
    }
    const url = `${import.meta.env.VITE_API_URL_RECORD_VISCERA_API}/login`
    const response: Promise<LoginPostResType> = sendHttpReq(url, 'post', true, JSON.stringify(json))
    return response
}

type RegisterPostBodyType = {
    email: string
    password: string
    name?: string
}

type RegisterPostResType = {
    status: boolean
    message: string
}

export const register = async (email: string, password: string, name?: string) => {
    // email, passwordのどちらかが無かったらエラー
    if (!email || !password) {
        // TODO: エラー時の挙動を決める。
        const res: RegisterPostResType = {
            status: false,
            message: 'It is required both of email and password',
        }
        return res
    }

    // 送信処理を行う。
    const json: RegisterPostBodyType = {
        email,
        password,
        name
    }
    const url = `${import.meta.env.VITE_API_URL_RECORD_VISCERA_API}/register`
    const response: Promise<RegisterPostResType> = sendHttpReq(url, 'post', true, JSON.stringify(json))
    return response
}
