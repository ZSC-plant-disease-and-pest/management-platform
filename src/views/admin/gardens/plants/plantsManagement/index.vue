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
import { plantsHttp, plantsParams } from '@/api/plants';
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
      getPlants();
    });
    // 发生更新时
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        getPlants();
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
        label: '植物名称',
        width: 'auto'
      },
      {
        prop: 'scientificName',
        label: '植物学名',
        width: 'auto'
      },
      {
        prop: 'nickname',
        label: '植物别名',
        width: 'auto'
      },
      {
        prop: 'family',
        label: '植物科类',
        width: 'auto'
      },
      {
        prop: 'genus',
        label: '植物属类',
        width: 'auto'
      }
    ]);
    // 搜索框信息
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '植物名称',
        value: ''
      }
    ]);
    // 请求参数
    const plantsParams = reactive({
      page: 0,
      size: 10
    } as plantsParams);

    // 请求数据集
    const getPlants = () => {
      state.isLoading = true;
      plantsHttp.searchPlants(plantsParams)
        .then((response: any) => {
          console.log(response);
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
        plantsParams.sort = '';
      } else {
        plantsParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getPlants();
    };
    // 新增
    const add = (data: any) => {
      console.log(data);
      router.push({
        path: router.currentRoute.value.path + '/add',
        name: 'plantsManagementAdd'
      });
    };
    // 删除
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        plantsHttp.deletePlants(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getPlants();
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    // 编辑
    const edit = (data: any) => {
      data.plantsClassify = JSON.stringify(data.plantsClassify);
      router.push({
        path: router.currentRoute.value.path + '/update',
        name: 'plantsManagementUpdate',
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
          plantsParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getPlants();
    };
    // 重置搜索框
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        plantsParams.name = undefined;
      }
      getPlants();
    };
    // 表格每页信息大小改变
    const handleSizeChange = (newSize: any) => {
      plantsParams.size = newSize;
      plantsParams.page = 0;
      state.size = newSize;
      state.page = 1;
      getPlants();
    };
    // 表格页数改变
    const handleCurrentChange = (newPage: any) => {
      plantsParams.page = newPage;
      state.page = newPage + 1;
      getPlants();
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
