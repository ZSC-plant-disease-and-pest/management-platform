<template>
  <el-form
    ref="formRef"
    class="form-common"
    :rules="rules"
    :model="form"
    size="small"
    label-width="130px"
    v-show="!completed"
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
            placeholder="请选择"
            multiple
          >
            <el-option
              v-for="item in overviewOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="危害部位：" prop="damagedParts">
          <el-select
            class="select-common"
            v-model="form.damagedParts"
            placeholder="请选择"
            multiple
          >
            <el-option
              v-for="item in damagedPartsOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="影响植物：" prop="affectedPlants">
          <el-input
            class="textarea-common"
            v-model="form.affectedPlants"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入影响植物"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="病原信息：" prop="pathogen">
          <el-input
            class="textarea-common"
            v-model="form.pathogen"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入病原信息"
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="危害表现：" prop="description">
          <el-input
            class="textarea-common"
            v-model="form.description"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入危害表现"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发病规律：" prop="regularity">
          <el-input
            class="textarea-common"
            v-model="form.regularity"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入发病规律"
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="textarea-row">
      <el-col :span="12">
        <el-form-item label="发病季节：" prop="seasons">
          <el-input
            class="textarea-common"
            v-model="form.seasons"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入发病季节"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="分布地域：" prop="regions">
          <el-input
            class="textarea-common"
            v-model="form.regions"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入分布地域"
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="治理建议：" prop="suggestion">
          <el-input
            class="textarea-common"
            v-model="form.suggestion"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入治理建议"
            clearable
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
import { diseaseHttp, diseaseParams } from '@/api/disease';
import { useRouter, useRoute } from 'vue-router';
import { validateDamagedParts, validateOverview } from './rules';
import BasicImageUpload from '@/components/common/BasicImageUpload/index.vue';

const damagedPartsOptions = [
  { value: '根' },
  { value: '茎' },
  { value: '叶' },
  { value: '花' },
  { value: '果实' }
];
const overviewOptions = [
  { value: '腐烂' },
  { value: '变色' },
  { value: '坏死' },
  { value: '萎蔫' },
  { value: '畸形' }
];

export default defineComponent({
  name: 'exclude',
  components: { BasicImageUpload },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      state.mode = Number(route.params.id) === 0 ? 'new' : 'edit';
      getDiseaseById(Number(route.params.id));
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
      imageUploadRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入病害名称', trigger: ['blur', 'change'] }],
        damagedParts: [{ required: true, validator: validateDamagedParts, trigger: ['blur'] }],
        overview: [{ required: true, validator: validateOverview, trigger: ['blur'] }],
        picture: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileList.length === 0) {
              callback(new Error('请上传至少一张病害图片'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      damagedPartsOptions,
      overviewOptions,
      isLoading: false,
      mode: '',
      completed: false,
      fileList: [] as Array<any>,
      imagePreviewUrl: '',
      imagePreviewDialog: false
    });

    const getDiseaseById = (id: number) => {
      if (id < 0) back();
      else if (id === 0) return 0;
      else {
        state.isLoading = true;
        diseaseHttp.getDiseaseById(id)
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
            diseaseHttp.addDisease(state.form, state.fileList)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          } else if (state.mode === 'edit') {
            diseaseHttp.updateDisease(state.form)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    const back = () => {
      router.push({
        path: '/admin/disease-data',
        name: 'disease-data',
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
      damagedPartsOptions,
      overviewOptions,
      fileListChange,
      filePreview
    };
  }
});
</script>

<style lang="scss" scoped></style>
