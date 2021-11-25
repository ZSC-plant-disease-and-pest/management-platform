<template>
  <el-input
    v-for="item in searchList"
    :key="item.name"
    v-model="item.value"
    :placeholder="item.placeholder"
    :style="{ 'width': (80 + item.placeholder.length * 15) + 'px' }"
    style="margin-right: 20px"
  />
  <el-button type="primary" @click="topButtonClick('search')" > 搜索 </el-button>
  <el-button @click="topButtonClick('reset')" > 重置 </el-button>
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
  emits: ['topButtonClick'],
  setup (props, { emit }) {
    const topButtonClick = (name: string) => {
      emit('topButtonClick', name, props.searchList);
    };

    return {
      topButtonClick
    };
  }
});
</script>

<style lang="scss" scoped></style>
