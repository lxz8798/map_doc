import VectorLayer from "ol/layer/Vector";
import featuresHandler from "./feature";
import lineSource from "./source";
import lineStyle from "./style";

const lineLayer = (lineDatas, layerName) => {
    const features = featuresHandler(lineDatas);
    lineSource.addFeature(features);
    return new VectorLayer({
        source: lineSource,
        name: layerName,
        style: lineStyle,
        zIndex: 15
    });
}

export default lineLayer