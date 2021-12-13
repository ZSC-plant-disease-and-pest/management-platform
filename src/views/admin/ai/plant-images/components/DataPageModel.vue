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
      label-width="130px"
    >
      <el-row>
        <el-col :span="23">
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
import { newsTypeHttp, newsTypeParams } from '@/api/newsType';
import { ElMessage } from 'element-plus';

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    // 数据仓库
    const state = reactive({
      form: {
        id: undefined,
        name: ''
      } as newsTypeParams,
      formRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入新闻类型名称', trigger: ['blur', 'change'] }]
      },
      isLoading: false,
      mode: '',
      dialogVisible: false
    });

    // 弹出框标题
    const title = computed(() => {
      const word = state.mode === 'new' ? '新增' : '编辑';
      return `${word}新闻信息`;
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
            newsTypeHttp.createNewsType(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => { state.isLoading = false; });
          } else if (state.mode === 'edit') {
            newsTypeHttp.updateNewsType(state.form)
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
