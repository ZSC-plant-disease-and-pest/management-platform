<template>
  <el-dialog
    title="部署模型"
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
          <el-form-item label="模型名称：">
            <el-input
              class="input-common"
              v-model="form.name"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="模型标识符：">
            <el-input
              class="input-common"
              v-model="form.name"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="模型文件名：">
            <span> xgjtest </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="大小：">
            <span> 1.46MB </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="算法来源：">
            <el-input
              class="input-common"
              v-model="form.algorithm"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Web服务端口号：">
            <el-input
              class="input-common"
              v-model="form.name"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button size="small" @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          size="small"
          :loading="isLoading"
          @click="submit"
        >
          <span>
            部 署
          </span>
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { modelHttp, modelParams } from '@/api/model';
import { ElMessage } from 'element-plus';

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    const state = reactive({
      form: {} as modelParams,
      formRef: ref(),
      rules: {},
      isLoading: false,
      dialogVisible: false
    });

    const openDialog = (data: any) => {
      state.dialogVisible = true;
      const { ...tempForm } = data;
      state.form = tempForm;
    };
    const closed = () => {
      state.form.name = '';
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          modelHttp.updateModelById(state.form)
            .then(() => {
              ElMessage.success('部署成功');
              state.dialogVisible = false;
              refreshTable();
            })
            .finally(() => {
              state.isLoading = false;
            });
        }
      });
      const refreshTable = () => {
        emit('refreshTable');
      };
    };

    return {
      ...toRefs(state),
      openDialog,
      closed,
      submit
    };
  }
});
</script>

<style lang="scss" scoped></style>
