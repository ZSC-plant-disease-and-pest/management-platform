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
import { labelCollectionHttp, labelCollectionParams } from '@/api/labelCollection';
import {
  defineComponent,
  reactive,
  onBeforeMount
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {},
  components: { Table, Search },
  setup () {
    const router = useRouter();
    const tableData = reactive([
      {
        id: '1',
        name: 'default',
        labeldb_id: '1',
        labels: '1',
        datasets: 'default'
      },
      {
        id: '2',
        name: 'label_collection_1',
        labeldb_id: '1',
        labels: '1',
        datasets: 'default'
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
        prop: 'labeldb_id',
        label: '标签库类型',
        width: 'auto'
      }
      // 包含标签
      // 包含数据集
    ]);
    const add = (data: any) => {
      console.log(data);
      router.push(router.currentRoute.value.path + '/add');
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
