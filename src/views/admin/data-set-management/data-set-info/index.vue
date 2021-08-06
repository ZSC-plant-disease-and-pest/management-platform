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
import { datasetHttp, datasetParams } from '@/api/dataset';
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
    onBeforeMount(() => {
      // datasetHttp.SearchDataset().then((response: any) => {
      //   console.log(response);
      // });
    });
    const tableData = reactive([
      {
        id: '1',
        name: 'dataset_1',
        label_collection: '病害数据集',
        path: '/root/dataset/1'
      },
      {
        id: '2',
        name: 'dataset_2',
        label_collection: '植物数据集',
        path: '/root/dataset/2'
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
        prop: 'label_collection',
        label: '数据集类型',
        width: 'auto'
      },
      {
        prop: 'path',
        label: '路径',
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
        name: 'label_collection',
        placeholder: '数据集类型',
        value: ''
      },
      {
        name: 'path',
        placeholder: '路径',
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
