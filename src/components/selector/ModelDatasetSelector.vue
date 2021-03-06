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
    multiple
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
      defaultValue: undefined as any,
      isLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      list: [] as Array<any>,
      SelectDisabled: false
    });

    const datasetParams = reactive({
      name: '',
      page: 0,
      size: 10
    } as any);
    const getDatasetId = () => {
      if (props.defaultId !== 0) {
        state.SelectDisabled = true;
        state.defaultValue = props.defaultId;
        datasetParams.id = props.defaultId;
      }
      state.isLoading = true;
      if (props.type === 'disease') {
        datasetHttp.getDiseaseDataset(datasetParams)
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
        datasetHttp.getPestDataset(datasetParams)
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
        datasetHttp.getPlantsDataset(datasetParams)
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
      state.defaultValue = undefined;
      getDatasetId();
    };

    const selectChange = (data: any) => {
      const selectArray = [];
      for (let index = 0; index < data.length; index++) {
        selectArray.push(state.list[state.list.findIndex((value: any) => value.id === data[index])]);
      }
      // console.log(selectArray);
      emit('selectChange', selectArray);
      // emit('selectChange', state.list[state.list.findIndex((value: any) => value.id === id)]);
    };

    const reset = () => {
      emit('selectChange', []);
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
  width: 230px;
  margin-right: 10px;
}
</style>
