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
    :tableButtonWidth="157"
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
import { userHttp, userParams } from '@/api/user';
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
      getUser();
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
    const userParams = reactive({ page: 0, size: 10 } as userParams);
    const getUser = () => {
      state.isLoading = true;
      userHttp.getUser(userParams)
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
    const deleteUser = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        userHttp.getUser(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getUser();
          })
          .finally(() => { state.isLoading = false; });
      }
    };

    // 头部按键
    const topButtonClick = (name: string, data: any) => {
      if (name === 'search') {
        for (const index in data) {
          if (data[index].name === 'name') {
            userParams.name = data[index].value === '' ? undefined : data[index].value;
          }
        }
        getUser();
      } else if (name === 'reset') {
        for (const index in state.searchList) {
          state.searchList[index].value = '';
          userParams.name = undefined;
        }
        getUser();
      } else if (name === 'add') {
        state.dataPageDialogRef.openDialog();
      } else if (name === 'delete') {
        deleteUser(data);
      }
    };

    // 表格按键
    const tableButtonClick = (name: string, data: any) => {
      console.log(data);
      if (name === 'edit') {
        // 打开编辑框
      } else if (name === 'change') {
        // 打开修改密码框
      }
    };

    // 排序改变
    const sortChange = (params: any) => {
      userParams.sort = params.prop === null ? '' : params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      getUser();
    };

    // 分页改变
    const handleChange = (name: string, data: any) => {
      if (name === 'page') {
        userParams.page = data - 1;
        state.pageList.page = data;
      } else if (name === 'size') {
        userParams.size = data;
        userParams.page = 0;
        state.pageList.size = data;
        state.pageList.page = 1;
      }
      getUser();
    };

    // 刷新
    const refreshTable = () => {
      getUser();
    };

    return {
      ...toRefs(state),
      topButtonClick,
      tableButtonClick,
      sortChange,
      deleteUser,
      handleChange,
      refreshTable
    };
  }
});
</script>

<style lang="scss" scoped></style>
