<template>
  <el-form
    ref="formRef"
    class="form-common"
    size="small"
    :rules="rules"
    :model="form"
    label-width="130px"
    v-show="status === 'incomplete'"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="病害名称：" prop="name">
          <el-input
            class="input-common"
            v-model="form.name"
            placeholder="请输入病害名称"
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
    <el-row :gutter="20" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="影响植物：" prop="affectedPlants">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入影响植物"
            clearable
            v-model="form.affectedPlants"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="病原信息：" prop="pathogen">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入病原信息"
            clearable
            v-model="form.pathogen"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="危害表现：" prop="description">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入危害表现"
            clearable
            v-model="form.description"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发病规律：" prop="regularity">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入发病规律"
            clearable
            v-model="form.regularity"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="发病季节：" prop="seasons">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入发病季节"
            clearable
            v-model="form.seasons"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
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
        <el-form-item label="治理建议：" prop="suggestion">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入治理建议"
            clearable
            v-model="form.suggestion"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item label="上传病害图集：">
          <el-upload
            ref="uploadRef"
            action=""
            :auto-upload="false"
            list-type="picture"
            :limit="10"
            :on-change="onChange"
            :before-remove="beforeRemove"
          >
            <el-button size="small" type="primary">
              点击上传
            </el-button>
            <template #tip>
              <div>
                最多上传十张图片
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
import { diseaseHttp, diseaseParams } from '@/api/disease';
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
        overview: [],
        damagedParts: [],
        affectedPlants: '',
        pathogen: '',
        description: '',
        regularity: '',
        seasons: '',
        regions: '',
        suggestion: ''
      } as diseaseParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入病害名称', trigger: ['blur', 'change'] }
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
      status: 'incomplete',
      fileImg: [] as Array<any>
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
            diseaseHttp.createDisease(state.form)
              .then(() => {
                if (state.fileImg.length === 0) {
                  state.status = 'complete';
                } else {
                  diseaseHttp.uploadImg(state.form, state.fileImg)
                    .then(() => {
                      state.status = 'complete';
                    });
                }
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            diseaseHttp.updateDisease(state.form)
              .then(() => {
                if (state.fileImg.length === 0) {
                  state.status = 'complete';
                } else {
                  diseaseHttp.uploadImg(state.form, state.fileImg)
                    .then(() => {
                      state.status = 'complete';
                    });
                }
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
        path: '/admin/disease/diseaseManagement',
        name: 'diseaseManagement',
        params: {
          type: 'refresh'
        }
      });
    };
    const keep = () => {
      state.formRef.resetFields();
      state.status = 'incomplete';
    };
    const onChange = (file: any, fileList: any) => {
      state.fileImg = fileList;
    };
    const beforeRemove = () => {
      state.fileImg = [];
    };

    return {
      ...toRefs(state),
      submit,
      back,
      keep,
      damagedPartsOptions,
      overviewOptions,
      onChange,
      beforeRemove
    };
  }
});
</script>

<style lang="scss" scoped></style>
