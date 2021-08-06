<template>
  <el-form ref="form" class="form-common" :model="form" label-width="100px">
    <el-form-item label="id">
      <el-input class="input-common" v-model="form.id" />
    </el-form-item>
    <el-form-item label="名称">
      <el-input class="input-common" v-model="form.name" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import {
  defineComponent,
  reactive
} from 'vue';

export default defineComponent({
  setup () {
    const form = reactive({
      id: '',
      name: ''
    });
    return {
      form
    };
  }
});
</script>

<style lang="scss" scoped>
.form-common {
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input-common {
  width: 600px;
}
</style>
