<template>
  <div class="hello">
    <Message v-for="dm in dms" :dm="dm" />
  </div>
  
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'Hello',
  components: { Message },
  data() {
    return {
      dms: [
        {
          cmd: "DANMU_MSG",
          info: {
            uid: 434334701,
            sender: "default",
            msg: "普通弹幕"
          }
        },
        {
          cmd: "DANMU_MSG",
          info: {
            uid: 434334701,
            sender: "guard",
            msg: "航海弹幕"
          }
        },
        {
          cmd: "DANMU_MSG",
          info: {
            uid: 434334701,
            sender: "owner",
            msg: "房管弹幕"
          }
        },
        {
          cmd: "DANMU_MSG",
          info: {
            uid: 434334701,
            sender: "self",
            msg: "主播弹幕"
          }
        },
        {
          cmd: "SEND_GIFT",
          info: {
            uname: "七海Nana7mi",
            medal_info: {
              guard_level: 3,
              medal_level: 27,
              medal_name: "小孩梓",
              medal_color_start: 398668,
              medal_color_end: 6850801,
              medal_color_border: 398668
            },
            price: 9900,
            action: "投喂",
            giftName: "B克拉",
            uid: 434334701,
            timestamp: new Date().getTime() / 1000
          }
        },
        {
          cmd: "SUPER_CHAT_MESSAGE",
          info: {
            user_info: {
              uname: "七海Nana7mi",
            },
            medal_info: {
              guard_level: 3,
              medal_level: 27,
              medal_name: "小孩梓",
              medal_color_start: 398668,
              medal_color_end: 6850801,
              medal_color_border: 398668
            },
            price: 30,
            uid: 434334701,
            message: "醒目留言",
            ts: new Date().getTime() / 1000
          },
        },
        {
          cmd: "GUARD_BUY",
          info: {
              msg: `新舰长！<br />欢迎 七海Nana7mi`,
              uid: 434334701
          }
        },
      ]
    }
  }
}
</script>

<style>
.hello {
  width: 400px;
  border-radius: 20px;
  border: 2px solid grey;
  padding: 1em;
  margin: auto;
}
</style>