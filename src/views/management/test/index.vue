<template>
  <el-card class="card">
    <template #header>
      <div class="header">
        <span>
          / train 接口测试
        </span>
      </div>
    </template>

    <el-row class="content-input" :gutter="14">
      <el-col :span="12">
        <span class="span">
          训练集名称
        </span>
        <el-input class="input" v-model="trainParams.train_set" />
      </el-col>
      <el-col :span="12">
        <span class="span">
          验证集名称
        </span>
        <el-input class="input" v-model="trainParams.val_set" />
      </el-col>
    </el-row>
    <el-row class="content-input" :gutter="14">
      <el-col :span="12">
        <span class="span">
          测试集名称
        </span>
        <el-input class="input" v-model="trainParams.test_set" />
      </el-col>
      <el-col :span="12">
        <span class="span">
          训练任务的 id
        </span>
        <el-input class="input" v-model="trainParams.task_id" />
      </el-col>
    </el-row>

    <el-row class="content-button" type="flex" justify="space-around">
      <el-col :span="4">
        <el-button type="info" class="button" @click="checkAllTasks">
          查看所有训练任务
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="success" class="button" @click="createNewTasks">
          创建新的训练任务
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" class="button" @click="checkTaskStatus">
          查看任务状态
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="button" @click="deleteTaskResult">
          删除任务
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="warning" class="button" @click="updateModel">
          更新任务到模型
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { trainHttp, trainParams } from '@/api/train';

export default defineComponent({
  setup () {
    const trainParams: trainParams = reactive({
      train_set: '',
      val_set: '',
      test_set: '',
      task_id: ''
    });
    const checkAllTasks = () => {
      trainHttp.checkAllTasks();
    };
    const createNewTasks = () => {
      trainHttp.createNewTasks(trainParams);
    };
    const checkTaskStatus = () => {
      trainHttp.checkTaskStatus(trainParams);
    };
    const deleteTaskResult = () => {
      trainHttp.deleteTaskResult(trainParams);
    };
    const updateModel = () => {
      trainHttp.updateModel(trainParams);
    };
    return {
      checkAllTasks,
      createNewTasks,
      checkTaskStatus,
      deleteTaskResult,
      updateModel,
      trainParams
    };
  }
});
</script>

<style lang="scss" scoped>
.card {
  min-width: 800px;

  .content-input {
    margin: 14px 0px;

    .span {
      float: left;
      width: 120px;
      padding: 0 10px;
      line-height: 40px;
    }

    .input {
      float: left;
      width: 300px;
    }
  }

  .content-button {
    .button {
      width: 150px;
    }
  }
}
</style>
