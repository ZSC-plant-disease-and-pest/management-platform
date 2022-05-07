<template>
  <el-card class="base-card">
    <template #header>
      <span>
        系统基本信息
      </span>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <span>CPU型号：{{ serverConfig.cpu }}</span>
      </el-col>
      <el-col :span="12">
        <span>GPU信息：{{ serverConfig.gpu }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span>内存大小：{{ serverConfig.memory }}</span>
      </el-col>
      <el-col :span="12">
        <span>硬盘大小：{{ serverConfig.hdd }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span>操作系统类型：{{ serverConfig.operatingSystem }}</span>
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
              placeholder="请输入训练数据目录"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-button :loading="isLoading">
              返回
            </el-button>
            <el-button
              type="primary"
              :loading="isLoading"
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
import { defineComponent, reactive, toRefs, ref, onBeforeMount } from 'vue';
import { configHttp, configParams } from '@/api/config';

export default defineComponent({
  setup () {
    const state = reactive({
      form: {
        pythonVersion: '',
        frame: ''
      },
      serverConfig: {} as configParams,
      formRef: ref(),
      rules: {},
      isLoading: false
    });
    const status = ref('incomplete');
    onBeforeMount(() => {
      getServerConfig();
    });
    const getServerConfig = () => {
      configHttp.getServerConfig()
        .then((response: any) => {
          state.serverConfig = response;
        });
    };
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
