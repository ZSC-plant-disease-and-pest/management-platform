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
        <el-form-item label="形态特征：" prop="appearance">
          <el-input
            class="textarea-common"
            v-model="form.appearance"
            :autosize="{ minRows: 4, maxRows: 4}"
            type="textarea"
            resize="none"
            placeholder="请输入形态特征"
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
import { pestHttp, pestParams } from '@/api/pest';
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
      getPestById(Number(route.params.id));
    });

    const state = reactive({
      form: {
        id: undefined,
        name: '',
        overview: [],
        damagedParts: [],
        affectedPlants: '',
        appearance: '',
        description: '',
        regularity: '',
        seasons: '',
        regions: '',
        suggestion: ''
      } as pestParams,
      formRef: ref(),
      imageUploadRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入虫害名称', trigger: ['blur', 'change'] }],
        damagedParts: [{ required: true, validator: validateDamagedParts, trigger: ['blur'] }],
        overview: [{ required: true, validator: validateOverview, trigger: ['blur'] }],
        picture: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileList.length === 0) {
              callback(new Error('请上传至少一张虫害图片'));
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

    const getPestById = (id: number) => {
      if (id < 0) back();
      else if (id === 0) return 0;
      else {
        state.isLoading = true;
        pestHttp.getPestById(id)
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
            pestHttp.addPest(state.form, state.fileList)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          } else if (state.mode === 'edit') {
            pestHttp.updatePest(state.form)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    const back = () => {
      router.push({
        path: '/admin/pest-data',
        name: 'pest-data',
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
