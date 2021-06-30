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
        disease_type: '1',
        disease_id: '1001',
        damaged_parts: '叶',
        overview: '概述 1',
        suggestion: '治理建议 1'
      },
      {
        id: '2',
        disease_type: '0',
        disease_id: '1002',
        damaged_parts: '根',
        overview: '概述 2',
        suggestion: '治理建议 2'
      }
    ]);
    const tableColumn = reactive([
      {
        prop: 'disease_type',
        label: '疾病类型',
        width: 'auto'
      },
      {
        prop: 'disease_id',
        label: '疾病 id',
        width: 'auto'
      },
      {
        prop: 'damaged_parts',
        label: '部位',
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
