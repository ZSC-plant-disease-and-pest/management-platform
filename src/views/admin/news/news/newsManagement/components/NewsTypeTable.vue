<template>
  <el-table
    class="newsTypeTable"
    :data="tableData"
    :row-style="tableRowStyle"
    v-loading="loading"
    border
    style="width: 100%; minWidth: 180px"
    height="calc(100vh - 165px)"
    :header-row-style="{'color': '#666666'}"
    :header-cell-style="{'backgroundColor': '#8ccee8', 'textAlign': 'center'}"
    @row-click="rowClick"
  >
    <el-table-column
      v-for="item in tableColumn"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :sortable="false"
    />
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  props: {
    // 表格内容
    tableData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表头内容
    tableColumn: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['rowSelect'],
  setup (props, { emit }) {
    const state = reactive({
      selectedId: 0
    });

    // 被选中行的样式
    const tableRowStyle = (data: any) => {
      if (data.row.id === state.selectedId) {
        return 'background-color: #e0e0e0; font-weight: 700; color: black';
      } else {
        return '';
      }
    };
    // 某一行被点击
    const rowClick = (row: any) => {
      state.selectedId = row.id;
      emit('rowSelect', row.id);
    };

    return {
      ...toRefs(state),
      tableRowStyle,
      rowClick
    };
  }
});
</script>

<style lang="scss" scoped>
.newsTypeTable ::v-deep .el-table {
  tr {
    background-color: none;
  }
}
</style>
