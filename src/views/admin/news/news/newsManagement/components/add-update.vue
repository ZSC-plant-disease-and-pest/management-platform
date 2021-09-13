<template>
  <Drawer ref="drawerRef" />
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
        <div class="card-title">
          <span>
            基础信息
          </span>
          <el-button type="primary" @click="openDrawer">
            管理新闻图片
          </el-button>
        </div>
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
          <el-form-item label="新闻作者：" prop="author">
            <el-input
              class="input-common"
              v-model="form.author"
              placeholder="请输入新闻作者"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="新闻标题：" prop="title">
            <el-input
              class="input-common"
              v-model="form.title"
              placeholder="请输入新闻标题"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新闻标签：" prop="newsTag">
            <el-select
              class="select-common"
              v-model="form.newsTag"
              placeholder="请选择"
            >
              <el-option
                v-for="item in newsTagOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="detail-card">
      <template #header>
        <span>
          详细信息
        </span>
      </template>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form-item label="新闻内容：" prop="content">
            <v-md-editor v-model="form.content" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
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

import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { newsHttp, newsParams } from '@/api/news';
import { useRouter, useRoute } from 'vue-router';
import { illegalVisit } from '@/utils/global';
import Drawer from './Drawer.vue';

export default defineComponent({
  name: 'add-update',
  components: { Drawer },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      getParams();
    });

    const state = reactive({
      form: {
        id: undefined,
        author: undefined,
        title: undefined,
        newsTag: undefined,
        content: undefined
      } as newsParams,
      formRef: ref(),
      drawerRef: ref(),
      rules: {
        author: [
          { required: true, message: '请输入新闻作者', trigger: ['blur', 'change'] }
        ],
        title: [
          { required: true, message: '请输入新闻标题', trigger: ['blur', 'change'] }
        ],
        newsTag: [
          { required: true, message: '请输入新闻标签', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '请输入新闻内容', trigger: ['blur', 'change'] }
        ]
      },
      // 界面类型：add 新增，update 更新
      type: '',
      isLoading: false,
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete'
    });
    const newsTagOptions: Array<any> = reactive([
      {
        value: '网站新闻'
      },
      {
        value: '病虫害防治'
      },
      {
        value: '园林植物护养'
      },
      {
        value: '智慧农业'
      },
      {
        value: '更新公告'
      }
    ]);

    // 提取路由中的 params
    const getParams = () => {
      if (route.path.split('/').slice(-1)[0] === 'update') {
        // 若 params 有 id，则是合法访问
        if (route.params.id !== undefined) {
          state.type = 'update';
          const { ...tempParams } = route.params;
          state.form = tempParams;
          // console.log(tempParams);
        } else {
          // 非法访问更新界面
          illegalVisit();
          router.go(-1);
        }
      } else {
        state.type = 'add';
      }
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (route.path.split('/').slice(-1)[0] === 'add') {
            newsHttp.createNews(state.form)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            newsHttp.updateNews(state.form)
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
        path: '/admin/new/newManagement',
        name: 'newManagement',
        params: {
          type: 'refresh'
        }
      });
    };
    const keep = () => {
      state.formRef.resetFields();
      state.status = 'incomplete';
    };
    const openDrawer = () => {
      state.drawerRef.open();
    };

    return {
      ...toRefs(state),
      newsTagOptions,
      submit,
      back,
      keep,
      openDrawer
    };
  }
});
</script>

<style lang="scss" scoped>
.card-title {
  display: flex;
  justify-content: space-between;
}
</style>
