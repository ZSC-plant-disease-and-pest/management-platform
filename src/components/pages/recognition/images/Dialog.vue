<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeClose"
  >
    <el-form
      ref="formRef"
      class="form-common"
      size="small"
      label-width="140px"
    >
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="数据集名称：">
            <el-input
              class="input-common"
              v-model="datasetName"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item label="上传数据集图集：">
            <el-upload
              ref="uploadRef"
              action=""
              :auto-upload="false"
              list-type="picture"
              :limit="10"
              :on-change="onChange"
              :before-remove="beforeRemove"
            >
              <el-button size="small" type="primary">
                点击上传
              </el-button>
              <template #tip>
                <div>
                  最多上传十张图片
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button size="small" @click="dialogVisible = false">
          关 闭
        </el-button>
        <el-button
          type="primary"
          size="small"
          :loading="isLoading"
          @click="submit"
        >
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { datasetHttp } from '@/api/dataset';

export default defineComponent({
  setup () {
    const state = reactive({
      // 病害：disease 虫害：pest 植物：plants
      type: '',
      isLoading: false,
      dialogVisible: false,
      datasetId: 0,
      datasetName: '',
      fileImg: [] as Array<any>
    });
    const title = computed(() => {
      let word = '';
      if (state.type === 'disease') {
        word = '病害';
      } else if (state.type === 'pest') {
        word = '虫害';
      } else if (state.type === 'plants') {
        word = '植物';
      }
      return `编辑${word}图像数据集`;
    });

    const openDialog = (type: string, data: any) => {
      state.type = type;
      state.dialogVisible = true;
      state.datasetId = data.id;
      state.datasetName = data.name;
    };
    const beforeClose = () => {
      state.dialogVisible = false;
    };
    const onChange = (file: any, fileList: any) => {
      state.fileImg = fileList;
    };
    const beforeRemove = () => {
      state.fileImg = [];
    };
    const submit = () => {
      state.isLoading = true;
      if (state.type === 'disease') {
        datasetHttp.uploadDiseaseImg(state.datasetId, state.fileImg)
          .then((response: any) => {
            console.log(response);
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (state.type === 'pest') {
        datasetHttp.uploadPestImg(state.datasetId, state.fileImg)
          .then((response: any) => {
            console.log(response);
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (state.type === 'plants') {
        datasetHttp.uploadPlantsImg(state.datasetId, state.fileImg)
          .then((response: any) => {
            console.log(response);
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };

    return {
      ...toRefs(state),
      title,
      openDialog,
      beforeClose,
      onChange,
      beforeRemove,
      submit
    };
  }
});
</script>

<style lang="scss" scoped></style>
