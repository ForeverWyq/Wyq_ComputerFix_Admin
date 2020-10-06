import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 导入customer的index.js
import customer from './customer/index'
// 导入waiter的index.js
import waiter from './waiter/index'
// 导入category的index.js
import category from './category/index'
// 导入product的index.js
import product from './product/index'
// 导入comment的index.js
import comment from './comment/index'
// 导入order的index.js
import order from './order/index'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // 顾客模块
    customer,
    // 员工模块
    waiter,
    // 栏目模块
    category,
    // 产品模块
    product,
    // 评论模块
    comment,
    // 订单模块
    order,
  },
  getters
})

export default store
