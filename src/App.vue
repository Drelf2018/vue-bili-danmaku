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
  data() { return { dms: [] } },
  methods: {
    getQueryString(name, def) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return def;
    }
  },
  async mounted() {
    await onClickShow(window.location.pathname.replace("/", ""), this.dms)
    var max_len = this.getQueryString("max", 30)
    var min_len = this.getQueryString("min", 15)
    setInterval(() => {if(this.dms.length > max_len) while(this.dms.length > min_len) this.dms.shift()}, 1000)
    // setInterval(() => {if(this.dms.length > 0) this.dms.push(this.dms[0])}, 50)
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