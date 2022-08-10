<!--
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-10 13:22:09
 * @FilePath: \vue-map3\src\components\JdMap\index.vue
 * @Description: 通用地图组件，多页面可
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
-->
<template>
  <div :id="props.mapName" class="map" style="
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    "></div>
  <!-- 颜色层 -->
  <div class="color_cover"></div>
  <!-- 绘制工具 -->
  <range-cover :options="toolOptions" v-if="showHeatmapHandler()"></range-cover>
</template>

<script setup>
// 地图相关
import View from "ol/View";
import * as control from "ol/control";
import Map from "ol/Map";
import { transform } from "ol/proj";
import { Style, Stroke, Fill, RegularShape } from "ol/style";
// 选中层-该交互方法已完成，在点线面上生效，现阶段暂时隐藏
// import { selectFeature } from "@/utils/map/select/selectMove";
//组件
// 天府新区电子围栏
import polygonLayer from "@/utils/map/polygon/";
// VUE相关
import {
  defineProps,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  computed,
  getCurrentInstance,
  toRaw,
} from "vue";
import { useStore } from "vuex";
// 组件
import rangeCover from "@/components/JdTool/rangeCover.vue";
// API
// UTILS
import { setHtml } from "@/utils/map/map.js";
// PROXY
const { proxy } = getCurrentInstance();

/**
 * 地图上要素的层级
 * map:1
 * polygonLayer 10
 * pointsLayer 11
 */
let map = {};
// const styleJson = 'https://api.maptiler.com/maps/336cdb77-83ff-4779-a46c-7cc872aaced8/style.json?key=3rIj11xNDrioBlgnZiV3';
// 初始化地图
map = new Map({
  controls: control.defaults({ attributionOptions: { collapsed: false } }),
  constrainResolution: true,
  view: new View({
    center: systemConfig.mapOptions.center,
    maxZoom: systemConfig.mapOptions.maxZoom - 1,
    zoom: systemConfig.mapOptions.minZoom,
    projection: systemConfig.mapOptions.projection,
  }),
});
map.addControl(new control.ScaleLine({ units: 'metric' }));
// olms.apply(map, styleJson);
// 添加交互
const toolOptions = {
  map: map,
};
// PROPS
const props = defineProps(["mapName", "layerName"]);
let zoom = Math.floor(map.getView().getZoom()); //获取当前地图的缩放级别
let overlay = null;
// REFS
const showHeatmap = ref(true);
const store = useStore();
// COMPUTED
const animateCurrCoordinate = computed(() => store.state.cityBusStore.animateCurrCoordinate);
const dialogVisible = computed(() => store.state.mapDialog.mapDialogShow);
const targetDetail = computed(() => store.getters.targetDetail);
// const htmlRefcode = computed(() => store.state.mapDialog.htmlCode);
// WATCH
watch(animateCurrCoordinate, (newVal, oldVal) => {
  overlay && overlay.setPosition(toRaw(newVal));
  overlay && overlay.setOffset([0, -25]);
});

watch(dialogVisible, newVal => {
  if (!newVal) {
    map.getView().animate({ center: [targetDetail.value.lon, targetDetail.value.lat], zoom: systemConfig.mapOptions.maxZoom - 2 });
  }
})
// FUNCTION
const showHeatmapHandler = function () {
  return window.location.href.includes("cityBus") &&
    !store.state.mapDialog.mapDialogShow
    ? (showHeatmap.value = true)
    : (showHeatmap.value = false);
};

