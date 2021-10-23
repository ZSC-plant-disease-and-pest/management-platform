<template>
  <el-dialog
    :title="'新增' + typeWord + '数据集'"
    v-model="dialogVisible"
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
      label-width="140px"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="typeWord + '数据集：'" prop="datasetId">
            <DatasetSelect
              ref="datasetSelectRef"
              :type="type"
              @selectChange="datasetSelect"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button size="small" @click="dialogVisible = false">
          关 闭
        </el-button>
        <el-button
          type="primary"
          size="small"
          :loading="isLoading"
          @click="submit"
        >
          新 增
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { datasetHttp, datasetParams } from '@/api/dataset';
import { ElMessage } from 'element-plus';
import DatasetSelect from './DatasetSelect.vue';

export default defineComponent({
  components: { DatasetSelect },
  emits: ['refreshTable'],
  setup (prop, { emit }) {
    const state = reactive({
      form: {
        id: undefined,
        informationId: undefined
      } as datasetParams,
      formRef: ref(),
      rules: {
        datasetId: [
          {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
              if (state.form.informationId === undefined) {
                callback(new Error('请选择需要创建的数据集'));
              } else {
                callback();
              }
            },
            trigger: ['blur', 'change']
          }
        ]
      },
      type: '',
      isLoading: false,
      dialogVisible: false
    });

    const typeWord = computed(() => {
      if (state.type === 'disease') {
        return '病害';
      } else if (state.type === 'pest') {
        return '虫害';
      } else if (state.type === 'plants') {
        return '植物';
      } else {
        return '';
      }
    });

    const openDialog = (type: string) => {
      state.type = type;
      state.dialogVisible = true;
    };
    const closed = () => {
      state.form.informationId = undefined;
    };
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
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'pest') {
            datasetHttp.createPestDateset(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          } else if (state.type === 'plants') {
            datasetHttp.createPlantsDateset(state.form)
              .then(() => {
                ElMessage.success('添加成功');
                state.dialogVisible = false;
                refreshTable();
              })
              .finally(() => {
                state.isLoading = false;
              });
          }
        }
      });
    };
    const refreshTable = () => {
      emit('refreshTable');
    };
    const datasetSelect = (id: number) => {
      state.form.informationId = id;
    };

    return {
      ...toRefs(state),
      typeWord,
      openDialog,
      closed,
      submit,
      datasetSelect
    };
  }
});
</script>

<style lang="scss" scoped></style>
