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
    @sortChange="sortChange"
  />
  <Pagenum
    :total="total"
    :currentPage="page"
    :pageSize="size"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  />
</template>

<script lang="ts">
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import {
  defineComponent,
  reactive,
  onBeforeMount,
  ref,
  toRefs
} from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default defineComponent({
  props: {},
  components: { Table, Search, Pagenum },
  setup () {
    onBeforeMount(() => {
      getDataset();
    });
    const router = useRouter();
    const loading = ref(false);
    const total = ref(null);
    const page = ref(1);
    const size = ref(10);
    const datasetParams = reactive({
      page: 0,
      size: 10
    } as datasetParams);
    const getDataset = () => {
      loading.value = true;
      datasetHttp.searchDataset(datasetParams)
        .then((response: any) => {
          console.log(response);
          total.value = response.totalElements;
          size.value = response.size;
          state.tableData = [];
          for (let i = 0; i < response.content.length; i++) {
            state.tableData.push(response.content[i]);
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const state = reactive({
      tableData: [] as Array<any>
    });
    const sortChange = (params: any) => {
      if (params.prop === null) {
        datasetParams.sort = '';
      } else {
        datasetParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getDataset();
    };
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
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        // 提示请选择需要删除的内容
        ElMessage.warning('请选择需要删除的内容');
      } else {
        loading.value = true;
        datasetHttp.deleteDataset(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getDataset();
          })
          .finally(() => {
            loading.value = false;
          });
      }
    };
    const edit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/update',
        name: 'dataSetInfoUpdate',
        params: data
      });
    };
    const check = (data: any) => {
      console.log(data);
    };
    const search = (data: any) => {
      // for (const index in data) {
      //   if (data[index].value !== '') {
      //     if (data[index].name === 'name') {
      //       datasetParams.name = data[index].value;
      //     } else if (data[index].name === 'labelCollection') {
      //       datasetParams.labelCollection = data[index].value;
      //     } else if (data[index].name === 'path') {
      //       datasetParams.path = data[index].value;
      //     }
      //   }
      // }
      // getDataset();
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
    const handleSizeChange = (newSize: any) => {
      datasetParams.size = newSize;
      datasetParams.page = 0;
      size.value = newSize;
      page.value = 1;
      getDataset();
    };
    const handleCurrentChange = (newPage: any) => {
      datasetParams.page = newPage;
      page.value = newPage + 1;
      getDataset();
    };
    return {
      ...toRefs(state),
      tableColumn,
      loading,
      add,
      remove,
      edit,
      check,
      search,
      reset,
      searchList,
      total,
      page,
      size,
      handleSizeChange,
      handleCurrentChange,
      sortChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
