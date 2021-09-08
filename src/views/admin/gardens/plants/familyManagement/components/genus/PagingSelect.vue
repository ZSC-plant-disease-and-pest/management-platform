<template>
  <el-select
    @change="selectChange"
    :model-value="defaultValue"
    :loading="isLoading"
    placeholder="请选择"
  >
    <el-option
      v-for="item in list"
      :key="item.value"
      :value="item.value"
    >
      {{ item.value }}
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
import { familyHttp, familyParams } from '@/api/family';

export default defineComponent({
  props: {
    defaultValue: {
      type: String,
      default: ''
    }
  },
  emits: ['selectChange'],
  setup (props, { emit }) {
    onBeforeMount(() => {
      getFamily();
    });

    const state = reactive({
      defaultValue: props.defaultValue,
      isLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      list: [] as Array<any>
    });

    const familyParams = reactive({
      page: 0,
      size: 5
    } as familyParams);
    const getFamily = () => {
      state.isLoading = true;
      familyHttp.searchFamily(familyParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.list = [];
          for (let i = 0; i < response.content.length; i++) {
            state.list.push({ value: response.content[i].name });
          }
        })
        .finally(() => {
          state.isLoading = false;
        });
    };
    const handleCurrentChange = (params: any) => {
      familyParams.page = params - 1;
      getFamily();
    };
    const selectChange = (params: any) => {
      emit('selectChange', params);
      state.defaultValue = params;
    };
    const reset = () => {
      state.defaultValue = '';
    };
    return {
      ...toRefs(state),
      handleCurrentChange,
      selectChange,
      reset
    };
  }
});
</script>

<style lang="scss" scoped></style>
