<template>
  <el-row>
    <el-col>
      <el-card>
        <el-row>
          <el-col :span="2" :offset="2">
            <el-avatar :size="100"></el-avatar>
          </el-col>
          <el-col :span="10" :offset="1">
            <p class="title"> 欢迎，admin，祝你开心每一天！ </p>
            <span class="auth"> 超级管理员 </span>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="8">
      <el-card style="margin: 15px 0px; width: 100%; height: 320px">
        <template #header>
          <span> 系统消息 </span>
        </template>
        <div>
          <div class="card-table">
            <span>昨日新增病害 12 种</span>
            <span class="time">2022-4-8 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增虫害 14 种</span>
            <span class="time">2022-4-8 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增植物 7 种</span>
            <span class="time">2022-4-8 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增新闻 2 篇</span>
            <span class="time">2022-4-8 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增视频 3 段</span>
            <span class="time">2022-4-8 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增模型 0 个</span>
            <span class="time">2022-4-8 23:59:59</span>
          </div>
          <BasicPage />
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card style="margin: 15px 0px; width: 100%; height: 320px">
        <template #header>
          <span> 操作日志 </span>
        </template>
        <div>
          <div class="card-table">
            <span>admin新增了一条病害信息</span>
            <span class="time">2022-4-1 16:37:41</span>
          </div>
          <div class="card-table">
            <span>admin新增了一条虫害信息</span>
            <span class="time">2022-4-1 16:29:56</span>
          </div>
          <div class="card-table">
            <span>admin训练了一个模型</span>
            <span class="time">2022-4-1 16:28:37</span>
          </div>
          <div class="card-table">
            <span>admin新增了一个模型</span>
            <span class="time">2022-4-1 16:27:06</span>
          </div>
          <div class="card-table">
            <span>admin新增了一条植物信息</span>
            <span class="time">2022-4-1 16:26:34</span>
          </div>
          <div class="card-table">
            <span>admin新增了一条病害信息</span>
            <span class="time">2022-4-1 16:25:37</span>
          </div>
          <BasicPage />
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card style="margin: 15px 0px; width: 100%; height: 320px">
        <template #header>
          <span> 模型管理 </span>
        </template>
      </el-card>
    </el-col>
    <!-- <el-col :span="8">
      <div id="disease-echarts" class="echartsDiv"></div>
    </el-col>
    <el-col :span="8">
      <div id="pest-echarts" class="echartsDiv"></div>
    </el-col> -->
  </el-row>

  <el-row :gutter="20">
    <el-col :span="8">
      <div id="plants-echarts" class="echartsDiv"></div>
    </el-col>
    <el-col :span="8">
      <div id="newsArticle-echarts" class="echartsDiv"></div>
    </el-col>
    <el-col :span="8">
      <div id="video-echarts" class="echartsDiv"></div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { homeHttp } from '@/api/home';
import { diseaseOption, pestOption, plantsOption, newsArticleOption, videoOption } from './data';
import * as echarts from 'echarts';
import BasicPage from '@/components/common/BasicPage/index.vue';

export default defineComponent({
  components: { BasicPage },
  setup () {
    onMounted(() => {
      state.echartsIsLoading = true;
      homeHttp.getHomeStats()
        .then((response: any) => {
          state.diseaseOption.xAxis[0].data = [];
          state.diseaseOption.series[0].data = [];
          state.pestOption.xAxis[0].data = [];
          state.pestOption.series[0].data = [];
          state.plantsOption.xAxis[0].data = [];
          state.plantsOption.series[0].data = [];
          state.newsArticleOption.xAxis[0].data = [];
          state.newsArticleOption.series[0].data = [];
          state.videoOption.xAxis[0].data = [];
          state.videoOption.series[0].data = [];
          for (const type in response) {
            for (const item in response[type]) {
              if (item === 'total') break;
              switch (type) {
                case 'disease':
                  state.diseaseOption.xAxis[0].data.push(item);
                  state.diseaseOption.series[0].data.push(response[type][item]);
                  break;
                case 'pest':
                  state.pestOption.xAxis[0].data.push(item);
                  state.pestOption.series[0].data.push(response[type][item]);
                  break;
                case 'plants':
                  state.plantsOption.xAxis[0].data.push(item);
                  state.plantsOption.series[0].data.push(response[type][item]);
                  break;
                case 'newsArticle':
                  state.newsArticleOption.xAxis[0].data.push(item);
                  state.newsArticleOption.series[0].data.push(response[type][item]);
                  break;
                case 'video':
                  state.videoOption.xAxis[0].data.push(item);
                  state.videoOption.series[0].data.push(response[type][item]);
                  break;
              }
            }
          }
          state.diseaseDiv = document.getElementById('disease-echarts');
          state.pestDiv = document.getElementById('pest-echarts');
          state.plantsDiv = document.getElementById('plants-echarts');
          state.newsArticleDiv = document.getElementById('newsArticle-echarts');
          state.videoDiv = document.getElementById('video-echarts');

          state.diseaseEcharts = echarts.init(state.diseaseDiv);
          state.pestEcharts = echarts.init(state.pestDiv);
          state.plantsEcharts = echarts.init(state.plantsDiv);
          state.newsArticleEcharts = echarts.init(state.newsArticleDiv);
          state.videoEcharts = echarts.init(state.videoDiv);

          state.diseaseEcharts.setOption(state.diseaseOption);
          state.pestEcharts.setOption(state.pestOption);
          state.plantsEcharts.setOption(state.plantsOption);
          state.newsArticleEcharts.setOption(state.newsArticleOption);
          state.videoEcharts.setOption(state.videoOption);
        })
        .finally(() => {
          state.echartsIsLoading = false;
        });
    });

    const state = reactive({
      echartsIsLoading: false,
      diseaseEcharts: '' as any,
      diseaseDiv: '' as any,
      diseaseOption,
      pestEcharts: '' as any,
      pestDiv: '' as any,
      pestOption,
      plantsEcharts: '' as any,
      plantsDiv: '' as any,
      plantsOption,
      newsArticleEcharts: '' as any,
      newsArticleDiv: '' as any,
      newsArticleOption,
      videoEcharts: '' as any,
      videoDiv: '' as any,
      videoOption
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss" scoped>
.echartsDiv {
  height: 360px;
  width: 85%;
}
.title {
  color: #2a2a2a;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}
.auth {
  color: #9b9b9b;
}
.card-table {
  display: flex;
  justify-content: space-between;
  text-align: 30px;

  .time {
    font-size: 14px;
    color: #999999;
    margin-bottom: 10px;
  }
}
</style>
