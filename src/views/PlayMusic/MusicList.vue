<template>
    <el-drawer v-model="dialogVisible" size="40%" :modal="false" direction="rtl" @close="emits('close')">
        <template #default>
            <div>
                <QyiTable :col-configs="colConfigs" :table-data="musicListStore.musicList" :show-header="true"></QyiTable>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import QyiTable from '@/components/QyiTable.vue';
import { useMusicListStore } from '@/stores';

const musicListStore = useMusicListStore();

const props = defineProps<{
    dialogVisible: Boolean
}>();
const emits = defineEmits(["close"]);
const { dialogVisible } = toRefs(props);



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
        prop: "time",
        label: "时长",
    },
]);

</script>

<style lang="scss"></style>