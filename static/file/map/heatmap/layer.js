/*
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-07-08 10:54:17
 * @FilePath: \vue-map3\src\utils\map\heatmap\layer.js
 * @Description: 
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
 */
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {
	Heatmap as HeatmapLayer
} from 'ol/layer';

function createPoint ({coordinates = [0, 0]}) {
	const feature = new Feature({
    geometry: new Point(coordinates)
  })
	feature.setId(coordinates[2].id)
  return feature
}

export const heatmapLayer = function ({ data }) {
	let heatSoruce = new VectorSource({})
	let features = []
	for (let i in data) {
		let newFeature = createPoint({coordinates: data[i]})
		features.push(newFeature)
	}
	heatSoruce.addFeatures(features)
	let Heatmap = new HeatmapLayer({
		name: "heatmapLayer",
		source: heatSoruce,
		blur: 80,
		radius: 40
	})
	return Heatmap
}
