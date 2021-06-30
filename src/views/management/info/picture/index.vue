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
        name: '介壳虫',
        path: '/root/image1/1.jpg',
        labeldb_id: '1',
        label_id: '1'
      },
      {
        id: '1',
        name: '吹棉介壳虫',
        path: '/root/image1/2.jpg',
        labeldb_id: '2',
        label_id: '2'
      }
    ]);
    const tableColumn = reactive([
      {
        prop: 'name',
        label: '名称',
        width: 'auto'
      },
      {
        prop: 'path',
        label: '路径',
        width: 'auto'
      },
      {
        prop: 'labeldb_id',
        label: '标签库类型',
        width: 'auto'
      },
      {
        prop: 'label_id',
        label: '标签 id',
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
