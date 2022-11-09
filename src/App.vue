<template>
  <title>Vue-Bili-Danmaku: {{ dms.length }}</title>
  <div id="main">
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
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    }
  },
  async mounted() {
    await onClickShow(this.getQueryString("roomid") || 21452505, this.dms)
    var main = document.getElementById("main")
    setInterval(() => {
      if(this.dms.length > 40) while(this.dms.length > 20) this.dms.shift()
      setTimeout(() => main.style.top = (window.innerHeight - main.offsetHeight) + "px", 1)
    }, 500)
  }
}
</script>

<style>
#main {
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s
}
</style>