<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="name">
          <el-text>Qyi音乐</el-text>
        </div>
      </el-header>
      <el-main>
        <div v-for="feature in features" class="features" :class="feature.choice ? 'choice' : ''"
          @click="choiceDiv(feature)">
          {{ feature.label }}
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  

<script setup lang="ts">
import { reactive } from 'vue';
import { Features } from "./type";
import { useRouter } from 'vue-router';

const features = reactive([
  { name: "Search", label: "搜索", choice: true },
  { name: "Collect", label: "我的收藏", choice: false }
]);
const router = useRouter();

const choiceDiv = (feature: Features) => {
  features.map((item: Features) => {
    item.choice = false;
  })
  feature.choice = true;
  router.push({ name: `${feature.name}` });
}

</script>
<style scoped lang="scss">
.el-header {
  height: 100px;
  display: flow-root;

  .name {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-text {
    font-size: 30px;
    color: #fffbfb;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
}


.el-main {
  padding: 12px;
}

.features {
  box-sizing: border-box;
  height: 40px;
  line-height: 30px;
  border-radius: 5px;
  color: #1e1c1c;
  width: 100%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align: left;
  font-size: 1em;
  margin: auto 0;
  margin-bottom: 5px;
  padding: 3px 5px;
}

.features:hover,
.choice {
  cursor: pointer;
  background-color: #5add61;
  opacity: 0.9;
  color: #fffbfb;
}

.choice {
  font-size: 1.1em;

}
</style>