// 在Vuex中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/http/axios'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  // 保存数据或状态
  state: {
    // 全部订单信息对象
    orderObj: {},
    // 派单信息
    sendOrder:{},
    // 订单信息
    orderInfo: [],
    // 全部员工信息
    waiterObj: {},
  },
  // 官方推荐唯一修改state中状态的方式
  mutations: {
    // 获取所有订单信息
    getOrderObj(state, orderData){
      state.orderObj = orderData
    },
    // 获取派单信息
    getSendOrder(state, sendOrder){
      state.sendOrder = sendOrder
    },
    // 获取该产品的基本信息
    getOrderInfo(state, orderInfo){
      state.orderInfo = orderInfo
    },
    // 获取所有员工信息
    getWaiterObj(state, waiterData){
      state.waiterObj = waiterData
    }
  },
  // 处理异步操作
  actions: {
    // 获取所有订单的信息 使用async和await 结合 axios来进行异步加载
    async findAllOrder(context, params){
        let orderData = await axios.post('/order/queryPage', params)
        context.commit('getOrderObj', orderData.data.data)
    },
    // 派单
    async SendOrder(context, params){
      let sendOrder = await axios.get('/order/sendOrder', {params: params})
      console.log(sendOrder);
      context.commit('getSendOrder', sendOrder.data)
    },
    // 取消派单
    async CancelSendOrder(context, id){
      let res = await axios.get('/order/cancelSendOrder?orderId='+id)
    },
    // 根据订单id获取订单的基本信息
    async findOrderInfoById(context, id){
      let orderInfo = await axios.get('/order/findById?id='+id)
      context.commit('getOrderInfo', orderInfo.data.data)
    },
    // 获取所有员工的信息
    async findAllWaiter(context){
        let waiterData = await axios.get('/waiter/findAll')
        context.commit('getWaiterObj', waiterData.data.data)
    },
  }
}