<template>
  <el-button
    type="success"
    size="medium"
    icon="el-icon-plus"
    style="margin-bottom: 15px"
    @click="add"
  >
    添加
  </el-button>
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%"
  >
    <el-table-column
      v-for="item in tableColumn"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    />
    <el-table-column
      label="操作"
      width="181"
    >
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          icon="el-icon-view"
          style="color: rgb(63, 186, 246)"
          @click="check(scope.row)"
        >
          查看
        </el-button>
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
          icon="el-icon-delete"
          style="color: rgb(244, 96, 84)"
          @click="remove(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    tableData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tableColumn: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ['check', 'edit', 'remove', 'add'],
  setup (props, { emit }) {
    const add = () => {
      emit('add', 'add');
    };
    const remove = (row: any) => {
      emit('remove', row);
    };
    const edit = (row: any) => {
      emit('edit', row);
    };
    const check = (row: any) => {
      emit('check', row);
    };
    return {
      add,
      remove,
      edit,
      check
    };
  }
});
</script>

<style lang="scss" scoped></style>
