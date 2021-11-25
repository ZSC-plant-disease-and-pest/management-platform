<template>
  <el-select
    class="select"
    size="small"
    @change="selectChange"
    :loading="isLoading"
    placeholder="请选择需要创建的数据集"
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
import { diseaseHttp } from '@/api/disease';
import { pestHttp } from '@/api/pest';
import { plantsHttp } from '@/api/plants';

export default defineComponent({
  props: {
    defaultId: {
      type: Number,
      default: 0
    },
    type: {
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
        diseaseHttp.getDisease(datasetParams)
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
      } else if (props.type === 'pest') {
        pestHttp.searchPest(datasetParams)
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
      } else if (props.type === 'plants') {
        plantsHttp.searchPlants(datasetParams)
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
    const remoteMethod = (data: any) => {
      datasetParams.name = data;
      getDatasetId();
    };
    const handleCurrentChange = (params: any) => {
      state.currentPage = params;
      datasetParams.page = params - 1;
      getDatasetId();
    };
    const selectChange = (params: any) => {
      emit('selectChange', params);
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
