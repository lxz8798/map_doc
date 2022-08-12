import store from '@/store';
import {
	ref,
	watch,
	computed
} from "vue";

// const openBusViewWs = computed(() => store.getters.openBusViewWs);
// const openTaxiViewWs = computed(() => store.getters.openTaxiViewWs);
// const openFreightViewWs = computed(() => store.getters.openFreightViewWs);
// const openPassengerViewWs = computed(() => store.getters.openPassengerViewWs);
// const openChargeViewWs = computed(() => store.getters.openChargeViewWs);
// const openParkViewWs = computed(() => store.getters.openParkViewWs);
const updateViewDatas = computed(() => store.getters.updateViewDatas);

let token = ""
if (!sessionStorage.ANTH_INFO) {
	token = systemConfig.fakeToken
} else {
	const ANTH_INFO = sessionStorage.ANTH_INFO;
	if (ANTH_INFO == 'null' || ANTH_INFO == 'undefined') {
		sessionStorage.clear();
	} else {
		token = JSON.parse(ANTH_INFO).token;
	}
}
// STATE
let websocket = null; // webSocket实例
let host = systemConfig.wsUrl;
let tenant = systemConfig["TENANT-ID"];
let wsuri = `${host}?access_token=${token}&TENANT-ID=${tenant}`;
let lockReconnect = false; // 重连锁，避免多次重连
let maxReconnect = 6; // 最大重连次数， -1 标识无限重连
let reconnectTime = 0; // 重连尝试次数
let heartbeat = {
	interval: 30 * 1000, // 心跳间隔时间
	timeout: 10 * 1000, // 响应超时时间
	pingTimeoutObj: null, // 延时发送心跳的定时器
	pongTimeoutObj: null, // 接收心跳响应的定时器
	pingMessage: JSON.stringify({
		type: "ping"
	}), // 心跳请求信息
};
let socketParams = {
	pageType: '0',
	requestType: 'JTJC_FIXED_SCREEN_RANGE_REQUEST',
	jsonData: sessionStorage.VIEWPOS && JSON.parse(sessionStorage.VIEWPOS).map((i) => i.toString().replace(/,/gi, " "))
};
let linkFlag = true;
// FUNCTION
function createWebSocket() {
	if (!window.location.href.includes('cockpit') || !window.location.href.includes('trafficNetwork') || !window.location.href.includes('parking')) {
		initWebSocket();
	}
};
// 初始化websocket
function initWebSocket() {
	// 建立连接
	websocket = new WebSocket(wsuri);
	// 连接关闭
	websocket.onclose = function (e) {
		closeSock(e);
	};
	// 连接成功
	websocket.onopen = function () {};
	// 接收信息
	websocket.onmessage = function (e) {
		onMessage(e);
	};
	// 连接错误
	websocket.onerror = function () {
		reconnect();
	};
};
/**
 * 重新连接
 */
function reconnect() {
	if (!token) {
		return;
	}
	if (
		lockReconnect ||
		(maxReconnect !== -1 && reconnectTime > maxReconnect)
	) {
		return;
	}
	lockReconnect = true;
	setTimeout(() => {
		reconnectTime++;
		// 建立新连接
		initWebSocket();
		lockReconnect = false;
	}, 5000);
};
/**
 * 清空定时器
 */
function clearTimeoutObj(heartbeat) {
	heartbeat.pingTimeoutObj && clearTimeout(heartbeat.pingTimeoutObj);
	heartbeat.pongTimeoutObj && clearTimeout(heartbeat.pongTimeoutObj);
};
/**
 * 开启心跳
 */
function startHeartbeat() {
	// debugger
	const webSocket_ = websocket;
	const heartbeat_ = heartbeat;
	// 清空定时器
	clearTimeoutObj(heartbeat_);
	// 延时发送下一次心跳
	heartbeat_.pingTimeoutObj = setTimeout(() => {
		// 如果连接正常
		if (webSocket_.readyState === 1) {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			websocketsend(heartbeat_.pingMessage);
			// 心跳发送后，如果服务器超时未响应则断开，如果响应了会被重置心跳定时器
			heartbeat_.pongTimeoutObj = setTimeout(() => {
				closeSock();
			}, heartbeat_.timeout);
		} else {
			// 否则重连
			reconnect();
		}
	}, heartbeat_.interval);
};


function closeSock() {
	if (websocket) {
		websocket.close();
	}
};

// 数据接收
function onMessage(msg) {
	//收到服务器信息，心跳重置并发送
	startHeartbeat();
	if(websocket.readyState == 1) {
		const text = msg.data;
		store.commit('SET_WS_DATAS', text)
	}
};

// 数据发送
function websocketsend(msg) {
	websocket.send(msg);
};

// 实际调用的方法
function sendSock(agentData) {
	if (websocket.readyState === websocket.OPEN) {
		// 若是ws开启状态
		websocketsend(agentData);
	} else if (websocket.readyState === websocket.CONNECTING) {
		// 若是 正在开启状态，则等待1s后重新调用
		setTimeout(function () {
			sendSock(agentData);
		}, 1000);
	} else {
		// 若未开启 ，则等待1s后重新调用
		setTimeout(function () {
			sendSock(agentData);
		}, 1000);
	}
};

// WS请求
function wsReqFunc() {
	const _routeName = sessionStorage.currRouterPath.replace(/\/yxjc\//g, '').replace(/\//gi, '');
	let noRouter=['trafficNetwork','parking', 'track']//不发送ws请求
	const _routeNameMapping = {
		'cityBus': () => 'BUS_DATA',
		'charge': () => 'CHARGING_STATION_DATA',
		'taxi': () => 'TAXI_DATA',
		'urbanFreight': () => 'TRUCKS_DATA',
		'passenger': () => 'PASSENGER_DATA',
		'cockpit': () => 'BUS_DATA, CHARGING_STATION_DATA, TAXI_DATA, TRUCKS_DATA, PASSENGER_DATA'
	};
	if(!noRouter.includes(_routeName)){
		socketParams.pageType = _routeNameMapping[_routeName]();
	}
	return socketParams
}

watch(updateViewDatas, (newVal, oldVal) => {
	wsReqFunc();
	if (newVal) {
		socketParams.jsonData = JSON.parse(sessionStorage.VIEWPOS).map((i) => i.toString().replace(/,/gi, " "));
	} else {
		socketParams.pageType = '';
	}
	websocket.send(JSON.stringify(socketParams));
})

export {
	sendSock,
	createWebSocket,
	closeSock
};