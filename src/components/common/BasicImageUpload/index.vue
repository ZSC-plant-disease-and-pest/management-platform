<template>
  <el-upload
    ref="uploadImageRef"
    action="#"
    :limit="10"
    :multiple="true"
    :auto-upload="false"
    :on-change="onChange"
    list-type="picture-card"
    accept=".gif,.jpg,.jpeg,.png,.bmp"
    v-bind="$attrs"
  >
    <template #default>
      <i class="el-icon-plus"></i>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="preview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="remove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  emits: ['onChange', 'preview'],
  setup (props, { emit }) {
    const state = reactive({
      fileList: [] as Array<any>
    });

    // 新增文件时
    const onChange = (file: any, fileList: Array<any>) => {
      state.fileList = fileList;
      emit('onChange', state.fileList);
    };

    // 移除文件时
    const remove = (file: any) => {
      const removeIndex = state.fileList.findIndex((value: any) => value.uid === file.uid);
      state.fileList.splice(removeIndex, 1);
      emit('onChange', state.fileList);
    };

    // 预览文件(图片或视频)
    const preview = (file: any) => {
      emit('preview', file);
    };

    // 清空文件
    const clear = () => {
      state.fileList.splice(0, state.fileList.length);
      emit('onChange', state.fileList);
    };

    return {
      onChange,
      remove,
      preview,
      clear
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep .el-upload-list__item {
  transition: none !important;
}
</style>
