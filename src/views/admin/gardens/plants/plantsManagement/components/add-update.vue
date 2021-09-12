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
          <el-form-item label="植物名称：" prop="name">
            <el-input
              class="input-common"
              v-model="form.name"
              placeholder="请输入植物名称"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="植物学名：" prop="scientificName">
            <el-input
              class="input-common"
              v-model="form.scientificName"
              placeholder="请输入植物学名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="植物别名：" prop="nickname">
            <el-input
              class="input-common"
              v-model="form.nickname"
              placeholder="请输入植物别名"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="植物科类：" prop="family">
            <FamilyPagingSelect
              class="select-common"
              :defaultValue="form.family"
              @selectChange="familyChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="植物属类：" prop="genus">
            <GenusPagingSelect
              class="select-common"
              :defaultValue="form.genus"
              :family="form.family"
              @selectChange="genusChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="base-card">
      <template #header>
        <span>
          园林植物分类信息
        </span>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="植物功能性状：" prop="function">
            <el-select
              class="select-common"
              clearable
              v-model="form.plantsClassify.function"
              placeholder="请选择"
            >
              <el-option
                v-for="item in functionOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="植物观赏特性：" prop="enjoy">
            <el-select
              class="select-common"
              clearable
              v-model="form.plantsClassify.enjoy"
              placeholder="请选择"
            >
              <el-option
                v-for="item in enjoyOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="园林植物分类：" prop="garden">
            <el-select
              class="select-common"
              clearable
              v-model="form.plantsClassify.garden"
              placeholder="请选择"
            >
              <el-option
                v-for="item in gardenOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="木本植物性状：" prop="woody">
            <el-select
              class="select-common"
              clearable
              v-model="form.plantsClassify.woody"
              placeholder="请选择"
            >
              <el-option
                v-for="item in woodyOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="草本植物性状：" prop="herbaceous">
            <el-select
              class="select-common"
              clearable
              v-model="form.plantsClassify.herbaceous"
              placeholder="请选择"
            >
              <el-option
                v-for="item in herbaceousOptions"
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
          <el-form-item label="外貌形态：" prop="appearance">
            <v-md-editor v-model="form.appearance" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="习性：" prop="behaviour">
            <v-md-editor v-model="form.behaviour" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="用途：" prop="usages">
            <v-md-editor v-model="form.usages" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="地域分布：" prop="regions">
            <v-md-editor v-model="form.regions" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="繁殖方式：" prop="reproduceMethod">
            <v-md-editor v-model="form.reproduceMethod" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="栽培方式：" prop="cultureMethod">
            <v-md-editor v-model="form.cultureMethod" />
          </el-form-item>
        </el-col>
      </el-row>
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
import { plantsHttp, plantsParams } from '@/api/plants';
import { useRoute, useRouter } from 'vue-router';
import { illegalVisit } from '@/utils/global';
import FamilyPagingSelect from '@/components/pages/family/FamilyPagingSelect.vue';
import GenusPagingSelect from '@/components/pages/genus/GenusPagingSelect.vue';

export default defineComponent({
  name: 'add-update',
  components: { FamilyPagingSelect, GenusPagingSelect },
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
        scientificName: '',
        nickname: '',
        family: undefined,
        genus: undefined,
        plantsClassify: {
          function: '',
          enjoy: '',
          garden: '',
          woody: '',
          herbaceous: ''
        },
        appearance: '',
        behaviour: '',
        usages: '',
        regions: '',
        reproduceMethod: '',
        cultureMethod: ''
      } as plantsParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入植物名称', trigger: ['blur', 'change'] }
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
      isLoading: false,
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete'
    });
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
    const functionOptions: Array<any> = reactive([
      {
        value: '耐阴树种'
      },
      {
        value: '抗旱树种'
      },
      {
        value: '耐水湿树种'
      },
      {
        value: '耐盐碱树种'
      },
      {
        value: '抗污染树种'
      }
    ]);
    const enjoyOptions: Array<any> = reactive([
      {
        value: '观叶植物'
      },
      {
        value: '观花植物'
      },
      {
        value: '观果植物'
      },
      {
        value: '招鸟植物'
      },
      {
        value: '多肉植物'
      },
      {
        value: '水培植物'
      },
      {
        value: '食肉植物'
      }
    ]);
    const gardenOptions: Array<any> = reactive([
      {
        value: '常绿灌木'
      },
      {
        value: '落叶灌木'
      },
      {
        value: '藤本植物'
      },
      {
        value: '草坪及地被植物'
      },
      {
        value: '竹类植物'
      },
      {
        value: '常绿乔木及小乔木'
      },
      {
        value: '落叶乔木及小乔木'
      }
    ]);
    const woodyOptions: Array<any> = reactive([
      {
        value: '常绿针叶'
      },
      {
        value: '常绿阔叶'
      },
      {
        value: '落叶阔叶'
      },
      {
        value: '竹类'
      },
      {
        value: '藤木'
      }
    ]);
    const herbaceousOptions: Array<any> = reactive([
      {
        value: '一二年生花卉'
      },
      {
        value: '宿根花卉'
      },
      {
        value: '球根花卉'
      },
      {
        value: '水生花卉'
      },
      {
        value: '草坪地被'
      }
    ]);

    // 提取路由中的 params
    const getParams = () => {
      if (route.path.split('/').slice(-1)[0] === 'update') {
        // 若 params 有 id，则是合法访问
        if (route.params.id !== undefined) {
          state.type = 'update';
          const { ...tempParams } = route.params;
          tempParams.plantsClassify = JSON.parse(tempParams.plantsClassify as string);
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
            plantsHttp.createPlants(state.form)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            plantsHttp.updatePlants(state.form)
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
        path: '/admin/gardens/plantsManagement',
        name: 'plantsManagement',
        params: {
          type: 'refresh'
        }
      });
    };
    const keep = () => {
      state.formRef.resetFields();
      // 重置植物园林信息
      state.form.plantsClassify = {};
      state.status = 'incomplete';
    };
    const familyChange = (params: any) => {
      state.form.family = params;
    };
    const genusChange = (params: any) => {
      console.log(params);
      state.form.genus = params;
    };

    return {
      ...toRefs(state),
      submit,
      back,
      keep,
      genusOptions,
      functionOptions,
      enjoyOptions,
      gardenOptions,
      woodyOptions,
      herbaceousOptions,
      familyChange,
      genusChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
