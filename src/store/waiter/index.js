// 在Vuex中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/http/axios'
import request from '@/utils/request'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  // 保存数据或状态
  state: {
    // 全部员工信息对象
    waiterObj: {},
    // 员工的基本信息
    waiterInfo: {},
    // 订单信息
    orderData: [],
    // 收益信息
    earningsData:[],
    // 获取所有员工收益提现信息
    waiterShouObj: {},
  },
  // 官方推荐唯一修改state中状态的方式
  mutations: {
    // 获取所有员工信息
    getWaiterObj(state, waiterData){
      state.waiterObj = waiterData
    },
    // 获取员工个人的基本信息
    getWaiterInfo(state, waiterInfo){
      state.waiterInfo = waiterInfo
    },
    // 根据员工id 获取订单信息
    getOrderData(state, orderData){
      state.orderData = orderData
    },
    // 根据员工id 获取收益信息
    getEarningsData(state, earningsData){
      state.earningsData = earningsData
    },
    // 获取所有员工收益提现信息
    getWaiterShouObj(state, waiterShouData){
      state.waiterShouObj = waiterShouData
    }
  },
  // 处理异步操作
  actions: {
    // 获取所有员工的信息 使用async和await 结合 axios来进行异步加载
    async findAllWaiter(context, params){
      let waiterData = await axios.post('/waiter/query', params)
      console.log(waiterData.data.data);
      context.commit('getWaiterObj', waiterData.data.data)
    },
    // 通过id删除员工
    async deleteWaiter(context, id){
      let res = await axios.get('/waiter/deleteById?id='+id)
      console.log(res);
    },
    // 保存或更新员工信息
    async saveOrUpdateWaiter(context, params){
      let res = await axios.post('/waiter/saveOrUpdate', params)
    },
    // 根据员工id获取员工的基本信息
    async findWaiterInfoById(context, id){
      let waiterInfo = await axios.get('/waiter/findWaiterById?id='+id)
      // console.log(waiterInfo.data.data);
      context.commit('getWaiterInfo', waiterInfo.data.data)
    },
    // 根据员工id获取订单信息
    async findOrderDataById(context, id){
      let orderData = await axios.get('/order/query?waiterId='+id)
      // console.log(orderData.data.data);
      context.commit('getOrderData', orderData.data.data)
    },
    // 根据员工id获取收益信息
    async findEarningsDataById(context, id){
      let earningsData = await axios.get('/waiter/detailsShou?id='+id)
      context.commit('getEarningsData', earningsData.data.data)
    },
    // 获取所有员工的收益提现信息
    async findAllWaiterShou(context, params){
      let waiterShouData = await axios.post('/waiter/queryShou', params)
      context.commit('getWaiterShouObj', waiterShouData.data.data)
    },
    // 提现审核
    async WaiterExamine(context, params){
      let url = "http://223.4.183.62:5588/waiter/waiterexamine";
      request({
        url,
        method:"POST",
        headers:{
          "Content-Type":"application/json;charset=UTF-8"
        },
        data:JSON.stringify(params) ,
        dataType:"json"
      }).then((r)=>{
        console.log(r);
      })
    },
    // 上传凭证
    async UpLoadExamine(context, params){
      let url = "http://223.4.183.62:5588/waiter/uploadExamine";
      request({
        url,
        method:"POST",
        headers:{
          "Content-Type":"application/json;charset=UTF-8"
        },
        data:JSON.stringify(params) ,
        dataType:"json"
      }).then((r)=>{
        console.log(r);
      })
    }
  }
}