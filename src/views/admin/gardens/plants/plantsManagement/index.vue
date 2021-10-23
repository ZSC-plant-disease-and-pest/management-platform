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
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        getPlants();
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
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '植物名称',
        value: ''
      }
    ]);

    const plantsParams = reactive({
      page: 0,
      size: 10
    } as plantsParams);
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
    const sortChange = (params: any) => {
      if (params.prop === null) {
        plantsParams.sort = '';
      } else {
        plantsParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getPlants();
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
    const edit = (data: any) => {
      // 利用 JSON 来传输对象内的对象
      data.plantsClassify = JSON.stringify(data.plantsClassify);
      router.push({
        path: route.path + '/update',
        name: route.name as string + 'Update',
        params: data
      });
      console.log(data);
    };
    const check = (data: any) => {
      window.open(`http://localhost:8082/plants/detail/${data.id}`, '_blank');
    };
    const search = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          plantsParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getPlants();
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
        plantsParams.name = undefined;
      }
      getPlants();
    };
    const handleSizeChange = (newSize: any) => {
      plantsParams.size = newSize;
      plantsParams.page = 0;
      state.size = newSize;
      state.page = 1;
      getPlants();
    };
    const handleCurrentChange = (newPage: any) => {
      plantsParams.page = newPage;
      state.page = newPage + 1;
      getPlants();
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
