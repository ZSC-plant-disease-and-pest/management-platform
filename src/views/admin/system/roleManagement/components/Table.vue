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
    注册
  </el-button>
  <el-table
    :data="tableData"
    :row-style="tableRowStyle"
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
    <el-table-column label="用户状态" width="auto">
      <template #default="scope">
        <span v-if="scope.row.state === 1"> 正常 </span>
        <span v-else> 禁用 </span>
      </template>
    </el-table-column>
    <el-table-column label="用户角色" width="auto">
      <template #default="scope">
        <span v-if="scope.row.role === 'root'"> 超级管理员 </span>
        <span v-else> 管理员 </span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      :width="buttonWidth"
    >
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          icon="el-icon-edit"
          style="color: rgb(65, 209, 204)"
          @click="edit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="el-icon-key"
          style="color: rgb(230, 162, 60)"
          @click="change(scope.row)"
        >
          修改密码
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
      // 表格类型，默认普通表格
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
    },
    // 被选中行的 id
    rowId: {
      type: Number,
      default: undefined
    },
    // 操作按钮的宽度
    buttonWidth: {
      type: Number,
      default: 148
    }
  },
  emits: [
    'add',
    'remove',
    'edit',
    'change',
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
    // 编辑
    const edit = (row: any) => {
      emit('edit', row);
    };
    // 修改密码
    const change = (row: any) => {
      emit('change', row);
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
    // 被选中行的样式
    const tableRowStyle = (data: any) => {
      if (data.row.id === props.rowId) {
        return 'background-color: #fafafa';
      } else {
        return '';
      }
    };
    return {
      add,
      remove,
      edit,
      change,
      sortChange,
      selectChange,
      selectAll,
      tableRowStyle
    };
  }
});
</script>

<style lang="scss" scoped></style>
