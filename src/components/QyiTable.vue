<template>
    <el-table :data="tableData" show-overflow-tooltip="true" style="width: 100%" :row-class-name="tableRowClassName"
        @row-dblclick="clickRow" :show-header="!props.showHeader">
        <el-table-column type="index" :index="indexMethod" />
        <el-table-column v-for="colConfig in colConfigs" :prop="colConfig.prop" :label="colConfig.label"></el-table-column>
        <el-table-column v-if="!props.showHeader">
            <template #default="scope">
                <span class="iconfont" :class="scope.row.isCollect ? 'icon-jushoucanggift' : 'icon-jushoucang'"
                    @click="collect(scope.row)"></span>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="uncollect" width="40%">
        <span>确认取消收藏选中的歌曲吗?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button color="#b2dfdb" round :dark="true" @click="unCollect">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { data } from "@/utils";
import "@/../public/iconfont/iconfont.css"
import { useCollectStore, useMusicStore } from '@/stores';
import { getMusicSentence } from '@/request/api';

type colConfig = {
    prop: string,
    label: string,
}
const props = defineProps<{
    colConfigs: Array<colConfig>,  //表格配置
    tableData: Array<data>,
    searchClick?: Function, //搜索表格点击事件
    collectClick?: Function, //收藏表格点击事件
    showHeader?: Boolean
}>();

const { colConfigs, tableData } = toRefs(props);
// const { clickRow } = props;

const collectStore = useCollectStore();
const musicStore = useMusicStore();

const { setStoreValue } = window.electronAPI.ipcRenderer;
const uncollect = ref(false); //取消收藏
let unCollectMusic: data; //取消收藏歌曲

const tableRowClassName = ({
    rowIndex,
}: {
    rowIndex: number
}) => {
    if (rowIndex % 2 === 0) {
        return 'tragger-row'
    } else {
        return ''
    }
}

const indexMethod = (index: number) => {
    return index + 1;
}

const clickRow = async (row: data) => {
    const lyr = await getMusicSentence({ id: row.id }) as unknown as string;
    musicStore.setMusicSentence(lyr);

    props.searchClick && props.searchClick(row.id, row);
    props.collectClick && props.collectClick(row);

    console.log(musicStore.playMusic);

}
//将收藏列表写入数据库
const setValue = () => {
    const music: data[] = [];
    collectStore.collectList.map(item => {
        music.push({ ...item })
    });
    setStoreValue("music", music);
}

//收藏
const collect = (row: data) => {
    unCollectMusic = row;
    if (props.collectClick) {
        uncollect.value = true;
    }
    else {
        row.isCollect = !row.isCollect;
        row.isCollect && collectStore.increaseMusic(row);
        row.isCollect && ElMessage.success("收藏成功");
        !row.isCollect && collectStore.cancleCollect(row.id);
        !row.isCollect && ElMessage.success("已移除收藏");
        setValue();
    }

}

const unCollect = () => {
    unCollectMusic.isCollect = false;
    collectStore.cancleCollect(unCollectMusic.id);
    setValue();
    uncollect.value = false;
}

</script>
  
<style scoped lang="scss">
.icon-jushoucang:hover {
    color: red;
}

.icon-jushoucanggift {
    color: red;
}

.el-table :deep(.tragger-row) {
    --el-table-tr-bg-color: #f9f9f9;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>

<style>
.el-dialog .el-dialog__footer {
    text-align: center;
}

.el-dialog .el-dialog__header button {
    border: 0;
}
</style>
  