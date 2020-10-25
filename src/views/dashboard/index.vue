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
          img:'http://223.4.183.62/ComputerFix/images/gkgl.jpg',
          path:'/customer/list',
          description:'管理顾客信息',
        },
        {
          id:2,
          name:'员工管理',
          img:'http://223.4.183.62/ComputerFix/images/yggl.jpg',
          path:'/waiter/list',
          description:'管理员工信息',
        },
        {
          id:3,
          name:'栏目管理',
          img:'http://223.4.183.62/ComputerFix/images/lmgl.jpg',
          path:'/category/list',
          description:'增删改查栏目',
        },
        {
          id:4,
          name:'产品管理',
          img:'http://223.4.183.62/ComputerFix/images/cpgl.jpg',
          path:'/product/list',
          description:'管理产品信息',
        },
        {
          id:5,
          name:'订单管理',
          img:'http://223.4.183.62/ComputerFix/images/ddgl.jpg',
          path:'/order/list',
          description:'管理订单，派单、取消派单',
        },
        {
          id:6,
          name:'评论管理',
          img:'http://223.4.183.62/ComputerFix/images/plgl.jpg',
          path:'/comment/list',
          description:'审核评论信息',
        },
        {
          id:7,
          name:'员工审核',
          img:'http://223.4.183.62/ComputerFix/images/ygsh.jpg',
          path:'/examine/waiterExamine',
          description:'审核员工身份信息',
        },
        {
          id:8,
          name:'提现审核',
          img:'http://223.4.183.62/ComputerFix/images/txsh.jpg',
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
  margin-left: 3%;
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
  height: 160px;
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
