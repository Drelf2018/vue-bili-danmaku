<template>
  <div :class="[close ? 'close' : 'open', 'outer']">
    <Danmaku
      v-if="dm.cmd == 'DANMU_MSG'"
      :face="dm.info.face"
      :uid="dm.info.uid"
      :sender="dm.info.sender"
      :src="dm.info.src">
      {{ dm.info.msg }}
    </Danmaku>

    <SuperChat
      v-if="dm.cmd == 'SUPER_CHAT_MESSAGE' || dm.cmd == 'SEND_GIFT'"
      :title="dm.info.title"
      :medal="dm.info.medal"
      :price="Number(dm.info.price)"
      :message="dm.info.message"
      :avatar="dm.info.avatar"
      :uid="dm.info.uid"
      :contentcolor="dm.info.contentcolor"
      :headercolor="dm.info.headercolor"
      :hiderate="true"
      :ts="dm.info.ts"/>

    <Guard v-if="dm.cmd == 'GUARD_BUY'" :msg="dm.info.msg" :face="dm.info.face"/>
  </div>
</template>

<script>
import Danmaku from './Danmaku.vue'
import SuperChat from './SuperChat.vue'
import Guard from './Guard.vue'

export default {
  name: 'Message',
  components: { Danmaku, SuperChat, Guard },
  data() { return { close: true } },
  props: { dm: Object },
  mounted() {
    this.loadFace(this.dm.info.uid)
    setTimeout(()=>this.close = false, 50)
  },
  methods: {
    loadFace(uid) {
        if(uid == -1) return;
        axios.get(`https://aliyun.nana7mi.link/user.User(${uid}).get_user_info().face?max_age=86400`)
        .then(res => { this.dm.info.avatar = this.dm.info.face = res.data.data })
        .catch(err => { this.dm.info.face = "https://i0.hdslb.com/bfs/face/member/noface.jpg" })
    }
  }
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