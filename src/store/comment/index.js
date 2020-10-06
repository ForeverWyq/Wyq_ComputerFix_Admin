// 在Vuex中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/http/axios'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  // 保存数据或状态
  state: {
    // 全部评论信息对象
    commentObj: {},
  },
  // 官方推荐唯一修改state中状态的方式
  mutations: {
    // 获取所有评论信息
    getCommentObj(state, commentData){
      state.commentObj = commentData
    },
  },
  // 处理异步操作
  actions: {
    // 获取所有评论的信息 使用async和await 结合 axios来进行异步加载
    async findAllComment(context, params){
      let commentData = await axios.post('/comment/query', params)
      console.log(commentData.data.data);
      context.commit('getCommentObj', commentData.data.data)
    },
    // 通过id删除评论
    async deleteComment(context, id){
      let res = await axios.get('/comment/deleteById?id='+id)
      console.log(res);
    },
    // 通过评论
    async commentExamine(context, id){
        let res = await axios.get('/comment/commentExamine?commentid='+id)
    },
    // 拒绝评论
    async commentRefuseExamine(context, id){
        let res = await axios.get('/comment/commentRefuseExamine?commentid='+id)
    },
  }
}