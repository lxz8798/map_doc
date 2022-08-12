# 渲染点

### 数据类型
```js
// 从接口返回的数据
const datas = [
	...
	{
		id: "1"
		key: "vehiclePlateId"
		type: "1"
		value: "车牌号码"
	}
	...
]
```

### 使用方法
```js
// 引入文件
import pointLayer from "@/utils/map/points/layer";  
// 得到图层
const layer = pointLayer(dataHandlers(data), 'pointLayer', map);  
// 上显图层
map.addLayer(laery);  
// 点在最上层，在点之上还有聚合，热力等，可以随着需求改变层级
// 要注意的是，在瓦片和点之间，可能有无数个图层，点需要在高层
// 所以中间留下的范围可以相对多一点
map.setZIndex(998); 
```

### 修改样式
- 现阶段以快速开发为主，所以解出style.js修改文件里面的样式就可以了

### 性能优化
```js
// 得到目标点的集合
const features = pointLayer(dataHandlers(data), 'pointLayer', map).getSource().getFeatures();
// 添加到数据源
source.addFeatures(features);

// 判断当前对像在数据源中是否存在，不存在则添加，存在则清除在添加
if(!_source.getFeatures().some(i => i.get('id') === [_filter.lon, _filter.lat].toString())) {
    _source.addFeature(features);
} else {
    _source.clear();
    _source.addFeature(features);
}
```

### 文件下载地址
[POINT](../../static/file/map/point/point.rar)