<template>
  <el-row>
    <el-col :span="24">
      <el-card class="card-describe" shadow="never">
        <img class="image" :src="src" alt="" @click="checkDetail" />
        <div class="describe">
          <el-row :gutter="0">
            <el-col :span="12">
              序号：{{ id }}
            </el-col>
            <el-col :span="12">
              图像大小：{{ size }}
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="12">
              像素：{{ resolution }}
            </el-col>
            <el-col :span="12">
              创建者：{{ creator }}
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24">
              创建时间：{{ getStandardTime(createTime, 'dateTime') }}
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogImageVisible" title="查看图片">
    <img style="width: 100%; height: 75%;" :src="src" alt="" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { getStandardTime } from '@/utils/time';

export default defineComponent({
  props: {
    id: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: ''
    },
    resolution: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    creator: {
      type: String,
      default: 'root'
    },
    createTime: {
      type: String,
      default: ''
    }
  },
  emits: ['checkDetail'],
  setup () {
    const state = reactive({
      dialogImageVisible: false,
      getStandardTime
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
