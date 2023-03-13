<template>
  <div :class="[close ? 'close' : 'open', 'outer']">
    <Danmaku v-if="dm.cmd == 'DANMU_MSG'" :face="dm.info.face" :uid="dm.info.uid" :sender="dm.info.sender"
      :src="dm.info.src" :msg="dm.info.msg" />

    <SuperChat v-else-if="dm.cmd == 'SUPER_CHAT_MESSAGE' || dm.cmd == 'SEND_GIFT'" :title="dm.info.title"
      :medal="dm.info.medal" :price="Number(dm.info.price)" :message="dm.info.message" :avatar="dm.info.avatar"
      :uid="dm.info.uid" :contentcolor="dm.info.contentcolor" :headercolor="dm.info.headercolor" :hiderate="true"
      :ts="dm.info.ts" />

    <Guard v-else-if="dm.cmd == 'GUARD_BUY'" :msg="dm.info.msg" :face="dm.info.face" />
  </div>
</template>

<script setup>
import Danmaku from './Danmaku.vue'
import SuperChat from './SuperChat.vue'
import Guard from './Guard.vue'

import aliyun from '../aliyun'

import { ref, onMounted } from 'vue'

const props = defineProps({
  odm: Object
})

const close = ref(true)
const dm = ref(props.odm)

onMounted(() => {
  loadFace(props.odm.info.uid)
  setTimeout(() => close.value = false, 50)
})

function loadFace(uid) {
  if (uid == -1) return;
  aliyun.get(`/user.User(${uid}).get_user_info().face?max_age=86400`)
    .then(res => { dm.value.info.avatar = dm.value.info.face = res.data.data })
    .catch(err => { dm.value.info.face = "https://i0.hdslb.com/bfs/face/member/noface.jpg" })
}
</script>

<style>
.outer {
  padding-bottom: 0.25em;
  margin-top: calc(0.25em - 1px);
  margin-bottom: 1px;
  position: relative;
  transition: all 0.4s ease 0.2s;
}

.close {
  opacity: 0;
  left: -3em;
}

.open {
  opacity: 1;
  left: 0;
}
</style>