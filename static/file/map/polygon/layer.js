/*
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-01 15:24:21
 * @FilePath: \vue-map3\src\utils\map\points\layer.js
 * @Description: 
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
 */
import {
	TYPES,
	ICONTYPE
} from "@/utils/types.js";
import {
	Vector as VectorLayer
} from 'ol/layer';
import {
	Style,
	Icon
} from "ol/style"
import VectorSource from 'ol/source/Vector';
import pointFeature from './feature';
import pointStyle from './style';
// 针对性设置角度类型
const arrlist = ['1', '2', '3', '4', '5'];
const layer = (data, name, map) => {
	if(!data) return;
	const _collection = [];
	// 图标跟随地图放大缩小
	const setImageScale = feature => {
		return feature.getStyle().getImage().setScale(map.getView().getZoom() / systemConfig.mapOptions.minZoom * 0.25)
	}
	if (data.flat().length > 2) {
		data.forEach(i => {
			let _f, _image;
			// 这个判断是针对i[2]里面，也就是车的对象图标设置
			if (i[2] && i[2].hasOwnProperty('carType')) {
				_f = pointFeature(i, i[2].carType); // 这里可以使用传过来i[2].carType定义点的显示图
				// 这里对类型是cartype的点进行样式和角度设置
				//i[2].icontype,自定义的图标，没有就用默认的
				_image = new Icon({
					src: i[2].icontype?i[2].icontype:ICONTYPE[i[2].carType]().icon,
					scale: 0.3
				})
				_f.setId(i[2].id)
				// 针对性设置角度
				if (i[2]?.carType || i[2]?.type) {
					if(i[2].hasOwnProperty('direction')) {
						_image.setRotation(Math.floor(i[2].direction / 100)) // 真实方向
					} else {
						let flag = arrlist.indexOf(i[2]?.carType)
						_image.setRotation(flag == -1 ? null : Math.floor(Math.random() * 360)) // 随机方向
					}
				}
			} else if(i[2] && i[2].hasOwnProperty('type')) {
				_f = pointFeature(i, i[2].type); // 这里可以自点定义点的图标
				// 这里对类型是type的点进行样式设置
				_image = new Icon({
					src: i[2].icontype?i[2].icontype:ICONTYPE[i[2].type]().icon,
					scale: 0.3
				})
				_f.setId(i[2].id)
			}

			_f.setStyle(new Style({
				image: _image
			}));
			_collection.push(_f)
		})
		map.getView().on('change:resolution', () => {
			for(let i = 0; i < _collection.length; i++) {
				setImageScale(_collection[i])
			}
		});
		return new VectorLayer({
			name: name,
			style: pointStyle,
			source: new VectorSource({
				features: _collection
			}),
			zIndex: 11
		})
	} else {
		map.getView().on('change:resolution', () => {
			for(let i = 0; i < _collection.length; i++) {
				setImageScale(_collection[i])
			}
		});
		return new VectorLayer({
			name: name,
			style: pointStyle,
			source: new VectorSource({
				features: [pointFeature(data)]
			}),
			zIndex: 11
		})
	}
}

export default layer