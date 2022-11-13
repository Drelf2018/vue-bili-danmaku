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

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/font/font.css'

var app = createApp(App)

function getUseSize() {
    var size = 0;
    for(var item in localStorage) {
        if(localStorage.hasOwnProperty(item)) {
            size += localStorage.getItem(item).length;
        }
    }
    return (size / 1024).toFixed(2)
}

app.config.globalProperties.getFace = (uid) => {
    var tf = localStorage.getItem(uid)
    if(tf) {
        var tt = tf.split(",")[0]
        if(Date.parse(new Date()) / 1000 - tt < 86400) return tf.split(",")[1] + "@55w_55h.webp"
    }
    return null
}

app.config.globalProperties.setFace = (uid, face) => {
    var tt = Date.parse(new Date()) / 1000
    localStorage.setItem(uid, tt + "," + face)
    console.log('已占用：' + getUseSize() + 'KB')
}

app.mount('#app')
