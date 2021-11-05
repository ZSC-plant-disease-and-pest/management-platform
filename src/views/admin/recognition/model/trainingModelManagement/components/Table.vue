<template>
  <el-button
    type="danger"
    size="medium"
    icon="el-icon-delete"
    class="button"
    style="height: 40px; position: relative; float: right"
    @click="remove(null)"
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
    添加模型
  </el-button>
  <el-button
    type="primary"
    size="medium"
    icon="el-icon-refresh"
    class="button"
    style="height: 40px; position: relative; float: right;"
    @click="deploy"
  >
    一键部署模型
  </el-button>
  <el-button
    type="warning"
    size="medium"
    icon="el-icon-open"
    class="button"
    style="height: 40px; position: relative; float: right;"
    @click="train"
  >
    开始训练
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
    <el-table-column
      label="操作"
      :width="buttonWidth"
    >
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          icon="el-icon-view"
          style="color: rgb(63, 186, 246)"
          @click="check(scope.row)"
          v-if="scope.row.status !== '训练中'"
        >
          详情
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="el-icon-edit"
          style="color: rgb(65, 209, 204)"
          @click="edit(scope.row)"
          v-if="scope.row.status === '未训练'"
        >
          编辑
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="el-icon-edit"
          style="color: rgb(65, 209, 204)"
          @click="remove(scope.row)"
          v-if="scope.row.status !== '训练中'"
        >
          删除
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="el-icon-edit"
          style="color: rgb(65, 209, 204)"
          @click="deploy(scope.row)"
          v-if="scope.row.status === '待部署'"
        >
          部署
        </el-button>
        <el-button
          type="text"
          size="small"
          icon="el-icon-edit"
          style="color: rgb(65, 209, 204)"
          @click="test(scope.row)"
          v-if="scope.row.status === '已上线'"
        >
          在线测试
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
      default: 250
    }
  },
  emits: [
    'add',
    'remove',
    'edit',
    'check',
    'train',
    'deploy',
    'test',
    'sortChange'
  ],
  setup (props, { emit }) {
    // 新增
    const add = () => {
      emit('add', 'add');
    };
    // 删除
    const remove = (row: any = null) => {
      if (row === null) {
        emit('remove', selectedIds);
      } else {
        emit('remove', row.id);
      }
    };
    // 编辑
    const edit = (row: any) => {
      emit('edit', row);
    };
    // 查看
    const check = (row: any) => {
      emit('check', row);
    };
    // 模型管理：一键训练
    const train = () => {
      emit('train', selectedIds);
    };
    // 模型管理：一键部署模型
    const deploy = (row: any) => {
      emit('deploy', row);
    };
    // 在线测试
    const test = (row: any) => {
      emit('test', row);
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
      check,
      train,
      deploy,
      test,
      sortChange,
      selectChange,
      selectAll,
      tableRowStyle
    };
  }
});
</script>

<style lang="scss" scoped></style>
