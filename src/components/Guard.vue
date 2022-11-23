<template>
    <div class="toast">
        <img class='face' src="https://i0.hdslb.com/bfs/face/member/noface.jpg" style="float: left;margin-left: 0.35em;">
        <span style="font-size: 1.45em;font-weight: bold;color: rgb(245, 245, 247)">
            新{{ gift }}！<br />
            欢迎 {{ username }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Guard',
    props: { gift: String, username: String }
}
</script>

<style>
.toast {
    background-color: rgb(55, 54, 52);
    border: 10px solid rgb(12, 155, 85);
    border-radius: 1em;
    box-shadow: 0px 3px 4px 0px black;
    padding: 0.5em;
    display: flex;
    align-items: center;
}
</style>