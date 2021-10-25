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
  <Dialog ref="dialogRef" @refreshTable="refreshTable" />
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

export default defineComponent({
  name: 'detail',
  components: { Dialog },
  setup () {
    const route = useRoute();
    onBeforeMount(() => {
      state.type = String(route.params.type);
      datasetParams.id = Number(route.params.id);
      datasetParams.informationId = Number(route.params.id);
      getDatasetImage();
    });

    const state = reactive({
      type: '',
      form: {} as datasetParams,
      dialogRef: ref(),
      isLoading: false
    });

    const datasetParams = reactive({
      page: 0,
      size: 10
    } as datasetParams);
    const getDatasetImage = () => {
      state.isLoading = true;
      datasetHttp.searchDiseaseDatasetImage(datasetParams)
        .then((response: any) => {
          console.log(response);
        })
        .finally(() => {
          state.isLoading = false;
        });
    };
    const add = () => {
      state.dialogRef.openDialog(
        state.type,
        state.form.informationId,
        state.form.name
      );
    };
    const checkDetail = () => {
      window.open(`http://localhost:8082/${state.type}/detail/${datasetParams.informationId}`, '_blank');
    };
    const refreshTable = () => {
      getDatasetImage();
    };

    return {
      ...toRefs(state),
      add,
      checkDetail,
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
</style>
