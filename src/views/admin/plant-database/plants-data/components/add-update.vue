<template>
  <!-- <el-page-header @back="back" content="详情页面"></el-page-header> -->
  <el-header class="form_title-common">
    <span v-show="type === 'add'">
      新增植物资料
    </span>
    <span v-show="type === 'update'">
      更新植物资料
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
    <el-form-item label="植物名称：" prop="name">
      <el-input
        class="input-common"
        v-model="form.name"
        placeholder="请输入植物名称"
      />
    </el-form-item>
    <el-form-item label="植物学名：" prop="scientificName">
      <el-input
        class="input-common"
        v-model="form.scientificName"
        placeholder="请输入植物学名"
      />
    </el-form-item>
    <el-form-item label="植物别名：" prop="nickname">
      <el-input
        class="input-common"
        v-model="form.nickname"
        placeholder="请输入植物别名"
      />
    </el-form-item>
    <el-form-item label="植物科类：" prop="family">
      <el-select
        class="select-common"
        v-model="form.family"
        placeholder="请选择"
      >
        <el-option
          v-for="item in familyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="植物属类：" prop="genus">
      <el-select
        class="select-common"
        v-model="form.genus"
        placeholder="请选择"
      >
        <el-option
          v-for="item in genusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 园林植物分类 -->
    <el-form-item label="植物功能性状：" prop="function">
      <el-select
        class="select-common"
        v-model="functionSelected"
        multiple
        placeholder="请选择"
        @change="functionChange"
      >
        <el-option
          v-for="item in functionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="植物观赏特性：" prop="enjoy">
      <el-select
        class="select-common"
        v-model="enjoySelected"
        multiple
        placeholder="请选择"
        @change="enjoyChange"
      >
        <el-option
          v-for="item in enjoyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="园林植物分类：" prop="garden">
      <el-select
        class="select-common"
        v-model="gardenSelected"
        multiple
        placeholder="请选择"
        @change="gardenChange"
      >
        <el-option
          v-for="item in gardenOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="木本植物性状：" prop="woody">
      <el-select
        class="select-common"
        v-model="woodySelected"
        multiple
        placeholder="请选择"
        @change="woodyChange"
      >
        <el-option
          v-for="item in woodyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="草本植物性状：" prop="herbaceous">
      <el-select
        class="select-common"
        v-model="herbaceousSelected"
        multiple
        placeholder="请选择"
        @change="herbaceousChange"
      >
        <el-option
          v-for="item in herbaceousOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!--  -->
    <el-form-item label="外貌形态：" prop="appearance">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.appearance"
        placeholder="请输入外貌形态"
      />
    </el-form-item>
    <el-form-item label="植物习性：" prop="behaviour">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.behaviour"
        placeholder="请输入植物习性"
      />
    </el-form-item>
    <el-form-item label="植物用途：" prop="usages">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.usages"
        placeholder="请输入植物用途"
      />
    </el-form-item>
    <el-form-item label="地域分布：" prop="regions">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.regions"
        placeholder="请输入地域分布"
      />
    </el-form-item>
    <el-form-item label="繁殖方式：" prop="reproduceMethod">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.reproduceMethod"
        placeholder="请输入繁殖方式"
      />
    </el-form-item>
    <el-form-item label="栽培方式：" prop="cultureMethod">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2 }"
        class="input-common"
        v-model="form.cultureMethod"
        placeholder="请输入栽培方式"
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
import { plantsHttp, plantsParams } from '@/api/plants';
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
        scientificName: undefined,
        nickname: undefined,
        family: undefined,
        genus: undefined,
        plantsClassify: {
          function: undefined,
          enjoy: undefined,
          garden: undefined,
          woody: undefined,
          herbaceous: undefined
        },
        appearance: undefined,
        behaviour: undefined,
        usages: undefined,
        regions: undefined,
        reproduceMethod: undefined,
        cultureMethod: undefined
      } as plantsParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入植物名称', trigger: ['blur', 'change'] }
        ],
        scientificName: [
          { required: true, message: '请输入植物学名', trigger: ['blur', 'change'] }
        ],
        nickname: [
          { required: true, message: '请输入植物别名', trigger: ['blur', 'change'] }
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
      functionSelected: [] as Array<any>,
      enjoySelected: [] as Array<any>,
      gardenSelected: [] as Array<any>,
      woodySelected: [] as Array<any>,
      herbaceousSelected: [] as Array<any>
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
          // state.familySelected = state.form.family === undefined ? [] : state.form.family.split(',');
          // state.genusSelected = state.form.genus === undefined ? [] : state.form.genus.split(',');
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
    const familyOptions: Array<any> = reactive([
      {
        value: 'Aceraceae',
        label: '槭树科'
      },
      {
        value: 'Actinidiaceae',
        label: '猕猴桃科'
      },
      {
        value: 'Adoxaceae',
        label: '五福花科'
      },
      {
        value: 'Agavaceae',
        label: '龙舌兰科'
      },
      {
        value: 'Aizoaceae',
        label: '番杏科'
      }
    ]);
    const genusOptions: Array<any> = reactive([
      {
        value: 'HemigraphisNees',
        label: '半柱花属'
      },
      {
        value: 'HygrophilaR.B r.',
        label: '水蓑衣属'
      },
      {
        value: 'HypoestesSoland.',
        label: '枪刀药属'
      },
      {
        value: 'KudoacanthusHosokawa',
        label: '银脉爵床属'
      },
      {
        value: 'LepidagathisWilld.',
        label: '鳞花草属'
      }
    ]);
    const functionOptions: Array<any> = reactive([
      {
        value: 'Shade tolerant tree species',
        label: '耐阴树种'
      },
      {
        value: 'Drought resistant tree species',
        label: '抗旱树种'
      },
      {
        value: 'Moisture tolerant tree species',
        label: '耐水湿树种'
      },
      {
        value: 'Saline alkali tolerant tree species',
        label: '耐盐碱树种'
      },
      {
        value: 'Anti pollution tree species',
        label: '抗污染树种'
      }
    ]);
    const enjoyOptions: Array<any> = reactive([
      {
        value: 'Foliage plants',
        label: '观叶植物'
      },
      {
        value: 'Flowering plants',
        label: '观花植物'
      },
      {
        value: 'Fruit plant',
        label: '观果植物'
      },
      {
        value: 'Bird attracting plant',
        label: '招鸟植物'
      },
      {
        value: 'Succulent plants',
        label: '多肉植物'
      },
      {
        value: 'Hydroponics flower',
        label: '水培植物'
      },
      {
        value: 'Carnivorous plant',
        label: '食肉植物'
      }
    ]);
    const gardenOptions: Array<any> = reactive([
      {
        value: 'Evergreen shrub',
        label: '常绿灌木'
      },
      {
        value: 'Deciduous shrub',
        label: '落叶灌木'
      },
      {
        value: 'vine',
        label: '藤本植物'
      },
      {
        value: 'Lawn and ground cover plants',
        label: '草坪及地被植物'
      },
      {
        value: 'Bamboo plants',
        label: '竹类植物'
      },
      {
        value: 'Evergreen trees and small trees',
        label: '常绿乔木及小乔木'
      },
      {
        value: 'Deciduous trees and small trees',
        label: '落叶乔木及小乔木'
      }
    ]);
    const woodyOptions: Array<any> = reactive([
      {
        value: 'Evergreen needle',
        label: '常绿针叶'
      },
      {
        value: 'Evergreen broad-leaved',
        label: '常绿阔叶'
      },
      {
        value: 'Deciduous broad leaf',
        label: '落叶阔叶'
      },
      {
        value: 'Bamboo',
        label: '竹类'
      },
      {
        value: 'Rattan',
        label: '藤木'
      }
    ]);
    const herbaceousOptions: Array<any> = reactive([
      {
        value: 'Biennial flowers',
        label: '一二年生花卉'
      },
      {
        value: 'Perennial flowers',
        label: '宿根花卉'
      },
      {
        value: 'Flower bulbs',
        label: '球根花卉'
      },
      {
        value: 'Aquatic flowers',
        label: '水生花卉'
      },
      {
        value: 'Lawn ground cover.',
        label: '草坪地被'
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
            plantsHttp.createPlants(state.form)
              .then((response: any) => {
                console.log(response);
                // 成功后进入成功界面
                status.value = 'complete';
              })
              .finally(() => {
                isLoading.value = false;
              });
          } else if (type.value === 'update') {
            plantsHttp.updatePlants(state.form)
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
        path: '/admin/plantsData',
        name: 'plantsData',
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
    const functionChange = () => {
      if (state.form.plantsClassify) {
        state.form.plantsClassify.function = state.functionSelected.join(',');
      }
    };
    const enjoyChange = () => {
      if (state.form.plantsClassify) {
        state.form.plantsClassify.function = state.enjoySelected.join(',');
      }
    };
    const gardenChange = () => {
      if (state.form.plantsClassify) {
        state.form.plantsClassify.garden = state.gardenSelected.join(',');
      }
    };
    const woodyChange = () => {
      if (state.form.plantsClassify) {
        state.form.plantsClassify.woody = state.woodySelected.join(',');
      }
    };
    const herbaceousChange = () => {
      if (state.form.plantsClassify) {
        state.form.plantsClassify.herbaceous = state.herbaceousSelected.join(',');
      }
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
      familyOptions,
      genusOptions,
      functionOptions,
      enjoyOptions,
      gardenOptions,
      woodyOptions,
      herbaceousOptions,
      functionChange,
      enjoyChange,
      gardenChange,
      woodyChange,
      herbaceousChange
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
