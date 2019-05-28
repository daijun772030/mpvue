import Vue from 'vue'
import App from './App'
import utils from './utils/index'//工具类
import globalData from './utils/globalData'; //全局变量

import store from './store'//数据状态
import request from './utils/newApi'

Vue.prototype.$utils = utils

//全局需要的参数
Vue.prototype.$global = globalData; 

//全局 数据的状态
Vue.prototype.$store = store; 

//导入router
// import MpvueRouterPatch from 'mpvue-router-patch'

//使用router
// Vue.use(MpvueRouterPatch)

Vue.config.productionTip = false
App.mpType = 'app'


Vue.prototype.$api = request;

const app = new Vue(App)
app.$mount()
