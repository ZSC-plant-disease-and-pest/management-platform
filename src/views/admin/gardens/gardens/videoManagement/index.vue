<template>
  <Search
    :searchList="searchList"
    @search="search"
    @reset="reset"
  />
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    :loading="loading"
    @check="check"
    @edit="edit"
    @remove="remove"
    @add="add"
    @sortChange="sortChange"
  />
  <Dialog ref="dialogRef" />
  <Pagenum
    :total="total"
    :currentPage="page"
    :pageSize="size"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  />
</template>

<script lang="ts">
import Table from '@/components/common/table/Table.vue';
import Search from '@/components/common/search/Search.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
// import { plantsHttp, videoParams } from '@/api/plants';
import {
  defineComponent,
  reactive,
  onBeforeMount,
  ref,
  toRefs,
  onUpdated
} from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Dialog from './components/Dialog.vue';

export default defineComponent({
  components: { Table, Search, Pagenum, Dialog },
  setup () {
    // 使用路由
    const router = useRouter();
    const state = reactive({
      dialogRef: ref(),
      tableData: [] as Array<any>
    });
    // 表头信息
    const tableColumn = reactive([
      {
        prop: 'id',
        label: 'ID',
        width: '75px'
      },
      {
        prop: 'name',
        label: '视频名称',
        width: 'auto'
      },
      {
        prop: 'scientificName',
        label: '上传用户',
        width: 'auto'
      },
      {
        prop: 'nickname',
        label: '视频编号',
        width: 'auto'
      },
      {
        prop: 'family',
        label: '上传时间',
        width: 'auto'
      },
      {
        prop: 'genus',
        label: '视频类型',
        width: 'auto'
      },
      {
        prop: 'genus',
        label: '视频时长',
        width: 'auto'
      }
    ]);
    // 排序
    const sortChange = (params: any) => {
      console.log(params);
    };
    // 新增
    const add = () => {
      state.dialogRef.openDialog();
    };
    // 删除
    const remove = (selectedIds: any) => {
      if (selectedIds.length === 0) {
        // 提示请选择需要删除的内容
        ElMessage.warning('请选择需要删除的内容');
      } else {
        // loading.value = true;
        // plantsHttp.deletePlants(selectedIds.join(','))
        //   .then(() => {
        //     ElMessage.success('删除成功');
        //     getVideo();
        //   })
        //   .finally(() => {
        //     loading.value = false;
        //   });
      }
    };
    // 编辑
    const edit = (data: any) => {
      router.push({
        path: router.currentRoute.value.path + '/update',
        name: 'videoManagementUpdate',
        params: data
      });
    };
    // 查看
    const check = (data: any) => {
      console.log(data);
    };
    // 搜索
    const search = (data: any) => {
      // for (const index in data) {
      //   if (data[index].name === 'name') {
      //     videoParams.name = data[index].value === '' ? undefined : data[index].value;
      //   }
      // }
      // getVideo();
    };
    // 重置搜索框
    const reset = () => {
      // for (const index in searchList) {
      //   searchList[index].value = '';
      //   videoParams.name = undefined;
      // }
      // getVideo();
    };
    // 搜索框信息
    const searchList = reactive([
      {
        name: 'name',
        placeholder: '视频名称',
        value: ''
      },
      {
        name: 'plantName',
        placeholder: '植物名称',
        value: ''
      }
    ]);
    // 表格每页信息大小改变
    const handleSizeChange = (newSize: any) => {
      // videoParams.size = newSize;
      // videoParams.page = 0;
      // size.value = newSize;
      // page.value = 1;
      // getVideo();
    };
    // 表格页数改变
    const handleCurrentChange = (newPage: any) => {
      // videoParams.page = newPage;
      // page.value = newPage + 1;
      // getVideo();
    };
    // 导出
    return {
      ...toRefs(state),
      tableColumn,
      sortChange,
      add,
      remove,
      edit,
      check,
      search,
      reset,
      searchList,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped></style>
