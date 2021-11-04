<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
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
      v-if="type === 'add' || type === 'edit'"
    >
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
    </el-form>
    <el-form
      ref="formRef"
      class="form-common"
      size="small"
      :rules="rules"
      :model="form"
      label-width="100px"
      v-if="type === 'change'"
    >
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
    </el-form>
    <template #footer>
      <span>
        <el-button size="small" @click="dialogVisible = false">
          关 闭
        </el-button>
        <el-button
          type="primary"
          size="small"
          :loading="isLoading"
          @click="submit"
        >
          <span v-show="type === 'add'">
            注 册
          </span>
          <span v-show="type === 'edit'">
            编 辑
          </span>
          <span v-show="type === 'change'">
            修 改
          </span>
        </el-button>
      </span>
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
    const state = reactive({
      form: {
        state: 1
      } as userParams,
      confirm: '',
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
      // 新增：add 编辑：edit 修改密码: change
      type: '',
      isLoading: false,
      dialogVisible: false
    });
    const title = computed(() => {
      if (state.type === 'add') {
        return '注册用户';
      } else if (state.type === 'edit') {
        return '编辑用户信息';
      } else if (state.type === 'change') {
        return '修改用户密码';
      } else {
        return '';
      }
    });

    const openDialog = (type: string, data: any) => {
      state.type = type;
      state.dialogVisible = true;
      if (type === 'edit' || type === 'change') {
        const { ...tempForm } = data;
        state.form = tempForm;
        if (type === 'change') {
          state.form.password = '';
        }
      }
    };
    const closed = () => {
      emit('refreshTable');
    };
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'add') {
            loginHttp.createUser(state.form)
              .then(() => {
                ElMessage.success('注册成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'edit') {
            userHttp.updateUser(state.form)
              .then(() => {
                ElMessage.success('编辑成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'change') {
            userHttp.updateUser(state.form)
              .then(() => {
                ElMessage.success('修改成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          }
        }
      });
      const refreshTable = () => {
        emit('refreshTable');
      };
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
