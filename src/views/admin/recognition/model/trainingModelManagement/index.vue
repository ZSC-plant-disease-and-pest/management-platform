<template>
  <Search
    :searchList="searchList"
    @search="search"
    @reset="reset"
  />
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    :loading="isLoading"
    :tableType="'model'"
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
import { defineComponent, onBeforeMount, onUpdated, reactive, toRefs } from 'vue';
import { modelHttp, modelParams } from '@/api/model';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';

export default defineComponent({
  components: {
    Table,
    Search,
    Pagenum
  },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      getModel();
    });
    onUpdated(() => {
      if (route.params.type === 'refresh') {
        route.params.type = '';
        getModel();
      }
    });

    const state = reactive({
      tableData: [] as Array<any>,
      isLoading: false,
      total: 0,
      page: 1,
      size: 10
    });
    const tableColumn = reactive([
      {
        prop: 'id',
        label: '序号',
        width: '75px'
      },
      {
        prop: 'name',
        label: '模型名称',
        width: 'auto'
      },
      {
        prop: 'dataSetType',
        label: '数据集类型',
        width: 'auto'
      },
      {
        prop: 'status',
        label: '状态',
        width: 'auto'
      }
    ]);
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '模型名称',
        value: ''
      }
    ]);

    const modelParams = reactive({
      page: 0,
      size: 10
    } as modelParams);
    const getModel = () => {
      state.isLoading = true;
      modelHttp.searchModel(modelParams)
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
        modelParams.sort = '';
      } else {
        modelParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getModel();
    };
    const add = () => {
      router.push({
        path: router.currentRoute.value.path + '/add',
        name: 'diseaseManagementAdd'
      });
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        modelHttp.deleteModel(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getModel();
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const edit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/update',
        name: 'diseaseManagementUpdate',
        params: data
      });
    };
    const check = (data: any) => {
      console.log(data);
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          modelParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getModel();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        modelParams.name = undefined;
      }
      getModel();
    };
    const handleSizeChange = (newSize: any) => {
      modelParams.size = newSize;
      modelParams.page = 0;
      state.size = newSize;
      state.page = 1;
      getModel();
    };
    const handleCurrentChange = (newPage: any) => {
      modelParams.page = newPage;
      state.page = newPage + 1;
      getModel();
    };

    return {
      ...toRefs(state),
      tableColumn,
      sortChange,
      add,
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
