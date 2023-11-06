<template>
    <div class="common-layout">
        <el-container>
            <el-main>
                <QyiTable :col-configs="colConfigs" :table-data="collectStore.collectList" :collect-click="playMuisc">
                </QyiTable>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import QyiTable from '@/components/QyiTable.vue';
import { reactive } from "vue";
import { useCollectStore, useMusicStore, useMusicListStore } from '@/stores';
import { data } from '@/utils';
import { getMusicUrl } from '@/request/api';
import { musicUrlInfo } from '../SearchView/type';

const collectStore = useCollectStore();
const musicStore = useMusicStore();
const musicListStore = useMusicListStore();

const colConfigs = reactive([
    {
        prop: "name",
        label: "音乐标题",
    },
    {
        prop: "singer",
        label: "歌手",
    },
    {
        prop: "album",
        label: "专辑",
    },
    {
        prop: "time",
        label: "时长",
    },
]);

//播放歌曲
const playMuisc = async (row: data) => {
    const musicData = await getMusicUrl({ id: row.id, level: "standard " }) as unknown as musicUrlInfo[];
    if (musicData[0].url) {
        row.musicUrl = musicData[0].url;
        musicStore.setPlayMusic(row, true);
    } else {
        ElMessage.error("暂无该歌曲版权");
    }
    musicStore.setPlayMusic(row, true);
    musicListStore.addMusicList(row);
}


</script>

<style scoped lang="scss"></style>