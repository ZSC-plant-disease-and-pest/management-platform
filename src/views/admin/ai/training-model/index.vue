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
    @topButtonClick="topButtonClick"
    @tableButtonClick="tableButtonClick"
    @sortChange="sortChange"
  />
  <BasicPage
    :pageList="pageList"
    @handleChange="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, reactive, toRefs } from 'vue';
import { modelHttp, modelParams } from '@/api/model';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { searchList, topButtonList, tableButtonList, tableColumnList, pageList } from './data';
import BasicTable from '@/components/common/BasicTable/index.vue';
import BasicSearch from '@/components/common/BasicSearch/index.vue';
import BasicPage from '@/components/common/BasicPage/index.vue';

export default defineComponent({
  components: { BasicTable, BasicSearch, BasicPage },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      getModel();
    });
    onUpdated(() => {
      if (route.params.type === 'refresh') {
        route.params.type = '';
        getModel();
      }
    });

    // 数据仓库
    const state = reactive({
      tableDataList: [] as Array<any>,
      searchList,
      topButtonList,
      tableButtonList,
      tableColumnList,
      pageList,
      isLoading: false
    });

    // 请求表单数据
    const modelParams = reactive({ page: 0, size: 10 } as modelParams);
    const getModel = () => {
      state.isLoading = true;
      modelHttp.getModel(modelParams)
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
    const deleteModel = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        ElMessage.warning('请选择需要删除的内容');
      } else {
        state.isLoading = true;
        modelHttp.deleteModel(selectedIds.join(','))
          .then(() => {
            ElMessage.success('删除成功');
            getModel();
          })
          .finally(() => { state.isLoading = false; });
      }
    };

    // 头部按键
    const topButtonClick = (name: string, data: any) => {
      if (name === 'search') {
        for (const index in data) {
          if (data[index].name === 'name') {
            modelParams.name = data[index].value === '' ? undefined : data[index].value;
          }
        }
        getModel();
      } else if (name === 'reset') {
        for (const index in state.searchList) {
          state.searchList[index].value = '';
          modelParams.name = undefined;
        }
        getModel();
      } else if (name === 'add') {
        router.push({ path: route.path + '-page', name: route.name as string + '-page', params: { id: '0' } });
      } else if (name === 'delete') {
        deleteModel(data);
      } else if (name === 'deploy') {
        // 一键部署模型
        ElMessage.success('模型部署完成')
      } else if (name === 'train') {
        // 开始训练模型
        ElMessage.success('开始训练成功')
      }
    };

    // 表格按键
    const tableButtonClick = (name: string, data: any) => {
      if (name === 'view') {
        // 查看模型详情
      } else if (name === 'edit') {
        router.push({ path: route.path + '-page', name: route.name as string + '-page', params: { id: data.id } });
      }
    };

    // 排序改变
    const sortChange = (params: any) => {
      modelParams.sort = params.prop === null ? '' : params.prop + ',' + (params.order === 'descending' ? 'desc' : 'asc');
      getModel();
    };

    // 分页改变
    const handleChange = (name: string, data: any) => {
      if (name === 'page') {
        modelParams.page = data - 1;
        state.pageList.page = data;
      } else if (name === 'size') {
        modelParams.size = data;
        modelParams.page = 0;
        state.pageList.size = data;
        state.pageList.page = 1;
      }
      getModel();
    };

    return {
      ...toRefs(state),
      topButtonClick,
      tableButtonClick,
      sortChange,
      deleteModel,
      handleChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
