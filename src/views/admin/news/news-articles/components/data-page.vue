<template>
  <el-form
    ref="formRef"
    class="form-common"
    :rules="rules"
    :model="form"
    size="small"
    label-width="100px"
    v-show="!completed"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="新闻作者：" prop="author">
          <el-input
            class="input-common"
            v-model="form.author"
            placeholder="请输入新闻作者"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="新闻标题：" prop="title">
          <el-input
            class="input-common"
            v-model="form.title"
            placeholder="请输入新闻标题"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="新闻类型：" prop="newsType">
          <NewsTypeSelector
            ref="newsTypeSelectorRef"
            :newsTypeId="Number(form.newTypeId)"
            @selectChange="newsTypeSelectChange"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="0">
      <el-col :span="24">
        <el-form-item label="新闻内容：" prop="content">
          <BasicWangEditor
            ref="basicWangEditorRef"
            :content="form.content"
            @editorContentChange="editorContentChange"
          />
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
import { defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue';
import { newsHttp, newsParams } from '@/api/news';
import { useRouter, useRoute } from 'vue-router';
import NewsTypeSelector from '@/components/selector/NewsTypeSelector.vue';
import BasicWangEditor from '@/components/common/BasicWangEditor/index.vue';

export default defineComponent({
  name: 'exclude',
  components: { NewsTypeSelector, BasicWangEditor },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      state.mode = Number(route.params.id) === 0 ? 'new' : 'edit';
      getNewsById(Number(route.params.id));
    });
    onMounted(() => {
      state.basicWangEditorRef.edit(state.form.content);
    });

    const state = reactive({
      form: {
        id: undefined,
        author: '',
        title: '',
        newTypeId: -1,
        description: '',
        content: '',
        status: false
      } as newsParams,
      formRef: ref(),
      basicWangEditorRef: ref(),
      rules: {
        author: [{ required: true, message: '请输入新闻作者', trigger: ['blur', 'change'] }],
        title: [{ required: true, message: '请输入新闻标题', trigger: ['blur', 'change'] }],
        newsType: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.newTypeId === undefined) {
              callback(new Error('请选择新闻类型'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      isLoading: false,
      mode: '',
      completed: false
    });

    const getNewsById = (id: number) => {
      if (id < 0) back();
      else if (id === 0) return 0;
      else {
        state.isLoading = true;
        newsHttp.getNewsById(id)
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
            newsHttp.addNews(state.form)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          } else if (state.mode === 'edit') {
            newsHttp.updateNews(state.form)
              .then(() => { state.completed = true; })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    const back = () => {
      router.push({
        path: '/admin/news-articles',
        name: 'news-articles',
        params: { type: 'refresh' }
      });
    };

    const keep = () => {
      state.formRef.resetFields();
      state.completed = false;
    };

    const newsTypeSelectChange = (id: number) => {
      state.form.newTypeId = id;
    };

    const editorContentChange = (data: any) => {
      state.form.content = data as string;
    };

    return {
      ...toRefs(state),
      submit,
      back,
      keep,
      newsTypeSelectChange,
      editorContentChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
