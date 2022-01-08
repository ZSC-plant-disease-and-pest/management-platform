<template>
  <div class="header" v-loading.fullscreen="isLoading" element-loading-text="退出中...">
    <div class="logo">
      <img class="img" src="~@/assets/images/plant.png" />
      <span class="title">
        植物病虫害管理
      </span>
    </div>
    <div class="nav">
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
    </div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onUpdated, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { headerMenuList } from './data';

export default defineComponent({
  emits: ['menuSelect'],
  setup (props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(() => {
      // 头部菜单路径
      const path = route.path.split('/')[2];
      if (path) {
        menuSelect(path);
        state.defaultActive = path;
        state.name = store.getters['user/getName'];
      }
    });
    onUpdated(() => {
      console.log('current name: ' + store.getters['user/getName']);
      state.name = store.getters['user/getName'];
    });

    const state = reactive({
      name: '',
      asideList: [] as Array<any>,
      defaultActive: '',
      headerMenuList,
      isLoading: false
    });

    // 侧边导航栏列表
    let asideList: any[] = [];

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

    // 静态头部名称(后面改成登录名称)
    const avatarColor = computed(() => {
      const colorArr = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
      return colorArr[Math.floor(Math.random() * 4)];
    });

    // 头部菜单被选择
    const menuSelect = (params: any) => {
      let path = '';
      if (params === 'home') {
        // 跳转到首页，隐藏 aside
        path = '/admin/home';
      } else if (params === 'news') {
        // 侧边导航栏列表
        asideList = [
          {
            name: 'news',
            icon: 'el-icon-postcard',
            label: '新闻公告',
            list: [
              { name: 'newsManagement', label: '新闻管理' },
              { name: 'typeManagement', label: '类型管理' }
            ]
          }
        ];
        // 根据头部菜单路径(param = 'new'),跳转到他的第一个子页面
        path = '/admin/news/newsManagement';
      } else if (params === 'disease') {
        asideList = [
          {
            name: 'disease',
            icon: 'el-icon-first-aid-kit',
            label: '病害数据库',
            list: [
              { name: 'diseaseManagement', label: '植物病害管理' }
            ]
          },
          {
            name: 'pest',
            icon: 'el-icon-soccer',
            label: '虫害数据库',
            list: [
              { name: 'pestManagement', label: '植物虫害管理' }
            ]
          }
        ];
        path = '/admin/disease/diseaseManagement';
      } else if (params === 'gardens') {
        asideList = [
          {
            name: 'plants',
            icon: 'el-icon-cherry',
            label: '植物数据集',
            list: [
              { name: 'plantsManagement', label: '植物管理' },
              { name: 'familyManagement', label: '科属管理' }
            ]
          },
          {
            name: 'gardens',
            icon: 'el-icon-video-camera',
            label: '园林植物护养',
            list: [
              { name: 'videoManagement', label: '盆景养护视频' }
            ]
          }
        ];
        path = '/admin/gardens/plantsManagement';
      } else if (params === 'recognition') {
        asideList = [
          {
            name: 'images',
            icon: 'el-icon-picture',
            label: 'AI 图像数据集',
            list: [
              { name: 'diseaseImageManagement', label: '病害图像数据集管理' },
              { name: 'pestImageManagement', label: '虫害图像数据集管理' },
              { name: 'plantsImageManagement', label: '植物图像数据集管理' }
            ]
          },
          {
            name: 'dataset',
            icon: 'el-icon-price-tag',
            label: '数据集标注',
            list: [
              { name: 'imagesTaggingManagement', label: '图片标注管理' }
            ]
          },
          {
            name: 'model',
            icon: 'el-icon-menu',
            label: '机器学习模型训练',
            list: [
              { name: 'trainingModelManagement', label: '训练模型管理' }
            ]
          },
          {
            name: 'config',
            icon: 'el-icon-s-tools',
            label: 'AI 系统配置',
            list: [
              { name: 'trainingParamManagement', label: '训练参数配置' }
            ]
          }
        ];
        path = '/admin/recognition/diseaseImageManagement';
      } else if (params === 'system') {
        asideList = [
          {
            name: 'system',
            icon: 'el-icon-setting',
            label: '系统管理',
            list: [
              { name: 'roleManagement', label: '角色管理' }
            ]
          }
        ];
        path = '/admin/system/roleManagement';
      }
      // params 是头部菜单路径
      emit('menuSelect', params, asideList);
      // 点击后默认跳到头部菜单路径的第一个子页面
      router.push(path);
    };

    return {
      ...toRefs(state),
      logout,
      avatarColor,
      menuSelect
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: 59px;
  display: flex;
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
    position: relative;
    border: 0px;
  }

  .dropdown {
    top: 6px;
    right: 45px;
    width: auto;
    position: absolute;
  }
}
</style>
