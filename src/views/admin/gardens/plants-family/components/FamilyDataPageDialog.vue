<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
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
      label-width="100px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="科类名称：" prop="name">
            <el-input
              class="input-common"
              v-model="form.name"
              placeholder="请输入科类名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拉丁学名：">
            <el-input
              class="input-common"
              v-model="form.scientificName"
              placeholder="请输入拉丁学名"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="0" class="textarea-row">
        <el-col :span="24">
          <el-form-item label="简介：">
            <el-input
              class="textarea-common"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 4}"
              placeholder="请输入简介"
              clearable
              v-model="form.introduction"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button size="small" @click="dialogVisible = false">
        关闭
      </el-button>
      <el-button type="primary" size="small" :loading="isLoading" @click="submit">
        <span v-if="mode === 'new'"> 新增 </span>
        <span v-else> 编辑 </span>
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { familyHttp, familyParams } from '@/api/family';
import { ElMessage } from 'element-plus';

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    // 数据仓库
    const state = reactive({
      form: {
        id: undefined,
        name: '',
        scientificName: '',
        introduction: ''
      } as familyParams,
      formRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入科类名称', trigger: ['blur', 'change'] }]
      },
      isLoading: false,
      mode: '',
      dialogVisible: false
    });

    // 弹出框标题
    const title = computed(() => {
      const word = state.mode === 'new' ? '新增' : '编辑';
      return `${word}科类信息`;
    });

    // 打开
    const openDialog = (mode: string, data: any) => {
      state.mode = mode;
      state.dialogVisible = true;
      if (mode === 'edit') {
        const { ...tempForm } = data;
        state.form = tempForm;
      }
    };

    // 提交
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.mode === 'new') {
            familyHttp.createFamily(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => { state.isLoading = false; });
          } else if (state.mode === 'edit') {
            familyHttp.updateFamily(state.form)
              .then(() => {
                ElMessage.success('更新成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    // 关闭
    const closed = () => {
      state.dialogVisible = false;
      state.form.name = '';
    };

    // 刷新表格
    const refreshTable = () => {
      emit('refreshTable');
    };

    return {
      ...toRefs(state),
      title,
      openDialog,
      closed,
      submit
    };
  }
});
</script>

<style lang="scss" scoped></style>
