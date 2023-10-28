<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-input v-model="keywords" class="w-50 m-2" placeholder="Search somethings" :prefix-icon="Search"
                    @keyup.enter="cloudSearch(1)" style="width: 40%;" />
            </el-header>
            <el-main>
                <QyiTable :col-configs="colConfigs" :table-data="tableData"></QyiTable>
                <QyiPagination :total="total" :get-list="cloudSearch"></QyiPagination>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { search } from "@/request/api"
import QyiTable from '@/components/QyiTable.vue';
import { data } from "@/utils"
import { cloudSearchInfo } from "./type"
import QyiPagination from "@/components/QyiPagination.vue"

const keywords = ref(""); //关键词
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
//搜索歌曲
const cloudSearch = async (offset: number) => {
    tableData.length = 0;
    const { songs, songCount } = (await search({
        keywords: keywords.value,
        limit: 100,
        offset: (offset - 1)
    })) as unknown as cloudSearchInfo;
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
            time: time()
        })
    });

}

</script>

<style scoped lang="scss">
.el-input {
    display: flex;
}

.el-main {
    padding-top: 0;
}
</style>
