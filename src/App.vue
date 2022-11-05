<template>
  <div id="main" :style="'transition: all '+ this.ts + 's;'">
    <Danmaku v-for="dm in dms" :uid="dm.uid" :sender="dm.sender" :src="dm.src">{{ dm.msg }}</Danmaku>
  </div>
</template>

<script>
import Danmaku from './components/Danmaku.vue';
import { onClickShow } from './bili-ws'

export default {
  name: 'App',
  components: { Danmaku },
  data() { return { dms: [], ts: 0.2 } },
  methods: {
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    }
  },
  async mounted() {
    await onClickShow(this.getQueryString("roomid") || 21452505, this.dms)
    var main = document.getElementById("main")
    setInterval(() => {
      if (main.style.top.replace("px", "") < window.innerHeight - main.offsetHeight) { this.ts = 0; setTimeout(() => this.ts = 0.2, 15) }
      main.style.top = (window.innerHeight - main.offsetHeight) + "px"
    }, 1000)
  }
}
</script>

<style>
#main {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>