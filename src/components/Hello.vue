<template>
  <div style="background: url('/sky.jpg') 0/cover no-repeat fixed;height: 100vh;filter: grayscale(0.8);">
    <div id="hello">
      <Message v-for="dm in dms" :dm="dm" />
    </div>
  </div>
  <span id="test">我 测<br>你 码</span>
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
  },
  mounted() {
    // if(this.$route.query.roomid) this.redirect(`redirect/?roomid=${this.$route.query.roomid}`)
    var hello = document.getElementById("hello")
    hello.style.top = `calc(50vh - ${hello.offsetHeight / 2}px)`
    if(0.5*window.innerWidth > 416) setTimeout(() => hello.style.left = "200px", 1)
    var test = document.getElementById("test")
    test.style.top = `calc(50vh - ${test.offsetHeight / 2}px)`
    setTimeout(() => test.style.opacity = "1", 1)
  }
}
</script>

<style>
#hello {
  position: relative;
  width: 400px;
  border-radius: 20px;
  transition: all 0.75s ease 0.75s;
  padding: 1em;
  left: calc(50vw - 200px - 1em);
  box-shadow: 0 .5em 1em rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

#hello::before {
  content: "";
  position: absolute;
  width: calc(100% + 2em);
  height: calc(100% + 2em);
  top: -1em;
  left: -1em;
  box-shadow: 0 0 0 232px rgba(255, 255, 255, 0.2) inset;
  background: url("/sky.jpg") 0px center / cover no-repeat fixed;
  filter: blur(7px);
}

#test {
  position: absolute;
  font-size: 200px;
  right: 200px;
  color: white;
  transition: all 0.5s ease 1.5s;
  opacity: 0;
}
</style>