<template>
  <div id="container">
    <div id="box" class="glass">
      <div id="hello">
        <Message v-for="dm in dms" :dm="dm" />
      </div>
      <div id="edit">
        <span style="font-size: 175px;">
          我 测<br>
          你 码<br>
          我 测<br>
          你 码<br>
          我 测<br>
          你 码<br>
          我 测<br>
          你 码
        </span>
      </div>
    </div>
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
            msg: `新舰长！<br />欢迎 七海Nana7mi！`,
            uid: 434334701
          }
        },
      ]
    }
  },
  mounted() {
    if(this.$route.query.roomid) this.redirect(`redirect/?roomid=${this.$route.query.roomid}`)
    document.getElementById("box").style = `--height: ${document.getElementById("hello").offsetHeight}px`
    setTimeout(() => document.getElementById("edit").style.opacity = "1", 1)
  }
}
</script>

<style>
#container {
  padding: 16px 0;
  min-height: calc(100vh - 32px);
  background: url("/sky.jpg") 0px center / cover no-repeat fixed;
  filter: grayscale(0.95);
}

.glass {
  position: relative;
  border-radius: 20px;
  padding: 1em;
  box-shadow: 0 .5em 1em rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index: 2;
}

.glass::before {
  content: "";
  position: absolute;
  width: calc(100% + 2em);
  height: calc(100% + 2em);
  top: -1em;
  left: -1em;
  background: url("/sky.jpg") 0px center / cover no-repeat fixed;
  box-shadow: 0 0 0 448px rgba(255, 255, 255, 0.2) inset;
  filter: blur(5px);
  z-index: -1;
}

#hello {
  width: 400px;
  left: calc(50vw - 200px - 1em);
  height: max-content;
}

#box {
  width: 832px;
  height: var(--height);
  display: flex;
  justify-content: space-between;
  margin: auto;
}

@media screen and (max-width: 816px) {
  #box {
    width: 400px;
    flex-direction: column;
    height: max-content;
  }
}

#edit {
  width: 400px;
  position: relative;
  color: white;
  transition: all 1s;
  overflow: scroll;
  opacity: 0;
}
</style>