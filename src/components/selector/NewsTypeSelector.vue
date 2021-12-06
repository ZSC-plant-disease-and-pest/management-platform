<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
    :loading="isLoading"
    :remote-method="remoteMethod"
    @change="selectChange"
    remote
    filterable
    size="small"
    class="select"
    placeholder="请选择"
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :value="item.id"
      :label="item.name"
    />
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      small
      layout="prev, pager, next"
      style="margin-top: 8px"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue';
import { newsTypeHttp, newsTypeParams } from '@/api/newsType';

export default defineComponent({
  props: {
    newsTypeId: {
      type: Number,
      default: undefined
    }
  },
  emits: ['selectChange'],
  setup (props, { emit }) {
    onBeforeMount(() => {
      getNews();
    });

    const state = reactive({
      value: undefined as number | undefined,
      isLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      list: [] as Array<any>
    });

    const newsTypeParams = reactive({ name: '', page: 0, size: 5 } as newsTypeParams);
    const getNews = () => {
      state.isLoading = true;
      newsTypeHttp.getNewsType(newsTypeParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.list = [];
          for (let i = 0; i < response.content.length; i++) {
            state.list.push({ id: response.content[i].id, name: response.content[i].name });
          }
        })
        .finally(() => { state.isLoading = false; });
    };

    const remoteMethod = (data: any) => {
      newsTypeParams.name = data;
      getNews();
    };

    const handleCurrentChange = (params: any) => {
      state.currentPage = params;
      newsTypeParams.page = params - 1;
      getNews();
    };

    const selectChange = (params: any) => {
      emit('selectChange', params);
    };

    const reset = () => {
      emit('selectChange', undefined);
    };

    const selectNewsType = (params: any) => {
      emit('selectChange', params);
    };

    const setNewsType = (id: number) => {
      state.value = id;
    };

    return {
      ...toRefs(state),
      remoteMethod,
      handleCurrentChange,
      selectChange,
      reset,
      selectNewsType,
      setNewsType
    };
  }
});
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
