<template>
  <el-form
    ref="formRef"
    class="form-common"
    size="small"
    :rules="rules"
    :model="form"
    label-width="100px"
    v-show="status === 'incomplete'"
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
    </el-row>
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="简介：" prop="introduction">
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
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="形态特征：" prop="appearance">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入形态特征"
            clearable
            v-model="form.appearance"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="分布地域：" prop="regions">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入分布地域"
            clearable
            v-model="form.regions"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="生长环境：" prop="environment">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入生长环境"
            clearable
            v-model="form.environment"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0">
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
  </el-form>
  <el-result
    icon="success"
    :title="type === 'add' ? '新增成功' : '更新成功'"
    v-show="status === 'complete'"
  >
    <template #extra>
      <el-button @click="back">
        返回
      </el-button>
      <el-button
        type="primary"
        @click="keep"
        v-show="type === 'add'"
      >
        继续新增
      </el-button>
    </template>
  </el-result>
</template>

<script lang="ts">

import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { familyHttp, familyParams } from '@/api/family';
import { useRouter, useRoute } from 'vue-router';
import { illegalVisit } from '@/utils/global';

export default defineComponent({
  name: 'add-update',
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      getParams();
    });

    const state = reactive({
      form: {
        id: undefined,
        name: '',
        introduction: '',
        appearance: '',
        regions: '',
        environment: ''
      } as familyParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入科类名称', trigger: ['blur', 'change'] }
        ]
      },
      // 界面类型：add 新增，update 更新
      type: '',
      isLoading: false,
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete'
    });

    // 提取路由中的 params
    const getParams = () => {
      if (route.path.split('/').slice(-1)[0] === 'update') {
        // 若 params 有 id，则是合法访问
        if (route.params.id !== undefined) {
          state.type = 'update';
          const { ...tempParams } = route.params;
          state.form = tempParams;
          // console.log(tempParams);
        } else {
          illegalVisit();
          router.go(-1);
        }
      } else {
        state.type = 'add';
      }
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (route.path.split('/').slice(-1)[0] === 'add') {
            familyHttp.createFamily(state.form)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            familyHttp.updateFamily(state.form)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          }
        }
      });
    };
    const back = () => {
      router.push({
        path: '/admin/gardens/familyManagement',
        name: 'familyManagement',
        params: {
          type: 'refresh'
        }
      });
    };
    const keep = () => {
      state.formRef.resetFields();
      state.status = 'incomplete';
    };

    return {
      ...toRefs(state),
      submit,
      back,
      keep
    };
  }
});
</script>

<style lang="scss" scoped></style>
