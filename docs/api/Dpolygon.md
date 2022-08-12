# 面和多边形

### 数据类型
```js
// 从接口返回的数据
const datas = [..., [104.12, 30,12], [104.13, 30,13], ...];
```

### 使用方法

```js
// 天府新区电子围栏
import tianfuPolygon from "./tianfu.json";
import polygonLayer from "@/utils/map/polygon/layer.js";
// 这里灌入数据
map.addLayer(polygonLayer(tianfuPolygon));
map.setZIndex(2); // 面在第二层
```

### 修改样式
- 现阶段以快速开发为主，所以解出style.js修改文件里面的样式就可以了


### 文件下载地址
[文件集合](../../static/file/map/polygon/polygon.rar)