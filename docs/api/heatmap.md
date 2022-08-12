# 热力图

> 热力图相对简单，也不需要修改样式

### 数据类型
```js
const datas = [[104.12, 30,12], [104.13, 30,13]];
```

### 使用方法
```js
// 引入文件
import { heatmapLayer } from "@/utils/map/heatmap/layer.js";
// 上显的数据使用点的图层数据即可
map.addLayer(heatmapLayer({ data: pointLayer }));
map.setZIndex(999); // 热力可以在点之下
```