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

  <el-table
    v-loading="isLoading"
    :data="tableDataList"
    :row-style="tableRowStyle"
    @sort-change="sortChange"
    @selection-change="selectChange"
    @select-all="selectAll"
    border
    style="width: 100%; margin-top: 15px"
  >
    <!-- 选择框 -->
    <el-table-column type="selection" width="55"/>

    <!-- 表格数据 -->
    <el-table-column
      v-for="item in tableColumnList"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      sortable="custom"
    >
      <template #default="scope" v-if="item.alias">
        {{ item.getAlias(scope.row[item.prop]) }}
      </template>
    </el-table-column>

    <!-- 操作框 -->
    <el-table-column label="操作" :width="tableButtonWidth" >
      <template #default="scope">
        <!-- 表格内操作栏自定义按钮 -->
        <el-button
          v-for="item in tableButtonList"
          :key="item.name"
          :icon="item.icon"
          :style="{'color': item.color}"
          @click="tableButtonClick(item.name, scope.row)"
          type="text"
        >
          {{ item.label }}
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
    tableDataList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表头内容
    tableColumnList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 是否加载中
    isLoading: {
      type: Boolean,
      default: false
    },
    // 被选中行的 id
    rowId: {
      type: Number,
      default: undefined
    },
    // 操作按钮的宽度
    tableButtonWidth: {
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
    }
  },
  emits: [
    'topButtonClick',
    'tableButtonClick',
    'sortChange'
  ],
  setup (props, { emit }) {
    // 表格中被选择的 ids
    let selectedIds: Array<number> = [];

    // 表格选择框改变
    const selectChange = (selection: any) => {
      selectedIds = [];
      if (selection.length !== 0) {
        for (const index in selection) {
          selectedIds.push(selection[index].id);
        }
      }
    };

    // 表格选择全部选择框
    const selectAll = (selection: any) => {
      selectedIds = [];
      for (const index in selection) {
        selectedIds.push(selection[index].id);
      }
    };

    // 表格头部按键
    const topButtonClick = (name: string) => {
      if (name === 'deletee') {
        emit('topButtonClick', name, selectedIds);
      } else {
        emit('topButtonClick', name);
      }
    };

    // 表格操作栏按键
    const tableButtonClick = (name: string, data: any) => {
      if (name === 'detele') {
        emit('topButtonClick', name, selectedIds);
      } else {
        emit('tableButtonClick', name, data);
      }
    };

    // 表格改变排序
    const sortChange = (data: any) => {
      emit('sortChange', data);
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
      topButtonClick,
      tableButtonClick,
      sortChange,
      selectChange,
      selectAll,
      tableRowStyle
    };
  }
});
</script>

<style lang="scss" scoped></style>
