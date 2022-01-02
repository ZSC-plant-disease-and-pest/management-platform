<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      class="form-common"
      size="small"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <!-- 注册或编辑用户 -->
      <div v-if="type === 'add' || type === 'edit'">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名：" prop="name">
              <el-input
                class="input-common"
                v-model="form.name"
                placeholder="请输入用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：" prop="mobile">
              <el-input
                class="input-common"
                v-model="form.mobile"
                placeholder="请输入手机号"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="登录名：" prop="username">
              <el-input
                class="input-common"
                v-model="form.username"
                placeholder="请输入登录名"
                :disabled="type === 'edit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码：" prop="password" v-if="type === 'add'">
              <el-input
                class="input-common"
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item label="账号状态：" v-else>
              <span v-if="form.state === 1"> 正常 </span>
              <span v-else> 禁用 </span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="邮箱：" prop="email">
              <el-input
                class="input-common"
                v-model="form.e_mail"
                placeholder="请输入邮箱"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户角色：" prop="role">
              <el-select
                class="input-common"
                v-model="form.role"
                placeholder="请选择用户角色"
              >
                <el-option value="root" label="超级管理员"></el-option>
                <el-option value="admin" label="管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 修改用户密码 -->
      <div v-else>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名：" prop="name">
              <span> {{ form.name }} </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录名：" prop="username">
              <span> {{ form.username }} </span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="密码：" prop="password">
              <el-input
                class="input-common"
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码：" prop="confirm">
              <el-input
                class="input-common"
                type="password"
                v-model="confirm"
                placeholder="请再一次输入密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <template #footer>
      <el-button size="small" @click="dialogVisible = false">
        关闭
      </el-button>
      <el-button type="primary" size="small" :loading="isLoading" @click="submit">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { userHttp, userParams } from '@/api/user';
import { loginHttp } from '@/api/login';
import { ElMessage } from 'element-plus';

export default defineComponent({
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    // 数据仓库
    const state = reactive({
      form: {
        state: 1
      } as userParams,
      formRef: ref(),
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
        mobile: [{ required: true, message: '请输入手机号', trigger: ['blur', 'change'] }],
        username: [{ required: true, message: '请输入登录名', trigger: ['blur', 'change'] }],
        password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }],
        role: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.role === undefined) {
              callback(new Error('请选择用户角色'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }],
        confirm: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.confirm !== state.form.password) {
              callback(new Error('两次密码有不同'));
            } else {
              callback();
            }
          },
          trigger: ['blur']
        }]
      },
      confirm: '',
      isLoading: false,
      type: '',
      dialogVisible: false
    });

    // 弹出框标题
    const title = computed(() => {
      if (state.type === 'add') {
        return '注册用户';
      } else if (state.type === 'edit') {
        return '编辑用户';
      } else if (state.type === 'change') {
        return '修改用户密码';
      } else {
        return '';
      }
    });

    // 打开
    const openDialog = (type: string, data: any) => {
      state.type = type;
      state.dialogVisible = true;
      if (type !== 'add') {
        state.form = data;
        if (type === 'change') {
          state.form.password = '';
        }
      }
    };

    // 提交
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'add') {
            loginHttp.createUser(state.form)
              .then(() => { submitSuccessfully(); })
              .finally(() => { state.isLoading = false; });
          } else if (state.type === 'edit') {
            userHttp.updateUser(state.form)
              .then(() => { submitSuccessfully(); })
              .finally(() => { state.isLoading = false; });
          } else if (state.type === 'change') {
            userHttp.updateUser(state.form)
              .then(() => { submitSuccessfully(); })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    // 提交成功后
    const submitSuccessfully = () => {
      ElMessage.success(`${title.value}成功`);
      state.dialogVisible = false;
      refreshTable();
    };

    // 关闭
    const closed = () => {
      state.dialogVisible = false;
    };

    // 刷新
    const refreshTable = () => {
      emit('refreshTable');
    };

    return {
      ...toRefs(state),
      title,
      openDialog,
      closed,
      submit
    };
  }
});
</script>

<style lang="scss" scoped></style>
