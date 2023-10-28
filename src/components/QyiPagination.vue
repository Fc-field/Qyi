<template>
    <el-pagination background layout="prev, pager, next" :page-size="100" :total="total" @current-change="changePage" />
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
    total: number,
    //获取表格数据
    getList: Function
}>();

const { total } = toRefs(props);
const { getList } = props;
//页码改变时
const changePage = (page: number) => {
    console.log(page);
    getList(page);
}

</script>

<style scoped lang="scss">
.el-pagination {
    margin-top: 5px;
    display: flex;
    justify-content: center;
}
</style>
  