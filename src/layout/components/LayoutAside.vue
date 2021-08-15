<template>
  <el-menu
    class="aside"
    default-active="home"
    background-color="#ffffff"
    text-color="#606266"
    active-text-color="#000"
  >
    <el-submenu
      v-for="item in asideList"
      :key="item.name"
      :index="item.name"
    >
      <template #title>
        <i :class="item.icon"></i>
        {{ item.label }}
      </template>
      <el-menu-item
        v-for="list in item.list"
        :key="list.name"
        :index="list.name"
        @click="changeRouter(list.name)"
      >
        {{ list.label }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    asideList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup (props) {
    const router = useRouter();
    const changeRouter = (name: string) => {
      router.push(`/admin/${name}`);
    };
    return {
      changeRouter
    };
  }
});
</script>

<style lang="scss" scoped>
.aside {
  width: 200px;
  height: 100%;
}
</style>
