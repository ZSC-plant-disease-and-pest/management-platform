<template>
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
    :tableButtonWidth="72"
    @topButtonClick="topButtonClick"
    @tableButtonClick="tableButtonClick"
    @sortChange="sortChange"
  />
  <BasicPage
    :pageList="pageList"
    @handleChange="handleChange"
  />
  <DataPageDialog
    ref="dataPageDialogRef"
    @refreshTable="refreshTable"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { newsTypeHttp, newsTypeParams } from '@/api/newsType';
import { ElMessage } from 'element-plus';
import { searchList, topButtonList, tableButtonList, tableColumnList, pageList } from './data';
import BasicTable from '@/components/common/BasicTable/index.vue';
import BasicSearch from '@/components/common/BasicSearch/index.vue';
import BasicPage from '@/components/common/BasicPage/index.vue';
import DataPageDialog from './components/DataPageDialog.vue';

export default defineComponent({
  components: { BasicTable, BasicSearch, BasicPage, DataPageDialog },
  setup () {
    onBeforeMount(() => {
      getNewsType();
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
      dataPageDialogRef: ref()
    });

    // 请求表单数据
    const newsTypeParams = reactive({ page: 0, size: 10 } as newsTypeParams);
    const getNewsType = () => {
      state.isLoading = true;
      newsTypeHttp.getNewsType(newsTypeParams)
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

    // 删除
    const deleteNewsType = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        newsTypeHttp.deleteNewsType(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getNewsType();
          })
          .finally(() => { state.isLoading = false; });
      }
    };

    // 头部按键
    const topButtonClick = (name: string, data: any) => {
      if (name === 'search') {
        for (const index in data) {
          if (data[index].name === 'name') {
            newsTypeParams.name = data[index].value === '' ? undefined : data[index].value;
          }
        }
        getNewsType();
      } else if (name === 'reset') {
        for (const index in state.searchList) {
          state.searchList[index].value = '';
          newsTypeParams.name = undefined;
        }
        getNewsType();
      } else if (name === 'add') {
        state.dataPageDialogRef.openDialog('new');
      } else if (name === 'delete') {
        deleteNewsType(data);
      }
    };

    // 表格按键
    const tableButtonClick = (name: string, data: any) => {
      if (name === 'view') {
        window.open(`http://localhost:8082/newsType/detail/${data.id}`, '_blank');
      } else if (name === 'edit') {
        state.dataPageDialogRef.openDialog('edit', data);
      }
    };

    // 排序改变
    const sortChange = (params: any) => {
      newsTypeParams.sort = params.prop === null ? '' : params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      getNewsType();
    };

    // 分页改变
    const handleChange = (name: string, data: any) => {
      if (name === 'page') {
        newsTypeParams.page = data - 1;
        state.pageList.page = data;
      } else if (name === 'size') {
        newsTypeParams.size = data;
        newsTypeParams.page = 0;
        state.pageList.size = data;
        state.pageList.page = 1;
      }
      getNewsType();
    };

    // 刷新
    const refreshTable = () => {
      getNewsType();
    };

    return {
      ...toRefs(state),
      topButtonClick,
      tableButtonClick,
      sortChange,
      deleteNewsType,
      handleChange,
      refreshTable
    };
  }
});
</script>

<style lang="scss" scoped></style>
