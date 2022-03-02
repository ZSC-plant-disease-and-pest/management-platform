<template>
  <el-dialog
    v-model="dialogVisible"
    :title="'新增' + title + '图片'"
    :width="600"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      class="form-common"
      size="small"
      :rules="rules"
      :model="form"
      label-width="140px"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="title + '名称：'" prop="datasetId">
            <el-select v-model="form.id" disabled>
              <el-option :label="form.name" :value="form.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="0">
      <el-col :span="24">
        <el-form-item label="上传图片：" prop="picture" >
          <BasicImageUpload
            ref="imageUploadRef"
            :limit="1"
            @onChange="fileListChange"
            @preview="filePreview"
          />
          <el-dialog v-model="imagePreviewDialog" title="查看图片">
            <img style="width: 100%; height: 75%;" :src="imagePreviewUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button size="small" @click="dialogVisible = false">
        关闭
      </el-button>
      <el-button type="primary" size="small" :loading="isLoading" @click="submit">
        新增
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { ElMessage } from 'element-plus';
import BasicImageUpload from '@/components/common/BasicImageUpload/index.vue';

export default defineComponent({
  components: { BasicImageUpload },
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    // 数据仓库
    const state = reactive({
      form: {
        id: undefined,
        name: '',
        informationId: undefined
      } as datasetParams,
      formRef: ref(),
      imageUploadRef: ref(),
      rules: {
        picture: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileList.length === 0) {
              callback(new Error('请上传至少一张图片'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      type: '',
      dialogVisible: false,
      isLoading: false,
      fileList: [] as Array<any>,
      imagePreviewUrl: '',
      imagePreviewDialog: false
    });

    // 弹出框标题
    const title = computed(() => {
      let word = '';
      switch (state.type) {
        case 'disease':
          word = '病害';
          break;
        case 'pest':
          word = '虫害';
          break;
        case 'plant':
          word = '植物';
          break;
        default:
          break;
      }
      return `${word}数据集`;
    });

    // 打开
    const openDialog = (type: string, data: any) => {
      state.type = type;
      state.form.name = data.name;
      state.form.id = data.id;
      state.dialogVisible = true;
    };

    // 提交
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'disease') {
            datasetHttp.uploadDiseaseImage(Number(state.form.id), state.fileList)
              .then(() => { uploadImageSuccessfully(); })
              .finally(() => { state.isLoading = false; });
          } else if (state.type === 'pest') {
            datasetHttp.uploadPestImage(Number(state.form.id), state.fileList)
              .then(() => { uploadImageSuccessfully(); })
              .finally(() => { state.isLoading = false; });
          } else if (state.type === 'plant') {
            datasetHttp.uploadPlantsImage(Number(state.form.id), state.fileList)
              .then(() => { uploadImageSuccessfully(); })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    // 上传图片成功后
    const uploadImageSuccessfully = () => {
      ElMessage.success('添加成功');
      state.dialogVisible = false;
      state.imageUploadRef.clear();
      refreshTable();
    };

    // 关闭
    const closed = () => {
      state.dialogVisible = false;
      state.imageUploadRef.clear();
      state.form.informationId = undefined;
    };

    // 刷新
    const refreshTable = () => {
      emit('refreshTable');
    };

    // 图片改变时
    const fileListChange = (fileList: Array<any>) => {
      state.fileList = fileList;
    };

    // 图片预览
    const filePreview = (file: any) => {
      state.imagePreviewUrl = file?.url;
      state.imagePreviewDialog = true;
    };

    return {
      ...toRefs(state),
      title,
      openDialog,
      closed,
      submit,
      fileListChange,
      filePreview
    };
  }
});
</script>

<style lang="scss" scoped></style>
