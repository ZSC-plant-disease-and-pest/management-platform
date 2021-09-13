<template>
  <el-table
    :data="tableData"
    v-loading="isLoading"
    @sort-change="sortChange"
    @selection-change="selectChange"
    @select-all="selectAll"
    size="small"
    border
    style="width: 100%; margin-top: 15px"
  >
    <el-table-column type="selection" width="55"/>
    <el-table-column
      v-for="item in tableColumn"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      sortable="custom"
    />
    <el-table-column
      label="操作"
      width="131"
    >
      <template #default="scope">
        <el-button
          type="text"
          size="mini"
          style="color: rgb(63, 186, 246)"
          @click="check(scope.row)"
        >
          查看图片
        </el-button>
        <el-button
          type="text"
          size="mini"
          style="color: rgb(65, 209, 204)"
          @click="copy(scope.row)"
        >
          复制链接
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'check',
    'copy',
    'remove',
    'sortChange'
  ],
  setup (props, { emit }) {
    // 查看
    const check = (row: any) => {
      emit('check', row);
    };
    // 复制
    const copy = (row: any) => {
      emit('copy', row);
    };
    // 删除
    const remove = () => {
      emit('remove', selectedIds);
    };
    // 改变排序
    const sortChange = (params: any) => {
      emit('sortChange', params);
    };
    // 被选中的 id
    let selectedIds: Array<number> = [];
    // 表格多选框发生改变
    const selectChange = (selection: any) => {
      // 清空
      selectedIds = [];
      if (selection.length !== 0) {
        for (const index in selection) {
          selectedIds.push(selection[index].id);
        }
      }
    };
    // 选择全部多选框
    const selectAll = (selection: any) => {
      selectedIds = [];
      for (const index in selection) {
        selectedIds.push(selection[index].id);
      }
    };

    return {
      check,
      copy,
      remove,
      sortChange,
      selectChange,
      selectAll
    };
  }
});
</script>

<style lang="scss" scoped></style>