const viewPosHandler = function () {
  if (map) {
    //获取可视化区域得范围
    // let zoom = Math.floor(map.getView().getZoom()); //获取当前地图的缩放级别
    let viewPos = map.getView().calculateExtent(map.getSize());

    let lt = [viewPos[0], viewPos[1]],
      rt = [viewPos[2], viewPos[1]],
      rb = [viewPos[2], viewPos[3]],
      lb = [viewPos[0], viewPos[3]];
    // 如果是3857则需要开启坐标系的转换
    let viewCompose;
    if (systemConfig.mapOptions.projection === "EPSG:3857") {
      viewCompose = [lt, rt, rb, lb, lt].map((i) =>
        transform(i, "EPSG:3857", "EPSG:4326")
      );
    } else {
      viewCompose = [lt, rt, rb, lb, lt];
    }
    sessionStorage.VIEWPOS = JSON.stringify(viewCompose.map((i) => i.toString().replace(/,/gi, " ")));
    // store.commit('wsStore/UPDATE_VIEW_DATAS', false);
  }
}
viewPosHandler();
onMounted(() => {
  if (map) {
    map.on("click", function (e) {
      // 判断是否点击在点上
      let feature = toRaw(
        map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      );
      if (feature) {
        //ponit点击事件 暂时隐藏-因业务需求暂时隐藏
        if (!Number(feature.get("type"))) {
          // console.log("如果是自定义类似需要做什么操作可以在此完成!");
        } else if (typeof Number(feature.get("type")) === "number") {
          // 如果是1~100这种数字类型都会走这里
          setHtml(feature.get("type"), proxy, feature.values_.id, feature.values_);
          let parmas = {
            id: feature.values_.id,
            type: feature.get("type"),
            coordinats: [e.coordinate[0], e.coordinate[1]],
            animate: false,
          };
          store.commit("mapDialog/SET_OVERLAY_DATA", parmas);
          store.commit("cityBusStore/SET_TARGET_DETAIL", feature.values_);
        }
        // 这里是点里聚焦到目标
        if (feature.get("type") !== 'tianfuPolygon') {
          map.getView().animate({ center: e.coordinate, zoom: systemConfig.mapOptions.maxZoom - 2 });
        }
      }
    });
    map.on('movestart', function (e) {
      // if (map) {
        // 超出当前区域，把弹窗图层也关掉
        // const _overlayers = map.getOverlays().array_;

        // if(_overlayers.length>0) {
        //   _overlayers.forEach(i => map.removeOverlay(i));
        // }

        // if(zoom >= systemConfig.mapOptions.maxZoom - 1) store.commit('wsStore/UPDATE_VIEW_DATAS', true);
      // }
    })
    //注册地图移动后触发得事件
    map.on("moveend", function (e) {
      if(map) {
        zoom = Math.floor(map.getView().getZoom()); //获取当前地图的缩放级别
        viewPosHandler();
        if(zoom >= systemConfig.mapOptions.maxZoom - 2) {
          store.commit('wsStore/UPDATE_VIEW_DATAS', true);
        } else {
          store.commit('wsStore/UPDATE_VIEW_DATAS', false);
        }
      }
    });
    // 鼠标样式
    let routerSelect = null, pointSelect = null;
    map.on("pointermove", function (e) {
      let pixel = map.getEventPixel(e.originalEvent);

      if (routerSelect !== null) {
        routerSelect.setStyle(undefined);
        routerSelect = null;
      } else if (pointSelect !== null) {
        pointSelect.setStyle(undefined);
        pointSelect = null;
      }

      let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      // 如果选中的不是要素则不往下执行
      if (!feature || !feature.get("type")) {
        map.getTargetElement().style.cursor = "auto";
        return;
      }

      // 各种类型的鼠标样式
      if (!Number(feature.get("type"))) {
        const _exec = {
          TIANFU: () => {
            map.getTargetElement().style.cursor = "auto";
          },
          ROUTE: () => {
            // 这里的鼠标经过样式，可以在interaction之中完成，没必要单独写出来，先注释，有必要时在开启
            // routerSelect = feature;
            // const _style = new Style({
            //   stroke: new Stroke({
            //     width: 6,
            //     color: "red",
            //   }),
            // });
            // routerSelect.setStyle(_style);
            console.log(feature);
          },
          SITE: () => {
            map.getTargetElement().style.cursor = "pointer";
          },
          POINT: () => {
            map.getTargetElement().style.cursor = "pointer";
          },
        };
        _exec[proxy.$fn.fromValueQueryType(feature.get("type"))]();
      } else if (typeof Number(feature.get("type")) === "number") {
        map.getTargetElement().style.cursor = "pointer";
      }
    });
    // 添加交互和交互层，功能是完整的; 如果需要点线面的选中样式变化，可以开启下面的交互，其他类型推荐在map.on('click')中实现
    // map.addInteraction(selectFeature);
  }
});

