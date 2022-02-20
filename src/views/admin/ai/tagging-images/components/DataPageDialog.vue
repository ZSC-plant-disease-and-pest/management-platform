<template>
  <el-dialog
    title="基本信息"
    v-model="dialogVisible"
    :width="700"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    destroy-on-close
  >
    <el-row :gutter="15" v-if="dialogType === 'edit'">
      <el-col :span="8">
        <span>
          图片ID：{{ imageInfo.id }}
        </span>
      </el-col>
      <el-col :span="8">
        <span>
          图片分辨率：{{ imageInfo.resolution }}
        </span>
      </el-col>
      <el-col :span="8">
        <span>
          图片大小：{{ imageInfo.size }}
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="15" v-if="dialogType === 'edit'">
      <el-col :span="8">
        <span>
          图片上传者：{{ imageInfo.creator }}
        </span>
      </el-col>
      <el-col :span="16">
        <span>
          图片上传时间：{{ Moment(imageInfo.createTime).format('YYYY-MM-DD  hh:mm:ss') }}
        </span>
      </el-col>
    </el-row>

    <el-form
      ref="formRef"
      size="small"
      :model="form"
      label-width="100px"
      :rules="rules"
    >
      <el-row :gutter="0">

        <el-col :span="12">
          <el-form-item
            label="上传图片："
            prop="image"
            v-if="dialogType === 'upload'"
          >
            <BasicImageUpload
              ref="imageUploadRef"
              :limit="1"
              @onChange="fileListChange"
              @preview="filePreview"
            />
          </el-form-item>
          <el-form-item label="待标注图片：" v-if="dialogType === 'edit'">
            <img
              class="edit-image"
              :src="imagePreviewUrl"
              @click="filePreview"
            />
          </el-form-item>
          <el-dialog v-model="imagePreviewDialog" title="查看图片">
            <img style="width: 100%; height: 75%;" :src="imagePreviewUrl" alt="" />
          </el-dialog>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片类别：" prop="datasetType">
                <el-select
                  v-model="form.datasetType"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="datasetTypeChange"
                  :disabled="dialogType === 'edit'"
                >
                  <el-option label="病害" value="0" />
                  <el-option label="虫害" value="1" />
                  <el-option label="植物" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片标注：">
                <TaggingSelect
                  ref="taggingSelectRef"
                  @selectChange="TaggingSelectChange"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </el-form>

    <template #footer>
      <div style="textAlign: center">
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" :loading="isLoading" @click="submit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onUpdated, reactive, ref, toRefs } from 'vue';
import { taggingHttp, taggingParams } from '@/api/tagging';
import { ElMessage } from 'element-plus';
import Moment from 'moment';
import TaggingSelect from '@/components/selector/TaggingSelector.vue';
import BasicImageUpload from '@/components/common/BasicImageUpload/index.vue';

export default defineComponent({
  components: { TaggingSelect, BasicImageUpload },
  emits: ['refreshTable'],
  setup (props, { emit }) {
    onUpdated(() => {
      if (state.dialogType === 'edit') {
        datasetTypeChange();
      }
    });

    const state = reactive({
      form: {
        datasetType: '',
        datasetId: undefined as number | undefined
      },
      rules: {
        datasetType: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.datasetType === '' || state.form.datasetType === undefined) {
              callback(new Error('请选择图片类别'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }],
        image: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileList.length === 0) {
              callback(new Error('请上传一张图片'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      Moment,
      imageInfo: {} as any,
      dialogVisible: false,
      formRef: ref(),
      taggingSelectRef: ref(),
      uploadImageRef: ref(),
      havingUploadImage: false,
      imagePreviewUrl: '',
      imagePreviewDialog: false,
      fileList: [] as Array<any>,
      dialogType: 'close',
      isLoading: false
    });

    // 请求数据
    const taggingParams = reactive({ datasetType: undefined, datasetId: undefined } as taggingParams);

    // 上传图片
    const uploadImage = () => {
      taggingParams.datasetType = Number(state.form.datasetType);
      if (state.form.datasetId) { taggingParams.datasetId = state.form.datasetId; }
      taggingHttp.uploadImage(taggingParams, state.fileList)
        .then(() => {
          ElMessage.success('添加图片成功');
          close();
        })
        .finally(() => { state.isLoading = false; });
    };

    // 标注图片
    const taggingImage = () => {
      taggingParams.datasetType = Number(state.form.datasetType);
      if (state.form.datasetId) { taggingParams.datasetId = state.form.datasetId; }
      taggingHttp.taggingImage(taggingParams)
        .then(() => {
          ElMessage.success('标注图片成功');
          close();
        })
        .finally(() => { state.isLoading = false; });
    };

    // 打开对话框上传待标注图片
    const upload = () => {
      state.dialogType = 'upload';
      state.dialogVisible = true;
    };

    // 打开对话框对待标注图片进行编辑
    const edit = (datasetType: number, data: any) => {
      state.dialogType = 'edit';
      state.form.datasetType = String(datasetType);
      taggingParams.imgId = data.id;
      state.imagePreviewUrl = 'http://localhost:8080' + data.path;
      state.imageInfo = data;
      state.dialogVisible = true;
      console.log(data);
    };

    // 提交对话框
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.dialogType === 'upload') {
            uploadImage();
          } else {
            taggingImage();
          }
        }
      });
    };

    // 关闭对话框
    const close = () => {
      state.dialogVisible = false;
      emit('refreshTable');
      // 清除数据
      state.form.datasetType = '';
      state.fileList = [];
      state.form.datasetId = undefined;
    };

    // 数据集类型修改时需要加载图片标注选择框
    const datasetTypeChange = () => {
      state.form.datasetId = undefined;
      state.taggingSelectRef.loadingSelect(state.form.datasetType);
    };

    // 图片标注选择框被选择时
    const TaggingSelectChange = (data: number) => {
      state.form.datasetId = data;
    };

    // 上传图片改变时
    const fileListChange = (fileList: Array<any>) => {
      state.fileList = fileList;
    };

    // 打开图片进行预览
    const filePreview = () => {
      state.imagePreviewDialog = true;
    };

    return {
      ...toRefs(state),
      upload,
      edit,
      submit,
      close,
      datasetTypeChange,
      TaggingSelectChange,
      fileListChange,
      filePreview
    };
  }
});
</script>

<style lang="scss" scoped>
.el-row {
  font-size: 15px;
  font-weight: 700;
  margin: 5px 0px 20px;
}
.footer {
  text-align: center;
}
.upload-common {
  width: 175px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 175px;
    height: 175px;
    line-height: 175px;
    text-align: center;
  }
}
.edit-image {
  width: 90%;
  height: 60%;
  cursor: pointer;
}
::v-deep .el-upload-list__item {
  transition: none !important;
}
::v-deep .el-dialog__body {
  padding: 30px 20px 0px;
}
.uploadImage ::v-deep .el-upload.el-upload--picture-card {
  display: none;
}
.uploadImage ::v-deep .el-upload-list__item.is-ready {
  margin-bottom: 0px;
}
</style>
