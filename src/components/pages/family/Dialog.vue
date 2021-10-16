<template>
  <el-dialog
    :title="title"
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
          <span v-show="type === 'add'">
            新 增
          </span>
          <span v-show="type === 'edit'">
            更 新
          </span>
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { familyHttp, familyParams } from '@/api/family';
import { ElMessage } from 'element-plus';

export default defineComponent({
  emits: ['refreshFamilyTable'],
  setup (prop, { emit }) {
    const state = reactive({
      form: {
        id: undefined,
        name: '',
        scientificName: '',
        introduction: ''
      } as familyParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入科类名称', trigger: ['blur', 'change'] }
        ]
      },
      // 新增：add 编辑：edit
      type: '',
      isLoading: false,
      dialogVisible: false
    });
    const title = computed(() => {
      let word = '';
      if (state.type === 'add') {
        word = '新增';
      } else if (state.type === 'edit') {
        word = '编辑';
      }
      return `${word}科类信息`;
    });

    const openDialog = (type: string, data: any) => {
      state.type = type;
      state.dialogVisible = true;
      if (type === 'edit') {
        const { ...tempForm } = data;
        state.form = tempForm;
      }
    };
    const closed = () => {
      state.form.name = '';
      state.form.scientificName = '';
      state.form.introduction = '';
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'add') {
            familyHttp.createFamily(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                emit('refreshFamilyTable');
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'edit') {
            familyHttp.updateFamily(state.form)
              .then(() => {
                ElMessage.success('更新成功');
                state.dialogVisible = false;
                emit('refreshFamilyTable');
              })
              .finally(() => {
                state.isLoading = false;
              });
          }
        }
      });
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
