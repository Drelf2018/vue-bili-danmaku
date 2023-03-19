<template>
  <span v-if="$route.query.debug" style="position: absolute;right: 0.5em;color: grey">{{ alpha }}</span>
  <div id="main-container">
    <div id="main">
      <Message :key="dm" v-for="dm in dms" :odm="dm" />
    </div>
  </div>
</template>
  
<script setup>
import Message from './Message.vue';
import { makeDanmaku, openSocket } from '../bili-ts-ws';

import { ref, onMounted, watch } from 'vue';

import { useRoute } from 'vue-router';

import { get_room_info, get_chat_host } from '../aliyun'

const dms = ref([])
const pos = ref(0)
const alpha = ref(0)
const route = useRoute()

let min_price = 9.9
if(route.query.price != null) min_price = parseFloat(route.query.price)
let uid = 0
let roomid = route.params.roomid
if (roomid == "redirect") {
  roomid = route.query.roomid || 21452505
  dms.value.push(makeDanmaku("弹幕姬网址已更换为"))
  dms.value.push(makeDanmaku(`https://danmu.nana7mi.link/${roomid}`))
}

// 获取真实房间号
const roomData = await get_room_info(roomid)
// 更新房间号和 uid
uid = roomData.room_info.uid
roomid = roomData.room_info.room_id

const handler = openSocket(await get_chat_host(roomid), roomid)

handler.ongift = gift
handler.onguard = guard
handler.ondanmaku = danmaku
handler.onsuperchat = superchat
handler.onopen = msg => dms.value.push(makeDanmaku(msg))

// handler.all = console.log
// handler.oninteract = element => dms.value.push(makeDanmaku(element.data.uname + " 进入直播间"))

onMounted(() => {  
  var main = document.getElementById("main")
  document.getElementById("app").style.zoom = route.query.zoom || 1
  setInterval(() => {
    if (main.lastElementChild) main.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" })
  }, 300)
})

watch(() => dms.value.length, function (val, old) {
  document.title = "Vue-Bili-Danmaku: " + val
  if (val > old) setTimeout(() => {
    alpha.value = main.offsetHeight / window.innerHeight
    if (alpha.value < 3) pos.value = dms.value.length
    if (alpha.value > 5) for (var i = 0; i < (pos.value || 10); i++) dms.value.shift()
  }, 500)
})

function danmaku(element) {
  let msg = element.info[1]
  let emoji = JSON.parse(element.info[0][15].extra).emots
  for (let em in emoji) msg = msg.replace(RegExp(`\\[${em.slice(1, -1)}\\]`, "g"), `<img class="emoji" src="${emoji[em].url}">`)
  dms.value.push({
    cmd: "DANMU_MSG",
    info: {
      face: null,
      uid: element.info[2][0],
      sender: element.info[2][0] == uid ? "self" : element.info[2][2] == 1 ? "owner" : element.info[2][7] == "" ? "default" : "guard",
      msg: msg,
      src: element.info[0][13].url
    }
  })
}

function superchat(element) {
  dms.value.push({
    cmd: element.cmd,
    info: {
      title: element.data.user_info.uname,
      medal: element.data.medal_info,
      price: Number(element.data.price),
      message: element.data.message,
      avatar: element.data.face,
      uid: element.data.uid,
      contentcolor: element.data.background_color_end,
      headercolor: element.data.background_price_color,
      ts: element.data.ts
    }
  })
}

function guard(element) {
  dms.value.push({
    cmd: element.cmd,
    info: {
      msg: `新${element.data.gift_name}！<br />欢迎 ${element.data.username}！`,
      uid: element.data.uid
    }
  })
}

function gift(element) {
  if(element.data.price <= 1000 * min_price) return
  dms.value.push({
    cmd: element.cmd,
    info: {
      title: element.data.uname,
      medal: element.data.medal_info,
      price: Number(element.data.price / 1000),
      message: element.data.action + ' ' + element.data.giftName,
      avatar: element.data.face,
      uid: element.data.uid,
      ts: element.data.timestamp
    }
  })
}
</script>
  
<style>
#main-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#main {
  margin: 0 8px;
  width: calc(100% - 16px);
  display: flex;
  flex-direction: column;
}
</style>