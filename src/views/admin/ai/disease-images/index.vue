<template>
  <BasicSearch
    :searchList="searchList"
    @topButtonClick="topButtonClick"
  />
  <BasicTable
    :tableDataList="tableDataList"
    :tableColumnList="tableColumnList"
    :topButtonList="topButtonList"
    :tableButtonList="tableButtonList"
    :isLoading="isLoading"
    :tableButtonWidth="199"
    @topButtonClick="topButtonClick"
    @tableButtonClick="tableButtonClick"
    @sortChange="sortChange"
  />
  <BasicPage
    :pageList="pageList"
    @handleChange="handleChange"
  />
  <DataPageDialog
    ref="dataPageDialogRef"
    @refreshTable="refreshTable"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { searchList, topButtonList, tableButtonList, tableColumnList, pageList } from './data';
import BasicTable from '@/components/common/BasicTable/index.vue';
import BasicSearch from '@/components/common/BasicSearch/index.vue';
import BasicPage from '@/components/common/BasicPage/index.vue';
import DataPageDialog from './components/DataPageDialog.vue';

export default defineComponent({
  components: { BasicTable, BasicSearch, BasicPage, DataPageDialog },
  setup () {
    const router = useRouter();
    onBeforeMount(() => {
      getDiseaseDataset();
    });

    // 数据仓库
    const state = reactive({
      tableDataList: [] as Array<any>,
      searchList,
      topButtonList,
      tableButtonList,
      tableColumnList,
      pageList,
      isLoading: false,
      dataPageDialogRef: ref()
    });

    // 请求表单数据
    const datasetParams = reactive({ page: 0, size: 10 } as datasetParams);
    const getDiseaseDataset = () => {
      state.isLoading = true;
      datasetHttp.getDiseaseDataset(datasetParams)
        .then((response: any) => {
          state.pageList.total = response.totalElements;
          state.pageList.size = response.size;
          state.tableDataList = [];
          for (let i = 0; i < response.content.length; i++) {
            state.tableDataList.push(response.content[i]);
          }
        })
        .finally(() => { state.isLoading = false; });
    };

    // 删除
    const deleteDiseaseDataset = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        datasetHttp.deleteDiseaseDataset(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getDiseaseDataset();
          })
          .finally(() => { state.isLoading = false; });
      }
    };

    // 头部按键
    const topButtonClick = (name: string, data: any) => {
      if (name === 'search') {
        for (const index in data) {
          if (data[index].name === 'name') {
            datasetParams.name = data[index].value === '' ? undefined : data[index].value;
          }
        }
        getDiseaseDataset();
      } else if (name === 'reset') {
        for (const index in state.searchList) {
          state.searchList[index].value = '';
          datasetParams.name = undefined;
        }
        getDiseaseDataset();
      } else if (name === 'add') {
        state.dataPageDialogRef.openDialog('disease');
      } else if (name === 'delete') {
        deleteDiseaseDataset(data);
      }
    };

    // 表格按键
    const tableButtonClick = (name: string, data: any) => {
      if (name === 'dataset') {
        router.push({
          path: `/admin/dataset-data/disease/${data.id}`,
          query: { name: data.name, informationId: data.informationId }
        });
      } else if (name === 'view') {
        window.open(`http://localhost:8082/disease/detail/${data.informationId}`, '_blank');
      }
    };

    // 排序改变
    const sortChange = (params: any) => {
      datasetParams.sort = params.prop === null ? '' : params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      getDiseaseDataset();
    };

    // 分页改变
    const handleChange = (name: string, data: any) => {
      if (name === 'page') {
        datasetParams.page = data - 1;
        state.pageList.page = data;
      } else if (name === 'size') {
        datasetParams.size = data;
        datasetParams.page = 0;
        state.pageList.size = data;
        state.pageList.page = 1;
      }
      getDiseaseDataset();
    };

    // 刷新
    const refreshTable = () => {
      getDiseaseDataset();
    };

    return {
      ...toRefs(state),
      topButtonClick,
      tableButtonClick,
      sortChange,
      deleteDiseaseDataset,
      handleChange,
      refreshTable
    };
  }
});
</script>

<style lang="scss" scoped></style>
