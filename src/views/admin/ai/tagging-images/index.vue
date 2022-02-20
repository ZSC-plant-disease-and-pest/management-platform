<template>
  <el-row justify="space-between">
    <el-col :span="12">
      <span style="color: #FF6347">待标注图片: {{ waitTaggingTotal }} 张</span>
      (说明: 左键单击弹出标注对话框)
    </el-col>
    <el-col :span="12">
      <el-button type="primary" @click="buttonClick('upload')" style="float: right; marginRight: 10px">
        上传标注图片
      </el-button>
    </el-col>
  </el-row>

  <el-tabs v-model="tabsName" @tab-click="tabsClick" style="width: 248px;">
    <el-tab-pane label="病害图片" name="0"></el-tab-pane>
    <el-tab-pane label="虫害图片" name="1"></el-tab-pane>
    <el-tab-pane label="植物图片" name="2"></el-tab-pane>
  </el-tabs>

  <div v-loading="isLoading">
    <div class="box-images">
      <img
        class="image"
        v-for="item in imageList"
        :src="'http://localhost:8080' + item.path"
        :key="item.id"
        @click="buttonClick('edit', item)"
      />
    </div>
  </div>

  <BasicPage
    :pageList="pageList"
    :page-sizes="[18, 30, 40, 50, 100]"
    @handleChange="handleChange"
  />

  <DataPageDialog
    ref="dataPageDialogRef"
    @refreshTable="refreshTable"
    :key="taggingDialogKey"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { taggingHttp, taggingParams } from '@/api/tagging';
import { pageList } from './data';
import BasicPage from '@/components/common/BasicPage/index.vue';
import DataPageDialog from './components/DataPageDialog.vue';

export default defineComponent({
  components: { BasicPage, DataPageDialog },
  setup () {
    onBeforeMount(() => {
      getTaggingImages();
    });

    // 数据仓库
    const state = reactive({
      dialogType: 'close',
      tabsName: '0',
      waitTaggingTotal: undefined as number | undefined,
      imageList: [] as Array<any>,
      imageDialogState: 'close',
      pageList,
      taggingDialogKey: 0,
      isLoading: false,
      dataPageDialogRef: ref()
    });

    // 请求表单数据
    const taggingParams = reactive({ datasetType: 0, page: 0, size: 18 } as taggingParams);
    const getTaggingImages = () => {
      state.isLoading = true;
      taggingHttp.getTaggingImages(taggingParams)
        .then((response: any) => {
          state.pageList.total = response.totalElements;
          state.pageList.size = response.size;
          state.waitTaggingTotal = response.numberOfElements;
          state.imageList = [];
          for (let i = 0; i < response.content.length; i++) {
            state.imageList.push(response.content[i]);
          }
        })
        .finally(() => { state.isLoading = false; });
    };

    const buttonClick = (type: string, data: any) => {
      if (type === 'upload') {
        state.dataPageDialogRef.upload();
      } else if (type === 'edit') {
        state.dataPageDialogRef.edit(state.tabsName, data);
      }
    };

    const dialogClose = () => {
      state.dialogType = 'close';
      state.taggingDialogKey += 1;
      getTaggingImages();
    };

    const tabsClick = () => {
      if (Number(state.tabsName) !== taggingParams.datasetType) {
        taggingParams.datasetType = Number(state.tabsName);
        getTaggingImages();
      }
    };

    // 分页改变
    const handleChange = (name: string, data: any) => {
      if (name === 'page') {
        taggingParams.page = data - 1;
        state.pageList.page = data;
      } else if (name === 'size') {
        taggingParams.size = data;
        taggingParams.page = 0;
        state.pageList.size = data;
        state.pageList.page = 1;
      }
      getTaggingImages();
    };

    // 刷新
    const refreshTable = () => {
      getTaggingImages();
    };

    return {
      ...toRefs(state),
      buttonClick,
      dialogClose,
      tabsClick,
      handleChange,
      refreshTable
    };
  }
});
</script>

<style lang="scss" scoped>
.box-images {
  display: flex;
  flex-wrap: wrap;

  .image {
    width: 263px;
    height: 197px;
    margin: 15px;
    cursor: pointer;
  }
}
</style>
