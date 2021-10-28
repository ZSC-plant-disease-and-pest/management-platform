<template>
  <div class="header">
    <span>待标注图片：{{ waitTaggingTotal }}张（说明：左键单击弹出标注对话框）</span>
    <el-button
      class="button"
      type="primary"
      @click="upload"
    >
      上传标注图片
    </el-button>
  </div>
  <el-tabs
    v-model="activeName"
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
      src="@/assets/images/disease.jpg"
      v-for="item in imageList"
      :key="item.id"
      @click="imageClick(item)"
    />
  </div>
  <Pagenum />
  <ImageTaggingDialog
    ref="imageTaggingDialogRef"
    :dialogType="dialogType"
    @dialogClose="dialogClose"
    :key="taggingDialogKey"
  />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { taggingHttp, taggingParams } from '@/api/tagging';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import ImageTaggingDialog from './components/ImageTaggingDialog.vue';

export default defineComponent({
  components: { Pagenum, ImageTaggingDialog },
  setup () {
    onBeforeMount(() => {
      searchTaggingImages();
    });

    const state = reactive({
      imageList: [] as Array<any>,
      activeName: '0',
      taggingDialogKey: 0,
      waitTaggingTotal: undefined as number | undefined,
      imageTaggingDialogRef: ref(),
      isLoading: false,
      total: 0,
      page: 1,
      size: 10
    });

    const taggingParams = reactive({
      datasetType: 0,
      page: 0,
      size: 10
    } as taggingParams);
    const searchTaggingImages = () => {
      state.isLoading = true;
      taggingHttp.searchTaggingImages(taggingParams)
        .then((response: any) => {
          state.total = response.totalElements;
          state.size = response.size;
          state.imageList = [];
          for (let i = 0; i < response.content.length; i++) {
            state.imageList.push(response.content[i]);
          }
          state.waitTaggingTotal = response.numberOfElements;
        })
        .finally(() => {
          state.isLoading = false;
        });
    };

    const dialogType = ref('close');
    const dialogClose = () => {
      dialogType.value = 'close';
      state.taggingDialogKey += 1;
    };
    const upload = () => {
      dialogType.value = 'upload';
    };
    const imageClick = (value: any) => {
      dialogType.value = 'edit';
      state.imageTaggingDialogRef.edit(state.activeName, value);
    };
    const tabsClick = () => {
      if (Number(state.activeName) !== taggingParams.datasetType) {
        taggingParams.datasetType = Number(state.activeName);
        searchTaggingImages();
      }
    };
    return {
      ...toRefs(state),
      dialogType,
      dialogClose,
      upload,
      imageClick,
      tabsClick
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
    width: 242px;
    height: 181px;
    margin: 15px;
    cursor: pointer;
  }
}
</style>
