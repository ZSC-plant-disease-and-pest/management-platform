<template>
  <div id="editor"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import WangEditor from 'wangeditor';

export default defineComponent({
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  emits: ['editorContentChange'],
  setup (props, { emit }) {
    onMounted(() => {
      const editor = new WangEditor('#editor');
      editor.config.onchange = (newHtml: string) => {
        state.editorData = newHtml;
        emit('editorContentChange', state.editorData);
      };
      // 图片上传的地址
      editor.config.uploadImgServer = '/api/news/file/xieTest3';
      // 文件传给后端的名称。类似formData.append("file", param.file);中的file
      editor.config.uploadFileName = 'editormd-image-file';
      // 上传图片的类型
      editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      // 设置不需要的菜单
      editor.config.excludeMenus = [
        'emoticon',
        'video'
      ];
      editor.config.zIndex = 0;

      editor.config.uploadImgHooks = {
        before (xhr) {
          console.log('上传图片: ', xhr);
        },
        success (xhr) {
          console.log('success', xhr);
        },
        fail (xhr, editor, resData) {
          console.log('fail', resData);
        },
        timeout () {
          console.log('timeout');
        },
        customInsert: function (insertImgFn: any, result: any) {
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn('http://localhost:8080' + result.data.content[0].url);
        }
      };
      editor.create();
      editor.txt.html(props.content);
      state.editor = editor;
    });

    const state = reactive({
      editor: '' as any,
      editorData: '' as string
    });

    const edit = (data: any) => {
      state.editorData = data;
      emit('editorContentChange', data);
    };

    return {
      ...toRefs(state),
      edit
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep .w-e-text-container {
  height: 600px !important;
}
</style>
