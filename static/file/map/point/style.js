import { Style, Icon, Fill, Stroke } from "ol/style";

export default new Style({
	image: new Icon({
		color: '#BADA55',
		crossOrigin: 'anonymous',
		src: '../../../assets/car/bus.png',
		scale: 0.3
	}),
	fill: new Fill({
		color: "#FF00FF"
	}),
	stroke: new Stroke({
		color: "#000000",
		size: 6
	})
})