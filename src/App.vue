<template>
  <div id="main">
    <Danmaku v-for="dm in dms" :uid="dm.uid" :sender="dm.sender">{{ dm.msg }}</Danmaku>
  </div>
</template>

<script>
import Danmaku from './components/Danmaku.vue';
import { onClickShow } from './bili-ws'

export default {
  name: 'App',
  components: {
    Danmaku
  },
  data() { return { dms: [] } },
  methods: {
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    }
  },
  async mounted() {
    await onClickShow(this.getQueryString("roomid") || 21452505, this.dms)
    var main = document.getElementById("main")
    setInterval(() => {
      main.style.top = Math.min(
        main.style.top.replace("px", ""),
        window.innerHeight - main.offsetHeight
      ) + "px"
    }, 16)
  }
}
</script>

<style>
#main {
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}
</style>