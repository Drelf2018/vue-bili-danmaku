<template>  
    <div style="display: flex;align-items: center;">
        <slot></slot>
        <div v-if="medal.medal_level" class="medal-box" :style="'margin-left: ' + (medal.guard_level || false ? '16.8px;' : '4.8px;')">
            <img v-if="medal.guard_level || false" class="medal-flag"
                :src="'https://i0.hdslb.com/bfs/activity-plat/static/20200716/1d0c5a1b042efb59f46d4ba1286c6727/icon-guard' + medal.guard_level + '.png@100w_100h_1c.webp'">
            <div class="medal-true-love"
                :style="'padding: 0.5em ' + (medal.guard_level || false ? '3px' : '4px') + ' 0.5em ' + (medal.guard_level || false ? '12px;' : '4px;') + 'border-color:' + int2rgb(medal.medal_color_border) + '; background-image: linear-gradient(90deg, ' + int2rgb(medal.medal_color_start) + ', ' + int2rgb(medal.medal_color_end) + ');'">
                {{ medal.medal_name }}
            </div>
            <div class="medal-level" :style="'border-color:' + int2rgb(medal.medal_color_border) + '; color: rgb(6, 21, 76);'">
                {{ medal.medal_level }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Medal',
    props: {
        medal: Object
    },
    methods: {
        int2rgb(n) {
            var r = n >> 16;
            var g = (n >> 8) - (r << 8);
            var b = n - (r << 16) - (g << 8);
            return "rgb(" + r + "," + g + "," + b + ")"
        }
    }
}
</script>

<style>
.medal-box {
    cursor: pointer;
    position: relative;
    vertical-align: middle;
    height: 24px;
    line-height: 11px;
    display: inline-flex;
    font-size: 12px;
    color: #f25d8e;
    border-radius: 2px;
}

.medal-flag {
    height: 100%;
    position: absolute;
    transform: translate(-50%, -1px);
}

.medal-true-love {
    border: 0.5px solid #f25d8e;
    text-align: center;
    box-sizing: content-box;
    border-right-width: 0;
    border-radius: 2px 0px 0px 2px;
    white-space: nowrap;
    padding-left: 8px;
    color: rgb(255, 255, 255);
}

.medal-level {
    border: 0.5px solid rgb(242, 93, 142);
    border-radius: 0px 2px 2px 0px;
    padding: 0.5em 2px;
    background: #fff;
}
</style>