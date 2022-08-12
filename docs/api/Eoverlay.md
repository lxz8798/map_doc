# 渲染弹窗

### 数据类型
```js
// OVERLAYER只需要传入参数即可实现上显
const params = {
    id: '00', // 弹窗的ID
    type: feature.get("type"), // 弹窗要在什么目标类型上显示
    coordinats: [e.coordinate[0], e.coordinate[1]], // 弹窗上显的位置
    innerHTML: ``,  // 显示内容一般是innerHTML
    map: map, // map对象
};
```

### 使用方法
```js
// 引入文件
import { getOverlayData } from "@/utils/map/overlay/";
// 传入参数即可
getOverlayData(params);
```

### 修改样式
- overlay是用js实现的，只需要在组件内部穿透用css改就可以修改样式，如果有特别需求，可以自己修改文件


### 文件下载地址
[OVERLAY](../../static/file/map/overlay/index.js)