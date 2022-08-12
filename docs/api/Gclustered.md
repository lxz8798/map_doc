# 实现聚合

### 数据类型
```js
const datas = [[104.12, 30,12], [104.13, 30,13]];
```

### 使用方法

```js
import { getClusteredDatas } from "@/utils/map/clustered/";
const clusteredLayer = getClusteredDatas(datas, map)
map.addLayer(clusteredLayer);
map.setZIndex(997); // 聚合不需要看到点，所以要在点之上
```