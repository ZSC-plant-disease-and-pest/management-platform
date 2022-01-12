<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="item.path"
    >
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup () {
    const route = useRoute();

    onBeforeMount(() => {
      if (route.path.split('/')[1] === 'admin') {
        state.getBreadcrumb();
      }
    });

    const state = reactive({
      breadcrumbs: [] as Array<any>,
      getBreadcrumb: () => {
        state.breadcrumbs = [];
        let pathArray: Array<any> = [];
        let nameArray: Array<any> = [];
        const routeBreadcrumb = (route.meta.breadcrumb as Array<any>);
        for (let i = 0; i < routeBreadcrumb.length; i++) {
          if (routeBreadcrumb[i].path === route.path) {
            nameArray = routeBreadcrumb[i].name.split('/');
            pathArray = routeBreadcrumb[i].path.split('/');
          }
        }
        for (let i = 0; i < nameArray.length; i++) {
          const temp = {} as { name: string, path: string };
          temp.name = nameArray[i];
          if (i === 1) {
            temp.path = '';
            for (let j = 0; j < 4; j++) {
              if (j !== 0) {
                temp.path += '/' + pathArray[j];
              }
            }
          } else if (i > 1) {
            temp.path = '';
            temp.path = pathArray.join('/');
          }
          state.breadcrumbs.push(temp);
        }
      }
    });

    watch(() => route.path, (path) => {
      if (path === '/admin/home') {
        state.breadcrumbs = [];
      } else if (path.split('/')[1] === 'admin') {
        state.getBreadcrumb();
      }
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss" scoped></style>
