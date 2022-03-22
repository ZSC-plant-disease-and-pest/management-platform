<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default defineComponent({
  setup () {
    return {
      zhCn
    };
  }
});
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
