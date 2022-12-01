<template>
  <div class="dmk">
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
  props: { face: String, uid: Number, sender: String, src: String }
}
</script>

<style>
.dmk {
    position: relative;
    display: flex;
    max-width: 100%;
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
    word-break:break-all;
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