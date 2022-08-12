# 地图上可能需要使用的方法

### 通过VALUE值得到TYPES的键名，需要引入TYPES
```js
const valueToKey = function (value) {
    for (const [KEY, VALUE] of Object.entries(TYPES)) {
        if (VALUE == value) return KEY
    }
}
```

### 通过KEY取得字典对应的中文
```js
// fieldMap是和后台商量由后台丢到前端的字典，一般用来自动生成表格列表用
const keyToValue = function (key, value) {
    let _value = ''
    fieldMap.forEach(i => {
        if (i.key === key) {
            _value = i.value;
        }
    });
    return _value;
}
```

### 生成点的集合
```js
import Feature from 'ol/Feature';

const datas = [[104.12, 30,12], [104.13, 30,13]], coll = [];
for(let i = 0; i < datas.length; i++) {
	// fakePoinst的坐标系直接是4326的，如果是3857坐标系，换个文件就行
	coll.push(new Feature([datas[i][0], datas[i][1]]))
}
```

### 获取转换后以米为单位的半径的值
```js
const getRadius = function (map, radius) {
    let metersPerUnit = map.getView().getProjection().getMetersPerUnit();
    let circleRadius = radius / metersPerUnit;
    return circleRadius;
}
```
