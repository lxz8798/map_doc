<!--
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-12 14:51:09
 * @FilePath: \map-doc\static\vueComp\charts\barChart_VUE2.vue
 * @Description: 
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
-->
<template>
	<div class="chart_box">
    <div :id="props.options.keyId"></div>
  </div>
</template>

<script>
import esSame from "../../../static/file/echarts/types.js"; // 这里的地址需要修改
export default {
	data() {
		return {
			chartlist: {
				chart1: {
					colorList: ["#00B4FF", "#2751EE", "#C76B30"],
					nameList: ["出租车", "网约车", "总数"],
					yname: ["(辆)"],
					types: ["bar", "bar", "line"],
				},
				chart2: {
					colorList: ["#84B333", "#BE8E27"],
					nameList: ["充电桩", "充电量"],
					yname: [""],
					types: ["bar", "bar"],
				},
				chart3: {
					colorList: ["#1BE9BF", "#FFB847"],
					nameList: ["去年客流量", "今年客流量"],
					yname: ["(万人次)"],
					types: ["line", "line"],
				},
				chart4: {
					colorList: ["#00D5FF", "#0091FF"],
					nameList: ["企业", "个人"],
					yname: [""],
					types: ["bar", "bar"],
				},
			}
		};
	},
	props: {
		options: {
			type: Object,
			default: {
				keyId: "linename",   // id值
				valType: "chart1",   // 区别名称/颜色
				areaStyle: false,    // 线的面积展示
				lineType: "solid",   // 线的类型
				barRadius: 2,        // 圆角
				barWidth: 18,        // 柱状宽
				barStyle: true,      // 柱状的展示渐变
				smooth: true,        // 线条是否圆滑
				legendT: "5%",       // legendTop
				legendR: "5%",       // legendRight
				grid: {              // 离边边的距离
					left: "6%",
					right: "6%",
					top: "18%",
					bottom: "6%",
					containLabel: true,
				}
			}
		},
		// CHART的数据
		chartData: {
			type: Object,
			default: () => ({
				list1: [2, 5, 8, 15, 9, 7, 13],
				list2: [12, 8, 18, 5, 19, 1, 3],
				xlist: ["1周", "2周", "3周", "4周", "5周", "6周", "7周"],
				name: ["list1", "list2"],
			})
		},
		// X轴上的名称
		ychartData: {
			type: Array,
			default: () => ["1日", "2日", "3日", "4日", "5日", "6日", "7日"],
		}
	},
	mounted() {
		this.initCharts(this.chartData);
	},
	methods: {
		// 设置x轴的方法，这个方法在实际开发中可以用也可以不用
		setyAxis() {
			let yAxis = [];
			let yname = this.chartlist[this.options.valType || "chart1"].yname;

			yname.forEach((item, i) => {
				yAxis.push({
					type: "value",
					name: item,
					// position: i == 0 ? "left" : "right",
					alignTicks: true,
					// offset: i == 2 ? this.$fn.fontChart(80) : 0,
					...esSame.Y_AXIS,
					nameTextStyle: {
						color: "#EAEFF5",
						fontSize: this.$fn.fontChart(24),
					},
				});
			});
			return yAxis;
		},
		// 设置Series的方法，这个方法在实际开发中可以用也可以不用
		setSeries(newData) {
			let serier = [];
			let arr = chartlist[props.options.valType || "chart1"].nameList;
			arr.forEach((item, index) => {
				serier.push({
				//折线(数据)
				name: item,
				type: chartlist[props.options.valType || "chart1"].types[index],
				smooth: props.options.smooth, //线条是否圆润
				symbolSize: 5, //标记点大小
				symbol: "circle", //折点设定为实心点
				yAxisIndex: index < chartlist[props.options.valType || "chart1"].yname.length ? index : 0,
				areaStyle: {
					shadowColor: "rgba(148, 95, 185, 0.5)",
					shadowBlur: 20, //阴影
					color: new proxy.$es.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: props.options.areaStyle
						? chartlist[props.options.valType || "chart1"].colorList[index] + "8c"
						: chartlist[props.options.valType || "chart1"].colorList[index] + "00",
					},
					{
						offset: 1,
						color: props.options.areaStyle
						? chartlist[props.options.valType || "chart1"].colorList[index] + "1a"
						: chartlist[props.options.valType || "chart1"].colorList[index] + "00",
					},
					]), // 区域线条渐变色
				},
				data: newData[newData.name[index]],
				lineStyle: {
					type: props.options.lineType,
					width: 1,
				},
				itemStyle: {
					color: new proxy.$es.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: props.options.barStyle
						? chartlist[props.options.valType || "chart1"].colorList[index]
						: chartlist[props.options.valType || "chart1"].colorList[index],
					},
					{
						offset: 1,
						color: props.options.barStyle
						? chartlist[props.options.valType || "chart1"].colorList[index] + "34"
						: chartlist[props.options.valType || "chart1"].colorList[index],
					},
					]),
					borderRadius: fn.fontChart(props.options.barRadius),
					lineStyle: {
					color: chartlist[props.options.valType || "chart1"].colorList[2],
					},
				},
				barWidth: fn.fontChart(props.options.barWidth),
				});
			});
			return serier;
		},
		initCharts(newData) {
			const grid = {              // 离边边的距离
				left: "6%",
				right: "6%",
				top: "18%",
				bottom: "6%",
				containLabel: true,
			}
			// this.$es 是mian里面对echarts的引用
			const myChart = this.$es.init(document.getElementById(this.options.keyId));
			// echarts配置
			let option = {
				tooltip: {
				//提示框设置
				trigger: "axis",
				...esSame.TOOL_TIP,
				},
				grid: {
				//设置内容区域距离周边的距离
				...props.options.grid || grid,
				},
				legend: {
				top: props.options.legendT || "5%",
				right: props.options.legendR || "5%",
				textStyle: {
					color: "#EAEFF5",
					fontSize: fn.fontChart(24),
				},
				itemWidth: fn.fontChart(24),
				itemHeight: fn.fontChart(24),
				},
				xAxis: [
				{
					type: "category",
					data: newData.xlist,
					...esSame.X_AXIS,
				},
				],
				yAxis: setyAxis(),
				series: setSeries(newData),
			};
			myChart.setOption(option, true);
		}
	}
};
</script>
