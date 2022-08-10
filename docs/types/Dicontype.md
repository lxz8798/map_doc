# 图标类型

```js
// icontype.js
import { TYPES } from './types';

export const ICONTYPE = {
	[TYPES['BUS']]: () => {
		return {
			layerName: 'busLayer',
			icon: busIcon
		}
	},
	[TYPES['ONLINECAR']]: () => {
		return {
			layerName: 'onlineCarLayer',
			icon: onlineCarIcon
		}
	},
	[TYPES['TAXI']]: () => {
		return {
			layerName: 'taxiLayer',
			icon: taxiIcon
		}
	},
	[TYPES['TRANSPORT']]: () => {
		return {
			layerName: 'transportLayer',
			icon: transportIcon
		}
	},
	[TYPES['TRUCK']]: () => {
		return {
			layerName: 'truckLayer',
			icon: truckIcon
		}
	},
	[TYPES['CHARGE']]: () => {
		return {
			layerName: 'chargeLayer',
			icon: chargeIcon
		}
	},
	[TYPES['TRAFFIC']]: () => {
		return {
			layerName: 'trafficLayer',
			icon: trafficIcon
		}
	},
	[TYPES['PARKING']]: () => {
		return {
			layerName: 'parkingLayer',
			icon: parkingIcon
		}
	},
	[TYPES['BUSSTOP']]: () => {
		return {
			layerName: 'busStopLayer',
			icon: busStopIcon
		}
	},
	[TYPES['TAXICOMPANY']]: () => {
		return {
			layerName: 'taxiCompanyLayer',
			icon: taxiCompanyIcon
		}
	},
	[TYPES['PSTATION']]: () => {
		return {
			layerName: 'pStationLayer',
			icon: pStationIcon
		}
	},
	[TYPES['METRO']]: () => {
		return {
			layerName: 'metroLayer',
			icon: metroIcon
		}
	},
	[TYPES['SITE']]: () => {
		return {
			layerName: 'busSiteLayer',
			icon: busSiteIcon
		}
	},
	[TYPES['POINT']]: () => {
		return {
			layerName: 'pointLayer',
			icon: busIcon
		}
	},
	[TYPES['BRIDGE']]: () => {
		return {
			layerName: 'bridgeLayer',
			icon: bridgeIcon
		}
	},
	[TYPES['TUNNEL']]: () => {
		return {
			layerName: 'tunnelLayer',
			icon: tunnelIcon
		}
	},
	[TYPES['HIGHWAY']]: () => {
		return {
			layerName: 'highwayLayer',
			icon: highwayIcon
		}
	},
	[TYPES['CULVERT']]: () => {
		return {
			layerName: 'culvertLayer',
			icon: culvertIcon
		}
	},
	[TYPES['TRAFFICSTATION']]: () => {
		return {
			layerName: 'trafficStationLayer',
			icon: trafficStationIcon
		}
	},
	[TYPES['TOLLGATE']]: () => {
		return {
			layerName: 'tollGateLayer',
			icon: tollGateIcon
		}
	}
}
```