export const sendTemp = (date: Date, temp: number) => {
    const formatedDate = formatDate(date)

    // 送信処理を行う。
    const json = JSON.stringify({ "type": "temp", "data": [{ "date": formatedDate, "temp": temp }] })
    post(json)
}

export const sendPoo = (date: Date, poo: string, blood: string, drainage: string, notes: string) => {
    const formatedDate = formatDate(date)

    // 送信処理を行う。
    const json = JSON.stringify({ "type": "poo", "data": [{"date":formatedDate,"poo":poo, "blood":blood, "drainage":drainage, "notes":notes}] })
    post(json)
}

const formatDate = (date: Date): string => {
    const YYYY = String(date.getFullYear())
    const MM = String(date.getMonth() + 1).padStart(2,'0')
    const DD = String(date.getDate()).padStart(2,'0')
    const HH = String(date.getHours()).padStart(2,'0')
    const mm = String(date.getMinutes()).padStart(2,'0')
    // YYYY-MM-DD HH:mm形式で返す
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}`
}

const post = (json: string) => {
    //データを送信
    const xhr = new XMLHttpRequest();       //インスタンス作成
    xhr.onload = function(){        //レスポンスを受け取った時の処理（非同期）
        const res = xhr.responseText;
        if (res.length>0) alert(res);
    };
    xhr.onerror = function(){       //エラーが起きた時の処理（非同期）
        alert("error!");
    }
    xhr.open('post', import.meta.env.VITE_API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(json);    //送信実行

    console.log('POSTしました')
    console.log(json)
}