<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <template #header>
          <span>
            科类管理
          </span>
        </template>
        <Search
          :searchList="familySearchList"
          @search="familySearch"
          @reset="familyReset"
        />
        <Table
          :tableData="familyTableData"
          :tableColumn="familyTableColumn"
          :loading="familyIsLoading"
          :rowId="familyRowId"
          @check="familyCheck"
          @edit="familyEdit"
          @remove="familyRemove"
          @add="familyAdd"
          @sortChange="familySortChange"
        />
        <Pagenum
          :total="familyTotal"
          :currentPage="familyPage"
          :pageSize="familySize"
          :pageSizes="[9, 20, 50, 100]"
          @handleSizeChange="familyHandleSizeChange"
          @handleCurrentChange="familyHandleCurrentChange"
        />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          <span>
            属类管理 ( {{ currentFamily }} )
          </span>
        </template>
        <Search
          :searchList="genusSearchList"
          @search="genusSearch"
          @reset="genusReset"
        />
        <Table
          :tableData="genusTableData"
          :tableColumn="genusTableColumn"
          :loading="genusIsLoading"
          @check="genusCheck"
          @edit="genusEdit"
          @remove="genusRemove"
          @add="genusAdd"
          @sortChange="genusSortChange"
        />
        <Pagenum
          :total="genusTotal"
          :currentPage="genusPage"
          :pageSize="genusSize"
          :pageSizes="[9, 20, 50, 100]"
          @handleSizeChange="genusHandleSizeChange"
          @handleCurrentChange="genusHandleCurrentChange"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  onUpdated,
  onBeforeMount,
  defineComponent,
  computed
} from 'vue';
import { familyHttp, familyParams } from '@/api/family';
import { genusHttp, genusParams } from '@/api/genus';
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
      getFamily();
      getGenus();
    });
    onUpdated(() => {
      // 判断是否从添加界面返回
      if (route.params.type === 'refresh') {
        // 是的话则重新请求数据
        route.params.type = '';
        getFamily();
        getGenus();
      }
    });

    const familyState = reactive({
      familyTableData: [] as Array<any>,
      familyIsLoading: false,
      familyTotal: 0,
      familyPage: 1,
      familySize: 9,
      familyRowId: undefined
    });
    const genusState = reactive({
      genusTableData: [] as Array<any>,
      genusIsLoading: false,
      genusTotal: 0,
      genusPage: 1,
      genusSize: 9
    });
    const familyTableColumn = reactive([
      {
        prop: 'id',
        label: 'ID',
        width: '75px'
      },
      {
        prop: 'name',
        label: '科类名称',
        width: 'auto'
      }
    ]);
    const genusTableColumn = reactive([
      {
        prop: 'id',
        label: 'ID',
        width: '75px'
      },
      {
        prop: 'name',
        label: '属类名称',
        width: 'auto'
      },
      {
        prop: 'family',
        label: '所属科类',
        width: 'auto'
      }
    ]);
    const familySearchList = reactive([
      {
        name: 'name',
        placeholder: '科类名称',
        value: ''
      }
    ]);
    const genusSearchList = reactive([
      {
        name: 'name',
        placeholder: '属类名称',
        value: ''
      }
    ]);

    const familyParams = reactive({
      page: 0,
      size: 9
    } as familyParams);
    const genusParams = reactive({
      page: 0,
      size: 9
    } as genusParams);
    const getFamily = () => {
      familyState.familyIsLoading = true;
      familyHttp.searchFamily(familyParams)
        .then((response: any) => {
          familyState.familyTotal = response.totalElements;
          familyState.familySize = response.size;
          // 响应式的添加到表格中
          familyState.familyTableData = [];
          for (let i = 0; i < response.content.length; i++) {
            familyState.familyTableData.push(response.content[i]);
          }
        })
        .finally(() => {
          familyState.familyIsLoading = false;
        });
    };
    const getGenus = () => {
      genusState.genusIsLoading = true;
      genusHttp.searchGenus(genusParams)
        .then((response: any) => {
          genusState.genusTotal = response.totalElements;
          genusState.genusSize = response.size;
          // 响应式的添加到表格中
          genusState.genusTableData = [];
          for (let i = 0; i < response.content.length; i++) {
            genusState.genusTableData.push(response.content[i]);
          }
        })
        .finally(() => {
          genusState.genusIsLoading = false;
        });
    };
    const currentFamily = computed(() => {
      if (genusParams.family === undefined) {
        return '全部科类';
      } else {
        return genusParams.family + '类';
      }
    });
    const familySortChange = (params: any) => {
      if (params.prop === null) {
        familyParams.sort = '';
      } else {
        familyParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getFamily();
    };
    const genusSortChange = (params: any) => {
      if (params.prop === null) {
        genusParams.sort = '';
      } else {
        genusParams.sort = params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      }
      getGenus();
    };
    const familyAdd = () => {
      router.push({
        path: router.currentRoute.value.path + '/family/add',
        name: 'familyManagementFamilyAdd'
      });
    };
    const genusAdd = () => {
      router.push({
        path: router.currentRoute.value.path + '/genus/add',
        name: 'familyManagementGenusAdd'
      });
    };
    const familyRemove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        familyState.familyIsLoading = true;
        familyHttp.deleteFamily(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getFamily();
            getGenus();
          })
          .finally(() => {
            familyState.familyIsLoading = false;
          });
      }
    };
    const genusRemove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        genusState.genusIsLoading = true;
        genusHttp.deleteGenus(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getGenus();
          })
          .finally(() => {
            genusState.genusIsLoading = false;
          });
      }
    };
    const familyEdit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/family/update',
        name: 'familyManagementFamilyUpdate',
        params: data
      });
    };
    const genusEdit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/genus/update',
        name: 'familyManagementGenusUpdate',
        params: data
      });
    };
    const familyCheck = (data: any) => {
      genusParams.family = data.name;
      familyState.familyRowId = data.id;
      getGenus();
    };
    const genusCheck = (data: any) => {
      console.log(data);
    };
    const familySearch = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          familyParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getFamily();
    };
    const genusSearch = (data: any) => {
      for (const index in data) {
        if (data[index].name === 'name') {
          genusParams.name = data[index].value === '' ? undefined : data[index].value;
        }
      }
      getGenus();
    };
    const familyReset = () => {
      for (const index in familySearchList) {
        familySearchList[index].value = '';
        familyParams.name = undefined;
      }
      getFamily();
    };
    const genusReset = () => {
      for (const index in genusSearchList) {
        genusSearchList[index].value = '';
        genusParams.name = undefined;
        genusParams.family = undefined;
      }
      familyState.familyRowId = undefined;
      getGenus();
    };
    const familyHandleSizeChange = (newSize: any) => {
      familyParams.size = newSize;
      familyParams.page = 0;
      familyState.familySize = newSize;
      familyState.familyPage = 1;
      getFamily();
    };
    const genusHandleSizeChange = (newSize: any) => {
      genusParams.size = newSize;
      genusParams.page = 0;
      genusState.genusSize = newSize;
      genusState.genusPage = 1;
      getGenus();
    };
    const familyHandleCurrentChange = (newPage: any) => {
      familyParams.page = newPage;
      familyState.familyPage = newPage + 1;
      getFamily();
    };
    const genusHandleCurrentChange = (newPage: any) => {
      genusParams.page = newPage;
      genusState.genusPage = newPage + 1;
      getGenus();
    };

    return {
      ...toRefs(familyState),
      ...toRefs(genusState),
      currentFamily,
      familyTableColumn,
      genusTableColumn,
      familySortChange,
      genusSortChange,
      familyAdd,
      genusAdd,
      familyRemove,
      genusRemove,
      familyEdit,
      genusEdit,
      familyCheck,
      genusCheck,
      familySearch,
      genusSearch,
      familyReset,
      genusReset,
      familySearchList,
      genusSearchList,
      familyHandleSizeChange,
      genusHandleSizeChange,
      familyHandleCurrentChange,
      genusHandleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
