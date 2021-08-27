<template>
  <el-dialog
    title="基本信息"
    v-model="dialogOpen"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-row :gutter="20">
      <el-col :span="8">
        <span>
          图片ID：1001
        </span>
      </el-col>
      <el-col :span="8">
        <span>
          图片分辨率：240 × 160 pt
        </span>
      </el-col>
      <el-col :span="8">
        <span>
          图片大小：426 KB
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span>
          图片上传者：root
        </span>
      </el-col>
      <el-col :span="16">
        <span>
          图片上传时间：2021/8/27 18:39:21
        </span>
      </el-col>
    </el-row>
    <el-form
      ref="formRef"
      size="small"
      :model="form"
      label-width="90px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <img
            src="@/assets/images/disease.jpg"
            style="width: 100%; height: 100%;"
            v-if="dialogType === 'update'"
          />
          <el-form-item
            label="病害图集："
            prop="file"
            v-if="dialogType === 'upload'"
          >
            <el-upload
              class="upload-common"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
            >
              <i class="el-icon-plus upload-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片类别：">
                <el-select
                  v-model="form.imageType"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option label="病害" value="disease" />
                  <el-option label="虫害" value="pest" />
                  <el-option label="植物" value="plant" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片标注：">
                <el-select
                  v-model="form.imageTagging"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option label="菊花黑锈病" value="菊花黑锈病" />
                  <el-option label="桂花叶斑病" value="桂花叶斑病" />
                  <el-option label="菜豆锈病" value="菜豆锈病" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="footer">
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';

export default defineComponent({
  props: {
    dialogType: {
      type: String,
      default: 'close'
    }
  },
  emits: ['dialogClose'],
  setup (props, { emit }) {
    const dialogOpen = ref(false);
    watch(() => props.dialogType, (newProps) => {
      if (newProps !== 'close') {
        dialogOpen.value = true;
      } else {
        dialogOpen.value = false;
      }
    });
    const state = reactive({
      form: {
        imageType: '',
        imageTagging: ''
      }
    });
    const close = () => {
      emit('dialogClose', 'close');
    };
    const submit = () => {
      emit('dialogClose', 'close');
    };
    return {
      ...toRefs(state),
      dialogOpen,
      close,
      submit
    };
  }
});
</script>

<style lang="scss" scoped>
.el-row {
  font-size: 15px;
  font-weight: 700;
  margin: 5px 0px 20px;
}
.footer {
  text-align: center;
}
.upload-common {
  width: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
}
</style>
