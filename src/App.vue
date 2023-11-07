<template>
  <div class="common-layout">
    <TopMenu></TopMenu>
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
import TopMenu from "@/views/TopMenu/index.vue";

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
  position: relative;
}

.el-aside {
  height: 90vh;
  background-color: #B2DFDB;
  overflow: hidden;
}

.el-main {
  height: 90vh;



}

.el-footer {
  height: 10vh;
  background-color: greenyellow;
}
</style>
