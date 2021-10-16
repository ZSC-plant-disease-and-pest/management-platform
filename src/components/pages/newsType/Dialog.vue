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
      label-width="140px"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="新闻类型名称：" prop="name">
            <el-input
              class="input-common"
              v-model="form.name"
              placeholder="请输入新闻类型名称"
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
import { newsTypeHttp, newsTypeParams } from '@/api/newsType';
import { ElMessage } from 'element-plus';

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    const state = reactive({
      form: {
        id: undefined,
        name: '',
        scientificName: '',
        introduction: ''
      } as newsTypeParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入新闻类型名称', trigger: ['blur', 'change'] }
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
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'add') {
            newsTypeHttp.createNewsType(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'edit') {
            newsTypeHttp.updateNewsType(state.form)
              .then(() => {
                ElMessage.success('更新成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          }
        }
      });
      const refreshTable = () => {
        emit('refreshTable');
      };
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
