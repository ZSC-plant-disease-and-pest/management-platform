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
          <el-form-item label="植物数据集名称：" prop="name">
            <el-input
              class="input-common"
              v-model="form.name"
              placeholder="请输入植物数据集名称"
              v-if="type === 'add'"
            />
            <el-input
              class="input-common"
              v-model="form.newName"
              placeholder="请输入植物数据集名称"
              v-if="type === 'update'"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="type === 'add'">
        <el-col :span="12">
          <el-form-item label="植物科类：" prop="family">
            <el-select
              class="select-common"
              v-model="form.family"
              placeholder="请选择"
            >
              <el-option
                v-for="item in familyOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="植物属类：" prop="genus">
            <el-select
              class="select-common"
              v-model="form.genus"
              placeholder="请选择"
            >
              <el-option
                v-for="item in genusOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="detail-card">
      <template #header>
        <span>
          详细信息
        </span>
      </template>
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item label="植物图集：" prop="file">
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
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item label="导入压缩文件：" prop="file">
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
import { datasetHttp, datasetParams } from '@/api/dataset';
import { useRoute, useRouter } from 'vue-router';
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
        name: undefined,
        newName: undefined,
        family: undefined,
        genus: undefined
      } as datasetParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入植物数据集名称', trigger: ['blur', 'change'] }
        ],
        family: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.family === '' || state.form.family === undefined) {
              callback(new Error('请选择植物科类'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }],
        genus: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.genus === '' || state.form.genus === undefined) {
              callback(new Error('请选择植物属类'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      // 界面类型：add 新增，update 更新
      type: '',
      // 是否加载中
      isLoading: false,
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete'
    });
    const familyOptions: Array<any> = reactive([
      {
        value: '槭树科'
      },
      {
        value: '猕猴桃科'
      },
      {
        value: '五福花科'
      },
      {
        value: '龙舌兰科'
      },
      {
        value: '番杏科'
      }
    ]);
    const genusOptions: Array<any> = reactive([
      {
        value: '半柱花属'
      },
      {
        value: '水蓑衣属'
      },
      {
        value: '枪刀药属'
      },
      {
        value: '银脉爵床属'
      },
      {
        value: '鳞花草属'
      }
    ]);

    // 提取路由中的 params
    const getParams = () => {
      if (route.path.split('/').slice(-1)[0] === 'update') {
        // 若 params 有 id，则是合法访问
        if (route.params.id !== undefined) {
          state.type = 'update';
          const { ...tempParams } = route.params;
          state.form = tempParams;
          state.form.newName = state.form.name;
          // console.log(tempParams);
        } else {
          // 非法访问更新界面
          illegalVisit();
          router.go(-1);
        }
      } else {
        state.type = 'add';
      }
    };
    // 提交表单
    const submit = () => {
      // 表单验证
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (route.path.split('/').slice(-1)[0] === 'add') {
            datasetHttp.createPlantsDataset(state.form)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            datasetHttp.updatePlantsDataset(state.form)
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
    // 返回上一个界面
    const back = () => {
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
      // 重置表单
      state.formRef.resetFields();
      // 返回到新增界面
      state.status = 'incomplete';
    };
    return {
      // 解构后创建对象的响应式数据
      ...toRefs(state),
      submit,
      back,
      keep,
      familyOptions,
      genusOptions
    };
  }
});
</script>

<style lang="scss" scoped>
.form-common {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .base-card {
    width: 100%;
    margin: 0px auto 25px;
  }

  .detail-card {
    width: 100%;
    margin: 0 auto;
  }
}
.input-common {
  width: 90%;
}
.select-common {
  width: 90%;
}
.upload-common {
  width: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
}
</style>
