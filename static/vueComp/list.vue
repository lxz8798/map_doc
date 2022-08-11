<!--
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-11 16:22:15
 * @FilePath: \map-doc\src\components\vueComp\list.vue
 * @Description: 公共的LIST组件
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
-->
<template>
  <div class="listComp">
    <ul class="ulKeys"  v-if="datas.length > 0" :style="{ color: options.textColor || '#000'}">
      <li class="title" v-for="(key, index) in Object.keys(datas[0])" :key="index" :style="{ background: options.keysBG || '#000'}">
        {{mapping[key]}}
      </li>
    </ul>
    <ul class="ulList">
      <li v-for="(item, index) in datas" :key="index" class="data-list" :style="{background: index % 2 && options.openStripe ? options.keysBG : options.stripesColor, color: options.textColor || '#000'}">
        <span v-for="(key, index) in Object.keys(datas[0])">
           {{item[key]}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    mapping: {
      type: Object,
      default: {
        'id': '序号',
        'name': '姓名',
        'sex': '性别'
      }
    },
    datas: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: '张三',
          sex: '男'
        },
        {
          id: 1,
          name: '李四',
          sex: '男'
        },
        {
          id: 2,
          name: '赵妹儿',
          sex: '女'
        },
        {
          id: 3,
          name: '王五',
          sex: '男'
        },
        {
          id: 4,
          name: '孙七',
          sex: '男'
        }
      ]
    },
    options: {
      type: Object,
      default: {
        openStripe: true,
        openTopColor: true,
        textColor: '#26DDFF',
        keysBG: 'rgba(0, 234, 255, .3)',
        stripesColor: 'rgba(0, 234, 255, .1)'
      }
    }
  },
  mounted() {
    console.log(this.datas)
  },
  methods: {
    
  }
};
</script>
<style lang="scss">
  .listComp {
    width: 400px;
    height: 600px;
    background: #fff;
    
    > ul {
      margin: 0;
      width: inherit;
      list-style-type: none;
    }
    
    > ul.ulKeys {
      display: inline-flex;
      flex-direction: row;
      margin-bottom: 3px;
      > li {
        flex: 1;
        padding-left: 5px;
        font-size: 18px;
        text-align: center;
        padding: 6px 0;
        margin-right: 3px;
      }
      > li:last-child {
        margin-right: 0;
      }
    }
    
    > ul.ulList {
      > li {
        width: 100%;
        padding-left: 5px;
        padding: 8px 0;
        
        margin-bottom: 3px;
        font-size: 14px;
        
        display: inline-flex;
        
        > span {
          flex: 1;
          padding-left: 5px;
          text-align: center;
        }
      }
    }
  }
</style>