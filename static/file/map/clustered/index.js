import {
	Circle as CircleStyle,
	Fill,
	Stroke,
	Style,
	Text,
	Icon,
} from 'ol/style';
import {
	Cluster,
	Vector as VectorSource
} from 'ol/source';
import {
	Vector as VectorLayer
} from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {
	TYPES,
	ICONTYPE
} from "@/utils/types.js";
import {
	fromLonLat
} from 'ol/proj';
import busSiteIcon from '../../../assets/img/bus-stop.png';

var features, source, clusterSource, styleCache = {};
export const getClusteredDatas = (data, map) => {
	features = new Array(data.length);
	if (map.getView().getProjection().code_ === 'EPSG:4326') {
		for (let i = 0; i < data.length; ++i) {
			features[i] = new Feature(new Point([Number(data[i][0]), Number(data[i][1])]));
			features[i].setId(data[i][2].id);
			features[i].setProperties(Object.assign({type: data[i][2].carType}, data[i][2]));
		}
	} else {
		for (let i = 0; i < data.length; ++i) {
			features[i] = new Feature(new Point(fromLonLat([Number(data[i][0]), Number(data[i][1])])));
			features[i].setId(data[i][2].id);
			features[i].setProperties(Object.assign({type: data[i][2].carType}, data[i][2]));
		}
	}
	
	source = new VectorSource({
		features: features,
	});

	clusterSource = new Cluster({
		distance: 100,
		source: source,
	});

	const clusteredLayer = new VectorLayer({
		name: 'clusterLayer',
		source: clusterSource,
		style: function (feature) {
			let size = feature.get('features').length;
			var color = size > 160 ? "163,12,11" : (size > 80 ? "232,66,23" : (size > 40 ? "229,135,24" : "255,194,70"))
			var IconCircle;
			let style = styleCache[size];
			if (!style) {
				if (size == 1) {
					IconCircle = new Icon({
						// color: '#BADA55',
						crossOrigin: 'anonymous',
						src: ICONTYPE[feature.get('features')[0].values_.carType]().icon,
						scale: 0.3
					})
				} else {
					IconCircle = new CircleStyle({
						radius: 12,
						stroke: new Stroke({
							color: "rgba(" + color + ",0.3)",
							width: 10,
						}),
						fill: new Fill({
							color: "rgba(" + color + ",0.8)",
						}),
						scale: 2
					})
				}
				style = new Style({
					image: IconCircle,
					text: new Text({
						text: size == 1 ? '' : size.toString(),
						fill: new Fill({
							color: '#fff',
						}),
						scale: 2
					})
				});
				styleCache[size] = style;
			}
			return style;
		},
	});

	return clusteredLayer
}