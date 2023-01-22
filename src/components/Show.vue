<template>
    <span v-if="$route.query.debug" style="position: absolute;right: 0.5em;color: grey">{{ alpha }}</span>
    <div id="main-container">
        <div id="main">
            <Message v-for="dm in dms" :dm="dm" />
        </div>
    </div>
</template>
  
<script>
import Message from './Message.vue';
import { onClickShow, makeDanmaku } from '../bili-ts-ws';

export default {
    name: 'Show',
    components: { Message },
    data() { return { dms: [], pos: null, alpha: 0 } },
    mounted() {
        var roomid = this.$route.params.roomid
        var price = this.$route.query.price || 9.9
        var main = document.getElementById("main")
        
        if (roomid == "redirect") {
            roomid = this.$route.query.roomid || 21452505
            this.dms.push(makeDanmaku("弹幕姬网址已更换"))
            this.dms.push(makeDanmaku(`https://danmu.nana7mi.link/${roomid}`))
        }

        onClickShow(roomid, this.dms, price)
        
        document.getElementById("app").style.zoom = this.$route.query.zoom || 1
        setInterval(() => {
            if(main.lastElementChild)main.lastElementChild.scrollIntoView({behavior: "smooth", block: "end"})
        }, 300)
    },
    watch: { "dms.length": function (val, old) { 
        document.title = "Vue-Bili-Danmaku: " + val
        if(val > old) setTimeout(() => {
            this.alpha = main.offsetHeight / window.innerHeight
            if(this.alpha < 3) this.pos = this.dms.length
            if(this.alpha > 5) for(var i = 0; i < (this.pos || 10); i++) this.dms.shift()
        }, 500)
    } }
}
</script>
  
<style>
#main-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

#main {
    margin: 0 8px;
    width: calc(100% - 16px);
    display: flex;
    flex-direction: column;
}
</style>