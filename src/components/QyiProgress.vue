<template>
    <audio ref="player"></audio>

    <div class="bar">
        <div class="progress-bar" @click="playMusic" ref="runfatbar">
            <div class="blue-bar" ref="runbar">
                <span class="circle"></span>
            </div>
        </div>
    </div>

    <div class="time">{{ cTime }}</div>
    <div class="all-time time">{{ dTime }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import { useMusicStore } from '@/stores';

const props = defineProps<{
    isPlay: boolean
}>();


const musicStore = useMusicStore();
const player = ref();
const runbar = ref();

const cTime = ref("00:00"); //已播放时间
const { time: dTime } = toRefs(musicStore.playMusic); //总播放时间
const playMusic = () => {
    player.value.play();
};

watch([() => props.isPlay, () => musicStore.playMusic.musicUrl], ([newValue1, newValue2], [, oldValue2]) => {
    if (newValue2 !== oldValue2) {
        player.value.src = newValue2;
    }
    if (newValue1) {
        player.value.play();
    } else {
        player.value.pause();

    }
})

onMounted(() => {
    player.value.addEventListener("timeupdate", () => {
        const musicTime = musicStore.playMusic.dt / 1000;
        const stopTime = player.value.currentTime; // 获得已播放的音频时长
        runbar.value.style.width = `${(stopTime / musicTime) * 100}%`;
        // 计算进度条所在比例宽度
        const branch = Math.floor(stopTime / 60); // 计算已播放的音频分钟
        const second = Math.floor(stopTime % 60); // 计算已播放的音频秒
        if (branch < 10 && second < 10) { // 四种情况判断显示音频已播放时间
            cTime.value = `0${branch}:0${second}`;
        } else if (branch < 10) {
            cTime.value = `0${branch}:${second}`;
        } else if (second < 10) {
            cTime.value = `${branch}:0${second}`;
        } else {
            cTime.value = `${branch}:${second}`;
        }
    })
})

</script>

<style scoped lang="scss">
.bar {
    width: 80%;
    height: .3rem;
    position: absolute;
    bottom: 20px;
    margin-left: 10%;

    .progress-bar {
        width: 100%;
        height: .1rem;
        margin-top: .1rem;
        border-radius: .2rem;
        background-color: #999999;

        .blue-bar {
            height: .1rem;
            position: absolute;
            top: .1rem;
            left: 0;
            border-radius: .2rem;
            background-color: #1296db;

            .circle {
                width: .2rem;
                height: .2rem;
                position: absolute;
                top: -.05rem;
                right: -0.01rem;
                border-radius: 10px;
                background-color: #fff;
            }
        }
    }
}

.time {
    position: absolute;
    bottom: 20px;
    font-size: 13px;
    line-height: .5rem;
}

.all-time {
    right: 0;
}
</style>
