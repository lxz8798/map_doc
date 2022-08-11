# X轴的样式
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
```