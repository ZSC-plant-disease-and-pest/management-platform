<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <template #header>
          <span> 科类管理 </span>
        </template>
        <BasicSearch
          :searchList="familySearchList"
          @topButtonClick="familyTopButtonClick"
        />
        <BasicTable
          :tableDataList="familyTableDataList"
          :tableColumnList="familyTableColumnList"
          :topButtonList="familyTopButtonList"
          :tableButtonList="familyTableButtonList"
          :isLoading="familyIsLoading"
          :tableButtonWidth="216"
          :rowId="familyRowId"
          @topButtonClick="familyTopButtonClick"
          @tableButtonClick="familyTableButtonClick"
          @sortChange="familySortChange"
        />
        <BasicPage
          :pageList="familyPageList"
          :page-sizes="[9, 20, 30, 40, 50, 100]"
          @handleChange="familyHandleChange"
        />
        <FamilyDataPageModel
          ref="familyDataPageModelRef"
          @refreshTable="familyRefreshTable"
        />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          <span> 属类管理 ( {{ currentFamily }} ) </span>
        </template>
        <BasicSearch
          :searchList="genusSearchList"
          @topButtonClick="genusTopButtonClick"
        />
        <BasicTable
          :tableDataList="genusTableDataList"
          :tableColumnList="genusTableColumnList"
          :topButtonList="genusTopButtonList"
          :tableButtonList="genusTableButtonList"
          :isLoading="genusIsLoading"
          @topButtonClick="genusTopButtonClick"
          @tableButtonClick="genusTableButtonClick"
          @sortChange="genusSortChange"
        />
        <BasicPage
          :pageList="genusPageList"
          :page-sizes="[9, 20, 30, 40, 50, 100]"
          @handleChange="genusHandleChange"
        />
        <GenusDataPageModel
          ref="genusDataPageModelRef"
          @refreshTable="genusRefreshTable"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onUpdated, reactive, ref, toRefs } from 'vue';
import { familyHttp, familyParams } from '@/api/family';
import { genusHttp, genusParams } from '@/api/genus';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import {
  familySearchList,
  genusSearchList,
  familyTopButtonList,
  genusTopButtonList,
  familyTableButtonList,
  genusTableButtonList,
  familyTableColumnList,
  genusTableColumnList,
  familyPageList,
  genusPageList
} from './data';
import BasicTable from '@/components/common/BasicTable/index.vue';
import BasicSearch from '@/components/common/BasicSearch/index.vue';
import BasicPage from '@/components/common/BasicPage/index.vue';
import FamilyDataPageModel from './components/FamilyDataPageModel.vue';
import GenusDataPageModel from './components/GenusDataPageModel.vue';

