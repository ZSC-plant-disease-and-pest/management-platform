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

    const state = reactive({
      path: route.path.split('/')[2],
      asideList: [] as Array<any>
    });

    const menuSelect = (path: string, asideList: Array<any>) => {
      state.path = path;
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
