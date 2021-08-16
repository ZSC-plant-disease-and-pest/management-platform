<template>
  <div class="header">
    <div class="logo">
      <img class="img" src="~@/assets/images/plant.png" />
      <span class="title">
        植物病虫害管理
      </span>
    </div>
    <el-menu
      class="menu"
      mode="horizontal"
      default-active="home"
      @select="menuSelect"
    >
      <el-menu-item index="home">
        首页
      </el-menu-item>
      <el-menu-item index="new">
        新闻公告
      </el-menu-item>
      <el-menu-item index="disease">
        病虫害数据库
      </el-menu-item>
      <el-menu-item index="gardens">
        园林花卉
      </el-menu-item>
      <el-menu-item index="recognition">
        AI 智能识别
      </el-menu-item>
      <el-menu-item index="system">
        系统管理
      </el-menu-item>
    </el-menu>
    <div class="dropdown">
      <el-dropdown>
        <el-avatar
          class="avatar"
          :size="48"
          shape="square"
          :style="{ backgroundColor: avatarColor }"
        >
          root
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
import { defineComponent, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export default defineComponent({
  emits: ['menuSelect'],
  setup (props, { emit }) {
    const router = useRouter();
    const logout = () => {
      console.log('logout');
      router.push('/login');
      ElMessage.success('退出成功');
    };
    const avatarColor = computed(() => {
      const colorArr = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
      return colorArr[Math.floor(Math.random() * 4)];
    });
    let asideList: any[] = [];
    const menuSelect = (params: any) => {
      let path = '';
      if (params === 'home') {
        // 跳转到首页，隐藏 aside
        path = '/admin/home';
      } else if (params === 'new') {
        asideList = [
          {
            name: 'new',
            icon: 'el-icon-watermelon',
            label: '新闻公告',
            list: [
              {
                name: 'newManagement',
                label: '新闻管理'
              }
            ]
          }
        ];
        path = '/admin/new/newManagement';
      } else if (params === 'disease') {
        asideList = [
          {
            name: 'disease',
            icon: 'el-icon-watermelon',
            label: '病害数据库',
            list: [
              {
                name: 'diseaseManagement',
                label: '植物病害管理'
              }
            ]
          },
          {
            name: 'pest',
            icon: 'el-icon-watermelon',
            label: '虫害数据库',
            list: [
              {
                name: 'pestManagement',
                label: '植物虫害管理'
              }
            ]
          }
        ];
        path = '/admin/disease/diseaseManagement';
      } else if (params === 'gardens') {
        asideList = [
          {
            name: 'plants',
            icon: 'el-icon-watermelon',
            label: '植物数据集',
            list: [
              {
                name: 'plantsManagement',
                label: '植物管理'
              },
              {
                name: 'familyManagement',
                label: '科属管理'
              }
            ]
          },
          {
            name: 'gardens',
            icon: 'el-icon-watermelon',
            label: '园林植物护养',
            list: [
              {
                name: 'videoManagement',
                label: '盆景养护视频'
              }
            ]
          }
        ];
        path = '/admin/gardens/plantsManagement';
      } else if (params === 'recognition') {
        asideList = [
          {
            name: 'images',
            icon: 'el-icon-watermelon',
            label: 'AI 图像数据集',
            list: [
              {
                name: 'diseaseImageManagement',
                label: '病害图像数据集管理'
              },
              {
                name: 'pestImageManagement',
                label: '虫害图像数据集管理'
              },
              {
                name: 'plantsImageManagement',
                label: '植物图像数据集管理'
              }
            ]
          },
          {
            name: 'dataset',
            icon: 'el-icon-watermelon',
            label: '数据集标注',
            list: [
              {
                name: 'imagesTaggingManagement',
                label: '图片标注管理'
              }
            ]
          },
          {
            name: 'model',
            icon: 'el-icon-watermelon',
            label: '机器学习模型训练',
            list: [
              {
                name: 'trainingModelManagement',
                label: '训练模型管理'
              }
            ]
          },
          {
            name: 'config',
            icon: 'el-icon-watermelon',
            label: 'AI 系统配置',
            list: [
              {
                name: 'trainingParamManagement',
                label: '训练参数配置'
              }
            ]
          }
        ];
        path = '/admin/recognition/diseaseImageManagement';
      } else if (params === 'system') {
        // 空
      }
      emit('menuSelect', params, asideList);
      router.push(path);
    };
    return {
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
      font-weight: 600;
    }
  }

  .menu {
    position: relative;
    left: 15%;
    border: 0px;
  }

  .dropdown {
    top: 6px;
    left: 30%;
    position: relative;
  }
}
</style>
