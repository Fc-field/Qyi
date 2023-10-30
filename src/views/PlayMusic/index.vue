<template>
    <el-row :gutter="20" align="middle">
        <el-col :span="2">
            <div class="grid-content ep-bg-purple">
                <el-avatar shape="square" size="large" :src="musicStore.playMusic.picUrl" />
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content ep-bg-purple">
                <el-row :gutter="20" align="middle">
                    <el-col :span="8">
                        <div class="grid-content ep-bg-purple singer ">
                            {{ musicStore.playMusic.name }}-{{ musicStore.playMusic.singer }}
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="grid-content ep-bg-purple something">
                            <svg t="1698653901788" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6309" width="30" height="30">
                                <path
                                    d="M896 304.7v414.6L618.41 512 896 304.7m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L536.92 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c-0.01-15.48-12.72-26.28-26.34-26.28zM432.62 304.7v414.6L155.03 512l277.59-207.3m37.67-101.62c-5.09 0-10.31 1.51-15.04 4.85L73.53 492.98c-12.71 9.49-12.71 28.54 0 38.03l381.72 285.06c4.73 3.34 9.95 4.85 15.04 4.85 13.62 0 26.33-10.8 26.33-26.28V229.36c0-15.48-12.71-26.28-26.33-26.28z"
                                    fill="#2c2c2c" p-id="6310">
                                </path>
                            </svg>

                            <svg t="1698653955065" class="icon" viewBox="0 0 1024 1024" version="1.1" v-if="display"
                                @click="playMusic" xmlns="http://www.w3.org/2000/svg" p-id="7390" width="35" height="35">
                                <path
                                    d="M716.805 780.798V243.2c0-21.205-17.197-38.404-38.404-38.404S640 221.993 640 243.2v537.598c0 21.205 17.197 38.393 38.402 38.393s38.404-17.188 38.404-38.393z m-332.804 0V243.2c0-21.205-17.188-38.404-38.391-38.404-21.216 0-38.404 17.197-38.404 38.404v537.598c0 21.205 17.188 38.393 38.404 38.393 21.203 0 38.39-17.188 38.39-38.393z"
                                    fill="#2c2c2c" p-id="7391">
                                </path>
                            </svg>

                            <svg t="1698654080076" class="icon" viewBox="0 0 1024 1024" version="1.1" v-if="!display"
                                @click="playMusic" xmlns="http://www.w3.org/2000/svg" p-id="7850" width="35" height="22">
                                <path
                                    d="M912.205085 449.388089L182.415592 9.695957a69.292355 69.292355 0 0 0-70.641975 0A71.352302 71.352302 0 0 0 76.470388 73.021569v878.247741a72.701922 72.701922 0 0 0 35.303229 63.325611 63.929389 63.929389 0 0 0 35.303229 9.376311 79.556573 79.556573 0 0 0 35.30323-9.376311l729.789493-439.692131a71.316785 71.316785 0 0 0 35.303229-63.325612 79.556573 79.556573 0 0 0-35.267713-62.189089zM152.972557 941.857483l-3.551633-858.323081 714.481956 430.315821z"
                                    p-id="7851" fill="#2c2c2c"></path>
                            </svg>

                            <svg t="1698653671960" class="icon  " viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4712" width="30" height="30">
                                <path
                                    d="M128 304.7L405.59 512 128 719.3V304.7M90.33 203.08c-13.62 0-26.33 10.8-26.33 26.28v565.28c0 15.48 12.71 26.28 26.33 26.28 5.09 0 10.31-1.51 15.04-4.85l381.72-285.06c12.71-9.49 12.71-28.54 0-38.03L105.37 207.92c-4.73-3.33-9.95-4.84-15.04-4.84zM591.38 304.7L868.97 512 591.38 719.3V304.7m-37.67-101.62c-13.62 0-26.33 10.8-26.33 26.28v565.28c0 15.48 12.71 26.28 26.33 26.28 5.09 0 10.31-1.51 15.04-4.85l381.72-285.06c12.71-9.49 12.71-28.54 0-38.03L568.75 207.92c-4.73-3.33-9.95-4.84-15.04-4.84z"
                                    fill="#2c2c2c" p-id="4713">
                                </path>
                            </svg>
                        </div>
                    </el-col>

                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content ep-bg-purple progress">
                            <QyiProgress :is-play="display"></QyiProgress>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple">
                歌曲表单
            </div>
        </el-col>
    </el-row>
</template>

  

<script setup lang="ts">
import { useMusicStore } from "@/stores/index";
import QyiProgress from "@/components/QyiProgress.vue";
import { toRefs } from "vue";

const musicStore = useMusicStore();
const { isPlay: display } = toRefs(musicStore.playMusic);
const playMusic = () => {
    display.value = !display.value;
    console.log(display.value);

}

</script>

  
<style scoped lang="scss">
.el-row {
    height: 100%;
}

.el-row:last-child {
    margin-bottom: 0;
    padding: 0;
}

.el-col {
    border-radius: 4px;
    padding: 0;
    margin: 0;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.singer {
    display: flex;
    align-items: center;
}

.something {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 80px;

    .icon {
        margin: 0 6px;
    }


}

.progress {
    position: relative;

}
</style>