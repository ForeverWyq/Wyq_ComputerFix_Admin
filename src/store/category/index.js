// 在Vuex中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/http/axios'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  // 保存数据或状态
  state: {
    // 全部栏目信息对象
    categoryObj: {},
    // 栏目的基本信息
    categoryInfo: {},
  },
  // 官方推荐唯一修改state中状态的方式
  mutations: {
    // 获取所有栏目信息
    getCategoryObj(state, categoryData){
      state.categoryObj = categoryData
    },
    // 获取该栏目的基本信息
    getCategoryInfo(state, categoryInfo){
      state.categoryInfo = categoryInfo
    }
  },
  // 处理异步操作
  actions: {
    // 获取所有栏目的信息 使用async和await 结合 axios来进行异步加载
    async findAllCategory(context, params){
      let categoryData = await axios.post('/category/query', params)
      console.log(categoryData.data.data);
      context.commit('getCategoryObj', categoryData.data.data)
    },
    // 通过id删除栏目
    async deleteCategory(context, id){
      let res = await axios.get('/category/deleteById?id='+id)
      console.log(res);
    },
    // 保存或更新栏目信息
    async saveOrUpdateCategory(context, params){
      let res = await axios.post('/category/saveOrUpdate', params)
    },
  }
}