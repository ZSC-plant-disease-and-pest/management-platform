<template>
  <el-steps
    :active="defaultActive"
    finish-status="success"
    simple
  >
    <el-step
      v-for="item in stepsList"
      :key="item.title"
      :title="item.title"
    />
  </el-steps>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['navmenuSelect'],
  props: {
    defaultActive: {
      type: String,
      default: ''
    },
    stepsList: {
      type: Array,
      default: () => {
        return [
          {
            title: '步骤1'
          }
        ];
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
