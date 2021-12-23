<template>
  <div class="header">
    <span>
      <span style="color: #FF6347">待标注图片：{{ waitTaggingTotal }}张</span>
      （说明：左键单击弹出标注对话框）
    </span>
    <el-button class="button" type="primary" @click="upload">
      上传标注图片
    </el-button>
  </div>
  <el-tabs
    v-model="tabsName"
    @tab-click="tabsClick"
    style="width: 248px;"
  >
    <el-tab-pane label="病害图片" name="0"></el-tab-pane>
    <el-tab-pane label="虫害图片" name="1"></el-tab-pane>
    <el-tab-pane label="植物图片" name="2"></el-tab-pane>
  </el-tabs>
  <div class="box-images">
    <img
      class="image"
      v-for="item in imageList"
      :src="'http://localhost:8080' + item.path"
      :key="item.id"
      @click="imageClick(item)"
    />
  </div>
  <BasicPage
    :pageList="pageList"
    :page-sizes="[18, 30, 40, 50, 100]"
    @handleChange="handleChange"
  />
  <DataPageDialog
    ref="dataPageDialogRef"
    :dialogType="dialogType"
    @dialogClose="dialogClose"
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
      imageList: [] as Array<any>,
      tabsName: '0',
      pageList,
      taggingDialogKey: 0,
      waitTaggingTotal: undefined as number | undefined,
      dataPageDialogRef: ref(),
      isLoading: false
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

    const dialogType = ref('close');
    const dialogClose = () => {
      dialogType.value = 'close';
      state.taggingDialogKey += 1;
      getTaggingImages();
    };
    const upload = () => {
      dialogType.value = 'upload';
    };
    const imageClick = (value: any) => {
      dialogType.value = 'edit';
      state.dataPageDialogRef.edit(state.tabsName, value);
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

    return {
      ...toRefs(state),
      dialogType,
      dialogClose,
      upload,
      imageClick,
      tabsClick,
      handleChange
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;

  .button {
    margin-right: 15px;
  }
}
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
