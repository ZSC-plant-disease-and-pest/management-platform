<template>
  <el-form
    ref="formRef"
    class="form-common"
    :rules="rules"
    :model="form"
    size="small"
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

    <el-row :gutter="0" class="textarea-row">
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
    <el-row :gutter="0" v-if="type === 'add'">
      <el-col :span="24">
        <el-form-item label="上传图片：" prop="picture" >
          <el-upload
            ref="uploadImageRef"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="onChange"
            :limit="10"
            :multiple="true"
            accept=".gif,.jpg,.jpeg,.png,.bmp"
          >
            <template #default>
              <i class="el-icon-plus"></i>
            </template>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
          <el-dialog v-model="dialogImageVisible" title="查看图片">
            <img style="width: 100%; height: 75%;" :src="dialogImageUrl" alt="" />
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
    icon="success"
    :title="type === 'add' ? '新增成功' : '更新成功'"
    v-show="status === 'complete'"
  >
    <template #extra>
      <el-button @click="back">
        返回
      </el-button>
      <el-button type="primary" @click="keep" v-show="type === 'add'">
        继续新增
      </el-button>
    </template>
  </el-result>
</template>

<script lang="ts">

import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { diseaseHttp, diseaseParams } from '@/api/disease';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'add-update',
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
      uploadRef: ref(),
      uploadImageRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入病害名称', trigger: ['blur', 'change'] }],
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
        }],
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
      // 界面类型：add 新增，update 更新
      type: '',
      isLoading: false,
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete',
      fileList: [] as Array<any>,
      dialogImageUrl: '',
      dialogImageVisible: false,
      // 模式
      mode: ''
    });
    const damagedPartsOptions: Array<any> = reactive([
      { value: '根' },
      { value: '茎' },
      { value: '叶' },
      { value: '花' },
      { value: '果实' }
    ]);
    const overviewOptions: Array<any> = reactive([
      { value: '腐烂' },
      { value: '变色' },
      { value: '坏死' },
      { value: '萎蔫' },
      { value: '畸形' }
    ]);

    const getDiseaseById = (id: number) => {
      if (id <= 0) return 0;
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (route.path.split('/').slice(-1)[0] === 'add') {
            diseaseHttp.createDisease(state.form, state.fileList)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            diseaseHttp.updateDisease(state.form)
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
        path: '/admin/disease-data',
        name: 'disease-data',
        params: { type: 'refresh' }
      });
    };
    const keep = () => {
      state.formRef.resetFields();
      state.uploadImageRef.clearFiles();
      state.fileList = [];
      state.status = 'incomplete';
    };
    const onChange = (file: any, fileList: Array<any>) => {
      state.fileList = fileList;
    };
    const handleRemove = (file: any) => {
      const removeIndex = state.fileList.findIndex((value: any) => value.uid === file.uid);
      state.fileList.splice(removeIndex, 1);
    };
    const handlePictureCardPreview = (file: any) => {
      if (file.url !== undefined) {
        state.dialogImageUrl = file.url;
      }
      state.dialogImageVisible = true;
    };

    return {
      ...toRefs(state),
      submit,
      back,
      keep,
      damagedPartsOptions,
      overviewOptions,
      onChange,
      handleRemove,
      handlePictureCardPreview
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep .el-upload-list__item {
  transition: none !important;
}
</style>
