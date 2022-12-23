export function makeDanmaku(msg) {
    return {
        cmd: "DANMU_MSG",
        info: {
            face: "/ico.png",
            uid: -1,
            sender: "default",
            msg: msg
        }
    }
}

export function openSocket(url, room_id, dms, min_price, onerror) {
    let ws = new WebSocket(`wss://${url}/sub/${room_id}`);
    // WebSocket连接成功回调
    ws.onopen = () => dms.push(makeDanmaku("WebSocket 已连接上"))
    // WebSocket接收数据回调
    ws.onmessage = function (evt) {
        var element = JSON.parse(evt.data)
        // console.log(element)
        if(element.cmd == "SEND_GIFT" && element.info.price <= min_price) return
        dms.push(element)
    }
    // WebSocket接收失败回调
    ws.onerror = onerror(dms)
}