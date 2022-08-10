# 渲染点

### 使用方法

#### 数据类型

#### 获得layer
```js
import pointLayer from "@/utils/map/points/layer";
const layer = pointLayer(dataHandlers(data), 'pointLayer', map);
map.addLayer(laery);
```

### 性能优化
```js
const features = pointLayer(dataHandlers(data), 'pointLayer', map).getSource().getFeatures();
source.addFeatures(features);

if(!_source.getFeatures().some(i => i.get('id') === [_filter.lon, _filter.lat].toString())) {
    _source.addFeature(features);
} else {
    _source.clear();
    _source.addFeature(features);
}
```

### 文件下载地址
[FEATURE](../../static/file/map/point/feature.js) | [SOURCE](../../static/file/map/point/source.js) | [LAYER](../../static/file/map/point/layer.js) | [STYLE](../../static/file/map/point/style.js)