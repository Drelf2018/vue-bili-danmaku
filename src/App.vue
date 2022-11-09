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
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    }
  },
  async mounted() {
    await onClickShow(this.getQueryString("roomid") || 21452505, this.dms)
    setInterval(() => {if(this.dms.length > 30) while(this.dms.length > 15) this.dms.shift()}, 1000)
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