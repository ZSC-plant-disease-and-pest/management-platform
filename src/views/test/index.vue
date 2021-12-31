<template>
  <div class="box">
    <h1> {{ title }} </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup () {
    const state = reactive({
      title: '测试'
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
}
</style>
