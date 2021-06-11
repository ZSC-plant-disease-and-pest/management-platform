<template>
  <el-menu
    class="aside"
    default-active="2"
    background-color="#545c64"
    text-color="#bfcbd9"
    active-text-color="#fff"
  >
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <template #title>导航二</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.aside {
  width: 200px;
  height: 100%;
}
</style>
