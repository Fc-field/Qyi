<template>
    <el-table :data="tableData" show-overflow-tooltip="true" style="width: 100%" :row-class-name="tableRowClassName"
        @row-dblclick="clickRow">
        <el-table-column type="index" :index="indexMethod" />
        <el-table-column v-for="colConfig in colConfigs" :prop="colConfig.prop" :label="colConfig.label"></el-table-column>
        <!-- <el-table-column>
            <template #default="scope">
                <span class="iconfont" :class="scope.row.isCollect ? 'icon-jushoucanggift' : 'icon-jushoucang'"
                    @click="collect(scope.row)"></span>
            </template>
        </el-table-column> -->
    </el-table>
</template>
  
<script lang="ts" setup>
import { toRefs } from 'vue';
import { data } from "@/utils";
// import "@/../public/iconfont/iconfont.css"

type colConfig = {
    prop: string,
    label: string,
}
const props = defineProps<{
    colConfigs: Array<colConfig>,  //表格配置
    tableData: Array<data>,
    clickRow: Function,
}>();

const { colConfigs, tableData } = toRefs(props);
// const { clickRow } = props;

const tableRowClassName = ({
    rowIndex,
}: {
    rowIndex: number
}) => {
    if (rowIndex % 2 === 0) {
        return 'tragger-row '
    } else {
        return ''
    }
}

const indexMethod = (index: number) => {
    return index + 1;
}

const clickRow = (row: data) => {
    props.clickRow(row.id, row);
}

// const collect = (row: data) => {
//     row.isCollect = !row.isCollect;

// }

</script>
  
<style scoped lang="scss">
// .icon-jushoucang:hover {
//     color: black;
// }

// .icon-jushoucanggift {
//     color: red;
// }

:deep(.el-table .tragger-row) {
    --el-table-tr-bg-color: #f9f9f9;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
  