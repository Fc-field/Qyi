<template>
    <el-table :data="tableData" show-overflow-tooltip="true" style=" width: 100%" :row-class-name="tableRowClassName">
        <el-table-column v-for="colConfig in colConfigs" :prop="colConfig.prop" :label="colConfig.label"></el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { toRefs } from 'vue';
import { data } from "@/utils"

type colConfig = {
    prop: string,
    label: string,
}
const props = defineProps<{
    colConfigs: Array<colConfig>,
    tableData: Array<data>
}>();

const { colConfigs, tableData } = toRefs(props);

const tableRowClassName = ({
    rowIndex,
}: {
    rowIndex: number
}) => {
    if (rowIndex % 2 === 0) {
        return 'tragger-row row'
    } else {
        return 'row'
    }
}

</script>
  
<style>
.el-table .row {}

.el-table .tragger-row {
    --el-table-tr-bg-color: #f9f9f9;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
  