<template>
  <el-row>
    <el-col>
      <el-card>
        <el-row>
          <el-col :span="2" :offset="2">
            <el-avatar :size="100" :src="avatarUrl"></el-avatar>
          </el-col>
          <el-col :span="10" :offset="1">
            <p class="title"> 欢迎，{{ name }}，祝你开心每一天！ </p>
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
            <span>昨日新增病害 1 种</span>
            <span class="time">2022-5-6 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增虫害 1 种</span>
            <span class="time">2022-5-6 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增植物 1 种</span>
            <span class="time">2022-5-6 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增新闻 0 篇</span>
            <span class="time">2022-5-6 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增视频 0 段</span>
            <span class="time">2022-5-6 23:59:59</span>
          </div>
          <div class="card-table">
            <span>昨日新增模型 1 个</span>
            <span class="time">2022-5-6 23:59:59</span>
          </div>
          <BasicPage
            :page-sizes="[6]"
            small
            :pager-count="5"
            :pageList="systemList"
          />
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
            <span class="time">2022-5-6 16:37:41</span>
          </div>
          <div class="card-table">
            <span>admin新增了一条虫害信息</span>
            <span class="time">2022-5-6 16:29:56</span>
          </div>
          <div class="card-table">
            <span>admin训练了一个模型</span>
            <span class="time">2022-5-6 16:28:37</span>
          </div>
          <div class="card-table">
            <span>admin新增了一个模型</span>
            <span class="time">2022-5-5 14:54:06</span>
          </div>
          <div class="card-table">
            <span>admin新增了一条植物信息</span>
            <span class="time">2022-5-5 13:01:34</span>
          </div>
          <div class="card-table">
            <span>admin新增了一条病害信息</span>
            <span class="time">2022-5-5 13:00:37</span>
          </div>
          <BasicPage
            :page-sizes="[6]"
            small
            :pager-count="5"
            :pageList="logList"
          />
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
      <el-card style="margin: 15px 0px; width: 100%; height: 320px;">
        <template #header>
          <span> 病害数据 </span>
        </template>
        <div id="disease-echarts" class="echartsDiv"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card style="margin: 15px 0px; width: 100%; height: 320px;">
        <template #header>
          <span> 虫害数据 </span>
        </template>
        <div id="pest-echarts" class="echartsDiv"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card style="margin: 15px 0px; width: 100%; height: 320px;">
        <template #header>
          <span> 植物数据 </span>
        </template>
        <div id="plants-echarts" class="echartsDiv"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, toRefs } from 'vue';
import { homeHttp } from '@/api/home';
import { diseaseOption, pestOption, plantsOption, newsArticleOption, videoOption } from './data';
import * as echarts from 'echarts';
import BasicPage from '@/components/common/BasicPage/index.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { BasicPage },
  setup () {
    const store = useStore();

    onBeforeMount(() => {
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

          state.diseaseEcharts.setOption(state.diseaseOption);
          state.pestEcharts.setOption(state.pestOption);
          state.plantsEcharts.setOption(state.plantsOption);
          // state.newsArticleEcharts.setOption(state.newsArticleOption);
          // state.videoEcharts.setOption(state.videoOption);
        })
        .finally(() => {
          state.echartsIsLoading = false;
        });
    });

    onMounted(() => {
      state.diseaseDiv = document.getElementById('disease-echarts');
      state.pestDiv = document.getElementById('pest-echarts');
      state.plantsDiv = document.getElementById('plants-echarts');
      // state.newsArticleDiv = document.getElementById('newsArticle-echarts');
      // state.videoDiv = document.getElementById('video-echarts');

      state.diseaseEcharts = echarts.init(state.diseaseDiv);
      state.pestEcharts = echarts.init(state.pestDiv);
      state.plantsEcharts = echarts.init(state.plantsDiv);
      // state.newsArticleEcharts = echarts.init(state.newsArticleDiv);
      // state.videoEcharts = echarts.init(state.videoDiv);
    });

    const state = reactive({
      avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      displayEcharts: false,
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
      videoOption,
      systemList: {
        total: 70,
        page: 1,
        size: 6
      },
      logList: {
        total: 1029,
        page: 1,
        size: 6
      }
    });

    const name = computed(() => {
      return store.getters['user/getName'];
    });

    return {
      ...toRefs(state),
      name
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
