<template>
    <div class="menu">
        <span class="iconfont icon-zuixiaohua" @click="minimizeWin()"></span>
        <span class="iconfont icon-quanpingzuidahua" @click="maximizeWin()"></span>
        <span class="iconfont icon-guanbi" @click="close"></span>
    </div>
</template>

<script setup lang="ts">
import "@/../public/iconfont/iconfont.css";
import { useMusicListStore } from "@/stores";
import { data } from "@/utils";

const { minimizeWin, maximizeWin, closeWin } = window.electronAPI.ipcRenderer;
const musicListStore = useMusicListStore();
const close = () => {
    const musicList: data[] = [];
    musicListStore.musicList.map(item => {
        musicList.push({ ...item });
    })
    closeWin(musicList);
}


</script>

<style scoped lang="scss">
.menu {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 15%;
    // background-color: red;
    display: flex;
    justify-content: space-around;
    z-index: 1001;

    .iconfont {
        font-size: 18px !important;
    }
}
</style>