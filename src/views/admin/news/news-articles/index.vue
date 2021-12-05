<template>
  <el-row :gutter="0">
    <NewsTypeTable
      :tableDataList="newsTypeTableDataList"
      :tableColumnList="newsTypeTableColumnList"
      :loading="newsTypeIsLoading"
      @rowSelect="newsTypeRowSelect"
      style="width: 180px; margin-right: 10px;"
    />
    <div style="width: calc(100% - 190px);">
      <BasicSearch
        :searchList="searchList"
        @topButtonClick="topButtonClick"
      />
      <BasicTable
        :tableDataList="tableDataList"
        :tableColumnList="tableColumnList"
        :topButtonList="topButtonList"
        :tableButtonList="tableButtonList"
        :isLoading="isLoading"
        @topButtonClick="topButtonClick"
        @tableButtonClick="tableButtonClick"
        @sortChange="sortChange"
      />
      <BasicPage
        :pageList="pageList"
        @handleChange="handleChange"
      />
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, reactive, toRefs } from 'vue';
import { newsHttp, newsParams } from '@/api/news';
import { newsTypeHttp } from '@/api/newsType';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { searchList, topButtonList, tableButtonList, tableColumnList, pageList, newsTypeTableColumnList } from './data';
import BasicTable from '@/components/common/BasicTable/index.vue';
import BasicSearch from '@/components/common/BasicSearch/index.vue';
import BasicPage from '@/components/common/BasicPage/index.vue';
import NewsTypeTable from './components/NewsTypeTable/index.vue';

export default defineComponent({
  components: { BasicTable, BasicSearch, BasicPage, NewsTypeTable },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      getNews();
      getNewsType();
    });
    onUpdated(() => {
      if (route.params.type === 'refresh') {
        route.params.type = '';
        getNews();
        getNewsType();
      }
    });

    // 数据仓库
    const state = reactive({
      tableDataList: [] as Array<any>,
      searchList,
      topButtonList,
      tableButtonList,
      tableColumnList,
      pageList,
      isLoading: false,
      newsTypeTableDataList: [] as Array<any>,
      newsTypeTableColumnList,
      newsTypeIsLoading: false
    });

    const newsParams = reactive({ page: 0, size: 10 } as newsParams);
    const getNews = () => {
      state.isLoading = true;
      newsHttp.getNews(newsParams)
        .then((response: any) => {
          state.pageList.total = response.totalElements;
          state.pageList.size = response.size;
          state.tableDataList = [];
          for (let i = 0; i < response.content.length; i++) {
            state.tableDataList.push(response.content[i]);
          }
        })
        .finally(() => { state.isLoading = false; });
    };

    const deleteNews = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        newsHttp.deleteNews(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getNews();
          })
          .finally(() => { state.isLoading = false; });
      }
    };

    const getNewsType = () => {
      state.newsTypeIsLoading = true;
      newsTypeHttp.getNewsType(null)
        .then((response: any) => {
          state.newsTypeTableDataList.splice(0, state.newsTypeTableDataList.length, { id: 0, name: '全部' });
          for (let i = 0; i < response.content.length; i++) {
            state.newsTypeTableDataList.push(response.content[i]);
          }
        })
        .finally(() => { state.newsTypeIsLoading = false; });
    };

    // 头部按键
    const topButtonClick = (name: string, data: any) => {
      if (name === 'search') {
        for (const index in data) {
          if (data[index].name === 'title') {
            newsParams.title = data[index].value === '' ? undefined : data[index].value;
          } else if (data[index].name === 'author') {
            newsParams.author = data[index].value === '' ? undefined : data[index].value;
          }
        }
        getNews();
      } else if (name === 'reset') {
        for (const index in state.searchList) {
          state.searchList[index].value = '';
          newsParams.title = undefined;
          newsParams.author = undefined;
        }
        getNews();
      } else if (name === 'add') {
        router.push({ path: route.path + '-page', name: route.name as string + '-page', params: { id: '0' } });
      } else if (name === 'delete') {
        deleteNews(data);
      }
    };

    // 表格按键
    const tableButtonClick = (name: string, data: any) => {
      if (name === 'view') {
        window.open(`http://localhost:8082/news/detail/${data.id}`, '_blank');
      } else if (name === 'edit') {
        router.push({ path: route.path + '-page', name: route.name as string + '-page', params: { id: data.id } });
      }
    };

    // 排序改变
    const sortChange = (params: any) => {
      newsParams.sort = params.prop === null ? '' : params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      getNews();
    };

    // 分页改变
    const handleChange = (name: string, data: any) => {
      if (name === 'page') {
        newsParams.page = data - 1;
        state.pageList.page = data;
      } else if (name === 'size') {
        newsParams.size = data;
        newsParams.page = 0;
        state.pageList.size = data;
        state.pageList.page = 1;
      }
      getNews();
    };

    // 新闻类型选择
    const newsTypeRowSelect = (newsTypeId: number) => {
      newsParams.newTypeId = newsTypeId === 0 ? undefined : newsTypeId;
      getNews();
    };

    return {
      ...toRefs(state),
      topButtonClick,
      tableButtonClick,
      sortChange,
      deleteNews,
      handleChange,
      newsTypeRowSelect
    };
  }
});
</script>

<style lang="scss" scoped></style>
