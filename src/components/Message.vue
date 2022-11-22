<template>
  <Danmaku
    v-if="dm.cmd == 'DANMU_MSG'"
    :class="close ? 'close' : 'open'"
    :face="dm.info.face"
    :uid="dm.info.uid"
    :sender="dm.info.sender"
    :src="dm.info.src"
    style="transition: all 0.4s ease 0.05s;">
    {{ dm.info.msg }}
  </Danmaku>

  <SuperChat
    v-if="dm.cmd == 'SUPER_CHAT_MESSAGE'"
    :class="close ? 'close' : 'open'"
    :title="dm.info.user_info.uname"
    :medal="dm.info.medal_info"
    :price="Number(dm.info.price)"
    :message="dm.info.message"
    :avatar="dm.info.user_info.face"
    :uid="dm.info.uid"
    :contentcolor="dm.info.background_color_end"
    :headercolor="dm.info.background_price_color"
    :hiderate="true"
    :ts="dm.info.ts"
    style="transition: all 0.4s ease 0.05s;" />
</template>

<script>
import Danmaku from './Danmaku.vue'
import SuperChat from './SuperChat.vue'

export default {
  name: 'Message',
  components: { Danmaku, SuperChat },
  data() { return { close: true } },
  props: { dm: Object },
  mounted() {
    if(this.dm.cmd == 'DANMU_MSG') this.loadFace(this.dm.info.uid)
    setTimeout(()=>this.close = false, 50)
  },
  methods: {
    loadFace(uid) {
        if(uid == -1) return;
        axios.get(`https://aliyun.nana7mi.link/user.User(${uid}).get_user_info().face?max_age=86400`)
        .then(res => { this.dm.info.face = res.data.data })
        .catch(err => { this.dm.info.face = "https://i0.hdslb.com/bfs/face/member/noface.jpg" })
    }
  }
}
</script>

<style>
.close {
  opacity: 0;
  left: -3em;
}

.open {
  opacity: 1;
  left: 0;
}
</style>