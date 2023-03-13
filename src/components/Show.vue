<template>
  <span v-if="$route.query.debug" style="position: absolute;right: 0.5em;color: grey">{{ alpha }}</span>
  <div id="main-container">
    <div id="main">
      <Message v-for="dm in dms" :odm="dm" />
    </div>
  </div>
</template>
  
<script setup>
import Message from './Message.vue';
import { onClickShow, makeDanmaku } from '../bili-ts-ws';

import { ref, onMounted, watch } from 'vue';

import { useRoute } from 'vue-router';

const dms = ref([])
const pos = ref(0)
const alpha = ref(0)
const route = useRoute()

onMounted(() => {
  var roomid = route.params.roomid
  var price = route.query.price || 9.9
  var main = document.getElementById("main")

  if (roomid == "redirect") {
    roomid = route.query.roomid || 21452505
    dms.value.push(makeDanmaku("弹幕姬网址已更换"))
    dms.value.push(makeDanmaku(`https://danmu.nana7mi.link/${roomid}`))
  }

  onClickShow(roomid, dms.value, price)

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