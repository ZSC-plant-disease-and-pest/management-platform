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
          <el-form-item label="视频名称：" prop="name">
            <el-input
              class="input-common"
              v-model="form.name"
              placeholder="请输入视频名称"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="上传图片："
            prop="image"
          >
            <el-upload
              ref="uploadVideoRef"
              :class="{ uploadVideo: havingUploadVideo }"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="onChange"
              :limit="1"
              :multiple="false"
              accept=".mp4"
            >
              <template #default>
                <i class="el-icon-plus"></i>
              </template>
              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <el-dialog v-model="dialogVideoVisible" title="查看图片">
              <video style="width: 100%; height: 75%;" :src="dialogVideoUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
// import { diseaseHttp, diseaseParams } from '@/api/disease';
import { useRouter } from 'vue-router';
// import { illegalVisit } from '@/utils/global';

export default defineComponent({
  name: 'add-update',
  setup () {
    // 获取路由
    const router = useRouter();
    // 渲染前
    onBeforeMount(() => {
      // getParams();
    });
    // 表单内容
    const state = reactive({
      form: {
        id: undefined,
        name: undefined,
        type: undefined,
        plantName: undefined,
        tag: undefined
      },
      // } as diseaseParams,
      formRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入病害名称', trigger: ['blur', 'change'] }
        ]
      },
      uploadVideoRef: ref(),
      fileList: [] as Array<any>,
      havingUploadVideo: false,
      dialogVideoUrl: '',
      dialogVideoVisible: false
    });
    // 界面类型：add 新增，update 更新
    const type = ref('');
    // 加载中
    const isLoading = ref(false);
    // 表单状态：complete 完成，incomplete 未完成
    const status = ref('incomplete');
    // 提交表单
    const submit = () => {
      console.log('submit');
      // 表单验证
      // state.formRef.validate().then((valid: boolean) => {
      //   if (valid) {
      //     isLoading.value = true;
      //     if (type.value === 'add') {
      //       diseaseHttp.createDisease(state.form)
      //         .then((response: any) => {
      //           console.log(response);
      //           // 成功后进入成功界面
      //           status.value = 'complete';
      //         })
      //         .finally(() => {
      //           isLoading.value = false;
      //         });
      //     } else if (type.value === 'update') {
      //       diseaseHttp.updateDisease(state.form)
      //         .then((response: any) => {
      //           console.log(response);
      //           status.value = 'complete';
      //         })
      //         .finally(() => {
      //           isLoading.value = false;
      //         });
      //     }
      //   }
      // });
    };
    // 返回上一个界面
    const back = () => {
      console.log('back');
      router.push({
        path: '/admin/gardens/videoManagement',
        name: 'videoManagement',
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
    const onChange = (file: any, fileList: Array<any>) => {
      state.havingUploadVideo = true;
      state.fileList = fileList[0];
    };
    const handleRemove = () => {
      state.uploadVideoRef.clearFiles();
      state.fileList = [];
      setTimeout(() => {
        state.havingUploadVideo = false;
      }, 1);
    };
    const handlePictureCardPreview = (file: any) => {
      if (file.url !== undefined) {
        state.dialogVideoUrl = file.url;
      }
      state.dialogVideoVisible = true;
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
.uploadVideo ::v-deep .el-upload.el-upload--picture-card {
  display: none;
}
.uploadVideo ::v-deep .el-upload-list__item.is-ready {
  margin-bottom: 0px;
}
</style>
