<template>
  <el-menu
    class="aside"
    default-active="test"
    background-color="#ffffff"
    text-color="#606266"
    active-text-color="#000"
  >
    <el-submenu
      v-for="item in menuList"
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
        @click="changeRouter(item.name + '/' + list.name)"
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
  setup () {
    const router = useRouter();
    const menuList: any[] = [
      {
        name: 'info',
        icon: 'el-icon-location',
        label: '信息管理',
        list: [
          {
            name: 'plantDiseasesAndInsectPests',
            label: '植物病虫害'
          },
          {
            name: 'plantInsectPests',
            label: '虫害'
          },
          {
            name: 'plantDiseases',
            label: '植物病'
          },
          {
            name: 'plantImages',
            label: '植物图片库'
          },
          {
            name: 'plantsInfo',
            label: '植物信息'
          }
        ]
      }
      // {
      //   name: 'info',
      //   icon: 'el-icon-location',
      //   label: '信息管理',
      //   list: [
      //     {
      //       name: 'plantDiseasesAndInsectPests',
      //       label: '植物病虫害'
      //     }
      //   ]
      // }
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
