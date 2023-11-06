<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <PlayMusic></PlayMusic>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/views/SideBar/index.vue";
import PlayMusic from "@/views/PlayMusic/index.vue";
import { onBeforeUnmount, onMounted } from "vue";
import { useMusicStore, useCollectStore, useMusicListStore } from "./stores";
import { data } from "./utils";

const { getStoreValue, setStoreValue } = window.electronAPI.ipcRenderer;
const musicStore = useMusicStore();
const collectStore = useCollectStore();
const musicListStore = useMusicListStore();

onMounted(() => {
  //获取上次退出时播放的歌曲
  const currentMusic = getStoreValue("currentMusic");
  musicStore.setPlayMusic(currentMusic, false);
  //获取数据库歌词
  const musicLyr = getStoreValue("musicLyr");
  musicStore.playMusic.lyr = musicLyr;
  //获取数据库收藏歌曲
  const collectList = getStoreValue("music");
  collectList.map((item: data) => {
    collectStore.increaseMusic(item);
  });
  //获取数据库歌曲列表
  const musicList = getStoreValue("musicList");
  musicListStore.setMusicList(musicList);
});

onBeforeUnmount(() => {
  //组件卸载前将歌曲列表写入数据库
  const musicList: data[] = [];
  musicListStore.musicList.map(item => {
    musicList.push(item);
  });
  setStoreValue("musicList", musicList);

})

</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  overflow: hidden;
}

.el-aside {
  height: 90vh;
  background-color: #B2DFDB;
  overflow: hidden;
}

.el-main {
  height: 90vh;

  // 滚动条整体部分
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
  &::-webkit-scrollbar-button {
    display: none;
  }

  // 滚动条的轨道（里面装有Thumb）
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  // 滚动条的轨道（里面装有Thumb）
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }

  // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  &::-webkit-scrollbar-thumb {
    background: rgba(144, 147, 153, 0.3);
    cursor: pointer;
    border-radius: 4px;
  }

  // 边角，即两个滚动条的交汇处
  &::-webkit-scrollbar-corner {
    display: none;
  }

  // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
  &::-webkit-resizer {
    display: none;
  }

}

.el-footer {
  height: 10vh;
  background-color: greenyellow;
}
</style>
