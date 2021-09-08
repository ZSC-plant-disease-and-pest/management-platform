<template>
  <el-input
    v-for="item in searchList"
    :key="item.name"
    style="margin-right: 20px"
    :style="{ 'width': (80 + item.placeholder.length * 15) + 'px' }"
    :placeholder="item.placeholder"
    v-model="item.value"
  />
  <el-button type="primary" @click="search" > 搜索 </el-button>
  <el-button @click="reset" > 重置 </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    searchList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ['search', 'reset'],
  setup (props, { emit }) {
    const search = () => {
      const [...searchList] = props.searchList;
      emit('search', searchList);
    };
    const reset = () => {
      emit('reset');
    };
    return {
      search,
      reset
    };
  }
});
</script>

<style lang="scss" scoped></style>
