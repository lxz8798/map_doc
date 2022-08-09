import React, { useRef,useEffect } from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View'

export default function MapInit() {
	const mapElement = useRef()
	useEffect(() => {
		const map = new Map({
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			target: mapElement.current,
			view: new View({
				center: [0, 0],
				zoom: 2,
			}),
		});
	})
	return (
		<div className={styles.mapInitBox}>
			<div ref={mapElement} id="map" className={styles.map}></div>
		</div>
	)
}