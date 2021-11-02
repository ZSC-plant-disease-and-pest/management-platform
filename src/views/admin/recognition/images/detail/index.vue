<template>
  <el-row align="middle">
    <el-col :span="12">
      <el-button type="primary" @click="add">
        添加
      </el-button>
    </el-col>
    <el-col :span="12">
      <div class="describe">
        <span>
          名称：
          <span
            class="link"
            @click="checkDetail"
          >
            {{ form.name }}
          </span>
        </span>
        <span style="margin-left: 15px">
          数据集图片数量：{{ form.imgAmount }}
        </span>
      </div>
    </el-col>
  </el-row>
  <div class="box-images">
    <div
      v-for="item in describeList"
      :key="item.id"
      class="describe"
    >
      <Describe
        :id="item.id"
        :src="item.src"
        :size="item.size"
        :resolution="item.resolution"
        :creator="item.creator"
        :createTime="item.createTime"
      />
    </div>
  </div>
  <Pagenum
    :total="total"
    :currentPage="page"
    :pageSize="size"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :pageSizes="[12, 50, 100]"
  />
  <Dialog
    ref="dialogRef"
    @refreshTable="refreshTable"
    :key="dialogKey"
  />
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  onBeforeMount,
  defineComponent,
  ref
} from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { useRoute } from 'vue-router';
import Dialog from './components/Dialog.vue';
import Describe from './components/Describe.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';

export default defineComponent({
  name: 'detail',
  components: { Dialog, Describe, Pagenum },
  setup () {
    const route = useRoute();
    onBeforeMount(() => {
      state.type = String(route.params.type);
      datasetParams.id = Number(route.params.id);
      datasetParams.informationId = Number(route.query.informationId);
      state.form.name = String(route.query.name);
      getDatasetImage();
    });

    const state = reactive({
      type: '',
      form: {} as datasetParams,
      describeList: [] as Array<any>,
      dialogRef: ref(),
      isLoading: false,
      total: 0,
      page: 1,
      size: 12,
      dialogKey: 0
    });

    const datasetParams = reactive({
      page: 0,
      size: 12
    } as datasetParams);
    const getDatasetImage = () => {
      state.isLoading = true;
      if (state.type === 'disease') {
        datasetHttp.searchDiseaseDatasetImage(datasetParams)
          .then((response: any) => {
            state.form.imgAmount = response.totalElements;
            state.total = response.totalElements;
            state.size = response.size;
            state.describeList = [];
            for (let i = 0; i < response.content.length; i++) {
              state.describeList.push({
                id: response.content[i].id,
                src: `http://localhost:8080${response.content[i].path}`,
                size: response.content[i].size,
                resolution: response.content[i].resolution,
                creator: response.content[i].creator,
                createTime: response.content[i].createTime
              });
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (state.type === 'pest') {
        datasetHttp.searchPestDatasetImage(datasetParams)
          .then((response: any) => {
            state.form.imgAmount = response.totalElements;
            state.total = response.totalElements;
            state.size = response.size;
            state.describeList = [];
            for (let i = 0; i < response.content.length; i++) {
              state.describeList.push({
                id: response.content[i].id,
                src: `http://localhost:8080${response.content[i].path}`,
                size: response.content[i].size
              });
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (state.type === 'plant') {
        datasetHttp.searchPlantsDatasetImage(datasetParams)
          .then((response: any) => {
            state.form.imgAmount = response.totalElements;
            state.total = response.totalElements;
            state.size = response.size;
            state.describeList = [];
            for (let i = 0; i < response.content.length; i++) {
              state.describeList.push({
                id: response.content[i].id,
                src: `http://localhost:8080${response.content[i].path}`,
                size: response.content[i].size
              });
            }
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    const add = () => {
      state.dialogRef.openDialog(state.type);
    };
    const checkDetail = () => {
      window.open(`http://localhost:8082/${state.type}/detail/${datasetParams.informationId}`, '_blank');
    };
    const refreshTable = () => {
      getDatasetImage();
      state.dialogKey += 1;
    };
    const handleSizeChange = (newSize: any) => {
      datasetParams.size = newSize;
      datasetParams.page = 0;
      state.size = newSize;
      state.page = 1;
      getDatasetImage();
    };
    const handleCurrentChange = (newPage: any) => {
      datasetParams.page = newPage;
      state.page = newPage + 1;
      getDatasetImage();
    };

    return {
      ...toRefs(state),
      add,
      checkDetail,
      refreshTable,
      handleSizeChange,
      handleCurrentChange
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
