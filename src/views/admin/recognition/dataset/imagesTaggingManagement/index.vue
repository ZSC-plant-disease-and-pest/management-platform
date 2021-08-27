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
  <Navmenu :menuList="taggingTypeList" :defaultActive="'noTagging'" />
  <Navmenu :menuList="imageTypeList" :defaultActive="'disease'" />
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
import { defineComponent, reactive, ref } from 'vue';
import Navmenu from '@/components/common/navmenu/Navmenu.vue';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import ImageTaggingDialog from './components/ImageTaggingDialog.vue';

export default defineComponent({
  components: { Navmenu, Pagenum, ImageTaggingDialog },
  setup () {
    const taggingTypeList = reactive([
      {
        index: 'noTagging',
        label: '待标注图片'
      },
      {
        index: 'isTagging',
        label: '已标注图片'
      }
    ]);
    const imageTypeList = reactive([
      {
        index: 'disease',
        label: '病害图片'
      },
      {
        index: 'pest',
        label: '虫害图片'
      },
      {
        index: 'plant',
        label: '植物图片'
      }
    ]);
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
      dialogType.value = 'update';
    };
    return {
      taggingTypeList,
      imageTypeList,
      imageList,
      dialogType,
      dialogClose,
      upload,
      imageClick
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
