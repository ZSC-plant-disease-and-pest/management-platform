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
import { pestHttp, pestParams } from '@/api/pest';
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
      getPest();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        getPest();
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
        label: '序号',
        width: '75px'
      },
      {
        prop: 'name',
        label: '虫害名称',
        width: 'auto'
      },
      {
        prop: 'overview',
        label: '植物表现',
        width: 'auto'
      },
      {
        prop: 'damagedParts',
        label: '危害部位',
        width: 'auto'
      }
    ]);
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '虫害名称',
        value: ''
      }
    ]);

    const pestParams = reactive({
      page: 0,
      size: 10
    } as pestParams);
    const getPest = () => {
      state.isLoading = true;
      pestHttp.searchPest(pestParams)
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
        pestParams.sort = '';
      } else {
        pestParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getPest();
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
        pestHttp.deletePest(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getPest();
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
      window.open(`http://localhost:8082/pest/detail/${data.id}`, '_blank');
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          pestParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getPest();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        pestParams.name = undefined;
      }
      getPest();
    };
    const handleSizeChange = (newSize: any) => {
      pestParams.size = newSize;
      pestParams.page = 0;
      state.size = newSize;
      state.page = 1;
      getPest();
    };
    const handleCurrentChange = (newPage: any) => {
      pestParams.page = newPage;
      state.page = newPage + 1;
      getPest();
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
