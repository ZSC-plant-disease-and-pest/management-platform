<template>
  <!-- 头部步骤条 -->
  <el-steps
    :active="(step - 1)"
    finish-status="success"
    style="padding: 10px; backgroundColor: #f5f7fa;"
  >
    <el-step title="填写基本信息"></el-step>
    <el-step title="准备数据"></el-step>
    <el-step title="创建训练模型"></el-step>
    <el-step title="创建完成"></el-step>
  </el-steps>

  <!-- 步骤一：填写基本信息 -->
  <el-form
    ref="step1FormRef"
    class="form-common"
    size="small"
    :rules="step1Rules"
    :model="form"
    label-width="130px"
    v-show="step === 1"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="模型名称：" prop="name">
          <el-input
            class="input-common"
            v-model="form.name"
            placeholder="请输入模型名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模型标识符：" prop="identifier">
          <el-input
            class="input-common"
            v-model="form.identifier"
            placeholder="请输入模型标识符"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="识别的分类数：" prop="recognizeAmount">
          <el-input
            class="input-common"
            v-model="form.recognizeAmount"
            disabled
            placeholder="自动生成"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="textarea-row">
      <el-col :span="24">
        <el-form-item label="用途说明：" prop="introduction">
          <el-input
            class="textarea-common"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入训练模型用途说明"
            clearable
            v-model="form.introduction"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!-- 步骤二：准备数据 -->
  <div v-show="step === 2">
    <!-- 基础信息 -->
    <el-row style="margin-top: 10px;">
      <el-col :span="24" class="title">
        <span> 基础信息 </span>
      </el-col>
    </el-row>
    <el-row :gutter="0" style="margin-top: 15px; padding: 0px 10px;">
      <el-col :span="3" :offset="1" class="subTitle">
        <span>数据集类别：</span>
      </el-col>
      <el-col :span="15">
        <el-checkbox-group
          v-model="datasetType"
          size="medium"
          @change="datasetTypeChange"
        >
          <el-checkbox label="0"> 病 害 </el-checkbox>
          <el-checkbox label="1"> 虫 害 </el-checkbox>
          <el-checkbox label="2"> 植 物 </el-checkbox>
        </el-checkbox-group>
      </el-col>
      <el-col :span="5">
        <div style="float: right; position: relative; top: -14px;">
          <el-button type="primary"> 导入数据集压缩文件 </el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 病虫植数据集的选择 -->
    <div style="padding: 10px;">
      <!-- 分割线 -->
      <el-divider style="backgroundColor: #1587e8;"></el-divider>

      <!-- 标题 -->
      <el-row style="margin-top: 10px;">
        <el-col
          :span="24"
          class="title"
          style="padding: 0px"
        >
          <span> 1. 病害数据集 </span>
        </el-col>
      </el-row>

      <!-- 事件控件 -->
      <el-row style="margin-top: 15px;">
        <el-col :span="8">
          <el-select
            v-model="diseaseDatasetSelect"
            placeholder="名称"
            size="medium"
          >
            <el-option label="测试一" value="1"></el-option>
            <el-option label="测试二" value="2"></el-option>
            <el-option label="测试三" value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <div style="float: right;">
            <el-button type="primary" @click="add(0)"> 添加 </el-button>
            <el-button type="success" @click="addAll(0)"> 选择全部 </el-button>
            <el-button type="warning"> 批量导入 </el-button>
          </div>
        </el-col>
      </el-row>

      <!-- 类别信息 -->
      <el-row style="margin-top: 15px;">
        <el-col :span="12">
          <span class="infoTitle"> 已有类别 </span>
        </el-col>
        <el-col :span="12">
          <div style="float: right;">
            <span class="infoDescribe"> 目前类别数为：124 </span>
          </div>
        </el-col>
      </el-row>

      <!-- 相关数据集信息 -->
      <div class="dataset">
        <div class="card" v-for="item in diseaseDatasetPagenum" :key="item.id">
          <el-card shadow="hover" style="text-align: center;">
            <el-row>
              <el-col :span="24">
                <i class="el-icon-close closeCard" @click="deleteDataset(0, item.id)"></i>
              </el-col>
            </el-row>
            <span style="position: relative; top: -7px;"> {{ item.name }} </span>
          </el-card>
        </div>
      </div>

      <!-- 分页 -->
      <Pagenum
        :total="diseaseDataset.total"
        :currentPage="diseaseDataset.page"
        :pageSize="diseaseDataset.size"
        @handleSizeChange="handleSizeChange($event, 0)"
        @handleCurrentChange="handleCurrentChange($event, 0)"
        :pageSizes="[21, 50, 100]"
      />
    </div>
  </div>

  <!-- 步骤三：创建训练模型 -->
  <el-form
    ref="step3FormRef"
    class="form-common"
    size="small"
    :rules="step3Rules"
    :model="form"
    label-width="130px"
    v-show="step === 3"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="算法来源：" prop="algorithm">
          <el-input
            class="input-common"
            v-model="form.algorithm"
            placeholder="请选择算法来源"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模型输出位置：" prop="outputPath">
          <el-input
            class="input-common"
            v-model="form.outputPath"
            placeholder="自动生成"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!-- 步骤四：创建完成 -->
  <el-row :gutter="0">
    <el-col :span="24" style="text-align: center;">
      <el-button
        :loading="isLoading"
        @click="back"
        style="margin-right: 50px;"
      >
        上一步
      </el-button>
      <el-button
        type="primary"
        :loading="isLoading"
        @click="next"
        style="margin-left: 50px;"
      >
        下一步
      </el-button>
    </el-col>
  </el-row>
  <el-result
    icon="success"
    :title="type === 'add' ? '新增成功' : '更新成功'"
    v-show="status === 'complete'"
  >
    <template #extra>
      <el-button @click="back">
        返回
      </el-button>
      <el-button
        type="primary"
        @click="keep"
        v-show="type === 'add'"
      >
        继续新增
      </el-button>
    </template>
  </el-result>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import { modelHttp, modelParams } from '@/api/model';
