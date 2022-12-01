import pako from "pako";

export async function onClickShow(roomid, dms, min_price) {
    const roomData = await getRoomId(roomid);
    if (roomData.code) {
        alert("房间号错误");
        return;
    }
    const socketData = await getWebSocketHost(roomData.data.room_id);
    if (socketData.code) {
        alert("房间号错误");
        return;
    }
    openSocket(socketData.data.host, roomData.data.room_id, roomData.data.uid, dms, min_price);
}

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

async function getRoomId(id) {
    const res = await axios.get(`https://aliyun.nana7mi.link/live.LiveRoom(${id}).get_room_play_info()`);
    return res.data;
}

async function getWebSocketHost(roomid) {
    const res = await axios.get(`https://aliyun.nana7mi.link/live.LiveRoom(${roomid}).get_chat_conf()`);
    return res.data;
}

// 从buffer中读取int
const readInt = function (buffer, start, len) {
    let result = 0;
    for (let i = len - 1; i >= 0; i--) {
        result += Math.pow(256, len - i - 1) * buffer[start + i];
    }
    return result;
};

/**
 * blob blob数据
 * call 回调 解析数据会通过回调返回数据
 */
function decode(blob, call) {
    // 文本解码器
    var textDecoder = new TextDecoder("utf-8");
    let reader = new FileReader();
    reader.onload = function (e) {
        let buffer = new Uint8Array(e.target.result);
        let result = {};
        result.packetLen = readInt(buffer, 0, 4);
        result.headerLen = readInt(buffer, 4, 2);
        result.ver = readInt(buffer, 6, 2);
        result.op = readInt(buffer, 8, 4);
        result.seq = readInt(buffer, 12, 4);
        if (result.op == 5) {
            result.body = [];
            let offset = 0;
            while (offset < buffer.length) {
                let packetLen = readInt(buffer, offset + 0, 4);
                let headerLen = 16; // readInt(buffer,offset + 4,4)
                let data = buffer.slice(offset + headerLen, offset + packetLen);
                let body = "{}";
                if (result.ver == 2) {
                    //协议版本为 2 时  数据有进行压缩 通过pako.js 进行解压
                    body = textDecoder.decode(pako.inflate(data));
                } else {
                    //协议版本为 0 时  数据没有进行压缩
                    body = textDecoder.decode(data);
                }
                if (body) {
                    // 同一条消息中可能存在多条信息，用正则筛出来
                    // eslint-disable-next-line no-control-regex
                    const group = body.split(/[\x00-\x1f]+/);
                    group.forEach((item) => {
                        try {
                            result.body.push(JSON.parse(item));
                        } catch (e) {
                            // 忽略非JSON字符串，通常情况下为分隔符
                        }
                    });
                }
                offset += packetLen;
            }
        }
        //回调
        call(result);
    };
    reader.readAsArrayBuffer(blob);
}

function openSocket(url, room_id, owner, dms, min_price) {
    let timer = null;
    let ws = new WebSocket(`wss://${url}/sub`);
    let json = {
        uid: 0,
        roomid: room_id, //上面获取到的room_id
        protover: 1,
        platform: "web",
        clientver: "1.4.0",
    };
    // WebSocket连接成功回调
    ws.onopen = function () {
        dms.push(makeDanmaku("WebSocket 已连接上"))
        ws.send(getCertification(JSON.stringify(json)).buffer);
        //心跳包的定时器
        timer = setInterval(function () {
            //定时器 注意声明timer变量
            var n1 = new ArrayBuffer(16);
            var i = new DataView(n1);
            i.setUint32(0, 0), //封包总大小
                i.setUint16(4, 16), //头部长度
                i.setUint16(6, 1), //协议版本
                i.setUint32(8, 2), // 操作码 2 心跳包
                i.setUint32(12, 1); //就1
            ws.send(i.buffer); //发送
        }, 30000);
        //组合认证数据包 并发送
    };
    //WebSocket接收数据回调
    ws.onmessage = function (evt) {
        var blob = evt.data;
        //对数据进行解码 decode方法
        decode(blob, function (packet) {
            //解码成功回调
            if (packet.op == 5) {
                //会同时有多个 数发过来 所以要循环
                for (let i = 0; i < packet.body.length; i++) {
                    var element = packet.body[i];
                    if(!element.cmd) return;
                    else if(element.cmd.startsWith("DANMU_MSG")) {
                        dms.push({
                            cmd: "DANMU_MSG",
                            info: {
                                face: null,
                                uid: element.info[2][0],
                                sender: element.info[2][0] == owner ? "self" : element.info[2][2] == 1 ? "owner" : element.info[2][7] == "" ? "default" : "guard",
                                msg: element.info[1],
                                src: element.info[0][13].url
                            }
                        })
                    } else if(element.cmd == "SUPER_CHAT_MESSAGE") {
                        dms.push({
                            cmd: element.cmd,
                            info: element.data
                        })
                    } else if(element.cmd == "GUARD_BUY") {
                        dms.push({
                            cmd: element.cmd,
                            info: {
                                msg: `新${ element.data.gift_name }！<br />欢迎 ${ element.data.username }！`,
                                uid: element.data.uid
                            }
                        })
                    } else if(element.cmd == "SEND_GIFT" && element.data.price / 1000 > min_price) {
                        dms.push({
                            cmd: element.cmd,
                            info: element.data
                        })
                    } 
                    // else if(element.cmd == "INTERACT_WORD") {
                    //     dms.push(makeDanmaku(element.data.uname + " 进入直播间"))
                    // }
                }
            }
        });
    };
    // WebSocket连接关闭回调
    ws.onclose = function () {
        // console.log("连接已关闭");
        if (timer != null) clearInterval(timer);
    };
}
//组合认证数据包
function getCertification(json) {
    var bytes = str2bytes(json); //字符串转bytes
    var n1 = new ArrayBuffer(bytes.length + 16);
    var i = new DataView(n1);
    i.setUint32(0, bytes.length + 16), //封包总大小
        i.setUint16(4, 16), //头部长度
        i.setUint16(6, 1), //协议版本
        i.setUint32(8, 7), //操作码 7表示认证并加入房间
        i.setUint32(12, 1); //就1
    for (var r = 0; r < bytes.length; r++) {
        i.setUint8(16 + r, bytes[r]); //把要认证的数据添加进去
    }
    return i; //返回
}
//字符串转bytes //这个方法是从网上找的QAQ
function str2bytes(str) {
    const bytes = [];
    let c;
    const len = str.length;
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10ffff) {
            bytes.push(((c >> 18) & 0x07) | 0xf0);
            bytes.push(((c >> 12) & 0x3f) | 0x80);
            bytes.push(((c >> 6) & 0x3f) | 0x80);
            bytes.push((c & 0x3f) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00ffff) {
            bytes.push(((c >> 12) & 0x0f) | 0xe0);
            bytes.push(((c >> 6) & 0x3f) | 0x80);
            bytes.push((c & 0x3f) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007ff) {
            bytes.push(((c >> 6) & 0x1f) | 0xc0);
            bytes.push((c & 0x3f) | 0x80);
        } else {
            bytes.push(c & 0xff);
        }
    }
    return bytes;
}