polygonLayer.setZIndex(10);
// 添加一个多边形
map.addLayer(polygonLayer);

onBeforeUnmount(() => {
  store.commit('wsStore/SET_TAXI_VIEW_WS_STATE', false);
  store.commit('wsStore/SET_BUS_VIEW_WS_STATE', false);
  store.commit('wsStore/SET_FREIGHT_VIEW_WS_STATE', false);
  store.commit('wsStore/SET_PASSENGER_VIEW_WS_STATE', false);
  store.commit('wsStore/SET_PARK_VIEW_WS_STATE', false);
  store.commit('wsStore/SET_CHARGE_VIEW_WS_STATE', false);

  // 清除所有数据
  map.getLayers().array_.forEach((i) => {
    if (i.values_.name !== "tianfuCoreAreaPolygon") {
      i.getSource().clear();
      map.removeLayer(i);
    }
  });
  map = null;
});

defineExpose({
  map,
  overlay,
});
</script>

<style lang='scss'>
div.map {
  pointer-events: auto;
}

.ol-popup {
  position: absolute;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 1.25rem;
  border-radius: unset;
  border: 0.0313rem solid #26ddff;
  background-color: rgba(4, 16, 38, 0.8);
  bottom: 0.375rem;
  left: -1.5625rem;
  min-width: 16.0625rem;
  z-index: 999;

  &::after,
  &::before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &::after {
    border-top-color: rgba(4, 16, 38, 0.8);
    border-width: 0.9375rem;
    left: 1.5rem;
    margin-left: -0.9375rem;
  }

  >#close {
    @extend .font-white;
    position: absolute;
    right: 0.3125rem;
    top: 0.3125rem;
    font-size: 0.9375rem;
    transform: scaleY(0.8);
  }

  .detail-sty {
    @extend .font-describe-color;
  }

  .btn-sty {
    @extend .flex_around;

    >p {
      width: 5.625rem;
      height: 1.875rem;
      border-radius: 0.125rem;
      line-height: 1.875rem;
      font-size: 0.9375rem;
      font-weight: 500;
      @extend .font-describe-color;


      &:first-child {
        border: 1px solid #26ddff;
        background: rgba(38, 221, 255, 0.3);
      }

      &:last-child {
        border: 1px solid #efb416;
        background: rgba(239, 180, 22, 0.3);
      }
    }
  }

  >#popup-content {
    >h3 {
      font-size: 1rem;
      color: #efb416;
      font-weight: bold;
      text-align: left;
      margin: 0.2rem 0;
    }

    >p {
      font-size: 0.9375rem;
      @extend .font-describe-color;
      text-align: left;
      margin: 0.8rem 0;
    }

    .ptitle {
      width: 8.125rem;
      display: inline-block;
      font-size: 0.9375rem;
      //   text-align: left;
    }

    .span-title {
      display: inline-block;
      padding: 0.5625rem 0;
      width: 4.375rem;
      text-align: center;
    }

    .spansty {
      width: 5rem;
      display: inline-block;
      font-size: 0.9375rem;
      text-align: right;

      //   margin-left: 1rem;
      .spanT {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        background: #278327;
        border-radius: 2px;
        font-size: 0.875rem;
        text-align: center;
      }

      .spanE {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        background: #983333;
        border-radius: 2px;
        font-size: 0.8125rem;
        text-align: center;
      }
    }

    &::before {
      top: 0;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      background: #26ddff;
      width: 0.3125rem;
      height: 0.3125rem;
    }
  }

  >.detail_pop {
    position: absolute;
    top: 30%;
    right: -80%;
    height: 7.9063rem;
    border: 1px solid #26ddff;
    background: rgba(4, 16, 38, 0.8);
    padding: 0 1.25rem;

    &::before {
      top: 0;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      background: #26ddff;
      width: 0.3125rem;
      height: 0.3125rem;
    }

    .detail {
      @extend .font-white;
      font-size: 0.9375rem;

      >span {
        font-family: LED;
        font-size: 2.25rem;
        color: #26ddff;
      }
    }

    .close {
      @extend .font-white;
      position: absolute;
      right: 0.3125rem;
      top: 0.3125rem;
      font-size: 0.9375rem;
      transform: scaleY(0.8);
    }
  }
}
</style>