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
    @check="check"
    @edit="edit"
    @remove="remove"
    @add="add"
    @train="train"
    @deploy="deploy"
    @sortChange="sortChange"
  />
  <Pagenum
    :total="total"
    :currentPage="page"
    :pageSize="size"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  />
  <DeployModelDialog ref="deployModelDialogRef" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, reactive, ref, toRefs } from 'vue';
import { modelHttp, modelParams } from '@/api/model';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Table from './components/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import DeployModelDialog from './components/DeployModelDialog.vue';

export default defineComponent({
  components: {
    Table,
    Search,
    Pagenum,
    DeployModelDialog
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
      size: 10,
      deployModelDialogRef: ref()
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
        width: '250px'
      },
      {
        prop: 'recognizeAmount',
        label: '训练模型识别数量',
        width: '200px'
      },
      {
        prop: 'recognizeType',
        label: '训练模型类型',
        width: '250px'
      },
      {
        prop: 'outputPath',
        label: '输出路径',
        width: 'auto'
      },
      {
        prop: 'status',
        label: '状态',
        width: '200px'
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
        name: 'trainingModelManagementAdd'
      });
    };
    const train = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要开始训练的模型');
      } else {
        console.log(selectedIds);
        state.isLoading = true;
        for (let i = 0; i < selectedIds.length; i++) {
          const index = state.tableData.findIndex((value: any) => value.id === selectedIds[i]);
          if (state.tableData[index].status === '未训练') {
            modelHttp.updateModelById(selectedIds[i])
              .then(() => {
                ElMessage.success(`第${state.tableData[index].id}号模型开始训练`);
              })
              .finally(() => {
                if (i === selectedIds.length - 1) {
                  state.isLoading = false;
                }
              });
          }
        }
      }
    };
    const deploy = (data: any) => {
      state.deployModelDialogRef.openDialog(data);
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的模型');
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
        name: 'trainingModelManagementAdd',
        params: data
      });
    };
    const check = (data: any) => {
      console.log(data);
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          modelParams.name = data[index].value === '' ? '' : data[index].value;
        }
      }
      getModel();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        modelParams.name = '';
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
      train,
      deploy,
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
