/*
 * @Author: 胡丹凤 hdfff_qx@163.com
 * @Date: 2022-05-26 09:08:43
 * @LastEditTime: 2022-08-11 18:31:41
 * @LastEditors: Please set LastEditors
 * @Description: eachrt公共样式数据
 * @FilePath: \vue-map3\src\utils\echartsC.js
 * @可以输入预定的版权声明、个性签名、空行等
 */

import fn from "./globalFn/index";
//tooltip样式
const TOOL_TIP = {
    backgroundColor: 'rgba(4, 16, 38, 0.8)',
    borderColor: 'rgba(38, 221, 255, 0.8)',
    textStyle: {
        color: 'rgba(234, 239, 245, 1)',
        align: "left",
    }
}

//x轴样式
const X_AXIS = {
    axisTick: {
        //刻度
        show: false, //不显示刻度线
    },
    axisLine: {
        lineStyle: {
            color: "rgba(4, 187, 255, 0.6)", //轴线的颜色
        },
    },
    axisLabel: {
        //轴线字体样式设置
        fontFamily: "ArialMT",
        fontSize: fn.fontChart(24),
        color: "#EAEFF5",
    },
}

//y轴样式
const Y_AXIS = {
    nameTextStyle: {
        color: "#EAEFF5",
        fontSize: fn.fontChart(24),
        // align: "center",
        padding: [0, 20, 0, 0] // 上右下左与原位置距离
    },
    min: 0,
    axisLabel: {
        formatter: "{value}",
        fontFamily: "ArialMT",
        fontSize: fn.fontChart(24),
        color: "#EAEFF5",
    },
    splitLine: {
        lineStyle: {
            color: "rgba(4, 187, 255, 0.2)",
            type: "dashed",
        },
    },
    axisTick: {
        //刻度
        show: false, //不显示刻度线
    },
    axisLine: {
        show: false,
    },
}

//grid轴样式
const GRID_STYLE = {
    //设置内容区域距离周边的距离
    left: "6%",
    right: "6%",
    top: "18%",
    bottom: "8%",
    containLabel: true,
}

//滑动条
const ZOOM_DATA = {
    xAxisIndex: 0, //这里是从X轴的0刻度开始
    show: false, //是否显示滑动条，不影响使用
    type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
    startValue: 0, // 从头开始。
    endValue: 5, // 一次性展示6个。
}

export default {
    GRID_STYLE,
    Y_AXIS,
    X_AXIS,
    ZOOM_DATA,
    TOOL_TIP
}