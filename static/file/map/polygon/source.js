import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

const name = '';

const source = new VectorLayer({
    name: name || 'pointLayer',
    style: pointStyle,
    source: new VectorSource({
        features: _collection
    }),
    zIndex: 11
})

export default source