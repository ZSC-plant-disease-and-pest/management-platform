<template>
  <div>
    <el-button @click="checkAllTasks">
      查看所有训练任务
    </el-button>
    <el-button @click="createNewTasks">
      创建新的训练任务
    </el-button>
    <el-button @click="checkTaskStatus">
      查看任务状态
    </el-button>
    <el-button @click="deleteTaskResult">
      删除任务
    </el-button>
    <el-button @click="updateModel">
      更新任务到模型
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { trainHttp, trainParams } from '@/api/train';

export default defineComponent({
  setup () {
    const trainParams: trainParams = {
      task_id: 'd2iqeepf'
    };
    const checkAllTasks = () => {
      trainHttp.checkAllTasks();
    };
    const createNewTasks = () => {
      // trainHttp.createNewTasks(trainParams);
    };
    const checkTaskStatus = () => {
      trainHttp.checkTaskStatus(trainParams);
    };
    const deleteTaskResult = () => {
      // trainHttp.deleteTaskResult(trainParams);
    };
    const updateModel = () => {
      // trainHttp.updateModel(trainParams);
    };
    return {
      checkAllTasks,
      createNewTasks,
      checkTaskStatus,
      deleteTaskResult,
      updateModel
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
