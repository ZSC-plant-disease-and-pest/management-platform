<template>
  <el-form
    ref="formRef"
    class="form-common"
    size="small"
    :rules="rules"
    :model="form"
    label-width="100px"
    v-show="status === 'incomplete'"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="属类名称：" prop="name">
          <el-input
            class="input-common"
            v-model="form.name"
            placeholder="请输入属类名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属科类：" prop="family">
          <FamilyPagingSelect
            class="pagingSelect-common"
            ref="pagingSelectRef"
            :defaultValue="form.family"
            @selectChange="familyChange"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="简介：" prop="introduction">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入简介"
            clearable
            v-model="form.introduction"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="形态特征：" prop="appearance">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入形态特征"
            clearable
            v-model="form.appearance"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="分布地域：" prop="regions">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入分布地域"
            clearable
            v-model="form.regions"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="常见植物：" prop="plants">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入常见植物"
            clearable
            v-model="form.plants"
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
import { genusHttp, genusParams } from '@/api/genus';
import { useRouter, useRoute } from 'vue-router';
import { illegalVisit } from '@/utils/global';
import FamilyPagingSelect from '@/components/pages/family/FamilyPagingSelect.vue';

export default defineComponent({
  name: 'add-update',
  components: { FamilyPagingSelect },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      getParams();
    });

    const state = reactive({
      form: {
        id: undefined,
        name: undefined,
        family: undefined,
        introduction: '',
        appearance: '',
        regions: '',
        plants: ''
      } as genusParams,
      formRef: ref(),
      pagingSelectRef: ref(),
      rules: {
        name: [
          { required: true, message: '请输入属类名称', trigger: ['blur', 'change'] }
        ],
        family: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.family === undefined) {
              callback(new Error('请选择所属科类'));
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
      status: 'incomplete'
    });

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
          illegalVisit();
          router.go(-1);
        }
      } else {
        state.type = 'add';
      }
    };
    const familyChange = (params: any) => {
      state.form.family = params;
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (route.path.split('/').slice(-1)[0] === 'add') {
            genusHttp.createGenus(state.form)
              .then(() => {
                state.status = 'complete';
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (route.path.split('/').slice(-1)[0] === 'update') {
            genusHttp.updateGenus(state.form)
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
        path: '/admin/gardens/familyManagement',
        name: 'familyManagement',
        params: {
          type: 'refresh'
        }
      });
    };
    const keep = () => {
      state.formRef.resetFields();
      // 调用子组件的重置方法
      state.pagingSelectRef.reset();
      state.status = 'incomplete';
    };

    return {
      ...toRefs(state),
      familyChange,
      submit,
      back,
      keep
    };
  }
});
</script>

<style lang="scss" scoped>
.select-common {
  width: 98.3%;
}
</style>
