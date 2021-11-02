<template>
  <el-select
    class="select"
    size="small"
    @change="selectChange"
    :loading="isLoading"
    :placeholder="placeholder"
    v-model="defaultValue"
    filterable
    remote
    :remote-method="remoteMethod"
    :disabled="SelectDisabled"
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
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue';
import { datasetHttp } from '@/api/dataset';

export default defineComponent({
  props: {
    defaultId: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['selectChange'],
  setup (props, { emit }) {
    onBeforeMount(() => {
      getDatasetId();
    });

    const state = reactive({
      defaultValue: undefined as number | undefined,
      isLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      list: [] as Array<any>,
      SelectDisabled: false
    });

    const datasetParams = reactive({
      name: '',
      page: 0,
      size: 5
    } as any);
    const getDatasetId = () => {
      if (props.defaultId !== 0) {
        state.SelectDisabled = true;
        state.defaultValue = props.defaultId;
        datasetParams.id = props.defaultId;
      }
      state.isLoading = true;
      if (props.type === 'disease') {
        datasetHttp.searchDiseaseDataset(datasetParams)
          .then((response: any) => {
            state.total = response.totalElements;
            state.list = [];
            for (let i = 0; i < response.content.length; i++) {
              state.list.push(response.content[i]);
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (props.type === 'pest') {
        datasetHttp.searchPestDataset(datasetParams)
          .then((response: any) => {
            state.total = response.totalElements;
            state.list = [];
            for (let i = 0; i < response.content.length; i++) {
              state.list.push(response.content[i]);
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (props.type === 'plants') {
        datasetHttp.searchPlantsDataset(datasetParams)
          .then((response: any) => {
            state.total = response.totalElements;
            state.list = [];
            for (let i = 0; i < response.content.length; i++) {
              state.list.push(response.content[i]);
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const remoteMethod = (data: any) => {
      datasetParams.name = data;
      getDatasetId();
    };
    const handleCurrentChange = (params: any) => {
      state.currentPage = params;
      datasetParams.page = params - 1;
      getDatasetId();
    };
    const selectChange = (id: number) => {
      emit('selectChange', state.list[state.list.findIndex((value: any) => value.id === id)]);
    };
    const reset = () => {
      emit('selectChange');
    };
    return {
      ...toRefs(state),
      remoteMethod,
      handleCurrentChange,
      selectChange,
      reset
    };
  }
});
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
