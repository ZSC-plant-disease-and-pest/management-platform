<template>
  <el-dialog
    title="新闻详情"
    v-model="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      class="form-common"
      size="small"
      :model="form"
      label-width="140px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="新闻类型名称：">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新闻类型数量：">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="新闻创建时间：">
            <span>{{ form.createTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新闻更新时间：">
            <span>{{ form.updateTime }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button size="small" @click="dialogVisible = false">
          关 闭
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { newsTypeParams } from '@/api/newsType';

export default defineComponent({
  setup () {
    const state = reactive({
      form: {} as newsTypeParams,
      formRef: ref(),
      isLoading: false,
      dialogVisible: false
    });

    const openDialog = (data: any) => {
      state.dialogVisible = true;
      state.form = data;
    };

    return {
      ...toRefs(state),
      openDialog,
      closed
    };
  }
});
</script>

<style lang="scss" scoped></style>
