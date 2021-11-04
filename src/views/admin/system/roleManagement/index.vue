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
    @edit="edit"
    @remove="remove"
    @add="add"
    @change="change"
    @sortChange="sortChange"
  />
  <Pagenum
    :total="total"
    :currentPage="page"
    :pageSize="size"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  />
  <RoleDialog ref="roleDialogRef" :key="dialogKey" @refreshTable="refreshTable" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, reactive, ref, toRefs } from 'vue';
import { userHttp, userParams } from '@/api/user';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import Table from './components/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import RoleDialog from './components/RoleDialog.vue';

export default defineComponent({
  components: {
    Table,
    Search,
    Pagenum,
    RoleDialog
  },
  setup () {
    const route = useRoute();
    onBeforeMount(() => {
      searchUser();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        searchUser();
      }
    });

    const state = reactive({
      tableData: [] as Array<any>,
      isLoading: false,
      total: 0,
      page: 1,
      size: 10,
      roleDialogRef: ref(),
      dialogKey: 0
    });
    const tableColumn = reactive([
      {
        prop: 'id',
        label: '序号',
        width: '75px'
      },
      {
        prop: 'name',
        label: '用户名',
        width: 'auto'
      },
      {
        prop: 'username',
        label: '登录名',
        width: 'auto'
      },
      {
        prop: 'mobile',
        label: '手机号',
        width: 'auto'
      },
      {
        prop: 'e_mail',
        label: '邮箱',
        width: 'auto'
      }
    ]);
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '用户名',
        value: ''
      }
    ]);

    const userParams = reactive({
      page: 0,
      size: 10
    } as userParams);
    const searchUser = () => {
      state.isLoading = true;
      userHttp.searchUser(userParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.size = response.size;
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
        userParams.sort = '';
      } else {
        userParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      searchUser();
    };
    const add = () => {
      state.roleDialogRef.openDialog('add');
    };
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        userHttp.deleteUser(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            searchUser();
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const edit = (data: any) => {
      state.roleDialogRef.openDialog('edit', data);
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          userParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      searchUser();
    };
    const change = (data: any) => {
      state.roleDialogRef.openDialog('change', data);
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        userParams.name = undefined;
      }
      searchUser();
    };
    const handleSizeChange = (newSize: any) => {
      userParams.size = newSize;
      userParams.page = 0;
      state.size = newSize;
      state.page = 1;
      searchUser();
    };
    const handleCurrentChange = (newPage: any) => {
      userParams.page = newPage;
      state.page = newPage + 1;
      searchUser();
    };
    const refreshTable = () => {
      state.dialogKey += 1;
      searchUser();
    };

    return {
      ...toRefs(state),
      tableColumn,
      sortChange,
      add,
      remove,
      edit,
      search,
      change,
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
