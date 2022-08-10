# 渲染线

### 使用方法

#### 数据类型
```js
const lineDatas = [[104.12, 30,12], [104.13, 30,13];
```

#### 第一种LINE
```js
import lineLayer from "@/utils/map/line/layer";
const layer = lineLayer(lineDatas);
map.addLayer(lineLayer);
```

#### 第二种LINESTRING
```js
import { getRoutes } from "@/utils/map/lineString/features";
import lineStringLayer from "@/utils/map/lineString/layer";

const { routeFeature, geoMarker, startMarker, endMarker, position } = getRoutes(_routes, false); // 第二个参数代码是否显示图标
const layer = lineStringLayer([routeFeature, geoMarker, startMarker, endMarker], 'lineLayerStringName');
map.addLayer(layer);
```

### 性能优化
```js
let _layer = map.getLayers().array_.filter((i) => i.values_.name === name)[0];
if(_layer) {
    let _source = _layer.getSource();
    _source.clear();

if (name == LAYER_NAMES[1]) {
    _source.addFeatures(state.pointsLayer.getSource().getFeatures());
} else {
    _source.addFeatures([routeFeature, geoMarker, startMarker, endMarker]);
}
}
```

### 文件下载地址
[FEATURE](../../static/file/map/line/feature.js) | [SOURCE](../../static/file/map/line/source.js) | [LAYER](../../static/file/map/line/layer.js) | | [STYLE](../../static/file/map/point/style.js)