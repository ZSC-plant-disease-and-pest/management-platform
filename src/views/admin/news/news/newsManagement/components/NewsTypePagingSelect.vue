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
import { defineComponent, onBeforeMount, onMounted, reactive, toRefs } from 'vue';
import { newsTypeHttp, newsTypeParams } from '@/api/newsType';

export default defineComponent({
  emits: ['selectChange'],
  props: {
    newsTypeId: {
      type: Number,
      default: -1
    }
  },
  setup (props, { emit }) {
    onBeforeMount(() => {
      getNews();
    });
    onMounted(() => {
      if (props.newsTypeId !== -1) {
        state.defaultValue = props.newsTypeId;
      }
    });

    const state = reactive({
      defaultValue: '' as any,
      isLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      list: [] as Array<any>
    });

    const newsTypeParams = reactive({
      name: '',
      page: 0,
      size: 5
    } as newsTypeParams);
    const getNews = () => {
      state.isLoading = true;
      newsTypeHttp.searchNewsType(newsTypeParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.list = [];
          for (let i = 0; i < response.content.length; i++) {
            state.list.push({ id: response.content[i].id, name: response.content[i].name });
          }
        })
        .finally(() => {
          state.isLoading = false;
        });
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
      state.defaultValue = params;
    };
    const reset = () => {
      state.defaultValue = '';
    };
    const selectNewsType = (params: any) => {
      emit('selectChange', params);
      state.defaultValue = params;
    };
    const setNewsType = (id: number) => {
      state.defaultValue = id;
      newsTypeHttp.searchNewsTypeById(id)
        .then((response: any) => {
          console.log(response);
        });
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
