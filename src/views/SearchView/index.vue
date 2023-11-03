<template>
    <div>
        <div class="common-layout">
            <el-container>
                <el-header>
                    <el-input v-model="keywords" class="w-50 m-2" placeholder="Search somethings" :prefix-icon="Search"
                        @keyup.enter="cloudSearch(1)" style="width: 40%;" />
                </el-header>
                <el-main>

                    <div v-show="tableData.length">
                        <QyiTable :col-configs="colConfigs" :table-data="tableData" :click-row="playMuisc"></QyiTable>
                        <QyiPagination :total="total" :get-list="cloudSearch"></QyiPagination>
                    </div>

                    <div class="initial" v-show="initial">
                        快搜索你喜欢的歌曲吧~~~
                    </div>
                    <div v-loading="loading" element-loading-text="加载中..." style="height: 100px;">
                    </div>

                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { search, checkSong, getMusicUrl } from "@/request/api"
import QyiTable from '@/components/QyiTable.vue';
import { data } from "@/utils"
import { cloudSearchInfo, musicUrlInfo } from "./type"
import QyiPagination from "@/components/QyiPagination.vue"
import { useMusicStore,useCollectList } from "@/stores/index"


const musicStore = useMusicStore();
const collectStore = useCollectList();

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
        })
    });
    loading.value = false;
}

//播放歌曲
const playMuisc = async (id: string, row: data) => {
    console.log(id);
    // const result = await getMusicUrl({ id, level: "standard " });
    const isPlay = await checkSong({ id }) as unknown as string; //检测歌曲是否可用 ok || “字符串”
    const musicData = isPlay === "ok" ? await getMusicUrl({ id, level: "standard " }) as unknown as musicUrlInfo[] : [{ url: null }];
    if (musicData[0].url) {
        row.musicUrl = musicData[0].url;
        musicStore.setPlayMusic(row);
    } else {
        ElMessage.error("暂无该歌曲版权");
    }



}

</script>

<style scoped lang="scss">
.common-layout {
    // min-height: 50%;
    overflow: auto;
}

.initial {
    height: 100%;
    font-size: 2em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
    padding-top: 10%;
}

.el-input {
    display: flex;
}

.el-main {
    padding-top: 0;
}
</style>
