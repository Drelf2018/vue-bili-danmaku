<template>
  <div id="main">
    <Message v-for="dm in dms" :dm="dm" />
  </div>
</template>

<script>
import Message from './components/Message.vue';
import { onClickShow } from './bili-ws'

export default {
  name: 'App',
  components: { Message },
  data() { return { dms: [], pos: null, first: 1 } },
  methods: {
    getQueryString(name, def) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return def;
    },
    clear() {
      var alpha = document.getElementById("main").offsetHeight / window.innerHeight
      if(alpha < 3) this.pos = this.dms.length
      if(alpha > 5) {
        if(!this.first) for(var i=0; i < (this.pos || 10); i++) this.dms.shift()
        this.first ^= 1
      }
    }
  },
  async mounted() {
    await onClickShow(this.getQueryString("roomid", 21452505), this.dms, this.getQueryString("price", 9.9))
    document.getElementById("app").style.zoom = this.getQueryString("zoom", 1)
    setInterval(this.clear, 500)
  },
  watch: { "dms.length": function(val) { document.title = "Vue-Bili-Danmaku: " + val } }
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