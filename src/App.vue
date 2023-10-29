<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/views/SideBar/index.vue"
</script>

<style scoped>
.common-layout {
  height: 100vh;
}

.el-aside {
  height: 90vh;
  background-color: palegreen;
}

.el-main {
  height: 90vh;
  /* background-color: red; */
}

.el-footer {
  height: 10vh;
  background-color: greenyellow;
}
</style>
