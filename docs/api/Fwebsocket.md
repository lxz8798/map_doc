# 接入实时的方法

### 数据类型
```js
// 这里的参数是与后台对接的参数，具体的要问项目后端，参数可以打开ws.js文件修改内部参数
const params = {
    jsonData: ['104.03368176174445 30.534100371591943', '104.0748804922132 30.534100371591943', '104.0748804922132 30.554206210367578', '104.03368176174445 30.554206210367578', '104.03368176174445 30.534100371591943'], // 这个是当前视图的范围
    pageType: "BUS_DATA", // 页面类型
    requestType: "JTJC_FIXED_SCREEN_RANGE_REQUEST" // 项目标识
};
```

### 使用方法
```js
// 引入文件
import { createWebSocket } from "ws";
// 传入参数即可
createWebSocket(params);
```
- 得到的数据需要通过STORE接收

```js
// store -> index.js
SET_WS_DATAS(state, data) {
    // 判断结果是否正确
    const isJsonString = function (str) {
        try {
          if (typeof JSON.parse(str) == "object") {
            return true;
          }
        } catch (e) { }
        return false;
    }
    // 没有数据就不继续操作了
    if (!isJsonString(data)) return;
    const datas = JSON.parse(data);
}
store.commit('SET_WS_DATAS', text);

// state
wsDatas: null

// mutations
SET_WS_DATAS(state, datas) {
    state.wsDatas = datas;
}
```

- 其他地方使用watch监听
```js
watch(store.state.wsDatas, newVal => {})
```

### 文件下载地址
[WS](../../static/file/map/ws/ws.js)