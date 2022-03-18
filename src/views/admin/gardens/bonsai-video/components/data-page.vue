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
        <el-form-item label="视频植物：" prop="plants">
          <el-input
            class="input-common"
            v-model="form.plants"
            placeholder="请输入视频植物"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="视频标签：" prop="label">
          <el-select
            class="select-common"
            clearable
            v-model="form.label"
            placeholder="请选择"
          >
            <el-option
              v-for="item in videoLabelOptions"
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
        <el-form-item label="视频标题：">
          {{ video.title }}
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="视频类别：">
          {{ video.type }}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="视频大小：">
          {{ video.size }}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="0" v-if="mode === 'new'">
      <el-col :span="24">
        <el-form-item label="上传视频：" prop="video" >
          <BasicVideoUpload
            ref="videoUploadRef"
            @onChange="fileListChange"
            @preview="filePreview"
          />
          <el-dialog v-model="videoPreviewDialog" title="查看视频" :width="840">
            <vue3VideoPlay v-bind="options" />
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
import { videoHttp, videoParams } from '@/api/video';
import { useRouter, useRoute } from 'vue-router';
import BasicVideoUpload from '@/components/common/BasicVideoUpload/index.vue';

const videoLabelOptions = [
  { value: '园林栽培' },
  { value: '居家园艺' },
  { value: '盆景艺术' }
];

export default defineComponent({
  name: 'exclude',
  components: { BasicVideoUpload },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      state.mode = Number(route.params.id) === 0 ? 'new' : 'edit';
      getVideoById(Number(route.params.id));
    });

    const state = reactive({
      form: {
        id: undefined,
        name: '',
        label: '',
        video: ''
      } as videoParams,
      formRef: ref(),
      videoUploadRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入视频名称', trigger: ['blur', 'change'] }],
        plants: [{ required: true, message: '请输入视频植物', trigger: ['blur', 'change'] }],
        label: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.label === '' || state.form.label === undefined) {
              callback(new Error('请选择视频标签'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }],
        video: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.fileList.length === 0) {
              callback(new Error('请上传盆景养护视频'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      video: {
        title: '无视频数据',
        size: '无视频数据',
        type: '无视频数据'
      },
      options: {
        width: '800px',
        height: '450px',
        color: '#409eff',
        title: '',
        src: '',
        muted: false,
        webFullScreen: false,
        speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'],
        autoPlay: false,
        loop: false,
        mirror: false,
        ligthOff: false,
        volume: 0.3,
        control: true,
        controlBtns: [
          'audioTrack',
          'quality',
          'speedRate',
          'volume',
          'setting',
          'pip',
          'pageFullScreen',
          'fullScreen'
        ]
      },
      isLoading: false,
      mode: '',
      completed: false,
      fileList: [] as Array<any>,
      videoPreviewDialog: false,
      videoLabelOptions
    });

    const getVideoById = (id: number) => {
      if (id < 0) back();
      else if (id === 0) return 0;
      else {
        state.isLoading = true;
        videoHttp.getVideoById(id)
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
            videoHttp.uploadVideo(state.form, state.fileList)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          } else if (state.mode === 'edit') {
            // videoHttp.updateVideo(state.form)
            //   .then(() => { state.completed = true; })
            //   .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    const back = () => {
      router.push({
        path: '/admin/bonsai-video',
        name: 'bonsai-video',
        params: { type: 'refresh' }
      });
    };

    const keep = () => {
      state.formRef.resetFields();
      state.videoUploadRef.clear();
      state.completed = false;
    };

    const fileListChange = (fileList: Array<any>) => {
      console.log(fileList);
      state.fileList = fileList;
      if (fileList.length === 0 || !fileList) {
        state.video.title = '无视频数据';
        state.video.size = '无视频数据';
        state.video.type = '无视频数据';
      } else {
        state.video.title = fileList[0].name;
        state.video.size = (fileList[0].size / 1024 / 1024).toFixed(2) + 'MB';
        state.video.type = fileList[0].raw.type;
      }
    };

    const filePreview = (file: any) => {
      state.options.src = file?.url;
      state.videoPreviewDialog = true;
    };

    return {
      ...toRefs(state),
      submit,
      back,
      keep,
      fileListChange,
      filePreview,
      videoLabelOptions
    };
  }
});
</script>

<style lang="scss" scoped></style>
