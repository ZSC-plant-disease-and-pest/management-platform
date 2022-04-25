<template>
  <!-- <BasicBreadcrumb class="breadcrumb" v-show="path !== 'home'" /> -->
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
import BasicBreadcrumb from '@/components/common/BasicBreadcrumb/index.vue';

export default defineComponent({
  components: { BasicBreadcrumb },
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const minHeight = computed(() => props.path === 'home' ? '100vh - 130px' : '100vh - 165px');

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
