# Y轴的样式

> Y轴的样式

```js
//获取到屏幕的宽度echart字体大小
const fontChart = function (res) {
    var clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth) return; //报错拦截：
    let fontSize = clientWidth / 3840;
    return res * fontSize;
}
```

```js
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
```

### 使用方法在[CHART组件](http://192.168.1.99:8080/mapdoc/docs/category/%E5%9B%BE%E8%A1%A8%E7%B1%BB)中说明