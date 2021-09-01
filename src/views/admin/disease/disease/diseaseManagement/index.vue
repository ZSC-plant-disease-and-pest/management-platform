<template>
  <Search :searchList="searchList" @search="search" @reset="reset" />
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
import {
  toRefs,
  reactive,
  onUpdated,
  onBeforeMount,
  defineComponent
} from 'vue';
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
    // 发生更新时
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        getDisease();
      }
    });

    // 方便内部数据响应式的改变
    const state = reactive({
      // 表格数据
      tableData: [] as Array<any>,
      // 是否加载中
      isLoading: false,
      // 表格信息的总数
      total: 0,
      // 表格的页数
      page: 1,
      // 表格每页的信息大小
      size: 10
    });
    // 表头信息
    const tableColumn = reactive([
      {
        prop: 'id',
        label: 'ID',
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
    // 搜索框信息
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '病害名称',
        value: ''
      }
    ]);

    // 请求参数
    const diseaseParams = reactive({
      page: 0,
      size: 10
    } as diseaseParams);
    // 请求病害
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
    // 排序
    const sortChange = (params: any) => {
      if (params.prop === null) {
        diseaseParams.sort = '';
      } else {
        diseaseParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getDisease();
    };
    // 新增
    const add = () => {
      router.push({
        path: router.currentRoute.value.path + '/add',
        name: 'diseaseManagementAdd'
      });
    };
    // 删除
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
    // 编辑
    const edit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/update',
        name: 'diseaseManagementUpdate',
        params: data
      });
    };
    // 查看
    const check = (data: any) => {
      console.log(data);
    };
    // 搜索
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          diseaseParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getDisease();
    };
    // 重置搜索框
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        diseaseParams.name = undefined;
      }
      getDisease();
    };
    // 表格每页信息大小改变
    const handleSizeChange = (newSize: any) => {
      diseaseParams.size = newSize;
      diseaseParams.page = 0;
      state.size = newSize;
      state.page = 1;
      getDisease();
    };
    // 表格页数改变
    const handleCurrentChange = (newPage: any) => {
      diseaseParams.page = newPage;
      state.page = newPage + 1;
      getDisease();
    };
    // 导出
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
