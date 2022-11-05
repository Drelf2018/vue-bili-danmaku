<template>
  <div class="dmk" :style="'opacity: ' + op + '; left: ' + lf + 'em;'">
    <img :src="face" alt>
    <span :class="[sender, 'message']"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'Danmaku',
  data() { return { face: "https://i0.hdslb.com/bfs/face/member/noface.jpg", op: 0, lf: -3 } },
  props: { uid: Number, sender: String },
  async mounted() {
    setTimeout(() => {this.op = 1; this.lf = 0}, 10)
    this.face = this.uid2face[this.uid]
    if (this.face == null) {
        this.face = (await axios.get("https://aliyun.nana7mi.link/user.User(uid=" + this.uid + ").get_user_info()")).data.data.face
        this.uid2face[this.uid] = this.face
    }
  }
}
</script>

<style>
.dmk {
    position: relative;
    display: flex;
    margin: 0.25em 0;
    transition: all 0.49s;
    max-width: 100%;
}

img {
    width: 3.3em;
    height: 3.3em;
    border-radius: 50%;
    box-shadow: 0px 3px 4px 0px black;
    margin-right: 0.87em;
}

.default {
    --color-bg: rgb(55, 54, 52);
    --color-text: rgb(245, 245, 247);
}

.guard {
    --color-bg: rgb(225, 69, 90);
    --color-text: rgb(245, 245, 247);
}

.self {
    --color-bg: rgb(243, 213, 5);
    --color-text: rgb(55, 54, 52);
}

.message {
    position: relative;
    width: max-content;
    padding: 0.31em 0.92em;
    color: var(--color-text);
    font-size: 1.45em;
    font-weight: bold;
    border-radius: 0 20.4px 20.4px;
    box-shadow: 0px 3px 4px 0px black;

    --border-size: 8px;
    --color-border: rgb(55, 54, 52);
    margin-top: 6.8px;
    margin-left: calc(var(--border-size) + 1px);
    background-color: var(--color-bg);
    border: 2px solid var(--color-border);
}

.message:after, .message:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    transform: rotate(-135deg);
    border: var(--border-size) solid transparent;
}

.message:before {
    top: calc(-1 * var(--border-size) - 2px);
    left: calc(-1 * var(--border-size));
    border-top-color: var(--color-border);
}

.message:after {
    top: calc(-1 * var(--border-size));
    left: calc(-1 * var(--border-size) + 4px);
    border-top-color: var(--color-bg);
}
</style>