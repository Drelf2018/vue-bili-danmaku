<template>
  <div :class="{'close': !face, 'dmk': true}">
    <img class='face' :src="face" alt>
    <span :class="[sender, 'message']" :style="src ? 'padding: 0.6em' : ''">
      <slot v-if="!src"></slot>
      <img v-if="src" :src="src" style="max-width: 3em">
    </span>
  </div>
</template>

<script>
export default {
  name: 'Danmaku',
  data() { return { face: null } },
  props: { uid: Number, sender: String, src: String },
  mounted() {
    this.loadFace()
  },
  updated() {
    this.loadFace()
  },
  methods: {
    loadFace() {
        axios.get(`https://aliyun.nana7mi.link/user.User(${this.uid}).get_user_info().face?max_age=86400`)
        .then(res => { this.face = res.data.data })
        .catch(err => { this.face = "https://i0.hdslb.com/bfs/face/member/noface.jpg" })
    }
  }
}
</script>

<style>
.close {
    opacity: 0;
    left: -3em !important;
}

.dmk {
    position: relative;
    display: flex;
    margin: 0.25em 0;
    transition: all 0.49s;
    max-width: 100%;
    left: 0;
}

.face {
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

.owner {
    --color-bg: rgb(96, 131, 239);
    --color-text: rgb(245, 245, 247);
}

.self {
    --color-bg: rgb(243, 213, 5);
    --color-text: rgb(55, 54, 52);
}

.message {
    display: flex;
    align-items: center;
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