# 渲染线

### 数据类型
```js
// 从接口返回的数据
const datas = [[104.12, 30,12], [104.13, 30,13]];
```

### 使用方法

- 第一种LINE
```js
import lineLayer from "@/utils/map/line/layer"; // 引入文件
const layer = lineLayer(datas); // 得到图层
map.addLayer(lineLayer); // 上显图层
```

- 第二种LINESTRING
```js
 // 引入文件
import { getRoutes } from "@/utils/map/lineString/features"; 
import lineStringLayer from "@/utils/map/lineString/layer";
// getRoutes会返回5个对象，分别对应路径本身，行走线路上的目标，起点，终点，位置;
// 第二个参数代码是否显示图标
const { routeFeature, geoMarker, startMarker, endMarker, position } = getRoutes(_routes, false); 
const layer = lineStringLayer([routeFeature, geoMarker, startMarker, endMarker], 'lineLayerStringName'); // 得到图层
map.addLayer(layer); // 上显图层
map.setZIndex(998); // 线上倒数第二层
```

### 修改样式
- 现阶段以快速开发为主，所以解出style.js修改文件里面的样式就可以了

### 性能优化
```js
let _source = layer.getSource();
let _features = _source.getFeatures();

// 判断当前对像在数据源中是否存在，不存在则添加，存在则清除在添加
if (map.getLayers().array_.some(i => i.values_.name == 'lineLayerStringName')) {
    _source.addFeatures(features);
} else {
    _source.clear();
    _source.addFeatures(features);
}
```

### 文件下载地址
[LINE](../../static/file/map/line/line.rar)