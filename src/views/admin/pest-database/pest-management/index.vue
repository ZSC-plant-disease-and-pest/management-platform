<template>
  <Search :searchList="searchList" @search="search" @reset="reset" />
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    :loading="loading"
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
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import { pestHttp, pestParams } from '@/api/pest';
import {
  defineComponent,
  reactive,
  onBeforeMount,
  ref,
  toRefs,
  onUpdated
} from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default defineComponent({
  components: { Table, Search, Pagenum },
  setup () {
    // 使用路由
    const router = useRouter();
    // 渲染前
    onBeforeMount(() => {
      getDataset();
    });
    // 发生更新时
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (router.currentRoute.value.params.type === 'refresh') {
        // 是的话则重新请求数据
        router.currentRoute.value.params.type = '';
        getDataset();
      }
    });
    // 是否加载
    const loading = ref(false);
    // 表格信息的总数
    const total = ref(null);
    // 表格的页数
    const page = ref(1);
    // 表格每页的信息大小
    const size = ref(10);
    // 数据集参数
    const pestParams = reactive({
      page: 0,
      size: 10
    } as pestParams);
    // 请求数据集
    const getDataset = () => {
      loading.value = true;
      pestHttp.searchPest(pestParams)
        .then((response: any) => {
          console.log(response);
          // 将表格的总数赋值
          total.value = response.totalElements;
          // 将表格的大小赋值
          size.value = response.size;
          // 响应式的添加到表格中
          state.tableData = [];
          for (let i = 0; i < response.content.length; i++) {
            state.tableData.push(response.content[i]);
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };
    // 方便内部数据响应式的改变
    const state = reactive({
      tableData: [] as Array<any>
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
        label: '名称',
        width: 'auto'
      }
    ]);
    // 排序
    const sortChange = (params: any) => {
      if (params.prop === null) {
        // 无规则
        pestParams.sort = '';
      } else {
        // 排序规则
        pestParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getDataset();
    };
    // 新增
    const add = (data: any) => {
      console.log(data);
      router.push({
        path: router.currentRoute.value.path + '/add',
        name: 'pestManagementAdd'
      });
    };
    // 删除
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        // 提示请选择需要删除的内容
        ElMessage.warning('请选择需要删除的内容');
      } else {
        loading.value = true;
        pestHttp.deletePest(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getDataset();
          })
          .finally(() => {
            loading.value = false;
          });
      }
    };
    // 编辑
    const edit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/update',
        name: 'pestManagementUpdate',
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
          pestParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getDataset();
    };
    // 重置搜索框
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        pestParams.name = undefined;
      }
    };
    // 搜索框信息
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '名称',
        value: ''
      }
    ]);
    // 表格每页信息大小改变
    const handleSizeChange = (newSize: any) => {
      pestParams.size = newSize;
      pestParams.page = 0;
      size.value = newSize;
      page.value = 1;
      getDataset();
    };
    // 表格页数改变
    const handleCurrentChange = (newPage: any) => {
      pestParams.page = newPage;
      page.value = newPage + 1;
      getDataset();
    };
    // 导出
    return {
      loading,
      total,
      page,
      size,
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
