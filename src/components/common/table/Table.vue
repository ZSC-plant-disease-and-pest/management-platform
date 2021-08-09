<template>
  <el-button
    type="success"
    size="medium"
    icon="el-icon-plus"
    class="button"
    style="height: 40px; position: fixed; right: 135px;"
    @click="add"
  >
    添加
  </el-button>
  <el-button
    type="danger"
    size="medium"
    icon="el-icon-delete"
    class="button"
    style="height: 40px; position: fixed; right: 35px;"
    @click="remove"
  >
    删除
  </el-button>
  <el-table
    :data="tableData"
    v-loading="loading"
    stripe
    border
    style="width: 100%; margin-top: 15px"
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
      width="126"
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
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['check', 'edit', 'remove', 'add'],
  setup (props, { emit }) {
    // 增删查改可能需要身份权限进行管理，不同身份有不同的权限
    // 另外添加字段，然后用 v-if 来控制
    const add = () => {
      emit('add', 'add');
    };
    const remove = () => {
      emit('remove');
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

<style lang="scss" scoped>
</style>
