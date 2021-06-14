<template>
  <el-menu
    class="aside"
    default-active="test"
    background-color="#545c64"
    text-color="#bfcbd9"
    active-text-color="#fff"
  >
    <el-menu-item
      v-for="item in menuList"
      :key="item.name"
      :index="item.name"
      @click="changeRouter(item.name)"
    >
      <i :class="item.icon"></i>
      <template #title>
        {{ item.label }}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup () {
    const router = useRouter();
    const menuList: any[] = [
      {
        name: '1',
        icon: 'el-icon-location',
        label: '选项一'
      },
      {
        name: '2',
        icon: 'el-icon-location',
        label: '选项二'
      },
      {
        name: '3',
        icon: 'el-icon-location',
        label: '选项三'
      },
      {
        name: 'test',
        icon: 'el-icon-menu',
        label: '接口测试'
      }
    ];
    const changeRouter = (name: string) => {
      router.push(`/admin/${name}`);
    };
    return {
      menuList,
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
