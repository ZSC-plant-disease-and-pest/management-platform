<template>
  <el-container>
    <el-header style="padding: 0px; minWidth: 1131px">
      <LayoutHeadedr @menuSelect="menuSelect" />
    </el-header>
    <el-container style="height: calc(100vh - 60px)">
      <el-aside style="width: 201px" v-show="path !== 'home'">
        <LayoutAsider :path="path" :asideList="asideList" />
      </el-aside>
      <el-main style="backgroundColor: #f2f4f6">
        <LayoutMain :path="path" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs
} from 'vue';
import LayoutHeadedr from '@/layout/components/LayoutHeader.vue';
import LayoutAsider from '@/layout/components/LayoutAside.vue';
import LayoutMain from '@/layout/components/LayoutMain.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    LayoutHeadedr,
    LayoutAsider,
    LayoutMain
  },
  setup () {
    const route = useRoute();
    // 生成响应式对象
    const state = reactive({
      path: route.path.split('/')[2],
      asideList: [] as Array<any>
    });
    // 头部菜单被点击
    const menuSelect = (path: string, asideList: Array<any>) => {
      // 被选中头部菜单的路径
      state.path = path;
      // 侧边导航栏列表
      state.asideList = asideList;
    };
    return {
      ...toRefs(state),
      menuSelect
    };
  }
});
</script>

<style lang="scss" scoped></style>
