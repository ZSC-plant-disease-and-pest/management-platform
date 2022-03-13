<template>
  <el-form
    ref="formRef"
    class="form-common"
    v-loading="isLoading"
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
        <el-form-item label="新闻类型：" prop="newsTypeId">
          <NewsTypeSelector
            ref="newsTypeSelectorRef"
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
            :key="basicWangEditorKey"
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
          <el-button type="primary" :loading="isLoading" @click="submit(0)">
            保存
          </el-button>
          <el-button v-if="!form.publishedOrNot" type="success" :loading="isLoading" @click="submit(1)">
            <span v-if="mode === 'edit'"> 发布 </span>
            <span v-if="mode === 'new'"> 保存并发布 </span>
          </el-button>
          <el-button v-else type="warning" :loading="isLoading" @click="submit(2)">
            下架
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
import { validateNewTypeId, validateContent } from './rules';
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
        newsTypeId: undefined,
        description: '',
        content: '',
        publishedOrNot: false
      } as newsParams,
      formRef: ref(),
      newsTypeSelectorRef: ref(),
      basicWangEditorRef: ref(),
      rules: {
        author: [{ required: true, message: '请输入新闻作者', trigger: ['blur', 'change'] }],
        title: [{ required: true, message: '请输入新闻标题', trigger: ['blur', 'change'] }],
        newsTypeId: [{ required: true, validator: validateNewTypeId, trigger: ['blur', 'change'] }],
        content: [{ required: true, validator: validateContent, trigger: ['blur', 'change'] }]
      },
      isLoading: false,
      mode: '',
      completed: false,
      basicWangEditorKey: 0
    });

    const getNewsById = (id: number) => {
      if (id < 0) back();
      else if (id === 0) return 0;
      else {
        state.isLoading = true;
        newsHttp.getNewsById(id)
          .then((response: any) => {
            state.form = response;
            state.newsTypeSelectorRef.setNewsType(state.form.newsTypeId);
            state.basicWangEditorRef.edit(state.form.content);
            state.basicWangEditorKey += 1;
          })
          .catch(() => { back(); })
          .finally(() => { state.isLoading = false; });
      }
    };

    const submit = (type: number) => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          if (type === 1) {
            state.form.publishedOrNot = true;
          } else if (type === 2) {
            state.form.publishedOrNot = false;
          }
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
      state.newsTypeSelectorRef.setNewsType(undefined);
      state.basicWangEditorKey += 1;
      state.completed = false;
    };

    const newsTypeSelectChange = (id: number) => {
      state.form.newsTypeId = id;
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
