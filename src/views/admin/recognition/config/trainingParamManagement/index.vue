<template>
  <el-card class="base-card">
    <template #header>
      <span>
        系统基本信息
      </span>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <span>CPU型号：Intel 酷睿i9 9900K</span>
      </el-col>
      <el-col :span="12">
        <span>GPU信息：NVIDIA GeForce GTX 1650 SUPER</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span>内存大小：32G</span>
      </el-col>
      <el-col :span="12">
        <span>硬盘大小：1024G</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span>操作系统类型：Linux</span>
      </el-col>
    </el-row>
  </el-card>
  <el-form
    ref="formRef"
    class="form-common"
    size="small"
    :rules="rules"
    :model="form"
    label-width="140px"
    v-show="status === 'incomplete'"
  >
    <el-card class="base-card">
      <template #header>
        <span>
          机器学习训练配置信息
        </span>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Python语言版本：">
            <el-select
              class="select-common"
              v-model="form.pythonVersion"
              placeholder="请选择"
            >
              <el-option label="2.7" value="2.7" />
              <el-option label="3.5" value="3.5" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="深度学习框架：">
            <el-select
              class="select-common"
              v-model="form.frame"
              placeholder="请选择"
            >
              <el-option label="Pytorch" value="Pytorch" />
              <el-option label="Torch" value="Torch" />
              <el-option label="Caffe" value="Caffe" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="训练数据目录：">
            <el-input
              class="input-common"
              v-model="form.id"
              placeholder="请输入训练数据目录"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-button :loading="isLoading" @click="back">
              返回
            </el-button>
            <el-button
              type="primary"
              :loading="isLoading"
              @click="submit"
            >
              提交
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';

export default defineComponent({
  setup () {
    const state = reactive({
      form: {
        pythonVersion: '',
        frame: ''
      },
      formRef: ref(),
      rules: {}
    });
    const status = ref('incomplete');
    return {
      ...toRefs(state),
      status
    };
  }
});
</script>

<style lang="scss" scoped>
.base-card {
  width: 100%;
  margin: 0px auto 25px;
}
.el-row {
  margin: 30px 0px;
}
.input-common {
  width: 80%;
}
.select-common {
  width: 80%;
}
</style>
