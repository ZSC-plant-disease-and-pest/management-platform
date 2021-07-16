<template>
  <Search :searchList="searchList" @search="search" @reset="reset" />
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    @check="check"
    @edit="edit"
    @remove="remove"
    @add="add"
  />
</template>

<script lang="ts">
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import {
  defineComponent,
  reactive
} from 'vue';

export default defineComponent({
  props: {},
  components: { Table, Search },
  setup () {
    const tableData = reactive([
      {
        id: '1',
        name: '水仙',
        species: '水仙属',
        regions: '产亚洲东部的海滨温暖地区；中国浙江、福建沿海岛屿自生',
        description: '喜阳光充足，生命力顽强，能耐半阴，不耐寒。7-8月份落叶休眠，在休眠期鳞茎的生长点部分进行花芽分化，具秋冬生长，早春开花，夏季休眠的生理特性。水仙喜光、喜水、喜肥，适于温暖、湿润的气候条件，喜肥沃的砂质土壤。生长前期喜凉爽、中期稍耐寒、后期喜温暖。因此要求冬季无严寒夏季无酷暑，春秋季多雨的气候环境'
      },
      {
        id: '2',
        name: '云杉',
        species: '云杉属',
        regions: '产陕西、甘肃及四川高山，常组成大面积纯林',
        description: `云杉喜凉润季候及深厚而派水良好的酸性土壤，较喜光，耐荫，耐干冷；浅根性。
                      云杉耐阴、耐寒、喜欢凉爽湿润的气候和肥沃深厚、排水良好的微酸性沙质土壤，生长缓慢、浅根性树种。`
      }
    ]);
    const tableColumn = reactive([
      {
        prop: 'id',
        label: 'id',
        width: '75px'
      },
      {
        prop: 'name',
        label: '名称',
        width: 'auto'
      },
      {
        prop: 'species',
        label: '属类',
        width: 'auto'
      }
    ]);
    const add = (data: any) => {
      console.log(data);
    };
    const remove = (data: any) => {
      console.log(data);
    };
    const edit = (data: any) => {
      console.log(data);
    };
    const check = (data: any) => {
      console.log(data);
    };
    const search = (data: any) => {
      console.log(data);
    };
    const reset = () => {
      for (const index in searchList) {
        searchList[index].value = '';
      }
    };
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '名称',
        value: ''
      },
      {
        name: 'species',
        placeholder: '属类',
        value: ''
      }
    ]);
    return {
      tableData,
      tableColumn,
      add,
      remove,
      edit,
      check,
      search,
      reset,
      searchList
    };
  }
});
</script>

<style lang="scss" scoped></style>
