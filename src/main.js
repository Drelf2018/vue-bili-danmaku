Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

import './index.css'
import './assets/font/font.css'
import App from './App.vue'
import Hello from './components/Hello.vue'
import Show from './components/Show.vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Hello },
        { path: '/:roomid', component: Show },
    ]
})

var app = createApp(App)
app.config.globalProperties.redirect = path => router.push(path)
app.directive('drag', (el) => {
    const oDiv = el // 当前元素
    const minTop = oDiv.getAttribute('drag-min-top')
    const ifMoveSizeArea = 20
    oDiv.onmousedown = e => {
        let target = oDiv
        
        while (window.getComputedStyle(target).position !== 'relative' && target !== document.body) {
            target = target.parentElement
        }

        if(window.getComputedStyle(target).getPropertyValue("--move") !== "1") return false

        document.onselectstart = () => {
            return false
        }
        if (!target.getAttribute('init_x')) {
            target.setAttribute('init_x', target.offsetLeft)
            target.setAttribute('init_y', target.offsetTop)
        }

        const initX = parseInt(target.getAttribute('init_x'))
        const initY = parseInt(target.getAttribute('init_y'))

        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - target.offsetLeft
        const disY = e.clientY - target.offsetTop
        document.onmousemove = e => {
            // 通过事件委托，计算移动的距离
            // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
            const l = e.clientX - disX
            const t = e.clientY - disY
            // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
            target.style.left = l + 'px'
            target.style.top = (t < minTop ? minTop : t) + 'px'
            if (Math.abs(l - initX) > ifMoveSizeArea || Math.abs(t - initY) > ifMoveSizeArea) {
                target.setAttribute('dragged', '')
            } else {
                target.removeAttribute('dragged')
            }
        }
        document.onmouseup = e => {
            document.onmousemove = null
            document.onmouseup = null
            document.onselectstart = null
        }
        // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false
    }
})
app.use(router)
app.mount('#app')
