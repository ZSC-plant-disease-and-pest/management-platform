<template>
  <el-dialog
    :title="'上传' + typeWord + '数据集图片'"
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
        <el-col :span="24">
          <el-form-item :label="typeWord + '名称：'" prop="datasetId">
            <el-select v-model="form.id" disabled>
              <el-option :label="name" :value="form.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item
            label="上传图片："
            prop="image"
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
              accept=".gif,.jpg,.jpeg,.png,.bmp"
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
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    const route = useRoute();

    const state = reactive({
      type: '',
      name: '',
      form: {} as datasetParams,
      formRef: ref(),
      uploadRef: ref(),
      uploadImageRef: ref(),
      rules: {
        datasetId: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.id === undefined) {
              callback(new Error('请选择图片上传的目标数据集'));
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
              callback(new Error('请上传至少一张图片'));
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
      havingUploadImage: false,
      dialogImageUrl: '',
      dialogImageVisible: false,
      formKey: 0
    });

    const typeWord = computed(() => {
      if (state.type === 'disease') {
        return '病害';
      } else if (state.type === 'pest') {
        return '虫害';
      } else if (state.type === 'plants') {
        return '植物';
      } else {
        return '';
      }
    });

    const openDialog = (type: string) => {
      state.type = type;
      state.name = String(route.query.name);
      state.form.id = Number(route.params.id);
      state.dialogVisible = true;
    };
    const closed = () => {
      state.form.informationId = undefined;
      state.formKey += 1;
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'disease') {
            datasetHttp.uploadDiseaseImg(Number(state.form.id), state.fileList)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'pest') {
            datasetHttp.uploadPestImg(Number(state.form.id), state.fileList)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'plant') {
            datasetHttp.uploadPlantsImg(Number(state.form.id), state.fileList)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          }
        }
      });
    };
    const refreshTable = () => {
      emit('refreshTable');
      state.formKey += 1;
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
      }, 1);
    };
    const handlePictureCardPreview = (file: any) => {
      if (file.url !== undefined) {
        state.dialogImageUrl = file.url;
      }
      state.dialogImageVisible = true;
    };

    return {
      ...toRefs(state),
      typeWord,
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
.uploadImage ::v-deep .el-upload.el-upload--picture-card {
  display: none;
}
.uploadImage ::v-deep .el-upload-list__item.is-ready {
  margin-bottom: 0px;
}
</style>