export default defineComponent({
  components: { BasicTable, BasicSearch, BasicPage, FamilyDataPageModel, GenusDataPageModel },
  setup () {
    const route = useRoute();
    onBeforeMount(() => {
      getFamily();
      getGenus();
    });
    onUpdated(() => {
      if (route.params.type === 'refresh') {
        route.params.type = '';
        getFamily();
        getGenus();
      }
    });

    // 数据仓库
    const familyState = reactive({
      familyTableDataList: [] as Array<any>,
      familySearchList,
      familyTopButtonList,
      familyTableButtonList,
      familyTableColumnList,
      familyPageList,
      familyIsLoading: false,
      familyDataPageModelRef: ref(),
      familyRowId: undefined
    });

    const genusState = reactive({
      genusTableDataList: [] as Array<any>,
      genusSearchList,
      genusTopButtonList,
      genusTableButtonList,
      genusTableColumnList,
      genusPageList,
      genusIsLoading: false,
      genusDataPageModelRef: ref()
    });

    // 请求表单数据
    const familyParams = reactive({ page: 0, size: 9 } as familyParams);
    const getFamily = () => {
      familyState.familyIsLoading = true;
      familyHttp.getFamily(familyParams)
        .then((response: any) => {
          familyState.familyPageList.total = response.totalElements;
          familyState.familyPageList.size = response.size;
          familyState.familyTableDataList = [];
          for (let i = 0; i < response.content.length; i++) {
            familyState.familyTableDataList.push(response.content[i]);
          }
        })
        .finally(() => { familyState.familyIsLoading = false; });
    };

    const genusParams = reactive({ page: 0, size: 9 } as genusParams);
    const getGenus = () => {
      genusState.genusIsLoading = true;
      genusHttp.getGenus(genusParams)
        .then((response: any) => {
          genusState.genusPageList.total = response.totalElements;
          genusState.genusPageList.size = response.size;
          genusState.genusTableDataList = [];
          for (let i = 0; i < response.content.length; i++) {
            genusState.genusTableDataList.push(response.content[i]);
          }
        })
        .finally(() => { genusState.genusIsLoading = false; });
    };

    // 删除
    const deleteFamily = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        familyState.familyIsLoading = true;
        familyHttp.deleteFamily(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getFamily();
          })
          .finally(() => { familyState.familyIsLoading = false; });
      }
    };

    const deleteGenus = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        genusState.genusIsLoading = true;
        genusHttp.deleteGenus(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getGenus();
          })
          .finally(() => { genusState.genusIsLoading = false; });
      }
    };

    // 头部按键
    const familyTopButtonClick = (name: string, data: any) => {
      if (name === 'search') {
        for (const index in data) {
          if (data[index].name === 'name') {
            familyParams.name = data[index].value === '' ? undefined : data[index].value;
          }
        }
        getFamily();
      } else if (name === 'reset') {
        for (const index in familyState.familySearchList) {
          familyState.familySearchList[index].value = '';
          familyParams.name = undefined;
        }
        getFamily();
      } else if (name === 'add') {
        familyState.familyDataPageModelRef.openDialog('new');
      } else if (name === 'delete') {
        deleteFamily(data);
      }
    };

    const genusTopButtonClick = (name: string, data: any) => {
      if (name === 'search') {
        for (const index in data) {
          if (data[index].name === 'name') {
            genusParams.name = data[index].value === '' ? undefined : data[index].value;
          }
        }
        getGenus();
      } else if (name === 'reset') {
        for (const index in genusState.genusSearchList) {
          genusState.genusSearchList[index].value = '';
          genusParams.name = undefined;
          genusParams.family = undefined;
        }
        familyState.familyRowId = undefined;
        getGenus();
      } else if (name === 'add') {
        genusState.genusDataPageModelRef.openDialog('new');
      } else if (name === 'delete') {
        deleteGenus(data);
      }
    };

    // 表格按键
    const familyTableButtonClick = (name: string, data: any) => {
      if (name === 'check') {
        genusParams.family = data.name;
        familyState.familyRowId = data.id;
        getGenus();
      } else if (name === 'view') {
        // ..
      } else if (name === 'edit') {
        familyState.familyDataPageModelRef.openDialog('edit', data);
      }
    };

    const genusTableButtonClick = (name: string, data: any) => {
      if (name === 'view') {
        // ...
      } else if (name === 'edit') {
        genusState.genusDataPageModelRef.openDialog('edit', data);
      }
    };

    // 排序改变
    const familySortChange = (params: any) => {
      familyParams.sort = params.prop === null ? '' : params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      getFamily();
    };

    const genusSortChange = (params: any) => {
      genusParams.sort = params.prop === null ? '' : params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      getGenus();
    };

    // 分页改变
    const familyHandleChange = (name: string, data: any) => {
      if (name === 'page') {
        familyParams.page = data - 1;
        familyState.familyPageList.page = data;
      } else if (name === 'size') {
        familyParams.size = data;
        familyParams.page = 0;
        familyState.familyPageList.size = data;
        familyState.familyPageList.page = 1;
      }
      getFamily();
    };

    const genusHandleChange = (name: string, data: any) => {
      if (name === 'page') {
        genusParams.page = data - 1;
        genusState.genusPageList.page = data;
      } else if (name === 'size') {
        genusParams.size = data;
        genusParams.page = 0;
        genusState.genusPageList.size = data;
        genusState.genusPageList.page = 1;
      }
      getGenus();
    };

    // 刷新
    const familyRefreshTable = () => {
      getFamily();
    };

    const genusRefreshTable = () => {
      getGenus();
    };

    // 属类所属的科类
    const currentFamily = computed(() => {
      return genusParams.family === undefined ? '全部科类' : genusParams.family + '类';
    });

    return {
      ...toRefs(familyState),
      ...toRefs(genusState),
      familyTopButtonClick,
      genusTopButtonClick,
      familyTableButtonClick,
      genusTableButtonClick,
      familySortChange,
      genusSortChange,
      familyHandleChange,
      genusHandleChange,
      familyRefreshTable,
      genusRefreshTable,
      currentFamily
    };
  }
});
</script>

<style lang="scss" scoped></style>
