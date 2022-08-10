/*
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-07-12 17:07:50
 * @FilePath: \vue-map3\src\utils\map\line\feature.js
 * @Description: 线的FEATURE
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
 */
import Feature from 'ol/Feature';
import { LineString } from "ol/geom";

const featureHandler = data => {
	return new Feature({
		geometry: new LineString(data),
		id: data.toString()
	});
}

export default featureHandler;
