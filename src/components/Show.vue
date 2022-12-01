<template>
    <div id="main">
        <Message v-for="dm in dms" :dm="dm" />
    </div>
</template>
  
<script>
import Message from './Message.vue';
import { onClickShow, makeDanmaku } from '../bili-ws';

export default {
    name: 'Show',
    components: { Message },
    data() { return { dms: [], pos: null, first: 1 } },
    methods: {
        clear() {
            var alpha = document.getElementById("main").offsetHeight / window.innerHeight
            if (alpha < 3) this.pos = this.dms.length
            if (alpha > 5) {
                if (!this.first) for (var i = 0; i < (this.pos || 10); i++) this.dms.shift()
                this.first ^= 1
            }
        }
    },
    async mounted() {
        var roomid = this.$route.params.roomid
        if(roomid == "redirect") {
            roomid = this.$route.query.roomid || 21452505
            this.dms.push(makeDanmaku("弹幕姬网址已更换"))
            this.dms.push(makeDanmaku(`https://danmu.nana7mi.link/${roomid}`))
        }
        await onClickShow(roomid, this.dms, this.$route.query.price || 9.9)
        document.getElementById("app").style.zoom = this.$route.query.zoom || 1
        setInterval(this.clear, 500)
    },
    watch: { "dms.length": function (val) { document.title = "Vue-Bili-Danmaku: " + val } }
}
</script>
  
<style>
#main {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 0px;
    width: calc(100% - 16px);
    margin: 0 8px;
}
</style>