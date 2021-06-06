<template>
  <div class="login">
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
            <el-button class="button" type="primary" @click="submitForm">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  reactive,
  defineComponent
} from 'vue';

interface userForm {
  username: string;
  password: string;
}

export default defineComponent({
  prop: {},
  components: {},
  setup () {
    const state = reactive({
      loginForm: {
        username: 'root',
        password: 'root'
      } as userForm,
      loginFormRef: ref(),
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'change' },
          { min: 4, max: 14, message: '账号长度为 4-16 位', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 4, max: 14, message: '密码长度为 4-16 位', trigger: 'change' }
        ]
      }
    });
    const submitForm = () => {
      state.loginFormRef.validate().then((valid: boolean) => {
        console.log(valid);
        if (valid) {
          // 登陆
          console.log(state.loginForm);
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
