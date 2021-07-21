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
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {},
  components: { Table, Search },
  setup () {
    const router = useRouter();
    const tableData = reactive([
      {
        id: '1',
        name: '介壳虫',
        path: '/root/image1/1.jpg',
        labeldb_id: '1',
        label_id: '1'
      },
      {
        id: '2',
        name: '吹棉介壳虫',
        path: '/root/image1/2.jpg',
        labeldb_id: '2',
        label_id: '2'
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
      },
      {
        name: 'path',
        placeholder: '路径',
        value: ''
      },
      {
        name: 'labeldb_id',
        placeholder: '标签库类型',
        value: ''
      },
      {
        name: 'label_id',
        placeholder: '标签 id',
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
