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
        name: 'picture_1',
        label_id: '1001',
        dataset_id: 'default',
        label_collection: 'label_collection_1',
        device: 'false',
        location: 'guangdong'
      },
      {
        id: '2',
        name: 'picture_2',
        label_id: '1002',
        dataset_id: 'dataset_1',
        label_collection: 'label_collection_2',
        device: 'false',
        location: ''
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
        prop: 'label_id',
        label: '病虫害 id',
        width: 'auto'
      },
      {
        prop: 'dataset_id',
        label: '数据集 id',
        width: 'auto'
      },
      {
        prop: 'label_collection',
        label: '标签集类型',
        width: 'auto'
      },
      {
        prop: 'device',
        label: '设备类型',
        width: 'auto'
      },
      {
        prop: 'location',
        label: '位置信息',
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
        name: 'label_id',
        placeholder: '病虫害 id',
        value: ''
      },
      {
        name: 'dataset_id',
        placeholder: '数据集 id',
        value: ''
      },
      {
        name: 'label_collection',
        placeholder: '标签集类型',
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
