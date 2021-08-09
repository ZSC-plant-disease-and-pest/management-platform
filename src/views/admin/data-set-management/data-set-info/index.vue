<template>
  <Search :searchList="searchList" @search="search" @reset="reset" />
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    :loading="loading"
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
    let loading = false;
    onBeforeMount(() => {
      loading = true;
      datasetHttp.searchDataset(null)
        .then((response: any) => {
          console.log(response);
          for (let i = 0; i < response.content.length; i++) {
            tableData.push(response.content[i]);
          }
        })
        .finally(() => {
          loading = false;
        });
    });
    const tableData = reactive<any>([]);
    const tableColumn = reactive([
      {
        prop: 'id',
        label: 'ID',
        width: '75px'
      },
      {
        prop: 'name',
        label: '名称',
        width: 'auto'
      },
      {
        prop: 'labelCollection',
        label: '标签集 ID',
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
      router.push({
        path: router.currentRoute.value.path + '/add',
        name: 'dataSetInfoAdd'
      });
    };
    const remove = () => {
      console.log('remove');
    };
    const edit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/update',
        name: 'dataSetInfoUpdate',
        params: data
      });
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
        name: 'labelCollection',
        placeholder: '标签集ID',
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
      loading,
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
