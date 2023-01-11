<template>
  <div id="container">
    <div v-if="dms" id="box" class="glass" :style="'zoom: ' + resize()">
      <div id="hello">
        <Message v-for="dm in dms" :dm="dm" />
      </div>
      <ion-icon v-drag name="move-outline" class="move"></ion-icon>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  components: { Message },
  setup() {
    if(useRoute().query.roomid) useRouter().push(`redirect/?roomid=${useRoute().query.roomid}`)
    
    const uid = 434334701
    const uname = "七海Nana7mi"
    const dms = ref()

    function make_standard_danmaku(sender, msg) {
      return {
        cmd: "DANMU_MSG",
        info: {
          uid: uid,
          sender: sender,
          msg: msg
        }
      }
    }

    function make_gift(cmd, medal) {
      return {
        cmd: cmd,
        info: {
          title: uname,
          medal: medal,
          price: cmd == "SEND_GIFT" ? 9.9 : 50,
          message: cmd == "SEND_GIFT" ? "投喂 B克拉" : "醒目留言",
          contentcolor: cmd == "SEND_GIFT" ? "#2A60B2" : "#427D9E",
          headercolor: cmd == "SEND_GIFT" ? "#7497CD" : "#7DA4BD",
          uid: uid,
          ts: new Date().getTime() / 1000
        }
      }
    }

    axios.get("https://aliyun.nana7mi.link/user.User(434334701).get_user_info().fans_medal.medal").then(
      res => {
        const medal = res.data.data
        medal.medal_level = medal.level
        dms.value = [
          make_standard_danmaku("default", "普通弹幕"),
          make_standard_danmaku("guard", "航海弹幕"),
          make_standard_danmaku("owner", "房管弹幕"),
          make_standard_danmaku("self", "主播弹幕"),
          make_gift("SEND_GIFT", medal),
          make_gift("SUPER_CHAT_MESSAGE", medal),
          {
            cmd: "GUARD_BUY",
            info: {
              msg: `新舰长！<br />欢迎 ${uname}！`,
              uid: uid
            }
          },
        ]
      }
    )
    
    function resize() {
      return Math.min(1, 0.8*window.innerWidth / 382)
    }

    return { dms, resize }
  }
}
</script>

<style>
#container {
  padding: 16px 0;
  min-height: calc(100vh - 32px);
  background: url("/bg.png") 0px center / cover no-repeat fixed;
  /* filter: grayscale(0.95); */
  overflow: hidden;
}

.glass {
  position: relative;
  border-radius: 20px;
  padding: 0.5em 1em;
  box-shadow: 0 .5em 1em rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index: 2;
  background: inherit;
}

.glass::before {
  content: "";
  position: absolute;
  width: calc(100% + 2em);
  height: calc(100% + 2em);
  top: -1em;
  left: -1em;
  background: inherit;
  box-shadow: 0 0 0 448px rgba(255, 255, 255, 0.2) inset;
  filter: blur(5px);
  z-index: -1;
}

#hello {
  width: 350px;
  /* height: max-content; */
}

#box {
  width: fit-content;
  display: flex;
  justify-content: space-between;
  left: 1em;
  position: relative;
}

.move {
  font-size: 1.5em;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  padding: 0.25em;
  border-radius: 0.3em;
}

.move:hover {
  box-shadow: 0 1px 3px grey;
}

@media screen and (max-width: 816px) {
  #box {
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .move {
    display: none;
  }
}

#edit {
  width: 400px;
  position: relative;
  color: white;
  transition: all 1s;
  overflow-y: auto;
  animation: op 1s;
}

@keyframes op {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>