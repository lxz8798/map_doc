/*
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-12 09:29:53
 * @FilePath: \ZHJTJC_F\src\utils\map\overlay\index.js
 * @Description: 地图弹窗逻辑
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
 */
import Overlay from "ol/Overlay";
import store from '@/store';

export const getOverlayData = data => {
	const _overlayers = data.map.getOverlays().array_;
	
	if(_overlayers.length>0) {
		_overlayers.forEach(i => data.map.removeOverlay(i));
	}
	
	// 新建父级标签
	const content = document.createElement("div");
	content.setAttribute("class", "popup-content");
	// 动态改变内容
	content.innerHTML = data.innerHTML;
	// 新建内容标签
	const container = document.createElement('div');
	container.setAttribute("class", "ol-popup");
	// 新建关闭按钮
	const close = document.createElement('div');
	close.innerText = "X";
	close.setAttribute("class", "close");

	// 新建其他类型按钮
	const buttons = document.createElement("div");
	buttons.setAttribute("class", "btn-sty");

	// 添加到弹出层
	let trackBtn, playBtn
	if(data.type === "lineStringBusIcon") {
		// 跟踪按钮
		trackBtn = document.createElement("p");
		trackBtn.innerText = "跟踪";
		// 轨迹回放按钮
		playBtn = document.createElement("p");
		playBtn.innerText = "轨迹回放";
		buttons.appendChild(trackBtn);
		buttons.appendChild(playBtn);
	}

	// 客流详情
	const isShowType = ['1', '2', '3', '4', '5'];
	const flowDetail = document.createElement("div");
	flowDetail.setAttribute("class", "detail-sty");
	flowDetail.innerText = "更多详情";
	flowDetail.style.display = isShowType.includes(data.type) ? 'block' : 'none';
	
	// 添加到弹出层
	container.appendChild(close);
	container.appendChild(content);
	
	// 根据类型的不同完成不同的业务
	container.appendChild(flowDetail);
	
	flowDetail.addEventListener("click", (val) => {
		store.commit('mapDialog/CLOSE_M_D', true);
		const _type = {
			'1': () => {},
			'2': () => {},
			'3': () => {},
			'4': () => {},
			'5': () => {},
		}
		_type[data.type]();
	});
	
	container.appendChild(buttons);
	// 声明地图OVERLAY
	const overlay = new Overlay(({
		element: container,
		autoPan: true,
		autoPanAnimation: {
			duration: 250
		}
	}));
	// 添加到地图
	overlay.setPosition(data.coordinats);
	overlay.setOffset([0, -25]);
	overlay.setProperties({ id: data.id, type: "busOverlay" });
	
	// 这句是响应当前不需要多个OVERLAYER需求，如果需要多个，直接注释
	data.map.addOverlay(overlay);

	// 各按钮的点击事件
	close.addEventListener("click", () => {
		data.map.removeOverlay(overlay)
		store.commit('mapDialog/SET_HTML', null);
	});
	if(playBtn){
		playBtn.addEventListener("click", () => {
			if(playRoutes()) {
				playBtn.innerHTML = `
					<p id="start-animation">停止回放</p>
				`;
			} else {
				playBtn.innerHTML = `
					<p id="start-animation">开始回放</p>
				`;
			}
		});
	}
	// 抛出OVERLAY
	return overlay;
}
