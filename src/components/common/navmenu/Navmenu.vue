<template>
  <el-menu
    mode="horizontal"
    :default-active="defaultActive"
    @select="navmenuSelect"
    :style="{ 'width': menuListLength }"
  >
    <el-menu-item
      v-for="item in menuList"
      :key="item.index"
      :index="item.index"
      style="text-align: center; width: 120px; height: 50px; font-size: 16px;"
    >
      {{ item.label }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  emits: ['navmenuSelect'],
  props: {
    defaultActive: {
      type: String,
      default: ''
    },
    menuList: {
      type: Array,
      default: () => {
        return [
          // {
          //   index: 'disease',
          //   label: '植物分类识别'
          // },
          // {
          //   index: 'pest',
          //   label: '虫害'
          // }
        ];
      }
    }
  },
  setup (props, { emit }) {
    const navmenuSelect = (params: any) => {
      emit('navmenuSelect', params);
    };
    const menuListLength = computed(() => {
      return props.menuList.length * 120 + 'px';
    });
    return {
      navmenuSelect,
      menuListLength
    };
  }
});
</script>

<style lang="scss" scoped></style>
