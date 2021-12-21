<template>
  <el-row>
    <el-col :span="24">
      <el-card class="card-describe" shadow="never">
        <img class="image" :src="dataPageDetailData.src" alt="" @click="checkDetail" />
        <div class="describe">
          <el-row :gutter="0">
            <el-col :span="12"> 序号：{{ dataPageDetailData.id }} </el-col>
            <el-col :span="12"> 图像大小：{{ dataPageDetailData.size }} </el-col>
          </el-row>

          <el-row :gutter="0">
            <el-col :span="12"> 像素：{{ dataPageDetailData.resolution }} </el-col>
            <el-col :span="12"> 创建者：{{ dataPageDetailData.creator }} </el-col>
          </el-row>

          <el-row :gutter="0">
            <el-col :span="24">
              创建时间：{{ Moment(dataPageDetailData.createTime).format('YYYY-MM-DD  hh:mm:ss') }}
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogImageVisible" title="查看图片">
    <img style="width: 100%; height: 75%;" :src="dataPageDetailData.src" alt="" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import Moment from 'moment';

export default defineComponent({
  props: {
    dataPageDetailData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ['checkDetail'],
  setup () {
    const state = reactive({
      dialogImageVisible: false,
      Moment
    });

    const checkDetail = () => {
      state.dialogImageVisible = true;
    };

    return {
      ...toRefs(state),
      checkDetail
    };
  }
});
</script>

<style lang="scss" scoped>
.card-describe {
  margin-top: 10px;

  .image {
    width: 263px;
    height: 197px;
    cursor: pointer;
    border-radius: 4px;
  }

  .describe {
    top: -6px;
    position: relative;
    padding: 0px 10px;
    font-size: 12px;
  }
}
::v-deep .el-card__body {
  padding: 0px;
}
</style>
