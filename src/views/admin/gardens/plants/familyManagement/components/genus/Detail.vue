<template>
  <el-dialog
    :title="form.name + '详情'"
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
      label-width="90px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="属类名称：">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拉丁学名：">
            <span>{{ form.scientificName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="所属科类：">
            <span>{{ form.family }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="简介：">
            <span>{{ form.introduction }}</span>
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
import { genusParams } from '@/api/genus';

export default defineComponent({
  setup () {
    const state = reactive({
      form: {
        id: 0,
        name: '',
        scientificName: '',
        family: '',
        introduction: ''
      } as genusParams,
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
