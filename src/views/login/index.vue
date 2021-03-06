<template>
  <div class="login" v-loading="isLoading" element-loading-text="登录中...">
    <div class="box">
      <div class="header">
        <span class="title">
          植物病虫害管理系统
        </span>
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginForm">
          <el-form-item prop="username" :rules="rules.username">
            <el-input
              placeholder="账号"
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item prop="password" :rules="rules.password">
            <el-input
              type="password"
              placeholder="密码"
              :show-password="true"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="button"
              type="primary"
              @click="submitForm"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, reactive, ref, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

interface userForm {
  username: string;
  password: string;
}

export default defineComponent({
  setup () {
    const router = useRouter();
    const store = useStore();

    // 添加监听事件
    onBeforeMount(() => {
      window.addEventListener('keydown', handleKeyDown, true);
    });

    // 销毁监听事件
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown, true);
    });

    // 数据仓库
    const state = reactive({
      loginForm: {
        username: '',
        password: ''
      } as userForm,
      loginFormRef: ref(),
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 16, message: '账号长度为 3-16 位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '密码长度为 4-16 位', trigger: 'blur' }
        ]
      },
      isLoading: false
    });

    // 全局监听按键按下
    const handleKeyDown = (event: any) => {
      // 回车键按下
      if (event.keyCode === 13) {
        submitForm();
      }
    };

    // 登录
    const submitForm = () => {
      state.loginFormRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          store.dispatch('user/login', state.loginForm)
            .then((response: any) => {
              if (response === 'OK') {
                router.push('/admin/home');
                ElMessage.success('登录成功');
              }
            })
            .finally(() => { state.isLoading = false; });
        }
      });
    };

    return {
      ...toRefs(state),
      submitForm
    };
  }
});
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(240, 242, 245);
  background-image: url("~@/assets/images/login-background.svg");

  .box {
    top: -15vh;
    width: 520px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    text-align: center;

    .header {
      height: 120px;

      .title {
        color: black;
        font-size: 30px;
        font-weight: 700;
      }
    }

    .content {
      width: 360px;
      height: 237px;
      margin: 0 auto;

      .button {
        width: 360px;
      }
    }
  }
}
</style>
