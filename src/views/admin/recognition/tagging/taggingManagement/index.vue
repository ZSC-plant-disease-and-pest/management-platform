<template>
  <div class="header">
    <span>待标注图片：105张（说明：左键单击弹出标注对话框）</span>
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
      :key="item.value"
      @click="imageClick(item.value)"
    />
  </div>
  <Pagenum />
  <ImageTaggingDialog :dialogType="dialogType" @dialogClose="dialogClose" />
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
      activeName: 'disease',
      isLoading: false
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
          console.log(response);
        })
        .finally(() => {
          state.isLoading = false;
        });
    };

    const imageList = reactive([
      {
        value: '1'
      },
      {
        value: '2'
      },
      {
        value: '3'
      },
      {
        value: '4'
      },
      {
        value: '5'
      },
      {
        value: '6'
      },
      {
        value: '7'
      },
      {
        value: '8'
      },
      {
        value: '9'
      },
      {
        value: '10'
      },
      {
        value: '11'
      },
      {
        value: '12'
      },
      {
        value: '13'
      },
      {
        value: '14'
      },
      {
        value: '15'
      },
      {
        value: '16'
      },
      {
        value: '17'
      },
      {
        value: '18'
      }
    ]);
    const dialogType = ref('close');
    const dialogClose = () => {
      dialogType.value = 'close';
    };
    const upload = () => {
      dialogType.value = 'upload';
    };
    const imageClick = (value: any) => {
      console.log(value);
      dialogType.value = 'edit';
    };
    const tabsClick = () => {
      if (Number(state.activeName) !== taggingParams.datasetType) {
        taggingParams.datasetType = Number(state.activeName);
        searchTaggingImages();
      }
    };
    return {
      ...toRefs(state),
      imageList,
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
