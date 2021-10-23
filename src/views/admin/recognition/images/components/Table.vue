<template>
  <el-button
    type="danger"
    size="medium"
    icon="el-icon-delete"
    class="button"
    style="height: 40px; position: relative; float: right"
    @click="remove"
  >
    删除
  </el-button>
  <el-button
    type="success"
    size="medium"
    icon="el-icon-plus"
    class="button"
    style="height: 40px; position: relative; float: right;"
    @click="add"
  >
    添加
  </el-button>
  <el-table
    :data="tableData"
    v-loading="loading"
    @sort-change="sortChange"
    @selection-change="selectChange"
    @select-all="selectAll"
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
      width="190"
    >
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          icon="el-icon-search"
          style="color: rgb(230, 162, 60)"
          @click="checkDateset(scope.row)"
        >
          查看数据集
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="el-icon-view"
          style="color: rgb(63, 186, 246)"
          @click="check(scope.row)"
        >
          <span v-if="tableType === 'disease'">病害详情</span>
          <span v-if="tableType === 'pest'">虫害详情</span>
          <span v-if="tableType === 'plants'">植物详情</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    tableType: {
      type: String,
      // 表格类型
      default: 'common'
    },
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
  emits: [
    'add',
    'remove',
    'check',
    'checkDateset',
    'sortChange'
  ],
  setup (props, { emit }) {
    // 新增
    const add = () => {
      emit('add', 'add');
    };
    // 删除
    const remove = () => {
      emit('remove', selectedIds);
    };
    // 查看详情
    const check = (row: any) => {
      emit('check', row);
    };
    // 查看数据集
    const checkDateset = (row: any) => {
      emit('checkDateset', row);
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
      add,
      remove,
      check,
      checkDateset,
      sortChange,
      selectChange,
      selectAll
    };
  }
});
</script>

<style lang="scss" scoped></style>
