<template>
  <!-- 表格的多个自定义按钮 -->
  <el-button
    v-for="item in topButtonList"
    :key="item.name"
    :type="item.type"
    :icon="item.icon"
    @click="topButtonClick(item.name)"
    size="medium"
    style="height: 40px; position: relative; float: right"
  >
    {{ item.label }}
  </el-button>
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
    v-if="tableType !== 'images'"
  >
    <span v-if="tableType === 'model'"> 添加模型 </span>
    <span v-else> 添加 </span>
  </el-button>
  <el-button
    type="primary"
    size="medium"
    icon="el-icon-refresh"
    class="button"
    style="height: 40px; position: relative; float: right;"
    @click="deploy"
    v-if="tableType === 'model'"
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
    v-if="tableType === 'model'"
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
    <!-- 自定义列模块(仅限自定义字段) -->
    <el-table-column
      v-for="item in customTableColumn"
      :key="item.index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      sortable="custom"
    >
      <template #default="scope">
        {{ item.alias(scope.row.name) }}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      :width="buttonWidth"
    >
      <template #default="scope">
        <!-- 表格内操作栏自定义按钮 -->
        <el-button
          v-for="item in tableButtonList"
          :key="item.name"
          :icon="item.icon"
          :style="{'color': item.color}"
          @click="tableButtonClick(item.name)"
          type="text"
        >
          {{ item.label }}
        </el-button>
        <el-button
          type="text"
          icon="el-icon-search"
          style="color: rgb(63, 186, 246)"
          @click="checkFamily(scope.row)"
          v-if="tableType === 'family'"
        >
          查看科类
        </el-button>
        <el-button
          type="text"
          icon="el-icon-view"
          style="color: rgb(63, 186, 246)"
          @click="check(scope.row)"
        >
          详情
        </el-button>
        <el-button
          type="text"
          icon="el-icon-edit"
          style="color: rgb(65, 209, 204)"
          @click="edit(scope.row)"
        >
          编辑
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
      // 表格类型，默认普通表格, family 科类表格
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
      default: 137
    },
    topButtonList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableButtonList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    customColumnList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: [
    'add',
    'remove',
    'edit',
    'check',
    'checkFamily',
    'train',
    'deploy',
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
    // 查看
    const check = (row: any) => {
      emit('check', row);
    };
    // 查看科类信息
    const checkFamily = (row: any) => {
      emit('checkFamily', row);
    };
    // 模型管理：一键训练
    const train = (row: any) => {
      emit('train', row);
    };
    // 模型管理：一键部署模型
    const deploy = (row: any) => {
      emit('deploy', row);
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
      checkFamily,
      train,
      deploy,
      sortChange,
      selectChange,
      selectAll,
      tableRowStyle
    };
  }
});
</script>

<style lang="scss" scoped></style>
