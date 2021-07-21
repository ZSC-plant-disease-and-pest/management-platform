<template>
  <el-menu
    class="aside"
    default-active="home"
    background-color="#ffffff"
    text-color="#606266"
    active-text-color="#000"
  >
    <el-menu-item
      index="home"
      @click="changeRouter('home')"
    >
      <i class="el-icon-menu"></i>
      <template #title>
        首页
      </template>
    </el-menu-item>
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
  setup () {
    const router = useRouter();
    const menuList: any[] = [
      {
        name: 'plant-database',
        icon: 'el-icon-watermelon',
        label: '植物数据库',
        list: [
          {
            name: 'classificationManagement',
            label: '植物分类管理'
          },
          {
            name: 'plantData',
            label: '植物资料'
          }
        ]
      },
      {
        name: 'pest-database',
        icon: 'el-icon-soccer',
        label: '病虫害数据库',
        list: [
          {
            name: 'diseaseManagement',
            label: '病害管理'
          },
          {
            name: 'pestManagement',
            label: '虫害管理'
          },
          {
            name: 'protectiveMeasures',
            label: '病虫害防护措施'
          }
        ]
      },
      {
        name: 'data-set-management',
        icon: 'el-icon-data-board',
        label: '数据集管理',
        list: [
          {
            name: 'dataSetInfo',
            label: '数据集信息管理'
          },
          {
            name: 'labelSet',
            label: '标签集管理'
          }
        ]
      },
      {
        name: 'data-collect-tagging',
        icon: 'el-icon-picture-outline',
        label: '数据采集和标注',
        list: [
          {
            name: 'pictureManagement',
            label: '图片管理'
          },
          {
            name: 'pictureTagging',
            label: '图片标注'
          }
        ]
      },
      {
        name: 'model-management',
        icon: 'el-icon-house',
        label: '模型管理',
        list: [
          {
            name: 'versionManagement',
            label: '版本管理'
          }
        ]
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
