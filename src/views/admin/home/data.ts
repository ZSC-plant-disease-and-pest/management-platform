export const diseaseOption: any = {
  title: {
    // text: '病害统计',
    top: '320px',
    left: '0%',
    textStyle: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '0%',
    bottom: '40%',
    containLabel: true
  },
  xAxis: [{
    name: '日期',
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      interval: 4
    }
  }],
  yAxis: [{
    name: '个',
    type: 'value',
    minInterval: 1
  }],
  series: [{
    name: '新增病害数量',
    type: 'bar',
    barWidth: '60%',
    data: []
  }]
};

export const pestOption: any = {
  title: {
    // text: '虫害统计',
    top: '320px',
    left: '0%',
    textStyle: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '0%',
    bottom: '40%',
    containLabel: true
  },
  xAxis: [{
    name: '日期',
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      interval: 4
    }
  }],
  yAxis: [{
    name: '个',
    type: 'value',
    minInterval: 1
  }],
  series: [{
    name: '新增虫害数量',
    type: 'bar',
    barWidth: '60%',
    data: [],
    itemStyle: {
      color: '#91cb74'
    }
  }]
};

export const plantsOption: any = {
  title: {
    // text: '植物统计',
    top: '320px',
    left: '0%',
    textStyle: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '0%',
    bottom: '40%',
    containLabel: true
  },
  xAxis: [{
    name: '日期',
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      interval: 4
    }
  }],
  yAxis: [{
    name: '个',
    type: 'value',
    minInterval: 1
  }],
  series: [{
    name: '新增植物数量',
    type: 'bar',
    barWidth: '60%',
    data: [],
    itemStyle: {
      color: '#9a60b4'
    }
  }]
};

export const newsArticleOption: any = {
  title: {
    text: '新闻统计',
    top: '320px',
    left: '46%',
    textStyle: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: [{
    name: '日期',
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      interval: 5
    }
  }],
  yAxis: [{
    name: '篇',
    type: 'value',
    minInterval: 1
  }],
  series: [{
    name: '新增新闻数量',
    type: 'bar',
    barWidth: '60%',
    data: [],
    itemStyle: {
      color: '#fc8452'
    }
  }]
};

export const videoOption: any = {
  title: {
    text: '视频统计',
    top: '320px',
    left: '46%',
    textStyle: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: [{
    name: '日期',
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      interval: 4
    }
  }],
  yAxis: [{
    name: '分钟',
    type: 'value',
    minInterval: 1
  }],
  series: [{
    name: '新增视频时间',
    type: 'bar',
    barWidth: '60%',
    data: [],
    itemStyle: {
      color: '#fac858'
    }
  }]
};
