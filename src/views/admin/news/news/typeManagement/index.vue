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
  <NewsTypeDialog ref="newsTypeDialogRef" @refreshTable="refreshTable" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, reactive, ref, toRefs } from 'vue';
import { newsTypeHttp, newsTypeParams } from '@/api/newsType';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import NewsTypeDialog from '@/components/pages/newsType/Dialog.vue';

export default defineComponent({
  components: {
    Table,
    Search,
    Pagenum,
    NewsTypeDialog
  },
  setup () {
    const route = useRoute();
    onBeforeMount(() => {
      searchNewsType();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        searchNewsType();
      }
    });

    const state = reactive({
      tableData: [] as Array<any>,
      isLoading: false,
      total: 0,
      page: 1,
      size: 10,
      newsTypeDialogRef: ref()
    });
    const tableColumn = reactive([
      {
        prop: 'id',
        label: '序号',
        width: '75px'
      },
      {
        prop: 'name',
        label: '新闻类型名称',
        width: 'auto'
      }
    ]);
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '新闻类型名称',
        value: ''
      }
    ]);

    const newsTypeParams = reactive({
      page: 0,
      size: 10
    } as newsTypeParams);
    const searchNewsType = () => {
      state.isLoading = true;
      newsTypeHttp.searchNewsType(newsTypeParams)
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
        newsTypeParams.sort = '';
      } else {
        newsTypeParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      searchNewsType();
    };
    const add = () => {
      state.newsTypeDialogRef.openDialog('add');
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        newsTypeHttp.deleteNewsType(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            searchNewsType();
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const edit = (data: any) => {
      state.newsTypeDialogRef.openDialog('edit', data);
    };
    const check = (data: any) => {
      console.log(data);
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          newsTypeParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      searchNewsType();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        newsTypeParams.name = undefined;
      }
      searchNewsType();
    };
    const handleSizeChange = (newSize: any) => {
      newsTypeParams.size = newSize;
      newsTypeParams.page = 0;
      state.size = newSize;
      state.page = 1;
      searchNewsType();
    };
    const handleCurrentChange = (newPage: any) => {
      newsTypeParams.page = newPage;
      state.page = newPage + 1;
      searchNewsType();
    };
    const refreshTable = () => {
      searchNewsType();
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
      handleCurrentChange,
      refreshTable
    };
  }
});
</script>

<style lang="scss" scoped></style>
