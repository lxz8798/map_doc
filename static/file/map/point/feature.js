import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

const feature = (data, type) => {
    const _f = new Feature({
        type: type,
        geometry: new Point(data),
    })
    if(data[2]) {
        _f.setId(data[2].id);
        _f.setProperties({ ...data[2] })
    }
    return _f
}

export default feature