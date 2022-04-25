<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
    :small="small"
    style="margin-top: 12px"
  >
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
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
  emits: ['handleSizeChange', 'handleCurrentChange'],
  setup (props, { emit }) {
    // 改变页面大小
    const handleSizeChange = (params: any) => {
      emit('handleSizeChange', params);
    };

    // 改变当前页面
    const handleCurrentChange = (params: any) => {
      emit('handleCurrentChange', params - 1);
    };

    return {
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
