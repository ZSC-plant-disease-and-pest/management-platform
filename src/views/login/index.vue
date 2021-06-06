<template>
  <div class="login">
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';

export default defineComponent({
  prop: {},
  components: {},
  setup () {
    const loading = ref(false);
    const loginForm = ref({
      username: 'root',
      password: 'root'
    });
    const rules = ref({
      username: [{ required: true, message: '请输入账号' }],
      password: [{ required: true, message: '请输入密码' }]
    });
  }
});
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(240, 242, 245);
  background-image: url("~@/assets/images/login-background.svg");
}
</style>
