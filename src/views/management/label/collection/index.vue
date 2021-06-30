<template>
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    @check="check"
    @edit="edit"
    @remove="remove"
    @add="add"
  />
</template>

<script lang="ts">
import Table from '@/components/common/table/Table.vue';
import {
  defineComponent,
  reactive
} from 'vue';

export default defineComponent({
  props: {},
  components: { Table },
  setup () {
    const tableData = reactive([
      {
        id: '1',
        name: '默认',
        labeldb_id: '1',
        labels: '1',
        datasets: 'default'
      },
      {
        id: '1',
        name: 'label_collection_1',
        labeldb_id: '1',
        labels: '1',
        datasets: 'default'
      }
    ]);
    const tableColumn = reactive([
      {
        prop: 'name',
        label: '名称',
        width: 'auto'
      },
      {
        prop: 'labeldb_id',
        label: '标签库类型',
        width: 'auto'
      }
    ]);
    const add = (data: any) => {
      console.log(data);
    };
    const remove = (data: any) => {
      console.log(data);
    };
    const edit = (data: any) => {
      console.log(data);
    };
    const check = (data: any) => {
      console.log(data);
    };
    return {
      tableData,
      tableColumn,
      add,
      remove,
      edit,
      check
    };
  }
});
</script>

<style lang="scss" scoped></style>
