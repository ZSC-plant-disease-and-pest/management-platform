<template>
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
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, reactive, toRefs } from 'vue';
import { newsHttp, newsParams } from '@/api/news';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';

export default defineComponent({
  components: {
    Table,
    Search,
    Pagenum
  },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      searchNews();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        searchNews();
      }
    });

    const state = reactive({
      tableData: [] as Array<any>,
      isLoading: false,
      total: 0,
      page: 1,
      size: 10
    });
    const tableColumn = reactive([
      {
        prop: 'id',
        label: 'ID',
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
        prop: 'newTypeId',
        label: '新闻标签',
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

    const newsParams = reactive({
      page: 0,
      size: 10
    } as newsParams);
    const searchNews = () => {
      state.isLoading = true;
      newsHttp.searchNews(newsParams)
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
      console.log(data);
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
