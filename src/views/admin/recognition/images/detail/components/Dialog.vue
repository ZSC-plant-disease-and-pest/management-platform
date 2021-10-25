<template>
  <el-dialog
    :title="'上传' + typeWord + '数据集图片'"
    v-model="dialogVisible"
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
          <el-form-item :label="typeWord + '名称：'" prop="datasetId">
            <el-select v-model="form.id" disabled>
              <el-option :label="name" :value="form.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item label="上传病害图集：" prop="picture">
            <el-upload
              ref="uploadRef"
              action=""
              :auto-upload="false"
              :on-change="onChange"
              :on-remove="onRemove"
              multiple
              drag
              accept=".gif,.jpg,.jpeg,.png,.bmp,.webp"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将图片放在此处或单击上传
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  仅限常见类型图片，最大不超过5M
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

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    const state = reactive({
      type: '',
      name: '',
      form: {} as datasetParams,
      formRef: ref(),
      uploadRef: ref(),
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
        picture: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileImg.length === 0) {
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
      fileImg: [] as Array<any>
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

    const openDialog = (type: string, id: number, name: string) => {
      state.type = type;
      state.name = name;
      state.form.id = id;
      state.dialogVisible = true;
    };
    const closed = () => {
      state.form.informationId = undefined;
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'disease') {
            datasetHttp.uploadDiseaseImg(Number(state.form.id), state.fileImg)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'pest') {
            datasetHttp.uploadPestImg(Number(state.form.id), state.fileImg)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'plants') {
            datasetHttp.uploadPlantsImg(Number(state.form.id), state.fileImg)
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
    };
    const onChange = (file: any) => {
      const type = file.raw.type.split('/').pop();
      if (
        type !== 'gif' &&
        type !== 'jpg' &&
        type !== 'jpeg' &&
        type !== 'png' &&
        type !== 'bmp' &&
        type !== 'webp') {
        ElMessage.error(`名称为${file.raw.name}的图片格式有误 !`);
        setImageList();
      } else if (file.raw.size / 1024 / 1024 > 5) {
        ElMessage.error(`名称为${file.raw.name}的图片大小不能超过 5MB !`);
        setImageList();
      } else {
        state.fileImg.push(file);
      }
    };
    const onRemove = (file: any, fileList: any) => {
      state.fileImg = fileList;
      setImageList();
    };
    const setImageList = () => {
      state.uploadRef.clearFiles();
      for (const index in state.fileImg) {
        state.uploadRef.uploadFiles.push(state.fileImg[index]);
      }
    };

    return {
      ...toRefs(state),
      typeWord,
      openDialog,
      closed,
      submit,
      onChange,
      onRemove
    };
  }
});
</script>

<style lang="scss" scoped></style>
