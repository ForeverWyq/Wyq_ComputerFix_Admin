<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户: {{ name }}</div><time class="time">{{ currentDate }}</time>
    <div class="content">
      <el-row>
        <el-col class="card" :span="5" v-for="o in List" :key="o.id">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.img" class="image">
            <div style="padding: 14px;">
              <span>{{o.name}}</span><br>
              <div class="bottom clearfix">
                <p class="time">{{o.description}}</p>
                <el-button type="text" class="button" @click="topage(o.path)">前往</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      currentDate: new Date(),
      List:[
        {
          id:1,
          name:'顾客管理',
          img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1272426952,1231986839&fm=26&gp=0.jpg',
          path:'/customer/list',
          description:'管理顾客的信息',
        },
        {
          id:2,
          name:'员工管理',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602156959707&di=0141d4e18241b2d3113071959c4eb23d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190217%2F4f44b22616304cce87276b75af155a58.jpeg',
          path:'/waiter/list',
          description:'管理员工的信息',
        },
        {
          id:3,
          name:'栏目管理',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602156871174&di=c478c30bd5e51bc92eaa8ba52c01d4a7&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F10%2F96%2F47%2F29b1OOOPICa4.jpg',
          path:'/category/list',
          description:'增删改查栏目',
        },
        {
          id:4,
          name:'产品管理',
          img:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2025024801,1692097397&fm=26&gp=0.jpg',
          path:'/product/list',
          description:'管理产品信息',
        },
        {
          id:5,
          name:'订单管理',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602156868757&di=5f1412ec42b92374e30217820b009a39&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F47%2F77%2F87574401788a4ce.jpg',
          path:'/order/list',
          description:'管理订单，派单、取消派单',
        },
        {
          id:6,
          name:'评论管理',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602156868364&di=df450d2d2f8459161c6fdeed64339a13&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F97%2F22%2F4256f31878bf7a4.jpg',
          path:'/comment/list',
          description:'审核评论',
        },
        {
          id:7,
          name:'员工审核',
          img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2414062204,2091800219&fm=26&gp=0.jpg',
          path:'/examine/waiterExamine',
          description:'审核员工身份信息',
        },
        {
          id:8,
          name:'提现审核',
          img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2628599114,2180044429&fm=26&gp=0.jpg',
          path:'/examine/cashExamine',
          description:'审核员工发起的提现请求',
        },
      ]
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    topage(path){
      this.$router.push({path: path});
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.dashboard-container{
  overflow:auto
}

.card{
  margin-left: 10px;
  margin-top: 20px;
}

.content{
  height: 100%;
  padding-top: 20px;
}

.time {
  font-size: 13px;
  color: #999;
}
  
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  height: 150px;
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
  
.clearfix:after {
  clear: both
}
</style>
