<template>
  <el-row>
    <el-col>
      home
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <div id="disease-echarts"></div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  setup () {
    onMounted(() => {
      let diseaseEcharts: any = '';
      const diseaseDiv = document.getElementById('disease-echarts');

      if (diseaseDiv) {
        diseaseEcharts = echarts.init(diseaseDiv);
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      diseaseEcharts.setOption(option);
    });

    return {};
  }
});
</script>

<style lang="scss" scoped>
#disease-echarts {
  height: 200px;
  width: 200px;
}
</style>
