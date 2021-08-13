<template>
  <!-- <el-page-header @back="back" content="详情页面"></el-page-header> -->
  <el-header class="form_title-common">
    <span v-show="type === 'add'">
      新增虫害
    </span>
    <span v-show="type === 'update'">
      更新虫害
    </span>
  </el-header>
  <el-form
    ref="formRef"
    class="form-common"
    size="small"
    :rules="rules"
    :model="form"
    label-width="140px"
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
    <el-form-item label="虫害名称：" prop="name">
      <el-input
        class="input-common"
        v-model="form.name"
        placeholder="请输入虫害名称"
      />
    </el-form-item>
    <el-form-item label="危害部位：" prop="damagedParts">
      <el-select
        class="select-common"
        v-model="damagedPartsSelected"
        multiple
        placeholder="请选择"
        @change="damagedPartsChange"
      >
        <el-option
          v-for="item in damagedPartsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="危害表现：" prop="description">
      <el-select
        class="select-common"
        v-model="descriptionSelected"
        multiple
        placeholder="请选择"
        @change="descriptionChange"
      >
        <el-option
          v-for="item in descriptionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发病季节：" prop="seasons">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.seasons"
        placeholder="请输入发病季节"
      />
    </el-form-item>
    <el-form-item label="分布地域：" prop="regions">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.regions"
        placeholder="请输入分布地域"
      />
    </el-form-item>
    <el-form-item label="虫害概述：" prop="overview">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.overview"
        placeholder="请输入虫害概述"
      />
    </el-form-item>
    <el-form-item label="形态特征：" prop="appearance">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.appearance"
        placeholder="请输入形态特征"
      />
    </el-form-item>
    <el-form-item label="发病规律：" prop="regularity">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.regularity"
        placeholder="请输入发病规律"
      />
    </el-form-item>
    <el-form-item label="治理建议：" prop="suggestion">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.suggestion"
        placeholder="请输入治理建议"
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
import { pestHttp, pestParams } from '@/api/pest';
import { useRouter } from 'vue-router';
import { illegalVisit } from '@/utils/global';

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
        name: undefined,
        overview: undefined,
        appearance: undefined,
        damagedParts: undefined,
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
            if (state.damagedPartsSelected.length === 0) {
              callback(new Error('请选择危害部位'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }],
        description: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.descriptionSelected.length === 0) {
              callback(new Error('请选择危害表现'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }],
        seasons: [
          { required: true, message: '请输入发病季节', trigger: ['blur', 'change'] }
        ],
        regions: [
          { required: true, message: '请输入分布地域', trigger: ['blur', 'change'] }
        ],
        overview: [
          { required: true, message: '请输入虫害概述', trigger: ['blur', 'change'] }
        ],
        appearance: [
          { required: true, message: '请输入形态特征', trigger: ['blur', 'change'] }
        ],
        regularity: [
          { required: true, message: '请输入发病规律', trigger: ['blur', 'change'] }
        ],
        suggestion: [
          { required: true, message: '请输入治理建议', trigger: ['blur', 'change'] }
        ]
      },
      descriptionSelected: [] as Array<any>,
      damagedPartsSelected: [] as Array<any>
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
      type.value = router.currentRoute.value.meta.type as string;
      if (type.value === 'update') {
        // 若 params 有 id，则是合法访问
        if (router.currentRoute.value.params.id !== undefined) {
          const { ...tempParams } = router.currentRoute.value.params;
          state.form = tempParams;
          state.damagedPartsSelected = state.form.damagedParts === undefined ? [] : state.form.damagedParts.split(',');
          state.descriptionSelected = state.form.description === undefined ? [] : state.form.description.split(',');
        } else {
          // 非法访问更新界面
          illegalVisit();
          // 设置全局路由守卫，当 meta.type = 'update' 时
          // 判断 route.params.id 是否存在，不存在则返回上个界面并弹出警告提示
          // 返回上一页
          router.go(-1);
        }
      }
    };
    const damagedPartsOptions: Array<any> = reactive([
      {
        value: 'root',
        label: '根'
      },
      {
        value: 'stem',
        label: '茎'
      },
      {
        value: 'leaf',
        label: '叶'
      },
      {
        value: 'flower',
        label: '花'
      },
      {
        value: 'fruit',
        label: '果实'
      }
    ]);
    const descriptionOptions: Array<any> = reactive([
      {
        value: 'corruption',
        label: '腐败'
      },
      {
        value: 'discoloration',
        label: '变色'
      },
      {
        value: 'necrosis',
        label: '坏死'
      },
      {
        value: 'wilt',
        label: '萎蔫'
      },
      {
        value: 'malformation',
        label: '畸形'
      },
      {
        value: 'eating',
        label: '被害虫食用'
      }
    ]);
    // 提交表单
    const submit = () => {
      console.log('submit');
      // 表单验证
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          isLoading.value = true;
          if (type.value === 'add') {
            pestHttp.createPest(state.form)
              .then((response: any) => {
                console.log(response);
                // 成功后进入成功界面
                status.value = 'complete';
              })
              .finally(() => {
                isLoading.value = false;
              });
          } else if (type.value === 'update') {
            pestHttp.updatePest(state.form)
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
      router.push({
        path: '/admin/pestManagement',
        name: 'pestManagement',
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
      state.descriptionSelected = [];
      state.damagedPartsSelected = [];
    };
    const damagedPartsChange = () => {
      state.form.damagedParts = state.damagedPartsSelected.join(',');
    };
    const descriptionChange = () => {
      state.form.description = state.descriptionSelected.join(',');
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
      damagedPartsOptions,
      descriptionOptions,
      damagedPartsChange,
      descriptionChange
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
.select-common {
  width: 30vw;
}
</style>
