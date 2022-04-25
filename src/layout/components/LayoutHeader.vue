<template>
  <div
    class="header"
    v-loading.fullscreen="isLoading"
    element-loading-text="退出中..."
  >
    <el-row>
      <div class="logo">
        <img class="img" src="~@/assets/images/plant.png" />
        <span class="title">
          植物病虫害管理
        </span>
      </div>
      <el-col :span="16">
        <el-menu
          class="menu"
          mode="horizontal"
          :default-active="defaultActive"
          @select="menuSelect"
        >
          <el-menu-item v-for="item in headerMenuList" :key="item.index" :index="item.index">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </el-menu>
      </el-col>

      <div class="dropdown">
        <el-dropdown>
          <el-avatar
            class="avatar"
            :size="48"
            shape="square"
            :style="{ backgroundColor: avatarColor }"
          >
            {{ name }}
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <a @click="logout">
                  退出登录
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { headerMenuList, headerMenuItemList } from './data';

export default defineComponent({
  emits: ['menuSelect'],
  setup (props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(() => {
      // 当前路径
      const path = route.path.split('/')[2];
      if (path) {
        // 根据路径来获取侧边菜单栏和头部菜单当前项
        if (path === 'home') {
          state.defaultActive = 'home';
          menuSelect('home');
        } else {
          state.defaultActive = String(searchMenuByPath(path));
          menuSelect(state.defaultActive);
        }
      }
    });

    const state = reactive({
      asideList: [] as Array<any>,
      defaultActive: '',
      headerMenuList,
      headerMenuItemList,
      isLoading: false
    });

    const name = computed(() => {
      if (store.getters['user/getName']) {
        return store.getters['user/getName'][0];
      } else {
        return '';
      }
    });

    const avatarColor = computed(() =>
      ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'][Math.floor(Math.random() * 4)]
    );

    // 通过路径搜索菜单模块
    const searchMenuByPath = (path: string) => {
      let name = '';
      for (const headerItem in state.headerMenuItemList) {
        name = headerItem;
        for (const menuItem in state.headerMenuItemList[headerItem].meta) {
          for (const listItem in state.headerMenuItemList[headerItem].meta[menuItem].list) {
            if (path === state.headerMenuItemList[headerItem].meta[menuItem].list[listItem].name) {
              return name;
            }
          }
        }
      }
    };

    // 头部菜单被选择
    const menuSelect = (params: any) => {
      emit('menuSelect', params, state.headerMenuItemList[params].meta);
      router.push(state.headerMenuItemList[params].path);
    };

    // 退出登录
    const logout = () => {
      state.isLoading = true;
      store.dispatch('user/logout')
        .then((response: any) => {
          if (response === 'OK') {
            router.push('/login');
            ElMessage.success('退出成功');
          }
        })
        .finally(() => { state.isLoading = true; });
    };

    return {
      ...toRefs(state),
      name,
      avatarColor,
      menuSelect,
      logout
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: 59px;
  border-bottom: 1px solid #d8dce5;

  .logo {
    left: 0px;
    width: 200px;
    height: 59px;
    display: flex;
    line-height: 59px;
    justify-content: space-between;

    .img {
      top: 11px;
      left: 23px;
      width: 38px;
      height: 38px;
      position: relative;
    }

    .title {
      font-size: 18px;
    }
  }

  .menu {
    top: -1px;
    min-width: 800px;
    position: relative;
  }

  .dropdown {
    top: 6px;
    right: 45px;
    width: auto;
    position: absolute;
  }
}
</style>
