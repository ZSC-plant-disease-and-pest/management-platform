<template>
  <Search
    :searchList="searchList"
    @search="search"
    @reset="reset"
  />
  <Table
    :tableType="'plants'"
    :tableData="tableData"
    :tableColumn="tableColumn"
    :loading="isLoading"
    @add="add"
    @check="check"
    @checkDateset="checkDateset"
    @remove="remove"
    @sortChange="sortChange"
  />
  <Pagenum
    :total="total"
    :currentPage="page"
    :pageSize="size"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  />
  <Dialog ref="dialogRef" @refreshTable="refreshTable" />
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  onBeforeMount,
  defineComponent,
  ref
} from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Table from '../components/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import Dialog from '@/components/pages/dataset/Dialog.vue';
import { getStandardTime } from '@/utils/time';

export default defineComponent({
  components: {
    Table,
    Search,
    Pagenum,
    Dialog
  },
  setup () {
    const router = useRouter();
    onBeforeMount(() => {
      searchPlantsDataset();
    });

    const state = reactive({
      tableData: [] as Array<any>,
      isLoading: false,
      total: 0,
      page: 1,
      size: 10,
      dialogRef: ref()
    });
    const tableColumn = reactive([
      {
        prop: 'id',
        label: '序号',
        width: '75px'
      },
      {
        prop: 'name',
        label: '植物名称',
        width: '250px'
      },
      {
        prop: 'imgAmount',
        label: '图片数量',
        width: '200px'
      },
      {
        prop: 'creator',
        label: '创建人',
        width: '250px'
      },
      {
        prop: 'standardCreateTime',
        label: '创建时间',
        width: 'auto'
      }
    ]);
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '植物名称',
        value: ''
      }
    ]);

    const datasetParams = reactive({
      page: 0,
      size: 10
    } as datasetParams);
    const searchPlantsDataset = () => {
      state.isLoading = true;
      datasetHttp.searchPlantsDataset(datasetParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.size = response.size;
          // 响应式的添加到表格中
          state.tableData = [];
          for (let i = 0; i < response.content.length; i++) {
            state.tableData.push(response.content[i]);
            state.tableData[i].standardCreateTime = getStandardTime(state.tableData[i].createTime, 'dateTime');
          }
        })
        .finally(() => {
          state.isLoading = false;
        });
    };
    const sortChange = (params: any) => {
      if (params.prop === null) {
        datasetParams.sort = '';
      } else {
        datasetParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      searchPlantsDataset();
    };
    const add = () => {
      state.dialogRef.openDialog('plants');
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        datasetHttp.deleteDiseaseDataset(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            searchPlantsDataset();
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const check = (data: any) => {
      window.open(`http://localhost:8082/plant/detail/${data.informationId}`, '_blank');
    };
    const checkDateset = (data: any) => {
      router.push({
        path: `/admin/recognition/datasetDetail/plant/${data.id}`,
        query: {
          name: data.name,
          informationId: data.informationId
        }
      });
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          datasetParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      searchPlantsDataset();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        datasetParams.name = undefined;
      }
      searchPlantsDataset();
    };
    const refreshTable = () => {
      searchPlantsDataset();
    };
    const handleSizeChange = (newSize: any) => {
      datasetParams.size = newSize;
      datasetParams.page = 0;
      state.size = newSize;
      state.page = 1;
      searchPlantsDataset();
    };
    const handleCurrentChange = (newPage: any) => {
      datasetParams.page = newPage;
      state.page = newPage + 1;
      searchPlantsDataset();
    };

    return {
      ...toRefs(state),
      tableColumn,
      sortChange,
      add,
      remove,
      check,
      checkDateset,
      search,
      reset,
      searchList,
      refreshTable,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
