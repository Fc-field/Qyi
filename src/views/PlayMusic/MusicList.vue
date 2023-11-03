<template>
    <el-drawer v-model="drawer" direction="rtl">
        <template #default>
            <div>
                <QyiTable ></QyiTable>
            </div>
        </template>

    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QyiTable from '@/components/QyiTable.vue';


const drawer = ref(true);
</script>