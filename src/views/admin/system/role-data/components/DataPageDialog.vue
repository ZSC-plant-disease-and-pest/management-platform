<template>
  <el-dialog
    v-model="dialogVisible"
    :title="'新增' + title"
    :width="600"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      class="form-common"
      size="small"
      :rules="rules"
      :model="form"
      label-width="130px"
    >
      <el-row>
        <el-col :span="23">
          <el-form-item :label="title + '：'" prop="name">
            <DatasetSelector
              ref="datasetSelectRef"
              :type="type"
              @selectChange="datasetSelect"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button size="small" @click="dialogVisible = false">
        关闭
      </el-button>
      <el-button type="primary" size="small" :loading="isLoading" @click="submit">
        新增
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { ElMessage } from 'element-plus';
import DatasetSelector from '@/components/selector/DatasetSelector.vue';

export default defineComponent({
  components: { DatasetSelector },
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    // 数据仓库
    const state = reactive({
      form: {
        id: undefined,
        name: '',
        informationId: undefined
      } as datasetParams,
      formRef: ref(),
      rules: {
        name: [{ required: true, message: '请选择需要创建的数据集', trigger: ['blur', 'change'] }]
      },
      isLoading: false,
      type: '',
      dialogVisible: false
    });

    // 弹出框标题
    const title = computed(() => {
      let word = '';
      switch (state.type) {
        case 'disease':
          word = '病害';
          break;
        case 'pest':
          word = '虫害';
          break;
        case 'plants':
          word = '植物';
          break;
        default:
          break;
      }
      return `${word}数据集`;
    });

    // 打开
    const openDialog = (type: string) => {
      state.type = type;
      state.dialogVisible = true;
    };

    // 提交
    const submit = () => {
      state.formRef.validate().then((valid: boolean) => {
        if (valid) {
          state.isLoading = true;
          if (state.type === 'disease') {
            datasetHttp.createDiseaseDateset(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => { state.isLoading = false; });
          } else if (state.type === 'pest') {
            datasetHttp.createPestDateset(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => { state.isLoading = false; });
          } else if (state.type === 'plants') {
            datasetHttp.createPlantsDateset(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => { state.isLoading = false; });
          }
        }
      });
    };

    // 关闭
    const closed = () => {
      state.dialogVisible = false;
      state.form.name = '';
      state.form.informationId = undefined;
    };

    // 刷新
    const refreshTable = () => {
      emit('refreshTable');
    };

    // 数据集被选择
    const datasetSelect = (id: number) => {
      state.form.informationId = id;
    };

    return {
      ...toRefs(state),
      title,
      openDialog,
      closed,
      submit,
      datasetSelect
    };
  }
});
</script>

<style lang="scss" scoped></style>
