<!--
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-11 20:03:09
 * @FilePath: \map-doc\static\vueComp\charts\lineChart.vue
 * @Description: 
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
-->
<template>
	<div class="line-chart">
		<div :id="keyId"></div>
	</div>
</template>

<script>
import esSame from "../../../static/file/echarts/types.js"; // 这里的地址需要修改
export default {
	data() {
		return {};
	},
	props: {
		options: {
			type: Object,
			default: {
				keyId: "linename",  // id值
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
		// CHART的数据
		chartData: {
			type: Array,
			default: () => [0, 0, 0, 0, 0, 0, 0],
		},
		// X轴上的名称
		ychartData: {
			type: Array,
			default: () => ["1日", "2日", "3日", "4日", "5日", "6日", "7日"],
		}
	},
	mounted() {
		this.initCharts();
	},
	methods: {
		initCharts() {
			// this.$es 是mian里面对echarts的引用
			const myChart = this.$es.init(document.getElementById(props.keyId));
			// echarts配置
			const option = {
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
					show: this.options.legends,
					orient: "horizontal",
					top: this.options.legendT,
					right: this.options.legendR,
					textStyle: {
						color: "#EAEFF5",
						fontSize: this.$fn.fontChart(24),  // 这里的this.$fn需要修改，一般情况下在VUE2是挂载到一个公用的方法下，然后调用 
					},
					itemWidth: this.$fn.fontChart(24),
				},
				dataZoom: [esSame.ZOOM_DATA],
				xAxis: [
					{
						type: "category",
						data: this.options.ychartData,
						...esSame.X_AXIS,
					},
				],
				yAxis: [
					{
						type: "value",
						name: this.options.yname,
						...esSame.Y_AXIS,
					},
				],
				series: [
					{
						name: this.options.name,
						type: "line",
						smooth: this.options.smooth, //线条是否圆润
						symbol: this.options.symbol, //标记点类型
						symbolSize: this.$fn.fontChart(this.options.point), //标记点大小
						data: this.options.chartData,
						itemStyle: {
							//线
							color: this.options.color,
						},
						areaStyle: {
							// 区域渐变色
							color: new es.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: this.options.areaStyle ? this.options.color + "99" : this.options.color + "00",
								},
								{
									offset: 1,
									color: this.options.areaStyle ? this.options.color + "1a" : this.options.color + "00",
								},
							]),
						},
					},
				],
			};
			myChart.setOption(option, true);
		}
	}
};
</script>

