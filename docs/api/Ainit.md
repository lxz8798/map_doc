---
description: 地图初始化
---
# 地图初始化

### VUE2版本
```js
// VUE相关
import View from 'ol/View';
import Map from 'ol/Map';

data() {
	return {
		map: null
	};
},
props: {
	mapName: {
		type: String,
		default: 'map'
	}
},
mounted() {
	this.map = new Map({
		target: this.mapName,
		view: new View({
			center: [0, 0],
			maxZoom: 18,
			zoom: 2,
		}),
	});
	this.$bus.$emit('mapInit', this.map);
},
beforeDestory() {
	this.map.getLayers().array_.forEach((i) => {
		if (i.values_.name !== "tianfuCoreAreaPolygon") {
			i.getSource().clear();
			this.map.removeLayer(i);
		}
	});
	this.map = null;
	his.$bus.$off('mapInit');
}
```
### VUE3版本
```js
// JDMap.vue
// 地图相关
import View from "ol/View";
import Map from "ol/Map";
// VUE相关
import { onBeforeUnmount } from "vue";
// CONST、VAR、LET
const map = map = new Map({
  controls: control.defaults({ attributionOptions: { collapsed: false } }),
  constrainResolution: true,
  view: new View({
    center: [0, 0],
    maxZoom: 18,
    zoom: 12,
    projection: 'EPSG:4326'
  }),
});
// ONBEFOREUNMOUNT
onBeforeUnmount(() => {
	// 清除所有数据
  map.getLayers().array_.forEach((i) => {
    if (i.values_.name !== "tianfuCoreAreaPolygon") {
      i.getSource().clear();
      map.removeLayer(i);
    }
  });
  map = null;
})
// DEFINEEXPOSE
defineExpose({
  map,
  overlay,
});
```

### 文件下载地址
[VUE2](../../static/file/map/init/vue2.vue) | [VUE3](../../static/file/map/init/vue3.vue) | [LAYER](../../static/file/map/init/layer.js)

### 在VUE文件中使用


### 在vue2中使用
```js
<template>
	<public-map :mapName="'homeMap'" ref="homeMapRef"></public-map>
</template>

// 地图相关
import { mapLayer } from "../utils/map/init/layer.js";
onMounted() {
	this.$bus.$on('mapInit', map => {
		map.setTarget("homeMap");
		map.addLayer(mapLayer);
	});
}
```

### 在vue3中使用
```
<template>
	<public-map :mapName="'homeMap'" ref="homeMapRef"></public-map>
</template>

// VUE相关
import { onMounted } from "vue";
// 地图相关
import { mapLayer } from "../utils/map/init/layer.js";

const { map } = homeMapRef.value;
map.setTarget("homeMap");
map.addLayer(mapLayer);
```

### LAYER介绍

- 默认情况下直接使用
```js
// 常规操作的layer.js
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

export const mapLayer = new TileLayer({
	source: new OSM(),
})
```

- 不同服务的情况使用
```js
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';

// 首先解释一下Tile格式和TileJSON格式的区别;
// - Tiles 是传统的瓦片地图服务，Tiles 服务在 OpenLayers 6 中对应的数据源是ol.source.XYZ，天地图和高德地图都属于这一种情况；
// - TileJSON 是在传统切片地图的基础上，通过 JSON 给出切片 URL，以及与图层紧密关联的约束信息，TileJSON服务在OpenLayers6中对应的数据源是ol.source.TileJSON
// - TileSuperMapRest 超图提供的数据源

const mapType = {
  'XYZ': () => new XYZ({
    url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
  }),
  'supermap': () => new TileSuperMapRest({
    url: systemConfig.mapOptions.url,
  }),
  'mapbox': () => new TileJSON({
    url: 'https://api.maptiler.com/maps/basic/tiles.json?key=3rIj11xNDrioBlgnZiV3',
  })
}

export const mapSource = mapType['mapbox']();

export const mapLayer = new TileLayer({
  source: mapSource,
  projection: systemConfig.mapOptions.projection
});
```