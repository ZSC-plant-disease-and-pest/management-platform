<template>
  <!-- <Breadcrumb class="breadcrumb" v-show="path !== 'home'" /> -->
  <div class="main" :style="{ 'minHeight': `calc(${minHeight})` }">
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="['add-update', 'detail', 'exclude']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb.vue';

export default defineComponent({
  components: { Breadcrumb },
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const minHeight = computed(() => {
      if (props.path === 'home') {
        // 首页不需要面包屑, main 的高度放宽
        return '100vh - 130px';
      } else {
        // 其他页面有面包屑, main 的高度降低
        return '100vh - 165px';
      }
    });
    return {
      minHeight
    };
  }
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-size: 15px;
  margin-bottom: 20px;
}
.main {
  padding: 15px;
  min-width: 1158px;
  background-color: #fff;
  width: calc(100% - 30px);
}
</style>
