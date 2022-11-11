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
  data() { return { dms: [], pos: null } },
  methods: {
    getQueryString(name, def) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return def;
    },
    clear() {
      var alpha = document.getElementById("main").offsetHeight / window.innerHeight
      if(alpha > 3) {
        for(var i=0; i < (this.pos || 20); i++) this.dms.shift()
        this.pos = null
      } else if (alpha > 1.5) {
        if(!this.pos) this.pos = this.dms.length 
      }
    }
  },
  async mounted() {
    await onClickShow(this.getQueryString("roomid", 21452505), this.dms)
    document.getElementById("app").style.zoom = this.getQueryString("zoom", 1)
    setInterval(this.clear, 1000)
  }
}
</script>

<style>
#main {
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  width: calc(100% - 16px);
}
</style>