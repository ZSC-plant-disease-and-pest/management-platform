<template>
  <el-form
    ref="formRef"
    size="small"
    :rules="rules"
    :model="form"
    label-width="140px"
    v-show="status === 'incomplete'"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <el-card
      style="
        width: 650px;
        margin: 0px auto 25px;
      "
    >
      <template #header>
        <span>
          基础信息
        </span>
      </template>
      <el-form-item label="植物类别名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入植物类别名称"
          style="width: 30vw;"
        />
      </el-form-item>
      <el-form-item label="图片文件上传：" prop="file">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          style="
            width: 178px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          "
        >
          <i
            class="el-icon-plus"
            style="
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            "
          >
          </i>
        </el-upload>
      </el-form-item>
      <el-form-item label="导入压缩文件：">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <el-button size="small" type="warning">
            导入压缩文件
          </el-button>
          <template #tip>
            <div>
              只能导入 zip 文件
            </div>
          </template>
        </el-upload>
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
    </el-card>
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
// import { diseaseHttp, diseaseParams } from '@/api/disease';
import { useRouter } from 'vue-router';
// import { illegalVisit } from '@/utils/global';

export default defineComponent({
  name: 'add-update',
  setup () {
    // 获取路由
    const router = useRouter();
    // 渲染前
    onBeforeMount(() => {
      getParams();
    });
    // 表单内容
    const state = reactive({
      form: {
        id: undefined,
        name: undefined
      },
      // } as diseaseParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入植物名称', trigger: ['blur', 'change'] }
        ]
      }
    });
    // 界面类型：add 新增，update 更新
    const type = ref('');
    // 加载中
    const isLoading = ref(false);
    // 表单状态：complete 完成，incomplete 未完成
    const status = ref('incomplete');
    // 提取路由中的 params
    const getParams = () => {
      // 强转类型
      // type.value = router.currentRoute.value.meta.type as string;
      // if (type.value === 'update') {
      //   // 若 params 有 id，则是合法访问
      //   if (router.currentRoute.value.params.id !== undefined) {
      //     const { ...tempParams } = router.currentRoute.value.params;
      //     state.form = tempParams;
      //     state.damagedPartsSelect = state.form.damagedParts === undefined ? [] : state.form.damagedParts.split(',');
      //     state.descriptionSelect = state.form.description === undefined ? [] : state.form.description.split(',');
      //   } else {
      //     // 非法访问更新界面
      //     illegalVisit();
      //     // 设置全局路由守卫，当 meta.type = 'update' 时
      //     // 判断 route.params.id 是否存在，不存在则返回上个界面并弹出警告提示
      //     // 返回上一页
      //     router.go(-1);
      //   }
      // }
    };
    // 提交表单
    const submit = () => {
      console.log('submit');
      // 表单验证
      // state.formRef.validate().then((valid: boolean) => {
      //   if (valid) {
      //     isLoading.value = true;
      //     if (type.value === 'add') {
      //       diseaseHttp.createDisease(state.form)
      //         .then((response: any) => {
      //           console.log(response);
      //           // 成功后进入成功界面
      //           status.value = 'complete';
      //         })
      //         .finally(() => {
      //           isLoading.value = false;
      //         });
      //     } else if (type.value === 'update') {
      //       diseaseHttp.updateDisease(state.form)
      //         .then((response: any) => {
      //           console.log(response);
      //           status.value = 'complete';
      //         })
      //         .finally(() => {
      //           isLoading.value = false;
      //         });
      //     }
      //   }
      // });
    };
    // 返回上一个界面
    const back = () => {
      console.log('back');
      router.push({
        path: '/admin/recognition/plantsImageManagement',
        name: 'plantsImageManagement',
        params: {
          type: 'refresh'
        }
      });
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

<style lang="scss" scoped></style>
