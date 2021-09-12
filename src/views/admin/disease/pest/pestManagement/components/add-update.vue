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
          <el-form-item label="虫害名称：" prop="name">
            <el-input
              class="input-common"
              v-model="form.name"
              placeholder="请输入虫害名称"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="危害概述：" prop="overview">
            <el-select
              class="select-common"
              v-model="form.overview"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in overviewOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="危害部位：" prop="damagedParts">
            <el-select
              class="select-common"
              v-model="form.damagedParts"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in damagedPartsOptions"
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
        <el-col :span="24">
          <el-form-item label="影响植物：" prop="affectedPlants">
            <v-md-editor v-model="form.affectedPlants" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="形态特征：" prop="appearance">
            <v-md-editor v-model="form.appearance" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="危害表现：" prop="description">
            <v-md-editor v-model="form.description" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="发病规律：" prop="regularity">
            <v-md-editor v-model="form.regularity" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="发病季节：" prop="seasons">
            <v-md-editor v-model="form.seasons" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="分布地域：" prop="regions">
            <v-md-editor v-model="form.regions" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="治理建议：" prop="suggestion">
            <v-md-editor v-model="form.suggestion" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item label="病害图集：" prop="file">
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

import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { pestHttp, pestParams } from '@/api/pest';
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
        overview: undefined,
        damagedParts: undefined,
        affectedPlants: undefined,
        appearance: undefined,
        description: undefined,
        regularity: undefined,
        seasons: undefined,
        regions: undefined,
        suggestion: undefined
      } as pestParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入虫害名称', trigger: ['blur', 'change'] }
        ],
        damagedParts: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.damagedParts?.length === 0) {
              callback(new Error('请选择危害部位'));
            } else {
              callback();
            }
          },
          trigger: ['blur']
        }],
        overview: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.overview?.length === 0) {
              callback(new Error('请选择危害概述'));
            } else {
              callback();
            }
          },
          trigger: ['blur']
        }]
      },
      // 界面类型：add 新增，update 更新
      type: '',
      isLoading: false,
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete'
    });
    const damagedPartsOptions: Array<any> = reactive([
      {
        value: '根'
      },
      {
        value: '茎'
      },
      {
        value: '叶'
      },
      {
        value: '花'
      },
      {
        value: '果实'
      }
    ]);
    const overviewOptions: Array<any> = reactive([
      {
        value: '腐败'
      },
      {
        value: '变色'
      },
      {
        value: '坏死'
      },
      {
        value: '萎蔫'
      },
      {
        value: '畸形'
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
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (route.path.split('/').slice(-1)[0] === 'add') {
            pestHttp.createPest(state.form)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            pestHttp.updatePest(state.form)
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
        path: '/admin/disease/pestManagement',
        name: 'pestManagement',
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
      keep,
      damagedPartsOptions,
      overviewOptions
    };
  }
});
</script>

<style lang="scss" scoped></style>