import { useRouter, useRoute } from 'vue-router';
import { illegalVisit } from '@/utils/global';
import { ElMessage } from 'element-plus';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import { datasetHttp, datasetParams } from '@/api/dataset';

export default defineComponent({
  name: 'add-update',
  components: { Pagenum },
  setup () {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      getParams();
    });

    const state = reactive({
      form: {
        id: undefined,
        name: '',
        identifier: '',
        recognizeAmount: 0
      } as modelParams,
      step1Rules: {
        name: [{ required: true, message: '请输入模型名称', trigger: ['blur', 'change'] }],
        identifier: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.identifier === undefined || state.form.identifier === '') {
              callback(new Error('请输入模型标识符'));
            } else {
              // 判断是否符合规则
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      step2Rules: {},
      step3Rules: {},
      // 数据集分页信息
      diseaseDataset: {
        total: 0,
        page: 1,
        size: 21
      },
      pestDataset: {
        total: 0,
        page: 1,
        size: 21
      },
      plantsDataset: {
        total: 0,
        page: 1,
        size: 21
      },
      // 数据集选择框
      diseaseDatasetSelect: '',
      pestDatasetSelect: '',
      plantsDatasetSelect: '',
      // 获取步骤的事件
      step1FormRef: ref(),
      step2FormRef: ref(),
      step3FormRef: ref(),
      // 添加到模型的数据集列表
      diseaseDatasetList: [] as Array<any>,
      pestDatasetList: [] as Array<any>,
      plantsDatasetList: [] as Array<any>,
      // 添加到模型的数据集列表的分页显示列表
      diseaseDatasetPagenum: [] as Array<any>,
      pestDatasetListPagenum: [] as Array<any>,
      plantsDatasetListPagenum: [] as Array<any>,
      // 数据集类型多选框
      datasetType: [] as Array<any>,
      isLoading: false,
      // 当前步骤
      step: 1,
      // 界面类型：add 新增，update 更新
      type: '',
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete'
    });

    const diseaseDatasetParams = reactive({
      page: 0,
      size: 21
    } as datasetParams);
    const pestDatasetParams = reactive({
      page: 0,
      size: 21
    } as datasetParams);
    const plantsDatasetParams = reactive({
      page: 0,
      size: 21
    } as datasetParams);
    const searchDataset = (id: number) => {
      if (id === 0) {
        datasetHttp.searchDiseaseDataset(diseaseDatasetParams)
          .then((response: any) => {
            console.log(response);
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (id === 1) {
        datasetHttp.searchPestDataset(pestDatasetParams)
          .then((response: any) => {
            console.log(response);
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (id === 2) {
        datasetHttp.searchPlantsDataset(plantsDatasetParams)
          .then((response: any) => {
            console.log(response);
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    // 多选框：需要显示的数据集类型
    const datasetTypeChange = (data: any) => {
      console.log(data);
    };
    // 删除添加到模型中的数据集
    const deleteDataset = (id: number, datasetId: number) => {
      console.log(id, datasetId);
    };
    // 添加数据集到模型中
    const add = (id: number) => {
      if (id === 0) {

      } else if (id === 1) {

      } else if (id === 2) {

      }
    };
    // 添加全部数据集到模型中
    const addAll = (id: number) => {
      if (id === 0) {
        datasetHttp.searchDiseaseDataset({ page: 0, size: 2000 })
          .then((response: any) => {
            const [...tempResponse] = response.content;
            state.diseaseDatasetList = [];
            for (let i = 0; i < tempResponse.length; i++) {
              state.diseaseDatasetList.push(tempResponse[i]);
            }
            addDatasetPagenumList(0);
            console.log(state.diseaseDatasetList);
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (id === 1) {

      } else if (id === 2) {

      }
    };
    // 将添加到模型的数据集列表生成分页列表
    const addDatasetPagenumList = (id: number) => {
      console.log(id);
    };
    // 判断是新增数据还是更新数据
    const getParams = () => {
      if (route.path.split('/').slice(-1)[0] === 'update') {
        // 若 params 有 id，则是合法访问
        if (route.params.id !== undefined) {
          state.type = 'update';
          const { ...tempParams } = route.params;
          state.form = tempParams;
          // console.log(tempParams);
        } else {
          // 非法访问更新界面
          illegalVisit();
          router.go(-1);
        }
      } else {
        state.type = 'add';
      }
    };
    // 创建训练模型
    const createModel = () => {
      state.isLoading = true;
      modelHttp.createModel(state.form)
        .then((response: any) => {
          ElMessage.success('新建训练模型成功');
          console.log(response);
        })
        .finally(() => {
          state.isLoading = false;
        });
    };
    // 提交数据
    const submit = () => {
      createModel();
    };
    // 上一步
    const back = () => {
      if (state.step === 1) {
        router.push({
          path: '/admin/recognition/trainingModelManagement',
          name: 'trainingModelManagementAdd',
          params: {
            type: 'refresh'
          }
        });
      } else if (state.step === 2) {

      } else if (state.step === 3) {

      } else if (state.step === 4) {

      }
    };
    // 下一步
    const next = () => {
      if (state.step === 1) {
        state.step1FormRef.validate().then((valid: boolean) => {
          if (valid) {
            state.step += 1;
            searchDataset(0);
          }
        });
      } else if (state.step === 2) {
        state.step += 1;
      } else if (state.step === 3) {
        state.step += 1;
      } else if (state.step === 4) {
        state.step += 1;
      }
    };
    const keep = () => {
      // 直接用Key强制渲染
      state.status = 'incomplete';
    };
    const handleSizeChange = (newSize: any, type: any) => {
      if (type === 0) {
        state.diseaseDataset.size = newSize;
        state.diseaseDataset.page = 1;
        diseaseDatasetParams.size = newSize;
        diseaseDatasetParams.page = 0;
      } else if (type === 1) {
        state.pestDataset.size = newSize;
        state.pestDataset.page = 1;
        pestDatasetParams.size = newSize;
        pestDatasetParams.page = 0;
      } else if (type === 2) {
        state.plantsDataset.size = newSize;
        state.plantsDataset.page = 1;
        plantsDatasetParams.size = newSize;
        plantsDatasetParams.page = 0;
      }
      // getDisease();
    };
    const handleCurrentChange = (newPage: any, type: any) => {
      if (type === 0) {
        state.diseaseDataset.page = newPage + 1;
        diseaseDatasetParams.page = newPage;
      } else if (type === 1) {
        state.pestDataset.page = newPage + 1;
        pestDatasetParams.page = newPage;
      } else if (type === 2) {
        state.plantsDataset.page = newPage + 1;
        plantsDatasetParams.page = newPage;
      }
      // getDisease();
    };

    return {
      ...toRefs(state),
      datasetTypeChange,
      deleteDataset,
      add,
      addAll,
      submit,
      back,
      next,
      keep,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 700;
  color: #2caa12;
  padding: 0px 10px;
}
.subTitle {
  font-size: 16px;
  font-weight: 700;
}
.infoTitle {
  font-size: 16px;
  font-weight: 700;
  color: #1587e8;
}
.infoDescribe {
  font-size: 16px;
  font-weight: 700;
}
.dataset {
  display: flex;
  flex-wrap: wrap;

  .card {
    width: 231px;
    margin: 10px;
  }
}
.closeCard {
  float: right;
  cursor: pointer;
}
.dataset ::v-deep .el-card__body {
  padding: 10px 10px;
}
::v-deep .el-divider.el-divider--horizontal {
  margin-top: 0px;
}
</style>
