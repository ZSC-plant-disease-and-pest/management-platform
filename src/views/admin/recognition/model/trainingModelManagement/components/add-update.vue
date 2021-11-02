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

    <!-- 病害数据集的选择 -->
    <div style="padding: 10px;" v-show="displayDiseaseDataset">
      <!-- 分割线 -->
      <el-divider style="backgroundColor: #1587e8;"></el-divider>

      <!-- 标题 -->
      <el-row style="margin-top: 10px;">
        <el-col
          :span="24"
          class="title"
          style="padding: 0px"
        >
          <span> 病害数据集 </span>
        </el-col>
      </el-row>

      <!-- 事件控件 -->
      <el-row style="margin-top: 15px;">
        <el-col :span="4">
          <DatasetSelect
            ref="diseasedatasetSelectRef"
            :key="diseaseDatasetSelectKey"
            type="disease"
            placeholder="请选择需要添加的病害数据集"
            @selectChange="datasetSelected(0, $event)"
          />
        </el-col>
        <el-col :span="20">
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
            <span class="infoDescribe"> 目前类别数为：{{ diseaseDataset.total }} </span>
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

    <!-- 虫害数据集的选择 -->
    <div style="padding: 10px;" v-show="displayPestDataset">
      <!-- 分割线 -->
      <el-divider style="backgroundColor: #1587e8;"></el-divider>

      <!-- 标题 -->
      <el-row style="margin-top: 10px;">
        <el-col
          :span="24"
          class="title"
          style="padding: 0px"
        >
          <span> 虫害数据集 </span>
        </el-col>
      </el-row>

      <!-- 事件控件 -->
      <el-row style="margin-top: 15px;">
        <el-col :span="4">
          <DatasetSelect
            ref="pestdatasetSelectRef"
            :key="pestDatasetSelectKey"
            type="pest"
            placeholder="请选择需要添加的虫害数据集"
            @selectChange="datasetSelected(1, $event)"
          />
        </el-col>
        <el-col :span="20">
          <div style="float: right;">
            <el-button type="primary" @click="add(1)"> 添加 </el-button>
            <el-button type="success" @click="addAll(1)"> 选择全部 </el-button>
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
            <span class="infoDescribe"> 目前类别数为：{{ pestDataset.total }} </span>
          </div>
        </el-col>
      </el-row>

      <!-- 相关数据集信息 -->
      <div class="dataset">
        <div class="card" v-for="item in pestDatasetPagenum" :key="item.id">
          <el-card shadow="hover" style="text-align: center;">
            <el-row>
              <el-col :span="24">
                <i class="el-icon-close closeCard" @click="deleteDataset(1, item.id)"></i>
              </el-col>
            </el-row>
            <span style="position: relative; top: -7px;"> {{ item.name }} </span>
          </el-card>
        </div>
      </div>

      <!-- 分页 -->
      <Pagenum
        :total="pestDataset.total"
        :currentPage="pestDataset.page"
        :pageSize="pestDataset.size"
        @handleSizeChange="handleSizeChange($event, 1)"
        @handleCurrentChange="handleCurrentChange($event, 1)"
        :pageSizes="[21, 50, 100]"
      />
    </div>

    <!-- 植物数据集的选择 -->
    <div style="padding: 10px;" v-show="displayPlantsDataset">
      <!-- 分割线 -->
      <el-divider style="backgroundColor: #1587e8;"></el-divider>

      <!-- 标题 -->
      <el-row style="margin-top: 10px;">
        <el-col
          :span="24"
          class="title"
          style="padding: 0px"
        >
          <span> 植物数据集 </span>
        </el-col>
      </el-row>

      <!-- 事件控件 -->
      <el-row style="margin-top: 15px;">
        <el-col :span="4">
          <DatasetSelect
            ref="plantsdatasetSelectRef"
            :key="plantsDatasetSelectKey"
            type="plants"
            placeholder="请选择需要添加的植物数据集"
            @selectChange="datasetSelected(2, $event)"
          />
        </el-col>
        <el-col :span="20">
          <div style="float: right;">
            <el-button type="primary" @click="add(2)"> 添加 </el-button>
            <el-button type="success" @click="addAll(2)"> 选择全部 </el-button>
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
            <span class="infoDescribe"> 目前类别数为：{{ plantsDataset.total }} </span>
          </div>
        </el-col>
      </el-row>

      <!-- 相关数据集信息 -->
      <div class="dataset">
        <div class="card" v-for="item in plantsDatasetPagenum" :key="item.id">
          <el-card shadow="hover" style="text-align: center;">
            <el-row>
              <el-col :span="24">
                <i class="el-icon-close closeCard" @click="deleteDataset(2, item.id)"></i>
              </el-col>
            </el-row>
            <span style="position: relative; top: -7px;"> {{ item.name }} </span>
          </el-card>
        </div>
      </div>

      <!-- 分页 -->
      <Pagenum
        :total="plantsDataset.total"
        :currentPage="plantsDataset.page"
        :pageSize="plantsDataset.size"
        @handleSizeChange="handleSizeChange($event, 2)"
        @handleCurrentChange="handleCurrentChange($event, 2)"
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
          <el-select
            class="input-common"
            v-model="form.algorithm"
            placeholder="请选择算法来源"
          >
            <el-option label="RES_NET_V1_50" value="RES_NET_V1_50"></el-option>
            <el-option label="YOLO_V5" value="YOLO_V5"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模型输出位置：" prop="outputPath">
          <el-input
            class="input-common"
            v-model="form.outputPath"
            disabled
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
import { datasetHttp } from '@/api/dataset';
import { useRouter, useRoute } from 'vue-router';
import { illegalVisit } from '@/utils/global';
import { ElMessage } from 'element-plus';
import Pagenum from '@/components/common/pagenum/Pagenum.vue';
import DatasetSelect from './DatasetSelect.vue';

