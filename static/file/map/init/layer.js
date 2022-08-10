/*
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-07-22 11:16:41
 * @FilePath: \ZHJTJC_F\src\utils\map\init\layer.js
 * @Description: 
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
 */
import TileLayer from 'ol/layer/Tile';
import {XYZ} from 'ol/source'
import { TileSuperMapRest } from '@supermap/iclient-ol';

import TileJSON from 'ol/source/TileJSON';

// 对服务的切换
const mapType = {
  'supermap': () => 
  // new XYZ({
  //           url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
  //         }),
  new TileSuperMapRest({
    url: systemConfig.mapOptions.url,
    wrapX: true
  }),
  'mapbox': () => new TileJSON({
    url: 'https://api.maptiler.com/maps/basic/tiles.json?key=3rIj11xNDrioBlgnZiV3',
    tileSize: 512,
    crossOrigin: 'anonymous'
  })
}

export const mapSource = mapType['supermap']();

export const mapLayer = new TileLayer({
  source: mapSource,
  projection: systemConfig.mapOptions.projection
});