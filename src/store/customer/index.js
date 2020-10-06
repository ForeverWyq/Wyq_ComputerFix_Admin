// 在Vuex中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/http/axios'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  // 保存数据或状态
  state: {
    // 全部顾客信息对象
    customerObj: {},
    // 顾客的基本信息
    customerInfo: {},
    // 订单信息
    orderData: [],
    // 地址信息
    addressData:[]
  },
  // 官方推荐唯一修改state中状态的方式
  mutations: {
    // 获取所有顾客信息
    getCustomerObj(state, customerData){
      state.customerObj = customerData
    },
    // 获取顾客个人的基本信息
    getCustomerInfo(state, customerInfo){
      state.customerInfo = customerInfo
    },
    // 根据顾客id 获取订单信息
    getOrderData(state, orderData){
      state.orderData = orderData
    },
    // 根据顾客id 获取地址信息
    getAddressData(state, addressData){
      state.addressData = addressData
    }
  },
  // 处理异步操作
  actions: {
    // 获取所有顾客的信息 使用async和await 结合 axios来进行异步加载
    async findAllCustomer(context, params){
      let customerData = await axios.post('/customer/query', params)
      console.log(customerData.data.data);
      context.commit('getCustomerObj', customerData.data.data)
    },
    // 通过id删除顾客
    async deleteCustomer(context, id){
      let res = await axios.get('/customer/deleteById?id='+id)
      console.log(res);
    },
    // 保存或更新顾客信息
    async saveOrUpdateCustomer(context, params){
      let res = await axios.post('/customer/saveOrUpdate', params)
    },
    // 根据顾客id获取顾客的基本信息
    async findCustomerInfoById(context, id){
      let customerInfo = await axios.get('/customer/findCustomerById?id='+id)
      // console.log(customerInfo.data.data);
      context.commit('getCustomerInfo', customerInfo.data.data)
    },
    // 根据顾客id获取订单信息
    async findOrderDataById(context, id){
      let orderData = await axios.get('/order/query?customerId='+id)
      // console.log(orderData.data.data);
      context.commit('getOrderData', orderData.data.data)
    },
    // 根据顾客id获取地址信息
    async findAddressDataById(context, id){
      let addressData = await axios.get('/address/findByCustomerId?id='+id)
      context.commit('getAddressData', addressData.data.data)
    }
  }
}