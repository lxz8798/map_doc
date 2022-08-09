import React, { useEffect } from 'react';

import styles from './index.module.scss';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

// VUE版本展示列表
const featuresList = [
	{
		label: 'VUE2.0',
		des: '',
		codes: `<code><h4>VUE2.0版</h4>
import View from 'ol/View';
import Map from 'ol/Map';

const map = new Map({
  view: new View({
    center: [114, 30],
    maxZoom: 18,
    zoom: 12,
    projection: 'EPSG:4326'
  })
});

this.$bus.$emit('mapInit', map); // 可以通过事件总线或者其他方式暴露地图对象

this.$bus.$on('mapInit', function(map) {
  map.setTarget("map");
  const layer = new TileLayer({ // 其他地方可以这样引用，支持复用
      source: new TileSuperMapRest({
      url: 'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China_4326',
      wrapX: true
    })
  })
  map.addLayer(layer);
})
</code>`
	},
	{
		label: 'VUE3.0',
		des: '',
		codes: `<code><h4>VUE3.0版</h4>
import View from "ol/View";
import Map from "ol/Map";

// 初始化地图
const map = new Map({
  view: new View({
    center: [114, 30],
    maxZoom: 18,
    zoom: 12,
    projection: 'EPSG:4326'
  })
});

defineExpose({ map }); // 这里导出MAP对象

const { map } = map.value;
map.setTarget("map");
  const layer = new TileLayer({ // 其他地方可以这样引用，支持复用
      source: new TileSuperMapRest({
      url: 'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China_4326',
      wrapX: true
    })
  })
  map.addLayer(layer);
</code>`
	}
]

function Feature({label, des, codes}) {
  return (
		<div className="dg-html">
      <pre dangerouslySetInnerHTML={{ __html: codes }} />
    </div>
  );
}

export default function MapTypes() {
	useEffect(() => {
    let blocks = document.querySelectorAll('pre code');
		blocks.forEach((block)=>{
			if(block.getAttribute("highlighted")=="true"){
					return
			}
			//防止已经高亮处理过的block再次被处理
			block.setAttribute("highlighted","true")
			hljs.highlightAll();
		})
  }, [])
	return (
		<div className={styles.mapTypesBox}>
			{
				featuresList.map((props, idx) => (<Feature key={idx} {...props} />))
			}
		</div>
	)
}