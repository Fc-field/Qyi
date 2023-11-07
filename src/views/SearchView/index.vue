<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <el-input v-model="keywords" class="w-50 m-2" placeholder="Search somethings" :prefix-icon="Search"
                    @keyup.enter="cloudSearch(1)" style="width: 40%;" />
            </el-header>
            <el-main>
                <div v-if="tableData.length">
                    <QyiTable :col-configs="colConfigs" :table-data="tableData" :search-click="playMuisc"></QyiTable>
                    <QyiPagination :total="total" :get-list="cloudSearch"></QyiPagination>
                </div>

                <div class="initial" v-show="initial">
                    快搜索你喜欢的歌曲吧~~~
                </div>
                <div v-loading="loading" element-loading-text="加载中..." :class="loading ? 'isloading' : 'loaded'">
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { search, checkSong, getMusicUrl, getMusicSentence } from "@/request/api"
import QyiTable from '@/components/QyiTable.vue';
import { data } from "@/utils"
import { cloudSearchInfo, musicUrlInfo } from "./type"
import QyiPagination from "@/components/QyiPagination.vue"
import { useMusicStore, useCollectStore, useMusicListStore } from "@/stores/index"


const musicStore = useMusicStore();
const collectStore = useCollectStore();
const musicListStore = useMusicListStore();


const keywords = ref(""); //关键词
const initial = ref(true);

//表单配置
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
const tableData = reactive<Array<data>>([]); //歌曲数据
const total = ref(0);//歌曲总数
const loading = ref(false);
//搜索歌曲
const cloudSearch = async (offset: number) => {
    if (keywords.value === "") {   //关键词为空回到初始状态
        initial.value = true;
        tableData.length = 0;
        return;
    }
    initial.value = false;
    tableData.length = 0;
    loading.value = true;
    const result = (await search({
        keywords: keywords.value,
        limit: 100,
        offset: (offset - 1)
    })) as unknown as cloudSearchInfo;

    const { songs, songCount } = result;
    total.value = songCount;
    songs.map((item) => {
        const min = Math.floor(item.dt / 1000 / 60);
        const second = Math.floor(item.dt / 1000 % 60);
        const time = () => {
            let m = "" + min, s = "" + second;
            if (min < 10) m = "0" + min;
            if (second < 10) s = "0" + second;
            return m + ":" + s;
        };
        tableData.push({
            name: item.name,
            singer: item.ar[0].name,
            album: item.al.name,
            time: time(),
            id: item.id,
            picUrl: item.al.picUrl,
            musicUrl: "",
            dt: item.dt,
            isCollect: collectStore.checkCollect(item.id)
        });
    });
    loading.value = false;
}

//播放歌曲
const playMuisc = async (id: string, row: data) => {
    // const result = await getMusicUrl({ id, level: "standard " });
    const isPlay = await checkSong({ id }) as unknown as string; //检测歌曲是否可用 ok || “字符串”
    const musicData = isPlay === "ok" ? await getMusicUrl({ id, level: "standard " }) as unknown as musicUrlInfo[] : [{ url: null }];
    if (musicData[0].url) {
        row.musicUrl = musicData[0].url;
        musicStore.setPlayMusic(row, true);
        musicListStore.addMusicList(row);
        getMusicSentence({ id }).then(res => {
            console.log(res, 123);

        })

    } else {
        ElMessage.error("暂无该歌曲版权");
    }


}

</script>

<style scoped lang="scss">
.common-layout {
    height: 100%;
    // min-height: 50%;
    // overflow: auto;
    // overflow: hidden;
    overflow: hidden;

}

.el-container {
    height: 100%;
    overflow: hidden;


}


.el-main {
    padding-top: 0;

    .initial {
        font-size: 2em;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        text-align: center;
        padding-top: 10%;
    }

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

.header {
    position: sticky;
    top: 0px;
    z-index: 1000;

    .el-input {
        display: flex;
    }
}

.loading {
    height: 100px;
}

.loaded {
    height: 0;
}
</style>
