<!--
 * @Author: 胡丹凤 hdfff_qx@163.com
 * @Date: 2022-06-24 17:34:13
 * @LastEditTime: 2022-08-12 14:40:59
 * @LastEditors: Please set LastEditors
 * @Description: 折线图
 * @FilePath: \vue-map3\src\components\JdCharts\lineChart.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="line-chart">
    <div :id="props.options.keyId"></div>
  </div>
</template>

<script setup>
// VUE相关
import {
  getCurrentInstance,
  onBeforeUnmount,
  reactive,
  nextTick,
  onMounted
} from "vue";
// UTILS
import esSame from "../../utils/echartsC.js";
// PROXY
const { proxy } = getCurrentInstance();
const fn = proxy.$fn;
// PROPS
const props = defineProps({
  // keyId: {
  //   //id值
  //   type: String,
  //   default: "linename",
  // },
  // legends: {
  //   //legend展示
  //   type: Boolean,
  //   default: false,
  // },
  // areaStyle: {
  //   //线的面积展示
  //   type: Boolean,
  //   default: true,
  // },
  // yname: {
  //   //y轴名称
  //   type: String,
  //   default: "(个)",
  // },
  // name: {
  //   //数据名称
  //   type: String,
  //   default: "",
  // },
  // color: {
  //   //颜色
  //   type: [String, Array],
  //   default: "#26CF99",
  // },
  // smooth: {
  //   //线条是否圆润
  //   type: Boolean,
  //   default: true,
  // },
  // symbol: {
  //   //标记点类型
  //   type: String,
  //   default: "none",
  // },
  // point: {
  //   //标记点大小
  //   type: Number,
  //   default: 10,
  // },
  // legendT: {
  //   //legendTop
  //   type: [String, Number],
  //   default: "5%",
  // },
  // legendR: {
  //   //legendRight
  //   type: [String, Number],
  //   default: "5%",
  // },
  options: {
    type: Object,
    default: {
      keyId: "linename",   // id值
      legends: false,      // legend展示
      areaStyle: true,     // 线的面积展示
      yname: "(个)",       // y轴名称
      name: "",            // 数据名称
      color: "#26CF99",    // 颜色，可以是数组
      smooth: true,        // 线条是否圆润
      symbol: "none",      // 标记点类型
      point: 10,           // 标记点大小
      legendT: "5%",       // legendTop
      legendR: "5%",       // legendRight
    }
  },
  chartData: {
    //数据
    type: Array,
    default: () => [0, 0, 0, 0, 0, 0, 0],
  },
  ychartData: {
    type: Array,
    default: () => ["1日", "2日", "3日", "4日", "5日", "6日", "7日"],
  },
});
// STATE
const objState = reactive({
  timer: null, //定时器
});

onMounted(() => {
  if (objState.timer) {
    clearInterval(objState.timer);
  }
  initCharts();
});
// FUNCTION
//图表初始化
const initCharts = () => {
  let es = proxy.$es;
  let myChart = es.init(document.getElementById(props.options.keyId));
  let option = {
    tooltip: {
      // //提示框设置
      trigger: "axis",
      ...esSame.TOOL_TIP,
    },
    grid: {
      ...esSame.GRID_STYLE,
      top: "18%",
    },
    legend: {
      show: props.options.legends || false,
      orient: "horizontal",
      top: props.options.legendT || '5%',
      right: props.options.legendR || '5%',
      textStyle: {
        color: "#EAEFF5",
        fontSize: fn.fontChart(24),
      },
      itemWidth: fn.fontChart(24),
    },
    dataZoom: [esSame.ZOOM_DATA],
    xAxis: [
      {
        type: "category",
        data: props.ychartData,
        ...esSame.X_AXIS,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: props.options.yname || "(个)",
        ...esSame.Y_AXIS,
      },
    ],
    series: [
      {
        name: props.options.name || "",
        type: "line",
        smooth: props.options.smooth || true, //线条是否圆润
        symbol: props.options.symbol || "none", //标记点类型
        symbolSize: fn.fontChart(props.options.point || 10), //标记点大小
        data: props.chartData,
        itemStyle: {
          //线
          color: props.options.color || "#26CF99",
        },
        areaStyle: {
          // 区域渐变色
          color: new es.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: props.options.color ? props.options.areaStyle ? props.options.color + "99"  : props.options.color + "00" : "#26CF9999",
            },
            {
              offset: 1,
              color: props.options.color ? props.options.areaStyle ? props.options.color + "1a" : props.options.color + "00" : "#26CF991a",
            },
          ]),
        },
      },
    ],
  };
  myChart.setOption(option, true);
  nextTick(() => {
    myChart.resize();
  });

  objState.timer = setInterval(() => {
    // 每次向后滚动⼀个，最后⼀个从头开始。
    if (option.dataZoom[0].endValue == props.chartData.length) {
      option.dataZoom[0].endValue = 5;
      option.dataZoom[0].startValue = 0;
    } else {
      option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
      option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
    }
    myChart.setOption(option, true);
  }, 2000);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};

// ONBEFOREUNMOUNT
onBeforeUnmount(() => {
  if (objState.timer) {
    clearInterval(objState.timer);
  }
});
</script>

<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    height: 100%;
  }
}
</style>
