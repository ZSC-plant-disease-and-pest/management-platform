<template>
  <Search
    :searchList="searchList"
    @search="search"
    @reset="reset"
  />
  <Table
  :tableType="'images'"
    :tableData="tableData"
    :tableColumn="tableColumn"
    :loading="isLoading"
    @check="check"
    @edit="edit"
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
  <Dialog ref="dialogRef" />
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  onUpdated,
  onBeforeMount,
  defineComponent,
  ref
} from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import Dialog from '@/components/pages/recognition/images/Dialog.vue';

export default defineComponent({
  components: {
    Table,
    Search,
    Pagenum,
    Dialog
  },
  setup () {
    const route = useRoute();
    onBeforeMount(() => {
      searchPestDataset();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        searchPestDataset();
      }
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
        label: 'ID',
        width: '75px'
      },
      {
        prop: 'name',
        label: '虫害数据集名称',
        width: 'auto'
      },
      {
        prop: 'pictureAccount',
        label: '图片数量',
        width: 'auto'
      },
      {
        prop: 'path',
        label: '保存路径',
        width: 'auto'
      }
    ]);
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '虫害数据集名称',
        value: ''
      }
    ]);

    const datasetParams = reactive({
      page: 0,
      size: 10
    } as datasetParams);
    const searchPestDataset = () => {
      state.isLoading = true;
      datasetHttp.searchPestDataset(datasetParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.size = response.size;
          // 响应式的添加到表格中
          state.tableData = [];
          for (let i = 0; i < response.content.length; i++) {
            state.tableData.push(response.content[i]);
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
      searchPestDataset();
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        // isLoading.value = true;
        // datasetHttp.deleteDisease(selectedIds.join(','))
        //   .then(() => {
        //     ElMessage.success('删除成功');
        //     searchPestDataset();
        //   })
        //   .finally(() => {
        //     isLoading.value = false;
        //   });
      }
    };
    const edit = (data: any) => {
      state.dialogRef.openDialog('pest', data);
    };
    const check = (data: any) => {
      console.log(data);
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          datasetParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      searchPestDataset();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        datasetParams.name = undefined;
      }
      searchPestDataset();
    };
    const handleSizeChange = (newSize: any) => {
      datasetParams.size = newSize;
      datasetParams.page = 0;
      state.size = newSize;
      state.page = 1;
      searchPestDataset();
    };
    const handleCurrentChange = (newPage: any) => {
      datasetParams.page = newPage;
      state.page = newPage + 1;
      searchPestDataset();
    };

    return {
      ...toRefs(state),
      tableColumn,
      sortChange,
      remove,
      edit,
      check,
      search,
      reset,
      searchList,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
