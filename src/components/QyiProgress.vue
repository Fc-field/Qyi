<template>
    <audio ref="player"></audio>

    <div class="bar">
        <div class="progress-bar" @click="playMusic" ref="runfatbar">
            <div class="blue-bar" ref="runbar">
                <span class="circle" ref="circle"></span>
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
const runfatbar = ref();
const circle = ref();

const cTime = ref("00:00"); //已播放时间
const { time: dTime } = toRefs(musicStore.playMusic); //总播放时间
const playMusic = () => {
    // player.value.play();
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
    // const musicWidth = runfatbar.value.offsetWidth; // 底部进度条总宽
    //进度条移动
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
    });
    //拖拽进度条
    // console.dir(circle.value);
    // runfatbar.value.addEventListener("click", (e: any) => {
    //     console.log(e.pageX);

    //     if (e.pageX <= musicWidth) {
    //         runbar.value.style.width = `${(e.pageX / musicWidth) * 100}%`;// 计算进度条所在比例宽度                  
    //         //改变播放状态         
    //         player.value.pause();// 触摸拖动时停止播放         
    //     }
    // })
    // circle.value.addEventListener("drag", (event: { targetTouches: { pageX: number; }[]; }) => {
    //     // const events = event.targetTouches[0].pageX; // 获得触摸拖动的距离
    //     console.log(123);

    //     // if (events <= musicWidth) {
    //     //     runbar.value.style.width = `${(events / musicWidth) * 100}%`;// 计算进度条所在比例宽度                  
    //     //     //改变播放状态         
    //     //     player.value.pause();// 触摸拖动时停止播放         
    //     // }

    // });
    // // 监听颜色进度条是否触摸拖动结束     
    // circle.value.addEventListener('dragend', () => {
    //     console.log(456);

    //     const touwidth = (runbar.value.offsetWidth / musicWidth);// 计算进度条所在比例
    //     player.value.currentTime = player.value.duration * touwidth;// 通过所在比例赋值给音频应在的播放时                  
    //     // 改变播放状态，进行播放         
    //     player.value.play();

    //     if (touwidth < musicWidth) {
    //         player.value.play();// 根据播放时间开始播放         

    //     } else if (touwidth >= musicWidth) {
    //         player.value.pause();// 触摸拖动时停止播放         

    //     }
    // })
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

    .progress-bar:hover {
        cursor: pointer;
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
