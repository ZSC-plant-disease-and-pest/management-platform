<template>
  <el-row align="middle">
    <el-col :span="12">
      <el-button type="primary" @click="topButtonClick('add')">
        添加
      </el-button>
    </el-col>
    <el-col :span="12">
      <div class="describe">
        名称：
        <span class="link" @click="topButtonClick('view')" >
          {{ datasetData.name }}
        </span>
        <span style="margin-left: 15px">
          数据集图片数量：{{ datasetData.imgAmount }}
        </span>
      </div>
    </el-col>
  </el-row>
  <div class="box-images">
    <div
      v-for="item in dataPageDetailList"
      :key="item.id"
      class="describe"
    >
      <DataPageDetail :dataPageDetailData="item" />
    </div>
  </div>
  <BasicPage
    :pageList="pageList"
    :page-sizes="[12, 20, 30, 40, 50, 100]"
    @handleChange="handleChange"
  />
  <DataPageModel
    ref="dataPageModelRef"
    @refreshTable="refreshTable"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { useRoute, useRouter } from 'vue-router';
import { pageList } from './data';
import { ElMessage } from 'element-plus';
import DataPageDetail from './components/DataPageDetail.vue';
import DataPageModel from './components/DataPageModel.vue';
import BasicPage from '@/components/common/BasicPage/index.vue';

export default defineComponent({
  name: 'exclude',
  components: { DataPageDetail, DataPageModel, BasicPage },
  setup () {
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(() => {
      if (!Number(route.query.informationId)) {
        router.push(`/admin/${route.params.type === 'plant' ? route.params.type + 's' : route.params.type}-images`);
        ElMessage.warning('非法访问');
      }
      state.datasetData.type = String(route.params.type);
      state.datasetData.name = String(route.query.name);
      datasetParams.id = Number(route.params.id);
      datasetParams.informationId = Number(route.query.informationId);
      getDatasetImage();
    });

    // 数据仓库
    const state = reactive({
      datasetData: {} as any,
      dataPageDetailList: [] as Array<any>,
      pageList,
      isLoading: false,
      dataPageModelRef: ref()
    });

    // 请求表单数据
    const datasetParams = reactive({ page: 0, size: 12 } as datasetParams);
    const getDatasetImage = () => {
      state.isLoading = true;
      if (state.datasetData.type === 'disease') {
        datasetHttp.getDiseaseDatasetImage(datasetParams)
          .then((response: any) => { getDatasetImageSuccessfully(response); })
          .finally(() => { state.isLoading = false; });
      } else if (state.datasetData.type === 'pest') {
        datasetHttp.getPestDatasetImage(datasetParams)
          .then((response: any) => { getDatasetImageSuccessfully(response); })
          .finally(() => { state.isLoading = false; });
      } else if (state.datasetData.type === 'plant') {
        datasetHttp.getPlantsDatasetImage(datasetParams)
          .then((response: any) => { getDatasetImageSuccessfully(response); })
          .finally(() => { state.isLoading = false; });
      }
    };

    // 对请求成功得到的数据集图片数据进行处理
    const getDatasetImageSuccessfully = (response: any) => {
      state.datasetData.imgAmount = response.totalElements;
      state.pageList.total = response.totalElements;
      state.pageList.size = response.size;
      state.dataPageDetailList = [];
      for (let i = 0; i < response.content.length; i++) {
        response.content[i].src = `http://localhost:8080${response.content[i].path}`;
        state.dataPageDetailList.push(response.content[i]);
      }
    };

    // 头部按键
    const topButtonClick = (name: string) => {
      if (name === 'add') {
        state.dataPageModelRef.openDialog(
          state.datasetData.type,
          { name: state.datasetData.name, id: datasetParams.id }
        );
      } else if (name === 'view') {
        window.open(`http://localhost:8082/${state.datasetData.type}/detail/${datasetParams.informationId}`, '_blank');
      }
    };

    // 分页改变
    const handleChange = (name: string, data: any) => {
      if (name === 'page') {
        datasetParams.page = data - 1;
        state.pageList.page = data;
      } else if (name === 'size') {
        datasetParams.size = data;
        datasetParams.page = 0;
        state.pageList.size = data;
        state.pageList.page = 1;
      }
      getDatasetImage();
    };

    // 刷新
    const refreshTable = () => {
      getDatasetImage();
    };

    return {
      ...toRefs(state),
      topButtonClick,
      handleChange,
      refreshTable
    };
  }
});
</script>

<style lang="scss" scoped>
.describe {
  float: right;
  line-height: 40px;

  .link {
    cursor: pointer;
    color: #2d64b3;
  }

  .link:hover {
    color: #40aaff;
  }
}
.box-images {
  display: flex;
  flex-wrap: wrap;

  .describe {
    width: 263px;
    margin: 15px;
  }
}
</style>
