<template>
  <el-menu
    class="aside"
    :default-active="defaultActive"
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
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    path: {
      type: String,
      default: 'home'
    },
    asideList: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const router = useRouter();

    const defaultActive = computed(() => {
      switch (props.path) {
        case 'news':
          return 'news-articles';
        case 'disease':
          return 'disease-data';
        case 'gardens':
          return 'plants-data';
        case 'ai':
          return 'disease-images';
        case 'system':
          return 'role-data';
        default:
          return '';
      }
    });

    const changeRouter = (params: string) => {
      router.push(`/admin/${params}`);
    };

    return {
      defaultActive,
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
