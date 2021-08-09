<template>
  <!-- <el-page-header @back="back" content="详情页面"></el-page-header> -->
  <el-header class="form_title-common">
    <span v-show="type === 'add'">
      新增数据集
    </span>
    <span v-show="type === 'update'">
      更新数据集
    </span>
  </el-header>
  <el-form
    ref="formRef"
    class="form-common"
    size="small"
    :rules="rules"
    :model="form"
    label-width="100px"
    v-show="status === 'incomplete'"
  >
    <el-form-item label="ID：" prop="id">
      <el-input
        class="input-common"
        v-model="form.id"
        placeholder="自动生成"
        :disabled="true"
      />
    </el-form-item>
    <el-form-item label="名称：" prop="name">
      <el-input
        class="input-common"
        v-model="form.name"
        placeholder="请输入名称"
      />
    </el-form-item>
    <el-form-item label="标签集 ID：" prop="labelCollection">
      <el-input
        class="input-common"
        v-model="form.labelCollection"
        placeholder="请输入标签集 ID"
      />
    </el-form-item>
    <el-form-item label="路径：" prop="path">
      <el-input
        class="input-common"
        v-model="form.path"
        placeholder="请输入路径"
        :disabled="type === 'update'"
      />
    </el-form-item>
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

import {
  ref,
  toRefs,
  reactive,
  onBeforeMount,
  defineComponent
} from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { useRouter } from 'vue-router';
import { illegalVisit } from '@/utils/global';

export default defineComponent({
  name: 'add-update',
  setup () {
    // 渲染前
    onBeforeMount(() => {
      getParams();
    });
    // 表单内容
    const state = reactive({
      form: {
        id: undefined,
        name: undefined,
        labelCollection: undefined,
        path: undefined
      } as datasetParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
        ],
        labelCollection: [
          { required: true, message: '请输入标签集 ID', trigger: ['blur', 'change'] }
        ],
        path: [
          { required: true, message: '请输入路径', trigger: ['blur', 'change'] }
        ]
      }
    });
    // 获取路由
    const router = useRouter();
    // 界面类型：add 新增，update 更新
    const type = ref('');
    // 加载中
    const isLoading = ref(false);
    // 表单状态：complete 完成，incomplete 未完成
    const status = ref('incomplete');
    // 提取路由中的 params
    const getParams = () => {
      // 强转类型
      type.value = router.currentRoute.value.meta.type as string;
      if (type.value === 'update') {
        // 若 params 有 id，则是合法访问
        if (router.currentRoute.value.params.id !== undefined) {
          const { ...tempParams } = router.currentRoute.value.params;
          state.form = tempParams;
        } else {
          // 非法访问更新界面
          illegalVisit();
          // 设置全局路由守卫，当 meta.type = 'update' 时
          // 判断 route.params.id 是否存在，不存在则返回上个界面并弹出警告提示
          // 返回上一页
          back();
        }
      }
    };
    // 提交表单
    const submit = () => {
      console.log('submit');
      // 表单验证
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          isLoading.value = true;
          if (type.value === 'add') {
            datasetHttp.createDataset(state.form)
              .then((response: any) => {
                console.log(response);
                // 成功后进入成功界面
                status.value = 'complete';
              })
              .finally(() => {
                isLoading.value = false;
              });
          } else if (type.value === 'update') {
            datasetHttp.updateDataset(state.form)
              .then((response: any) => {
                console.log(response);
                status.value = 'complete';
              })
              .finally(() => {
                isLoading.value = false;
              });
          }
        }
      });
    };
    // 返回上一个界面
    const back = () => {
      console.log('back');
      router.go(-1);
    };
    // 继续新增
    const keep = () => {
      console.log('keep');
      // 重置表单
      state.formRef.resetFields();
      // 返回到新增界面
      status.value = 'incomplete';
    };
    return {
      // 解构后创建对象的响应式数据
      ...toRefs(state),
      type,
      isLoading,
      status,
      submit,
      back,
      keep
    };
  }
});
</script>

<style lang="scss" scoped>
.form_title-common {
  font-size: 28px;
  font-weight: 600;
}
.form-common {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input-common {
  width: 30vw;
}
</style>
