<template>
  <div class="header">
    <div class="logo">
      <img class="img" src="~@/assets/images/plant.png" />
      <span class="title">
        植物病虫害管理
      </span>
    </div>
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
  setup () {
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
    return {
      logout,
      avatarColor
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: 59px;
  display: flex;
  flex-direction: row-reverse;
  border-bottom: 1px solid #d8dce5;

  .logo {
    left: 0px;
    width: 200px;
    height: 59px;
    display: flex;
    position: fixed;
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

  .dropdown {
    top: 6px;
    right: 96px;
    position: relative;
  }
}
</style>
