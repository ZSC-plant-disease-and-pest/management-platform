<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="['add-update']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.main {
  padding: 15px;
  background-color: #fff;
  width: calc(100% - 30px);
  min-height: calc(100vh - 130px);
}
</style>
