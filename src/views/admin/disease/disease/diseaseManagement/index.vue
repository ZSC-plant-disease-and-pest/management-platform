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
import { diseaseHttp, diseaseParams } from '@/api/disease';
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
      getDisease();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        getDisease();
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
        label: '病害名称',
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
        placeholder: '病害名称',
        value: ''
      }
    ]);

    const diseaseParams = reactive({
      page: 0,
      size: 10
    } as diseaseParams);
    const getDisease = () => {
      state.isLoading = true;
      diseaseHttp.searchDisease(diseaseParams)
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
        diseaseParams.sort = '';
      } else {
        diseaseParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getDisease();
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
        diseaseHttp.deleteDisease(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getDisease();
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
      window.open(`http://localhost:8082/disease/detail/${data.id}`, '_blank');
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          diseaseParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getDisease();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        diseaseParams.name = undefined;
      }
      getDisease();
    };
    const handleSizeChange = (newSize: any) => {
      diseaseParams.size = newSize;
      diseaseParams.page = 0;
      state.size = newSize;
      state.page = 1;
      getDisease();
    };
    const handleCurrentChange = (newPage: any) => {
      diseaseParams.page = newPage;
      state.page = newPage + 1;
      getDisease();
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
