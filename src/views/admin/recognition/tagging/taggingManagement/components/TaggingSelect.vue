<template>
  <el-select
    class="select"
    size="small"
    @change="selectChange"
    :model-value="defaultValue"
    :loading="isLoading"
    placeholder="请选择"
    filterable
    remote
    :remote-method="remoteMethod"
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :value="item.id"
      :label="item.name"
    >
    </el-option>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      small
      layout="prev, pager, next"
      style="margin-top: 8px"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';

export default defineComponent({
  emits: ['selectChange'],
  setup (props, { emit }) {
    const state = reactive({
      defaultValue: '' as any,
      isLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      list: [] as Array<any>,
      datasetType: ''
    });

    const datasetParams = reactive({
      name: '',
      page: 0,
      size: 5
    } as datasetParams);
    const getDataset = () => {
      state.isLoading = true;
      if (state.datasetType === '0') {
        datasetHttp.getDiseaseDataset(datasetParams)
          .then((response: any) => {
            state.total = response.totalElements;
            state.list = [];
            for (let i = 0; i < response.content.length; i++) {
              state.list.push({
                id: response.content[i].id,
                name: response.content[i].name
              });
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (state.datasetType === '1') {
        datasetHttp.getPestDataset(datasetParams)
          .then((response: any) => {
            state.total = response.totalElements;
            state.list = [];
            for (let i = 0; i < response.content.length; i++) {
              state.list.push({
                id: response.content[i].id,
                name: response.content[i].name
              });
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (state.datasetType === '2') {
        datasetHttp.getPlantsDataset(datasetParams)
          .then((response: any) => {
            state.total = response.totalElements;
            state.list = [];
            for (let i = 0; i < response.content.length; i++) {
              state.list.push({
                id: response.content[i].id,
                name: response.content[i].name
              });
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const loadingSelect = (datasetType: string) => {
      emit('selectChange', undefined);
      state.defaultValue = '';
      datasetParams.name = '';
      state.datasetType = datasetType;
      getDataset();
    };
    const remoteMethod = (data: any) => {
      datasetParams.name = data;
      getDataset();
    };
    const handleCurrentChange = (params: any) => {
      state.currentPage = params;
      datasetParams.page = params - 1;
      getDataset();
    };
    const selectChange = (params: any) => {
      emit('selectChange', params);
      state.defaultValue = params;
    };
    const reset = () => {
      state.defaultValue = '';
    };
    const selectFamily = (params: any) => {
      emit('selectChange', params);
      state.defaultValue = params;
    };

    return {
      ...toRefs(state),
      loadingSelect,
      remoteMethod,
      handleCurrentChange,
      selectChange,
      reset,
      selectFamily
    };
  }
});
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
