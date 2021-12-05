<template>
  <el-row :gutter="0">
    <NewsTypeTable
      :tableData="newsTypeTableData"
      :tableColumn="newsTypeTableColumn"
      :loading="newsTypeIsLoading"
      @rowSelect="newsTypeSelect"
      style="width: 180px"
    />
    <div style="width: calc(100% - 190px); margin-left: 10px;">
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
        @sortChange="sortChange"
      />
      <Pagenum
        :total="total"
        :currentPage="page"
        :pageSize="size"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </el-row>
  <NewsDetail ref="newsDetailRef" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, reactive, ref, toRefs } from 'vue';
import { newsHttp, newsParams } from '@/api/news';
import { newsTypeHttp } from '@/api/newsType';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import NewsTypeTable from './components/NewsTypeTable.vue';
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import NewsDetail from './components/NewsDetail.vue';

export default defineComponent({
  components: {
    NewsTypeTable,
    Table,
    Search,
    Pagenum,
    NewsDetail
  },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      searchNews();
      searchNewsType();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        searchNews();
        searchNewsType();
      }
    });

    const state = reactive({
      tableData: [] as Array<any>,
      newsTypeTableData: [] as Array<any>,
      newsDetailRef: ref(),
      isLoading: false,
      newsTypeIsLoading: false,
      total: 0,
      page: 1,
      size: 10
    });
    const tableColumn = reactive([
      {
        prop: 'id',
        label: '序号',
        width: '75px'
      },
      {
        prop: 'title',
        label: '新闻标题',
        width: 'auto'
      },
      {
        prop: 'author',
        label: '新闻作者',
        width: 'auto'
      },
      {
        prop: 'newTypeName',
        label: '新闻类型',
        width: 'auto'
      }
    ]);
    const searchList = reactive([
      {
        name: 'title',
        placeholder: '新闻标题',
        value: ''
      },
      {
        name: 'author',
        placeholder: '新闻作者',
        value: ''
      }
    ]);
    const newsTypeTableColumn = reactive([
      {
        prop: 'name',
        label: '新闻类型',
        width: 'auto'
      }
    ]);

    const newsParams = reactive({
      page: 0,
      size: 10
    } as newsParams);
    const searchNews = () => {
      state.isLoading = true;
      newsHttp.getNews(newsParams)
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
    const searchNewsType = () => {
      state.newsTypeIsLoading = true;
      newsTypeHttp.getNewsType(null)
        .then((response: any) => {
          console.log(response);
          // 响应式的添加到表格中
          state.newsTypeTableData = [];
          state.newsTypeTableData.push({ id: 0, name: '全部' });
          for (let i = 0; i < response.content.length; i++) {
            state.newsTypeTableData.push(response.content[i]);
          }
        })
        .finally(() => {
          state.newsTypeIsLoading = false;
        });
    };
    const newsTypeSelect = (newsTypeId: number) => {
      if (newsTypeId === 0) {
        newsParams.newTypeId = undefined;
      } else {
        newsParams.newTypeId = newsTypeId;
      }
      searchNews();
    };
    const sortChange = (params: any) => {
      if (params.prop === null) {
        newsParams.sort = '';
      } else {
        newsParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      searchNews();
    };
    const add = () => {
      router.push({
        path: route.path + '/add',
        name: route.name as string + 'Add'
      });
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        newsHttp.deleteNews(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            searchNews();
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const edit = (data: any) => {
      router.push({
        path: route.path + '/update',
        name: route.name as string + 'Update',
        params: data
      });
    };
    const check = (data: any) => {
      state.newsDetailRef.openDialog(data);
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'title') {
          newsParams.title = data[index].value === '' ? undefined : data[index].value;
        } else if (data[index].name === 'author') {
          newsParams.author = data[index].value === '' ? undefined : data[index].value;
        } else if (data[index].name === 'newTypeId') {
          newsParams.newTypeId = data[index].value === '' ? undefined : data[index].value;
        }
      }
      searchNews();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        newsParams.title = undefined;
        newsParams.author = undefined;
      }
      searchNews();
    };
    const handleSizeChange = (newSize: any) => {
      newsParams.size = newSize;
      newsParams.page = 0;
      state.size = newSize;
      state.page = 1;
      searchNews();
    };
    const handleCurrentChange = (newPage: any) => {
      newsParams.page = newPage;
      state.page = newPage + 1;
      searchNews();
    };

    return {
      ...toRefs(state),
      tableColumn,
      newsTypeTableColumn,
      newsTypeSelect,
      sortChange,
      add,
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
