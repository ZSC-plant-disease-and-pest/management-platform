<template>
  <el-dialog
    title="上传视频"
    v-model="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
    destroy-on-close
    :key="formKey"
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
        <el-col :span="12">
          <el-form-item label="视频标签" prop="label">
            <el-input
              class="input-common"
              v-model="form.label"
              placeholder="请输入视频标签"
             />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="视频类型" prop="type">
            <el-input v-model="form.videoTypeName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item
            label="上传视频："
            prop="image"
          >
            <el-upload
              ref="uploadVideoRef"
              :class="{ uploadVideo: havingUploadVideo }"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="onChange"
              :limit="1"
              :multiple="false"
              accept="*"
            >
              <template #default>
                <i class="el-icon-plus"></i>
              </template>
              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <el-dialog v-model="dialogVideoVisible" title="查看视频">
              <img style="width: 100%; height: 75%;" :src="dialogVideoUrl" alt="" />
            </el-dialog>
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
          新 增
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { videoHttp, videoParams } from '@/api/video';
import { ElMessage } from 'element-plus';

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    const state = reactive({
      form: {} as videoParams,
      formRef: ref(),
      uploadRef: ref(),
      uploadVideoRef: ref(),
      rules: {
        image: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileList.length === 0) {
              callback(new Error('请上传视频'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      isLoading: false,
      dialogVisible: false,
      fileList: [] as Array<any>,
      havingUploadVideo: false,
      dialogVideoUrl: '',
      dialogVideoVisible: false,
      formKey: 0
    });

    const openDialog = () => {
      state.dialogVisible = true;
    };
    const closed = () => {
      state.formKey += 1;
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          videoHttp.uploadVideo(state.form, state.fileList)
            .then(() => {
              ElMessage.success('添加成功');
              state.dialogVisible = false;
              refreshTable();
            })
            .finally(() => {
              state.isLoading = false;
            });
        }
      });
    };
    const refreshTable = () => {
      emit('refreshTable');
      state.formKey += 1;
    };
    const onChange = (file: any, fileList: Array<any>) => {
      state.havingUploadVideo = true;
      state.fileList = fileList;
    };
    const handleRemove = () => {
      state.uploadVideoRef.clearFiles();
      state.fileList = [];
      setTimeout(() => {
        state.havingUploadVideo = false;
      }, 1);
    };
    const handlePictureCardPreview = (file: any) => {
      if (file.url !== undefined) {
        state.dialogVideoUrl = file.url;
      }
      state.dialogVideoVisible = true;
    };

    return {
      ...toRefs(state),
      openDialog,
      closed,
      submit,
      onChange,
      handleRemove,
      handlePictureCardPreview
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep .el-upload-list__item {
  transition: none !important;
}
.uploadVideo ::v-deep .el-upload.el-upload--picture-card {
  display: none;
}
.uploadVideo ::v-deep .el-upload-list__item.is-ready {
  margin-bottom: 0px;
}
</style>
