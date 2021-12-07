<template>
  <el-form
    ref="formRef"
    class="form-common"
    v-loading="isLoading"
    :rules="rules"
    :model="form"
    size="small"
    label-width="130px"
    v-show="!completed"
  >
    <el-row :gutter="20">
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

    <el-row :gutter="20" class="textarea-row-space">
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

    <el-row :gutter="20" class="textarea-row-space">
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

    <el-row :gutter="0" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="外貌形态：" prop="appearance">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入外貌形态"
            clearable
            v-model="form.appearance"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="植物习性：" prop="behaviour">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入植物习性"
            clearable
            v-model="form.behaviour"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="0" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="植物用途：" prop="usages">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入植物用途"
            clearable
            v-model="form.usages"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地域分布：" prop="regions">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入地域分布"
            clearable
            v-model="form.regions"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="0" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="繁殖方式：" prop="reproduceMethod">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入繁殖方式"
            clearable
            v-model="form.reproduceMethod"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="栽培方式：" prop="cultureMethod">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入栽培方式"
            clearable
            v-model="form.cultureMethod"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="0" v-if="mode === 'new'">
      <el-col :span="24">
        <el-form-item label="上传图片：" prop="picture" >
          <BasicImageUpload
            ref="imageUploadRef"
            @onChange="fileListChange"
            @preview="filePreview"
          />
          <el-dialog v-model="imagePreviewDialog" title="查看图片">
            <img style="width: 100%; height: 75%;" :src="imagePreviewUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item>
          <el-button :loading="isLoading" @click="back">
            返回
          </el-button>
          <el-button type="primary" :loading="isLoading" @click="submit">
            提交
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <el-result
    v-show="completed"
    :title="mode === 'new' ? '新增成功' : '更新成功'"
    icon="success"
  >
    <template #extra>
      <el-button @click="back">
        返回
      </el-button>
      <el-button type="primary" @click="keep" v-show="mode === 'new'">
        继续新增
      </el-button>
    </template>
  </el-result>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { plantsHttp, plantsParams } from '@/api/plants';
import { useRouter, useRoute } from 'vue-router';
import { validateDamagedParts, validateOverview } from './rules';
import BasicImageUpload from '@/components/common/BasicImageUpload/index.vue';

const functionOptions = [
  { value: '耐阴树种' },
  { value: '抗旱树种' },
  { value: '耐水湿树种' },
  { value: '耐盐碱树种' },
  { value: '抗污染树种' }
];
const enjoyOptions = [
  { value: '观叶植物' },
  { value: '观花植物' },
  { value: '观果植物' },
  { value: '招鸟植物' },
  { value: '多肉植物' },
  { value: '水培植物' },
  { value: '食肉植物' }
];
const gardenOptions = [
  { value: '常绿灌木' },
  { value: '落叶灌木' },
  { value: '藤本植物' },
  { value: '草坪及地被植物' },
  { value: '竹类植物' },
  { value: '常绿乔木及小乔木' },
  { value: '落叶乔木及小乔木' }
];
const woodyOptions = [
  { value: '常绿针叶' },
  { value: '常绿阔叶' },
  { value: '落叶阔叶' },
  { value: '竹类' },
  { value: '藤木' }
];
const herbaceousOptions = [
  { value: '一二年生花卉' },
  { value: '宿根花卉' },
  { value: '球根花卉' },
  { value: '水生花卉' },
  { value: '草坪地被' }
];

export default defineComponent({
  name: 'exclude',
  components: { BasicImageUpload },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      state.mode = Number(route.params.id) === 0 ? 'new' : 'edit';
      getPlantsById(Number(route.params.id));
    });

    const state = reactive({
      form: {
        id: undefined,
        name: '',
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
      imageUploadRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入植物名称', trigger: ['blur', 'change'] }],
        damagedParts: [{ required: true, validator: validateDamagedParts, trigger: ['blur'] }],
        overview: [{ required: true, validator: validateOverview, trigger: ['blur'] }],
        picture: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileList.length === 0) {
              callback(new Error('请上传至少一张植物图片'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      functionOptions,
      enjoyOptions,
      gardenOptions,
      woodyOptions,
      herbaceousOptions,
      isLoading: false,
      mode: '',
      completed: false,
      fileList: [] as Array<any>,
      imagePreviewUrl: '',
      imagePreviewDialog: false
    });

    const getPlantsById = (id: number) => {
      if (id < 0) back();
      else if (id === 0) return 0;
      else {
        state.isLoading = true;
        plantsHttp.getPlantsById(id)
          .then((response: any) => { state.form = response; })
          .catch(() => { back(); })
          .finally(() => { state.isLoading = false; });
      }
    };

    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.mode === 'new') {
            plantsHttp.addPlants(state.form, state.fileList)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          } else if (state.mode === 'edit') {
            plantsHttp.updatePlants(state.form)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    const back = () => {
      router.push({
        path: '/admin/plants-data',
        name: 'plants-data',
        params: { type: 'refresh' }
      });
    };

    const keep = () => {
      state.formRef.resetFields();
      state.imageUploadRef.clear();
      state.completed = false;
    };

    const fileListChange = (fileList: Array<any>) => {
      state.fileList = fileList;
    };

    const filePreview = (file: any) => {
      state.imagePreviewUrl = file?.url;
      state.imagePreviewDialog = true;
    };

    return {
      ...toRefs(state),
      submit,
      back,
      keep,
      functionOptions,
      enjoyOptions,
      gardenOptions,
      woodyOptions,
      herbaceousOptions,
      fileListChange,
      filePreview
    };
  }
});
</script>

<style lang="scss" scoped></style>
