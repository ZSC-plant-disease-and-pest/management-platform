<template>
  <el-dialog
    title="基本信息"
    v-model="dialogOpen"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-row :gutter="15" v-if="dialogType === 'edit'">
      <el-col :span="8">
        <span>
          图片ID：1001
        </span>
      </el-col>
      <el-col :span="8">
        <span>
          图片分辨率：240 × 160 pt
        </span>
      </el-col>
      <el-col :span="8">
        <span>
          图片大小：426 KB
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="15" v-if="dialogType === 'edit'">
      <el-col :span="8">
        <span>
          图片上传者：root
        </span>
      </el-col>
      <el-col :span="16">
        <span>
          图片上传时间：2021/8/27 18:39:21
        </span>
      </el-col>
    </el-row>
    <el-form
      ref="formRef"
      size="small"
      :model="form"
      label-width="110px"
      :rules="rules"
    >
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item
            label="上传图片："
            prop="image"
            v-if="dialogType === 'upload'"
          >
            <el-upload
              ref="uploadImageRef"
              :class="{ uploadImage: havingUploadImage }"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="onChange"
              :limit="1"
              :multiple="false"
              accept=".gif,.jpg,.jpeg,.png,.bmp,.webp"
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
            <el-dialog v-model="dialogImageVisible" title="查看图片">
              <img style="width: 100%; height: 75%;" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="待标注图片：" v-if="dialogType === 'edit'">
            <img
              class="edit-image"
              :src="dialogImageUrl"
            />
          </el-form-item>
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
      <div class="footer">
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { taggingHttp, taggingParams } from '@/api/tagging';
import { ElMessage } from 'element-plus';
import { defineComponent, onUpdated, reactive, ref, toRefs, watch } from 'vue';
import TaggingSelect from './TaggingSelect.vue';

export default defineComponent({
  components: { TaggingSelect },
  props: {
    dialogType: {
      type: String,
      default: 'close'
    }
  },
  emits: ['dialogClose'],
  setup (props, { emit }) {
    onUpdated(() => {
      if (props.dialogType === 'edit') {
        datasetTypeChange();
      }
    });
    watch(() => props.dialogType, (newProps) => {
      if (newProps !== 'close') {
        state.dialogOpen = true;
      } else {
        state.dialogOpen = false;
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
      dialogOpen: false,
      formRef: ref(),
      taggingSelectRef: ref(),
      uploadImageRef: ref(),
      havingUploadImage: false,
      dialogImageUrl: '',
      dialogImageVisible: false,
      fileList: [] as Array<any>,
      isLoading: false
    });

    const taggingParams = reactive({
      datasetType: undefined,
      datasetId: undefined
    } as taggingParams);
    const uploadImage = () => {
      taggingParams.datasetType = Number(state.form.datasetType);
      if (state.form.datasetId) {
        taggingParams.datasetId = state.form.datasetId;
      }
      taggingHttp.uploadImage(taggingParams, state.fileList)
        .then(() => {
          ElMessage.success('添加图片成功');
          emit('dialogClose', 'close');
        })
        .finally(() => {
          state.isLoading = false;
        });
    };
    const taggingImage = () => {
      taggingParams.datasetType = Number(state.form.datasetType);
      if (state.form.datasetId) {
        taggingParams.datasetId = state.form.datasetId;
      }
      taggingHttp.taggingImage(taggingParams)
        .then(() => {
          ElMessage.success('标注图片成功');
          emit('dialogClose', 'close');
        })
        .finally(() => {
          state.isLoading = false;
        });
    };
    const edit = (datasetType: number, data: any) => {
      state.form.datasetType = String(datasetType);
      taggingParams.imgId = data.id;
      state.dialogImageUrl = 'http://localhost:8080' + data.path;
    };
    const close = () => {
      emit('dialogClose', 'close');
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (props.dialogType === 'upload') {
            uploadImage();
          } else {
            taggingImage();
          }
        }
      });
    };
    const datasetTypeChange = () => {
      state.form.datasetId = undefined;
      state.taggingSelectRef.loadingSelect(state.form.datasetType);
    };
    const TaggingSelectChange = (data: number) => {
      state.form.datasetId = data;
    };
    const onChange = (file: any, fileList: Array<any>) => {
      state.havingUploadImage = true;
      state.fileList = fileList;
    };
    const handleRemove = () => {
      state.uploadImageRef.clearFiles();
      state.fileList = [];
      setTimeout(() => {
        state.havingUploadImage = false;
      }, 1001);
    };
    const handlePictureCardPreview = (file: any) => {
      console.log(file);
      state.dialogImageUrl = file.url;
      state.dialogImageVisible = true;
    };

    return {
      ...toRefs(state),
      edit,
      close,
      submit,
      datasetTypeChange,
      TaggingSelectChange,
      onChange,
      handleRemove,
      handlePictureCardPreview
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
}
.uploadImage ::v-deep .el-upload.el-upload--picture-card {
  display: none;
}
.uploadImage ::v-deep .el-upload-list__item.is-ready {
  margin-bottom: 0px;
}
</style>
