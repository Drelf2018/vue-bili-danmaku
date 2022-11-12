<template>
  <Danmaku
    v-if="dm.cmd == 'DANMU_MSG0'"
    :uid="dm.info.uid"
    :sender="dm.info.sender"
    :src="dm.info.src">
    {{ dm.info.msg }}
  </Danmaku>

  <SuperChat
    v-if="dm.cmd == 'SUPER_CHAT_MESSAGE'"
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
    style="max-width: 700px" />
</template>

<script>
import Danmaku from './Danmaku.vue'
import SuperChat from './SuperChat.vue'

export default {
  name: 'Message',
  components: { Danmaku, SuperChat },
  props: { dm: Object }
}
</script>