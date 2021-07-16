<template>
  <Search :searchList="searchList" @search="search" @reset="reset" />
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
import Search from '@/components/common/search/Search.vue';
import {
  defineComponent,
  reactive
} from 'vue';

export default defineComponent({
  props: {},
  components: { Table, Search },
  setup () {
    const tableData = reactive([
      {
        id: '1',
        name: 'model_defalut',
        data_source: 'default'
      },
      {
        id: '2',
        name: 'model_1',
        data_source: 'dataset_1'
      }
    ]);
    const tableColumn = reactive([
      {
        prop: 'id',
        label: 'id',
        width: '75px'
      },
      {
        prop: 'name',
        label: '名称',
        width: 'auto'
      },
      {
        prop: 'data_source',
        label: '数据源',
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
    const search = (data: any) => {
      console.log(data);
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
      }
    };
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '名称',
        value: ''
      },
      {
        name: 'data_source',
        placeholder: '数据源',
        value: ''
      }
    ]);
    return {
      tableData,
      tableColumn,
      add,
      remove,
      edit,
      check,
      search,
      reset,
      searchList
    };
  }
});
</script>

<style lang="scss" scoped></style>
