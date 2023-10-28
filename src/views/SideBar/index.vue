<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div>Qyi音乐</div>
      </el-header>
      <el-main>
        <div v-for="feature in features" class="features" :class="feature.choice ? 'choice' : ''"
          @click="choiceDiv(feature)">
          {{ feature.name }}
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  

<script setup lang="ts">
import { reactive } from 'vue';
import { Features } from "./type" 
const features = reactive([{ name: "搜索", choice: true }, { name: "我的收藏", choice: false }]);

const choiceDiv = (feature: Features) => {
  features.map((item: Features) => {
    item.choice = false;
  })
  feature.choice = true;
}

</script>
<style scoped lang="scss">

.el-main {
  padding: 12px;
}

.features {
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  color: #fffbfb;
  width: 100%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align: left;
}
.features:hover {
  cursor: pointer;
}

.choice {
  background-color: rgb(230, 225, 225);
  opacity: 0.9;

}
</style>