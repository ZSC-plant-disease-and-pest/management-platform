<template>
  <el-select
    @change="selectChange"
    :model-value="defaultValue"
    :loading="isLoading"
    :disabled="family === ''"
    :placeholder="placeholder"
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
import { computed, defineComponent, onBeforeMount, reactive, toRefs, watch } from 'vue';
import { genusHttp, genusParams } from '@/api/genus';

export default defineComponent({
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    family: {
      type: String,
      default: ''
    }
  },
  emits: ['selectChange'],
  setup (props, { emit }) {
    onBeforeMount(() => {
      genusParams.family = props.family;
      state.defaultValue = props.defaultValue;
      getGenus();
    });
    watch(
      () => props.family,
      (newProp) => {
        genusParams.family = newProp;
        selectChange('');
        getGenus();
      }
    );

    const state = reactive({
      defaultValue: '',
      isLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      list: [] as Array<any>
    });

    const placeholder = computed(() => { return props.family === '' ? '请先选择植物科类' : '请选择'; });

    const genusParams = reactive({ family: undefined, page: 0, size: 5 } as genusParams);
    const getGenus = () => {
      state.isLoading = true;
      genusHttp.searchGenus(genusParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.list = [];
          for (let i = 0; i < response.content.length; i++) {
            state.list.push({ value: response.content[i].name });
          }
        })
        .finally(() => { state.isLoading = false; });
    };

    const handleCurrentChange = (params: any) => {
      genusParams.page = params - 1;
      getGenus();
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
      placeholder,
      handleCurrentChange,
      selectChange,
      reset
    };
  }
});
</script>

<style lang="scss" scoped></style>