export default defineComponent({
  name: 'add-update',
  components: { Pagenum, DatasetSelect },
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
        recognizeAmount: 0,
        outputPath: '',
        datasetList: []
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
      step3Rules: {
        algorithm: [{
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (state.form.algorithm === undefined || state.form.algorithm === '') {
              callback(new Error('请选择算法来源'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change']
        }]
      },
      // 数据集分页信息
      diseaseDataset: { total: 0, page: 1, size: 21 },
      pestDataset: { total: 0, page: 1, size: 21 },
      plantsDataset: { total: 0, page: 1, size: 21 },
      // 数据集选择框
      diseaseDatasetSelect: undefined as any,
      pestDatasetSelect: undefined as any,
      plantsDatasetSelect: undefined as any,
      // 数据集选择框Key
      diseaseDatasetSelectKey: 0,
      pestDatasetSelectKey: 0,
      plantsDatasetSelectKey: 0,
      // 获取步骤的事件
      step1FormRef: ref(),
      step2FormRef: ref(),
      step3FormRef: ref(),
      // 显示对应数据集模块
      displayDiseaseDataset: true,
      displayPestDataset: true,
      displayPlantsDataset: true,
      // 添加到模型的数据集列表
      diseaseDatasetList: [] as Array<any>,
      pestDatasetList: [] as Array<any>,
      plantsDatasetList: [] as Array<any>,
      // 添加到模型的数据集列表的分页显示列表
      diseaseDatasetPagenum: [] as Array<any>,
      pestDatasetPagenum: [] as Array<any>,
      plantsDatasetPagenum: [] as Array<any>,
      // 数据集类型多选框
      datasetType: ['0', '1', '2'] as Array<any>,
      isLoading: false,
      // 当前步骤
      step: 1,
      // 界面类型：add 新增，update 更新
      type: '',
      // 表单状态：complete 完成，incomplete 未完成
      status: 'incomplete'
    });
    // 分页参数
    const diseaseDatasetParams = reactive({ page: 0, size: 21 });
    const pestDatasetParams = reactive({ page: 0, size: 21 });
    const plantsDatasetParams = reactive({ page: 0, size: 21 });
    // 多选框：需要显示的数据集类型
    const datasetTypeChange = (data: Array<any>) => {
      if (data.findIndex((value: any) => value === '0') === -1) {
        state.displayDiseaseDataset = false;
        state.diseaseDatasetList = [];
        state.diseaseDatasetPagenum = [];
        state.diseaseDataset = { total: 0, page: 0, size: 21 };
        state.diseaseDatasetSelect = undefined;
        diseaseDatasetParams.page = 0;
        diseaseDatasetParams.size = 21;
      } else {
        state.diseaseDatasetSelectKey += 1;
        state.displayDiseaseDataset = true;
      }
      if (data.findIndex((value: any) => value === '1') === -1) {
        state.displayPestDataset = false;
        state.pestDatasetList = [];
        state.pestDatasetPagenum = [];
        state.pestDataset = { total: 0, page: 0, size: 21 };
        state.pestDatasetSelect = undefined;
        pestDatasetParams.page = 0;
        pestDatasetParams.size = 21;
      } else {
        state.pestDatasetSelectKey += 1;
        state.displayPestDataset = true;
      }
      if (data.findIndex((value: any) => value === '2') === -1) {
        state.displayPlantsDataset = false;
        state.plantsDatasetList = [];
        state.plantsDatasetPagenum = [];
        state.plantsDataset = { total: 0, page: 0, size: 21 };
        state.plantsDatasetSelect = undefined;
        plantsDatasetParams.page = 0;
        plantsDatasetParams.size = 21;
      } else {
        state.plantsDatasetSelectKey += 1;
        state.displayPlantsDataset = true;
      }
    };
    // 删除添加到模型中的数据集
    const deleteDataset = (id: number, datasetId: number) => {
      if (id === 0) {
        const deleteIndex = state.diseaseDatasetList.findIndex((value: any) => value.id === datasetId);
        state.diseaseDatasetList.splice(deleteIndex, 1);
        state.diseaseDataset.total -= 1;
        addDatasetPagenumList(0);
      } else if (id === 1) {
        const deleteIndex = state.pestDatasetList.findIndex((value: any) => value.id === datasetId);
        state.pestDatasetList.splice(deleteIndex, 1);
        state.pestDataset.total -= 1;
        addDatasetPagenumList(1);
      } else if (id === 2) {
        const deleteIndex = state.diseaseDatasetList.findIndex((value: any) => value.id === datasetId);
        state.diseaseDatasetList.splice(deleteIndex, 1);
        state.plantsDataset.total -= 1;
        addDatasetPagenumList(2);
      }
    };
    // 数据集选择框选择时
    const datasetSelected = (id: number, data: any) => {
      if (id === 0) {
        state.diseaseDatasetSelect = data;
      } else if (id === 1) {
        state.pestDatasetSelect = data;
      } else if (id === 2) {
        state.plantsDatasetSelect = data;
      }
    };
    // 添加数据集到模型中
    const add = (id: number) => {
      let addIndex;
      if (id === 0 && state.diseaseDatasetSelect) {
        addIndex = state.diseaseDatasetList.findIndex((value: any) => value.id === state.diseaseDatasetSelect.id);
        if (addIndex === -1) {
          state.diseaseDataset.total += 1;
          state.diseaseDatasetList.push(state.diseaseDatasetSelect);
          addDatasetPagenumList(0);
        } else {
          ElMessage.warning('请不要重复添加');
        }
      } else if (id === 1 && state.pestDatasetSelect) {
        addIndex = state.pestDatasetList.findIndex((value: any) => value.id === state.pestDatasetSelect.id);
        if (addIndex === -1) {
          state.pestDataset.total += 1;
          state.pestDatasetList.push(state.pestDatasetSelect);
          addDatasetPagenumList(1);
        } else {
          ElMessage.warning('请不要重复添加');
        }
      } else if (id === 2 && state.plantsDatasetSelect) {
        addIndex = state.plantsDatasetList.findIndex((value: any) => value.id === state.plantsDatasetSelect.id);
        if (addIndex === -1) {
          state.plantsDataset.total += 1;
          state.plantsDatasetList.push(state.plantsDatasetSelect);
          addDatasetPagenumList(2);
        } else {
          ElMessage.warning('请不要重复添加');
        }
      }
    };
    // 添加全部数据集到模型中
    const addAll = (id: number) => {
      if (id === 0) {
        datasetHttp.searchDiseaseDataset({ page: 0, size: 2000 })
          .then((response: any) => {
            const [...tempResponse] = response.content;
            state.diseaseDataset.total = tempResponse.length;
            state.diseaseDatasetList = [];
            for (let i = 0; i < tempResponse.length; i++) {
              state.diseaseDatasetList.push(tempResponse[i]);
            }
            addDatasetPagenumList(0);
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (id === 1) {
        datasetHttp.searchPestDataset({ page: 0, size: 2000 })
          .then((response: any) => {
            const [...tempResponse] = response.content;
            state.pestDataset.total = tempResponse.length;
            state.pestDatasetList = [];
            for (let i = 0; i < tempResponse.length; i++) {
              state.pestDatasetList.push(tempResponse[i]);
            }
            addDatasetPagenumList(1);
          })
          .finally(() => {
            state.isLoading = false;
          });
      } else if (id === 2) {
        datasetHttp.searchPlantsDataset({ page: 0, size: 2000 })
          .then((response: any) => {
            const [...tempResponse] = response.content;
            state.plantsDataset.total = tempResponse.length;
            state.plantsDatasetList = [];
            for (let i = 0; i < tempResponse.length; i++) {
              state.plantsDatasetList.push(tempResponse[i]);
            }
            addDatasetPagenumList(2);
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    };
    // 将添加到模型的数据集列表生成分页列表
    const addDatasetPagenumList = (id: number) => {
      let count = 0;
      if (id === 0) {
        state.diseaseDatasetPagenum = [];
        for (let i = diseaseDatasetParams.page * diseaseDatasetParams.size; i < state.diseaseDatasetList.length; i++) {
          state.diseaseDatasetPagenum.push(state.diseaseDatasetList[i]);
          count += 1;
          if (count === diseaseDatasetParams.size) {
            break;
          }
        }
      } else if (id === 1) {
        state.pestDatasetPagenum = [];
        for (let i = pestDatasetParams.page * pestDatasetParams.size; i < state.pestDatasetList.length; i++) {
          state.pestDatasetPagenum.push(state.pestDatasetList[i]);
          count += 1;
          if (count === pestDatasetParams.size) {
            break;
          }
        }
      } else if (id === 2) {
        state.plantsDatasetPagenum = [];
        for (let i = plantsDatasetParams.page * plantsDatasetParams.size; i < state.plantsDatasetList.length; i++) {
          state.plantsDatasetPagenum.push(state.plantsDatasetList[i]);
          count += 1;
          if (count === plantsDatasetParams.size) {
            break;
          }
        }
      }
    };
    // 判断是新增数据还是更新数据
    const getParams = () => {
      if (route.path.split('/').slice(-1)[0] === 'update') {
        // 若 params 有 id，则是合法访问
        if (route.params.id !== undefined) {
          state.type = 'update';
          const { ...tempParams } = route.params;
          state.form = tempParams;
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
        state.step -= 1;
      } else if (state.step === 3) {
        state.step -= 1;
      } else if (state.step === 4) {
        state.step -= 1;
      } else if (state.step === 5) {
        router.push({
          path: '/admin/recognition/trainingModelManagement',
          name: 'trainingModelManagementAdd',
          params: {
            type: 'refresh'
          }
        });
      }
    };
    // 下一步
    const next = () => {
      if (state.step === 1) {
        state.step1FormRef.validate().then((valid: boolean) => {
          if (valid) {
            state.step += 1;
          }
        });
      } else if (state.step === 2) {
        const recognizeTypeArr = [];
        state.form.datasetList = [];
        if (state.displayDiseaseDataset && state.diseaseDatasetList.length !== 0) {
          for (let i = 0; i < state.diseaseDatasetList.length; i++) {
            state.diseaseDatasetList[i].type = 0;
            state.form.datasetList.push(state.diseaseDatasetList[i]);
          }
          recognizeTypeArr.push('病害');
        }
        if (state.displayPestDataset && state.pestDatasetList.length !== 0) {
          for (let i = 0; i < state.pestDatasetList.length; i++) {
            state.diseaseDatasetList[i].type = 1;
            state.form.datasetList.push(state.pestDatasetList[i]);
          }
          recognizeTypeArr.push('虫害');
        }
        if (state.displayPlantsDataset && state.plantsDatasetList.length !== 0) {
          for (let i = 0; i < state.plantsDatasetList.length; i++) {
            state.diseaseDatasetList[i].type = 2;
            state.form.datasetList.push(state.plantsDatasetList[i]);
          }
          recognizeTypeArr.push('植物');
        }
        if (state.form.datasetList.length !== 0) {
          state.form.recognizeAmount = state.form.datasetList.length;
          state.form.outputPath = `C:/model/output/${state.form.identifier}`;
          state.form.recognizeType = recognizeTypeArr.join('、');
          console.log(state.form);
          state.step += 1;
        } else {
          ElMessage.warning('请至少添加一个数据集');
        }
      } else if (state.step === 3) {
        state.step3FormRef.validate().then((valid: boolean) => {
          if (valid) {
            state.step += 1;
          }
        });
      } else if (state.step === 4) {
        // 创建中，显示训练模型信息
        state.step += 1;
      } else if (state.step === 5) {
        // 创建完成，下一步变成 继续创建训练模型
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
        addDatasetPagenumList(0);
      } else if (type === 1) {
        state.pestDataset.size = newSize;
        state.pestDataset.page = 1;
        pestDatasetParams.size = newSize;
        pestDatasetParams.page = 0;
        addDatasetPagenumList(1);
      } else if (type === 2) {
        state.plantsDataset.size = newSize;
        state.plantsDataset.page = 1;
        plantsDatasetParams.size = newSize;
        plantsDatasetParams.page = 0;
        addDatasetPagenumList(2);
      }
    };
    const handleCurrentChange = (newPage: any, type: any) => {
      if (type === 0) {
        state.diseaseDataset.page = newPage + 1;
        diseaseDatasetParams.page = newPage;
        addDatasetPagenumList(0);
      } else if (type === 1) {
        state.pestDataset.page = newPage + 1;
        pestDatasetParams.page = newPage;
        addDatasetPagenumList(1);
      } else if (type === 2) {
        state.plantsDataset.page = newPage + 1;
        plantsDatasetParams.page = newPage;
        addDatasetPagenumList(2);
      }
    };

    return {
      ...toRefs(state),
      datasetTypeChange,
      deleteDataset,
      datasetSelected,
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
    width: 228px;
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
