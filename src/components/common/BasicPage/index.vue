<template>
  <el-pagination
    v-bind="$attrs"
    :total="pageList.total"
    :page-size="pageList.size"
    :current-page="pageList.page"
    :small="small"
    :layout="layout"
    style="margin-top: 12px"
    @size-change="handleChange('size', $event)"
    @current-change="handleChange('page', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    pageList: {
      type: Object,
      default: () => ({ total: 0, page: 1, size: 10 })
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  emits: ['handleChange'],
  setup (props, { emit }) {
    // 分页改变时
    const handleChange = (name: string, data: any) => {
      emit('handleChange', name, data);
    };

    return {
      handleChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
