<template>
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
          基础信息
        </span>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="ID：" prop="id">
            <el-input
              class="input-common"
              v-model="form.id"
              placeholder="自动生成"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="视频名称：" prop="name">
            <el-input
              class="input-common"
              v-model="form.name"
              placeholder="请输入视频名称"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="视频类型：" prop="type">
            <el-select
              class="select-common"
              v-model="form.type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="植物名称：" prop="plantName">
            <el-select
              class="select-common"
              v-model="form.plantName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in plantNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标签：" prop="tag">
            <el-input
              class="input-common"
              v-model="form.tag"
              placeholder="请输入标签"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="上传视频：" prop="file">
            <el-upload
              class="upload-common"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
            >
              <i class="el-icon-plus upload-icon"></i>
            </el-upload>
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
      // getParams();
    });
    // 表单内容
    const state = reactive({
      form: {
        id: undefined,
        name: undefined,
        type: undefined,
        plantName: undefined,
        tag: undefined
      },
      // } as diseaseParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入病害名称', trigger: ['blur', 'change'] }
        ],
        type: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.type === undefined) {
              callback(new Error('请选择视频类型'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }],
        plantName: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.plantName === undefined) {
              callback(new Error('请选择植物名称'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      }
    });
    // 界面类型：add 新增，update 更新
    const type = ref('');
    // 加载中
    const isLoading = ref(false);
    // 表单状态：complete 完成，incomplete 未完成
    const status = ref('incomplete');
    // 提取路由中的 params
    // const getParams = () => {
    //   // 强转类型
    //   type.value = router.currentRoute.value.meta.type as string;
    //   if (type.value === 'update') {
    //     // 若 params 有 id，则是合法访问
    //     if (router.currentRoute.value.params.id !== undefined) {
    //       const { ...tempParams } = router.currentRoute.value.params;
    //       state.form = tempParams;
    //       state.typeSelect = state.form.type === undefined ? [] : state.form.type.split(',');
    //       state.plantNameSelect = state.form.plantName === undefined ? [] : state.form.plantName.split(',');
    //     } else {
    //       // 非法访问更新界面
    //       illegalVisit();
    //       // 设置全局路由守卫，当 meta.type = 'update' 时
    //       // 判断 route.params.id 是否存在，不存在则返回上个界面并弹出警告提示
    //       // 返回上一页
    //       router.go(-1);
    //     }
    //   }
    // };
    const typeOptions: Array<any> = reactive([
      {
        value: 'avi',
        label: 'avi'
      },
      {
        value: 'mp4',
        label: 'mp4'
      },
      {
        value: 'mov',
        label: 'mov'
      },
      {
        value: 'f4v',
        label: 'f4v'
      },
      {
        value: '3gp',
        label: '3gp'
      }
    ]);
    const plantNameOptions: Array<any> = reactive([
      {
        value: 'Pinus armandii',
        label: '华山松'
      },
      {
        value: 'Sabina vulgaris',
        label: '地柏'
      }
    ]);
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
        path: '/admin/gardens/videoManagement',
        name: 'videoManagement',
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
      keep,
      typeOptions,
      plantNameOptions
    };
  }
});
</script>

<style lang="scss" scoped></style>
