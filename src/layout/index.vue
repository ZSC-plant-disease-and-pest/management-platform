<template>
  <el-container>
    <el-header style="padding: 0px">
      <LayoutHeadedr />
    </el-header>
    <el-container style="height: calc(100vh - 60px)">
      <el-aside style="width: 201px">
        <LayoutAsider />
      </el-aside>
      <el-main style="backgroundColor: #f2f4f6">
        <LayoutMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutHeadedr from '@/layout/components/LayoutHeader.vue';
import LayoutAsider from '@/layout/components/LayoutAside.vue';
import LayoutMain from '@/layout/components/LayoutMain.vue';
export default defineComponent({
  components: {
    LayoutHeadedr,
    LayoutAsider,
    LayoutMain
  }
});
</script>

<style lang="scss" scoped></style>
